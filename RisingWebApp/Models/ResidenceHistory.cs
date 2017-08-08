using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Models
{
    public class ResidenceHistory
    {
        public string CurAddress { get; set; }
        public string CurAddressCity { get; set; }
        public string CurAddressState { get; set; }
        public string CurAddressZip { get; set; }
        public DateTime CurAddressFrom { get; set; }
        public DateTime CurAddressTo { get; set; }
        public string CurLandlord { get; set; }
        public string CurLandlordPhone { get; set; }
        public bool OwnCurProperty { get; set; }
        public string CurAddrLeavingReason { get; set; }

        public string PreAddress { get; set; }
        public string PreAddressCity { get; set; }
        public string PreAddressState { get; set; }
        public string PreAddressZip { get; set; }
        public DateTime PreAddressFrom { get; set; }
        public DateTime PreAddressTo { get; set; }
        public string PreLandlord { get; set; }
        public string PreLandlordPhone { get; set; }
        public bool OwnPreProperty { get; set; }
        public string PreAddrLeavingReason { get; set; }
    }
}