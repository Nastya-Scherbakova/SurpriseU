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
        [Required, StringLength(100)]
        public string Title { get; set; }
        [Required, StringLength(1000)]
        public string Content { get; set; }
        public PresentsGender Gender { get; set; }
        public string Photo { get; set; }
        public int StartAge { get; set; }
        public int EndAge { get; set; }
        public String LikesString { get; set; }
        public String CelebrationString { get; set; }
        public String UsersIdString { get; set; }

        [NotMapped]
        public List<string> Likes
        {
            get { return LikesString.Split(',').ToList(); }
            set
            {
                LikesString = String.Join(",", value);
            }
        }
        [NotMapped]
        public List<int> Celebration
        {
            get { return CelebrationString.Split(',').ToList().Select(idU => Convert.ToInt32(idU)).ToList(); }
            set
            {
                CelebrationString = String.Join(",", value.ToString());
            }
        }
        [NotMapped]
        public List<int> UsersId
        {
            get { return UsersIdString.Split(',').ToList().Select(idU => Convert.ToInt32(idU)).ToList(); }
            set
            {
                UsersIdString = String.Join(",", value.ToString());
            }
        }

        public enum PresentsGender
        {
            All,
            Male,
            Female
        }
        public Present()
        {
            
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
