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
            var jsonStr = File.ReadAllText(filePath);
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
            email.From = ConfigurationManager.AppSettings.Get("SMTP.UserName");
            email.To = mainApp.PersonalInfo.Email;
            email.IsBodyHtml = true;
            email.Subject = "Rent Application For " + application.Premises.Address;
            //body
            var baseUrl = ConfigurationManager.AppSettings.Get("BaseUrl");
            htmlBody.AppendFormat("To view this application, please click the following link:<br>{0}/Home/ViewApplication?appId={1}", baseUrl, appid);

            email.Body = htmlBody.ToString();
            await _emailServer.Send(email);
            return "";
        }

        //save the application
        private void SaveApplication(RentApplication application)
        {
            var appid = new string(application.Applications.ElementAt(0).PersonalInfo.Ssn.Where(c => char.IsLetterOrDigit(c)).ToArray());
            var filePath = GetAppDataFile(appid);
            var jsonStr = JsonConvert.SerializeObject(application);
            File.WriteAllText(filePath, jsonStr);
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