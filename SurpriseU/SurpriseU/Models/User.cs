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
       

        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime Age { get; set; }
        public string Email { get; set; }
        private string password;
        public Gender Gender { get; set; }
        public List<string> Likes = new List<string>();
        public List<string> Hobbies = new List<string>();
        public string Photo { get; set; }
        public List<int> FriendsId = new List<int>();
        public List<int> AnketsId = new List<int>();
        public List<int> likedPresentsId = new List<int>();
        public List<int> likedByUsersId = new List<int>();
        public List<int> suggestedPresentsId = new List<int>();
        public string Password { get { return password; } set { password = value; } }
        public int? RoleId { get; set; }
        public Role Role { get; set; }

    }
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<User> Users { get; set; }
        public Role()
        {
            Users = new List<User>();
        }
    }
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
    }
    //public class ApplicationContext : DbContext
    //{
    //    public DbSet<User> Users { get; set; }
    //    public DbSet<Friend> Friends { get; set; }
    //    public DbSet<Anket> Ankets { get; set; }
    //    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //    {
    //        optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Userrelationsdb;Trusted_Connection=True;");
    //    }
    //}
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

