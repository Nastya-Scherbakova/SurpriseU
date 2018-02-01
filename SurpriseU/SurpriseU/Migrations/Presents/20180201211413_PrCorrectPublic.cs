using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SurpriseU.Migrations.Presents
{
    public partial class PrCorrectPublic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CelebrationString",
                table: "Presents",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LikesString",
                table: "Presents",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsersIdString",
                table: "Presents",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CelebrationString",
                table: "Presents");

            migrationBuilder.DropColumn(
                name: "LikesString",
                table: "Presents");

            migrationBuilder.DropColumn(
                name: "UsersIdString",
                table: "Presents");
        }
    }
}
