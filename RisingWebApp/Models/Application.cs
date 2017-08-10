using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Models
{
    public class Application
    {
        public PersonalInfo PersonalInfo { get; set; }
        public IEnumerable<Residence> ResidenceHistory { get; set; }
        public IEnumerable<Employment> EmploymentHistory { get; set; }
        public IEnumerable<CreditInfo> CreditInfo { get; set; }

        public Application()
        {
            ResidenceHistory = new List<Residence>();
            EmploymentHistory = new List<Employment>();
            CreditInfo = new List<CreditInfo>();
        }
    }
}