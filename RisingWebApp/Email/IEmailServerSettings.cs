using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RisingWebApp.Email
{
    public interface IEmailServerSettings
    {
        string Host { get; set; }
        int Port { get; set; }
        string UserName { get; set; }
        string Password { get; set; }
        bool UseTLS { get; set; }
    }
}
