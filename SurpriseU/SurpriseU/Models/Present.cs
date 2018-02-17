using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Numerics;
using System.ComponentModel.DataAnnotations.Schema;

namespace SurpriseU.Models
{

    public class Present
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
        public PresentsGender Gender { get; set; }
        public string Photo { get; set; }
        public int StartAge { get; set; }
        public int EndAge { get; set; }
        public List<PresentTag> Tags { get; set; }
        public List<UserPresent> Users { get; set; } //users that liked this present
        public User User { get; set; } //user, that suggested this present to database or selected this present for someone
        public List<PresentUser> likedForUsers { get; set; } //users, thats was selected by other users for this present
        public Present()
        {

            Tags = new List<PresentTag>();
            Users = new List<UserPresent>();
            likedForUsers = new List<PresentUser>();


        }
    }

    public enum PresentsGender
    {
        All,
        Male,
        Female
    }


}
