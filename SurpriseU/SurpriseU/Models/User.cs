using System;
using System.Collections.Generic;
using System.Linq;
using System.Collections;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace SurpriseU.Models
{
    public class User
    {
        public List<Friend> Friends { get; set; }
        public List<Anket> Ankets { get; set; }

        public int Id { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; }
        public DateTime Age { get; set; }
        public string Email { get; set; }
        private string password;
        public Gender Gender { get; set; }
        ArrayList Likes = new ArrayList();
        ArrayList Hobbies = new ArrayList();
        public string Photo { get; set; }
  
        public List<Present> likedPresents;
        public List<Present> suggestedPresents;
        public string Password { get { return password; } set { password = value; } }



    }
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<Anket> Ankets { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Userrelationsdb;Trusted_Connection=True;");
        }
    }
    //public class UsersContext : DbContext
    //{
    //    public UsersContext(DbContextOptions<UsersContext> options)
    //       : base(options)
    //    { }
    //    public DbSet<User> Users { get; set; }


    //}
    public enum Gender
    {
        
        Male,
        Female
    }


}

