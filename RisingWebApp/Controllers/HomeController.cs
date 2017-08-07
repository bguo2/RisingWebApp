using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RisingWebApp.Models;
using RisingWebApp.Managers;

namespace RisingWebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult ViewApplication(string appId)
        {
            ViewBag.ApplicationError = string.Empty;
            try
            {
                var rentAppManager = new RentApplicationManager(null);
                var jsonStr = rentAppManager.GetApplicationData(appId).Result;
                ViewBag.ApplicationData = jsonStr;
            }
            catch (Exception e)
            {
                ViewBag.ApplicationError = e.Message;
            }
            return View("RentApplication");
        }
    }
}
