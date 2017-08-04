using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
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

        public async Task SendApplication(RentApplication application)
        {
            var email = new Email.Email();
            await _emailServer.Send(email);
        }
    }
}