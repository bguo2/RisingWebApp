using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Configuration;
using RisingWebApp.Models;
using RisingWebApp.Managers;

namespace RisingWebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            var houses = ConfigurationManager.AppSettings.Get("AvailableHouses");
            var arrays = houses.Split(';');
            var houseStr = new StringBuilder();
            var rentalStr = new StringBuilder();
            for(var i=0; i< arrays.Length; i += 2)
            {
                if(houseStr.Length == 0)
                {
                    houseStr.Append(arrays[i]);
                    rentalStr.Append(arrays[i + 1]);
                }
                else
                {
                    houseStr.AppendFormat(";{0}", arrays[i]);
                    rentalStr.AppendFormat(";{0}", arrays[i + 1]);
                }
            }
            ViewBag.AvailableHouses = houseStr.ToString();
            ViewBag.Rentals = rentalStr.ToString();
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
