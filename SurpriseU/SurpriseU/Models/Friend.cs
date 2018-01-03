using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace SurpriseU.Models
{
    public class Friend
    {
        public User User { get; set; }
        public int Id { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; }
        public Gender Gender { get; set; }
        public DateTime Age { get; set; }
        ArrayList Likes = new ArrayList();
        ArrayList Hobbies = new ArrayList();
        public string Photo { get; set; }
        public List<Friend> friends;
        public List<Present> likedByFriend;
        public List<Present> likedByUser;
    }
    //public class FriendsContext : DbContext
    //{
    //    public FriendsContext(DbContextOptions<FriendsContext> options)
    //       : base(options)
    //    { }
    //    public DbSet<Friend> Friends { get; set; }

    //}

}
