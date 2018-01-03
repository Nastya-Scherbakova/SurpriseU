using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace SurpriseU.Models
{
    public class Anket
    {
        public int Id { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; }
        public Gender Gender { get; set; }
        ArrayList Likes = new ArrayList();
        ArrayList Hobbies = new ArrayList();
        public string Photo { get; set; }
        public Celebration Celebration { get; set; }
        public DateTime Age { get; set; }
        public int agee { get; set; }
        public List<Present> likedForAnket;
        public User User { get; set; }
    }
    //public class AnketsContext : DbContext
    //{
    //    public AnketsContext(DbContextOptions<AnketsContext> options)
    //       : base(options)
    //    { }
    //    public DbSet<Anket> Ankets { get; set; }

    //}
}
