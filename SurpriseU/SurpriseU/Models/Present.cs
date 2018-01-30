using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace SurpriseU.Models
{

    public class Present
    {
        public string Id { get; set; }
        [Required, StringLength(100)]
        public string Title { get; set; }
        [Required, StringLength(1000)]
        public string Content { get; set; }
        public PresentsGender Gender { get; set; }
        public string Photo { get; set; }
        //public bool like { get; set; }
        public List<int> Age { get; set; }
        public List<string> Likes { get; set; }
        public List<int> Celebration { get; set; }
        public List<int> UsersId { get; set; }
       
        public enum PresentsGender
        {
            All,
            Male,
            Female
        }
        public Present()
        {
            Age = new List<int>();
            Likes = new List<string>();
            Celebration = new List<int>();
            UsersId = new List<int>();
            
        }

    }
    public class PresentsContext : DbContext
    {
        public PresentsContext(DbContextOptions<PresentsContext> options)
           : base(options)
        { }
        public DbSet<Present> Presents { get; set; }

    }
    //public enum Celebration
    //{
    //    Birthday,
    //    NewYear,
    //    WomenDay,
    //    MenDay,
    //    MothersDay,
    //    Other
    //}
}
