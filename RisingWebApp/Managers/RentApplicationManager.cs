using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
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

        private string ValidateData(RentApplication application)
        {
            var mainApp = application.Applications.ElementAt(0);
            if (string.IsNullOrEmpty(mainApp.PersonalInfo.Email))
                return "Email address is not specified.";
            return "";
        }

        public async Task<string> SendApplication(RentApplication application)
        {
            var result = ValidateData(application);
            if (!string.IsNullOrEmpty(result))
                return result;

            var email = new Email.Email();
            var htmlBody = new StringBuilder();
            var mainApp = application.Applications.ElementAt(0);
            email.From = ConfigurationManager.AppSettings.Get("SMTP.UserName");
            email.To = mainApp.PersonalInfo.Email;
            email.IsBodyHtml = true;
            email.Subject = "Rent Application For " + application.Premises.Address;
            //body

            email.Body = htmlBody.ToString();
            await _emailServer.Send(email);
            return "";
        }
    }
}