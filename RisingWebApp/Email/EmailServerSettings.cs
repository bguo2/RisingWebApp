using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Email
{
    public class EmailServerSettings : IEmailServerSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool UseTLS { get; set; }
    }
}