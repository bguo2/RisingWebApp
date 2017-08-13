using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using RisingWebApp.Models;

namespace RisingWebApp.Managers
{
    public interface IRentApplicationManager
    {
        Task<string> SendApplication(RentApplication application, IEnumerable<MultipartFileData> attachedFiles);
        Task<string> GetApplicationData(string appId);
    }
}
