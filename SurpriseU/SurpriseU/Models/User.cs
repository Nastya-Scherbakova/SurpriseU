using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Collections;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace SurpriseU.Models
{
    public class User : IdentityUser
    {
        public User UserOwner { get; set; } //if this is an Anket
        public string Name { get; set; }
        public DateTime Age { get; set; }
        public Gender Gender { get; set; }
        public string Photo { get; set; }
        public virtual ICollection<UserTag> Tags { get; set; }
        public virtual ICollection<UserUser> Friends { get; set; }
        public virtual ICollection<UserUser> FriendsOfFriends { get; set; }
        public virtual ICollection<User> Ankets { get; set; }
        public virtual List<UserPresent> likedPresents { get; set; }
        public virtual ICollection<PresentUser> likedByUsers { get; set; }
        public virtual ICollection<Present> suggestedPresents { get; set; }
        public User()
        {
            
            Friends = new List<UserUser>();
            FriendsOfFriends = new List<UserUser>();
            Ankets = new List<User>();
            Tags = new List<UserTag>();
            likedPresents = new List<UserPresent>();
            likedByUsers = new List<PresentUser>();
            suggestedPresents = new List<Present>();
        }

    }
    public enum Gender
    {
        
        Male,
        Female
    }


}

