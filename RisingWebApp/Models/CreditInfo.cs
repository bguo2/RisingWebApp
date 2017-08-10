using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Models
{
    public class CreditInfo
    {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public decimal MonthlyPayment { get; set; }
        public decimal BalanceDue { get; set; }
    }
}