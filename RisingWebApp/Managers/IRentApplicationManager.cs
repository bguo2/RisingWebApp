using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RisingWebApp.Models;

namespace RisingWebApp.Managers
{
    public interface IRentApplicationManager
    {
        Task SendApplication(RentApplication application);
    }
}
