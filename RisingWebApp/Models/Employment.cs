using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Models
{
    public class Employment
    {
        public string Employer { get; set; }
        public string Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Supervisor { get; set; }
        public string SupervisorPhone { get; set; }
        public decimal GrossIncome { get; set; }
        public string IncomeType { get; set; }
        public string OtherIncomeInfo { get; set; }
    }
}