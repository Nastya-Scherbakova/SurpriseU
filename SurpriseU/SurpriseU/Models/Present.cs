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
        public string LikesString { get; set; }
        public string CelebrationString { get; set; }
        public string UsersIdString { get; set; }

        [NotMapped]
        public List<string> Likes
        {
            get {
                if (LikesString != null)
                {
                    return LikesString.Split(',').ToList();
                }
                else return null;
               
            }
            set
            {
                LikesString = string.Join(",", value);
            }
        }
        [NotMapped]
        public List<int> Celebration
        {
            get {
                if (CelebrationString != null)
                {
                    List<string> Cel = CelebrationString.Split(',').ToList();
                    return Cel.Select(idU => Convert.ToInt32(idU)).ToList();
                }
                else return null;

            }
            set
            {
                CelebrationString = string.Join(",", value);
            }
        }
        [NotMapped]
        public List<int> UsersId
        {
            get
            {
                if (UsersIdString != null)
                {

                    return UsersIdString.Split(',').ToList().Select(idU => Convert.ToInt32(idU)).ToList(); ;
                }
                else return null;
            }
               
            set
            {
                UsersIdString = string.Join(",", value);
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
            
            //Likes = new List<string>();
            //Celebration = new List<int>();
            //UsersId = new List<int>();
            
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
