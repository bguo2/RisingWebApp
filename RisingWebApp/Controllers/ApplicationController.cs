using System;
using System.IO;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using RisingWebApp.Models;
using Newtonsoft.Json;

using RisingWebApp.Managers;

namespace RisingWebApp.Controllers
{
    public class ApplicationController : ApiController
    {
        private readonly IRentApplicationManager _rentAppManager;

        public ApplicationController(IRentApplicationManager rentAppManager)
        {
            _rentAppManager = rentAppManager;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> PostApplication()
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }

                var appDataFolder = RentApplicationManager.GetAppDataFolder();
                var tempFolder = string.Format("{0}\\temp", appDataFolder);
                if(!Directory.Exists(tempFolder))
                    Directory.CreateDirectory(tempFolder);
                var provider = new MultipartFormDataStreamProvider(tempFolder);
                var result = await Request.Content.ReadAsMultipartAsync(provider);
                if (result.FormData["application"] == null)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }

                var jsonStr = HttpUtility.HtmlDecode(result.FormData["application"]);
                var application = JsonConvert.DeserializeObject<RentApplication>(jsonStr);
                var sendResult = await _rentAppManager.SendApplication(application, result.FileData);
                if(string.IsNullOrEmpty(sendResult))
                    return Request.CreateResponse(HttpStatusCode.Accepted);
                return Request.CreateResponse(HttpStatusCode.BadRequest, sendResult);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, e.Message);
            }
        }
    }
}
