using SurpriseU.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurpriseU.Data
{
    public class PresentData
    {
        public string KeyWord { get; set; }
        public PresentsGender Gender { get; set; }
        public int StartAge { get; set; }
        public int EndAge { get; set; }
        public List<Tag> Tags { get; set; }
    }
}
