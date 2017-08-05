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
        private const string _emailHeader = "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Rent Application</title></head>";

        public RentApplicationManager(IEmailServer emailServer)
        {
            _emailServer = emailServer;
        }

        public async Task SendApplication(RentApplication application)
        {
            var email = new Email.Email();
            var htmlBody = new StringBuilder();
            var mainApp = application.Applications.ElementAt(0);
            email.From = ConfigurationManager.AppSettings.Get("SMTP.UserName");
            email.To = mainApp.PersonalInfo.Email;
            email.IsBodyHtml = true;
            email.Subject = "Rent Application For " + application.Premises.Address;
            htmlBody.AppendFormat("%s<body>", _emailHeader);
            //body

            htmlBody.Append("</body></html>");
            email.Body = htmlBody.ToString();
            await _emailServer.Send(email);
        }
    }
}