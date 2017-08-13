using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace RisingWebApp.Models
{
    public enum ApplicationType
    {
        Tenant,
        Tenant_co_tenant,
        Co_signer
    }

    public class PersonalInfo
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public ApplicationType Apptype { get; set; }

        public string FullName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Ssn { get; set; }
        public DriverLicense DriverLicense { get; set; }
        public string HomePhone { get; set; }
        public string WorkPhone { get; set; }
        public string OtherPhone { get; set; }
        public string Email { get; set; }
        public string OtherOccupants { get; set; }

        public string Pets { get; set; }
        public Auto AutoInfo { get; set; }
        public string OtherVehicles { get; set; }
        public EmergencyContact Emergency { get; set; }

        public bool UseLiquidFurniture { get; set; }
        public string LiquidFurnitureType { get; set; }
        public bool FiledBanckruptcy { get; set; }
        public string BanckruptcyReason { get; set; }
        public bool Felony { get; set; }
        public string FelonyReason { get; set; }
        public bool AskedMoveout { get; set; }
        public string MoveoutReason { get; set; }
    }
}