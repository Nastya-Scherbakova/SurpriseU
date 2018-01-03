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
        public int Id { get; set; }
        [Required, StringLength(100)]
        public string Title { get; set; }
        [Required, StringLength(1000)]
        public string Content { get; set; }
        public PresentsGender Gender { get; set; }
        public string Photo { get; set; }
        public bool like { get; set; }
        List<int> Age = new List<int>();
        ArrayList Likes = new ArrayList();
        ArrayList Hobbies = new ArrayList();
        public Celebration Celebration { get; set; }
        public enum PresentsGender
        {
            All,
            Male,
            Female
        }

    }
    public class PresentsContext : DbContext
    {
        public PresentsContext(DbContextOptions<PresentsContext> options)
           : base(options)
        { }
        public DbSet<Present> Presents { get; set; }

    }
    public enum Celebration
    {
        Birthday,
        NewYear,
        WomenDay,
        MenDay,
        MothersDay,
        Other
    }
}
