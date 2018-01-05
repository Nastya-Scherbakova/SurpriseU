﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using SurpriseU.Models;
using System;

namespace SurpriseU.Migrations.Application
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SurpriseU.Models.Anket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Age");

                    b.Property<int>("Celebration");

                    b.Property<int>("Gender");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("Photo");

                    b.Property<int?>("UserId");

                    b.Property<int>("agee");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Anket");
                });

            modelBuilder.Entity("SurpriseU.Models.Friend", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Age");

                    b.Property<int>("Gender");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("Photo");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Friend");
                });

            modelBuilder.Entity("SurpriseU.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("SurpriseU.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Age");

                    b.Property<string>("Email");

                    b.Property<int>("Gender");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<string>("Photo");

                    b.Property<int?>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SurpriseU.Models.Anket", b =>
                {
                    b.HasOne("SurpriseU.Models.User", "User")
                        .WithMany("Ankets")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("SurpriseU.Models.Friend", b =>
                {
                    b.HasOne("SurpriseU.Models.User", "User")
                        .WithMany("Friends")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("SurpriseU.Models.User", b =>
                {
                    b.HasOne("SurpriseU.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId");
                });
#pragma warning restore 612, 618
        }
    }
}
