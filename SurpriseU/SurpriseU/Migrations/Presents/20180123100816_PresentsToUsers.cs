using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SurpriseU.Migrations.Presents
{
    public partial class PresentsToUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Presents",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Celebration = table.Column<int>(nullable: false),
                    Content = table.Column<string>(maxLength: 1000, nullable: false),
                    Gender = table.Column<int>(nullable: false),
                    Photo = table.Column<string>(nullable: true),
                    Title = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presents", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Presents");
        }
    }
}
