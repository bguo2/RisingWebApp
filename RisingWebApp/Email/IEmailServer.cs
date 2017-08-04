using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RisingWebApp.Email
{
    public enum EmailSendResult
    {
        Sent,
        Cancelled,
        Failed
    }

    public interface IEmailServer
    {
        Task Send(Email email);
    }
}
