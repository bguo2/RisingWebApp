using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Models
{
    public class Premises
    {
        public string Address { get; set; }
        public Decimal Rent { get; set; }
        public DateTime Movein_date { get; set; }
    }
}