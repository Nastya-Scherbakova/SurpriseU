using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurpriseU.Models
{
    public class UserPresent
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public string PresentId { get; set; }
        public Present Present { get; set; }
    }
    public class PresentUser
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public string PresentId { get; set; }
        public Present Present { get; set; }
    }
    public class UserUser
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public string UserId2 { get; set; }
        public User User2 { get; set; }
    }
    public class UserTag
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public string TagId { get; set; }
        public Tag Tag { get; set; }
    }
    public class PresentTag
    {
        public string PresentId { get; set; }
        public Present Present { get; set; }

        public string TagId { get; set; }
        public Tag Tag { get; set; }
    }
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Present> Presents { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            
            //-------User liked presents & presents, that shows what users they have liked (many-to-many)
            modelBuilder.Entity<UserPresent>()
            .HasKey(t => new { t.UserId, t.PresentId });

            modelBuilder.Entity<UserPresent>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.likedPresents)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<UserPresent>()
                .HasOne(pt => pt.Present)
                .WithMany(t => t.Users)
                .HasForeignKey(pt => pt.PresentId);


            //-------Users that have presents, that was selected for them by someone (many-to-many)
            modelBuilder.Entity<PresentUser>()
            .HasKey(t => new { t.UserId, t.PresentId });

            modelBuilder.Entity<PresentUser>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.likedByUsers)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<PresentUser>()
                .HasOne(pt => pt.Present)
                .WithMany(t => t.likedForUsers)
                .HasForeignKey(pt => pt.PresentId);

            //-------Users with tags and tags with users (many-to-many)
            modelBuilder.Entity<UserTag>()
            .HasKey(t => new { t.UserId, t.TagId });

            modelBuilder.Entity<UserTag>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.Tags)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<UserTag>()
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.Users)
                .HasForeignKey(pt => pt.TagId);

            //-------Presents with tags and tags with presents (many-to-many)
            modelBuilder.Entity<PresentTag>()
            .HasKey(t => new { t.PresentId, t.TagId });

            modelBuilder.Entity<PresentTag>()
                .HasOne(pt => pt.Present)
                .WithMany(p => p.Tags)
                .HasForeignKey(pt => pt.PresentId);

            modelBuilder.Entity<PresentTag>()
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.Presents)
                .HasForeignKey(pt => pt.TagId);

            //-------Users with friends and friends with friends (many-to-many)
            
            modelBuilder.Entity<UserUser>()
            .HasKey(t => new { t.UserId, t.UserId2 });

            modelBuilder.Entity<UserUser>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.Friends)
                .HasForeignKey(pt => pt.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserUser>()
                .HasOne(pt => pt.User2)
                .WithMany(t => t.FriendsOfFriends)
                .HasForeignKey(pt => pt.UserId2);
                


            //-------Users with ankets (one-to-many)
            modelBuilder.Entity<User>()
                .HasOne(pt => pt.UserOwner)
                .WithMany(p => p.Ankets);

            //-------Users with presents, that they suggested (one-to-many)
            modelBuilder.Entity<Present>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.suggestedPresents);

            //-------Users with presents, that was selected for them (one-to-many)
            modelBuilder.Entity<Present>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.suggestedPresents);




            base.OnModelCreating(modelBuilder);
        }
    }
}
