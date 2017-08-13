using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Models
{
    public class DriverLicense
    {
        public string Number { get; set; }
        public string State { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}