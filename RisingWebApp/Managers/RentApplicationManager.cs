using System.IO;
using System;
using System.Linq;
using System.Web;
using System.Text;
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Configuration;
using Newtonsoft.Json;
using RisingWebApp.Email;
using RisingWebApp.Models;
using RisingWebApp.Shared;

namespace RisingWebApp.Managers
{
    public class RentApplicationManager : IRentApplicationManager
    {
        private readonly IEmailServer _emailServer;

        public RentApplicationManager(IEmailServer emailServer)
        {
            _emailServer = emailServer;
        }

        public static string GetAppDataFolder()
        {
            var curPath = HttpContext.Current.Server.MapPath("~");
            var appDataFolder = ConfigurationManager.AppSettings.Get("ApplicationDataFolder");

            return string.Format("{0}{1}", curPath, appDataFolder);
        }

        public async Task<string> GetApplicationData(string appId)
        {
            var filePath = GetAppDataFile(appId);
            if (!File.Exists(filePath))
                throw new Exception(string.Format("The data for {0} is not found.", appId));
            var encryptStr = File.ReadAllText(filePath);
            var jsonStr = Utility.DecryptStringAES(encryptStr, Utility.RisingInvestmentPassword);
            return await Task.FromResult(jsonStr);
        }

        private string ValidateData(RentApplication application)
        {
            var mainApp = application.Applications.ElementAt(0);
            if (string.IsNullOrEmpty(mainApp.PersonalInfo.Email))
                return "Email address is not specified.";
            if (string.IsNullOrEmpty(mainApp.PersonalInfo.Ssn))
                return "SSN is not specified";
            return "";
        }

        public async Task<string> SendApplication(RentApplication application, IEnumerable<MultipartFileData> attachedFiles)
        {
            var result = ValidateData(application);
            if (!string.IsNullOrEmpty(result))
                return result;

            SaveApplication(application);
            var mainApp = application.Applications.ElementAt(0);
            var appid = new string(mainApp.PersonalInfo.Ssn.Where(c => char.IsLetterOrDigit(c)).ToArray());

            var email = new Email.Email();
            email.AttachmentFiles = SaveAttachments(appid, attachedFiles);

            var htmlBody = new StringBuilder();
            email.From = ConfigurationManager.AppSettings.Get("FromEmail");
            email.To = ConfigurationManager.AppSettings.Get("ToEmail");
            email.IsBodyHtml = true;
            email.Subject = "Rent Application For " + application.Premises.Address;
            //body
            var baseUrl = ConfigurationManager.AppSettings.Get("BaseUrl");
            //encode to base64
            htmlBody.AppendFormat("Dear Lisa,<br><br>{0} has submitted the application for {1}.<br>", 
                mainApp.PersonalInfo.FullName, application.Premises.Address);
            htmlBody.AppendFormat("To view the full application, please click the following link:<br>{0}/Home/ViewApplication?appId={1}", 
                baseUrl, Utility.GetBase64String(appid));

            email.Body = htmlBody.ToString();
            var errorMsg = string.Empty;
            try
            {
                await _emailServer.Send(email);
            }
            catch(Exception e)
            {
                errorMsg = e.Message;
            }

            //delete attachments
            DeleteAttchedFiles(appid, application);
            return errorMsg;
        }

        //save the application
        private void SaveApplication(RentApplication application)
        {
            var appid = new string(application.Applications.ElementAt(0).PersonalInfo.Ssn.Where(c => char.IsLetterOrDigit(c)).ToArray());
            var filePath = GetAppDataFile(appid);
            var jsonStr = JsonConvert.SerializeObject(application);
            var encryptStr = Utility.EncryptStringAES(jsonStr, Utility.RisingInvestmentPassword);
            File.WriteAllText(filePath, encryptStr);
        }

        //save attachments
        private IEnumerable<string> SaveAttachments(string appId, IEnumerable<MultipartFileData> attachedFiles)
        {
            var attachments = new List<string>();
            var path = string.Format("{0}\\{1}", GetAppDataFolder(), appId);
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            foreach(var file in attachedFiles)
            {
                var name = StripQuotes(file.Headers.ContentDisposition.Name);
                var index = name.Substring(name.Length - 1);
                var subPath = string.Format("{0}\\{1}", path, index);
                if (!Directory.Exists(subPath))
                    Directory.CreateDirectory(subPath);
                string fileName = file.Headers.ContentDisposition.FileName;
                fileName = StripQuotes(fileName);
                var filePath = string.Format("{0}\\{1}", subPath, fileName);
                if (File.Exists(filePath))
                    File.Delete(filePath);
                File.Move(file.LocalFileName, filePath);
                attachments.Add(filePath);
            }

            return attachments;
        }

        private void DeleteAttchedFiles(string appId, RentApplication application)
        {
            var path = string.Format("{0}\\{1}", GetAppDataFolder(), appId);
            if (!Directory.Exists(path))
                return;
            for(var i = 0; i < application.Applications.Count(); i++)
            {
                var dir = string.Format("{0}\\{1}", path, i);
                if(Directory.Exists(dir))
                {
                    var di = new DirectoryInfo(dir);
                    foreach (FileInfo file in di.GetFiles())
                    {
                        file.Delete();
                    }
                    Directory.Delete(dir);
                }
            }
        }

        private string StripQuotes(string target)
        {
            if (target.StartsWith("\"") && target.EndsWith("\""))
            {
                target = target.Trim('"');
            }
            if (target.Contains(@"/") || target.Contains(@"\"))
            {
                target = Path.GetFileName(target);
            }

            return target;
        }

        private string GetAppDataFile(string appid)
        {
            var path = string.Format("{0}\\{1}", GetAppDataFolder(), appid);
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            var fileName = string.Format("{0}\\Application.txt", path, appid);
            return fileName;
        }

    }
}