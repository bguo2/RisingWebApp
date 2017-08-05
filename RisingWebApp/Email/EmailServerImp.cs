using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Net.Mail;
using System.ComponentModel;

namespace RisingWebApp.Email
{
    public class EmailServerImp : IEmailServer
    {
        private IEmailServerSettings _settings;

        public EmailServerImp(IEmailServerSettings settings)
        {
            _settings = settings;
        }

        public async Task Send(Email email)
        {
            var client = new SmtpClient(_settings.Host, _settings.Port);
            client.Credentials = new System.Net.NetworkCredential(_settings.UserName, _settings.Password);
            if (_settings.UseTLS)
                client.EnableSsl = true;

            var from = new MailAddress(email.From);
            var delimiters = new char[] { ';', ',' };
            var recipients = email.To.Split(delimiters);
            var to = new MailAddress(recipients[0]);
            var message = new MailMessage(from, to);

            for (var i = 1; i < recipients.Length; i++)
            {
                message.To.Add(recipients[i]);
            }

            if (!string.IsNullOrEmpty(email.CC))
            {
                var ccs = email.CC.Split(delimiters);
                foreach (var cc in ccs)
                {
                    message.CC.Add(cc);
                }
            }

            if (!string.IsNullOrEmpty(email.BCC))
            {
                var bccs = email.BCC.Split(delimiters);
                foreach (var bcc in bccs)
                {
                    message.Bcc.Add(bcc);
                }
            }

            message.Subject = email.Subject;
            message.Body = email.Body;
            message.IsBodyHtml = email.IsBodyHtml;
            await client.SendMailAsync(message);
        }
    }
}