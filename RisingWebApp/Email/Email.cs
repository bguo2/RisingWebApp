using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Email
{
    public class Email
    {
        public string To { get; set; }
        public string From { get; set; }
        public string CC { get; set; }
        public string BCC { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsBodyHtml { get; set; }
        public IEnumerable<string> AttachmentFiles { get; set; }

        public Email()
        {
            AttachmentFiles = new List<string>();
        }
    }
}