using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Models
{
    public class Residence
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string LandlordName { get; set; }
        public string LandlordPhone { get; set; }
        public bool OwnProperty { get; set; }
        public string LeavingReason { get; set; }
    }
}