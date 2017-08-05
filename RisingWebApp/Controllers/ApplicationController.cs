using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using RisingWebApp.Models;
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
        public async Task<HttpResponseMessage> PostApplication([FromBody]RentApplication application)
        {
            try
            {

                var result = await _rentAppManager.SendApplication(application);
                if(string.IsNullOrEmpty(result))
                    return Request.CreateResponse(HttpStatusCode.Accepted);
                return Request.CreateResponse(HttpStatusCode.BadRequest, result);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, e.Message);
            }
        }
    }
}
