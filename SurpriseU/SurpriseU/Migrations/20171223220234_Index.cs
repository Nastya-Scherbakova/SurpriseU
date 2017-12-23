using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SurpriseU.Migrations
{
    public partial class Index : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Presents",
                columns: table => new
                {
                    PresentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(maxLength: 100, nullable: false),
                    Photo = table.Column<string>(maxLength: 100, nullable: false),
                    Title = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presents", x => x.PresentId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Presents");
        }
    }
}
