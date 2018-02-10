using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurpriseU.Models
{
    public class Tag
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Type Type { get; set; }
        public virtual ICollection<UserTag> Users { get; set; }
        public virtual ICollection<PresentTag> Presents { get; set; }
        public Tag()
        {
            Users = new List<UserTag>();
            Presents = new List<PresentTag>();
        }
    }
    public enum Type
    {
        Likes,
        Celebration
    }
}
