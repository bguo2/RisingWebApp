using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Models
{
    public class RentApplication
    {
        public Premises Premises { get; set; }
        public IEnumerable<Application> Applications { get; set; }
    }
}