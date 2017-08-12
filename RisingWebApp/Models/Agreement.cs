using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingWebApp.Models
{
    public class Agreement
    {
        public bool Agree { get; set; }
        public string SignDate { get; set; }
        public string ReturnTo { get; set; }
        public string ReturnAddress { get; set; }
        public string ReturnCity { get; set; }
        public string ReturnState { get; set; }
        public string ReturnZip { get; set; }
    }
}