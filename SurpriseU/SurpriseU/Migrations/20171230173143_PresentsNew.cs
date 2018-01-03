using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SurpriseU.Migrations
{
    public partial class PresentsNew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PresentId",
                table: "Presents",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Photo",
                table: "Presents",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Presents",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 100);

            migrationBuilder.AddColumn<int>(
                name: "Celebration",
                table: "Presents",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "Presents",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "like",
                table: "Presents",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Celebration",
                table: "Presents");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Presents");

            migrationBuilder.DropColumn(
                name: "like",
                table: "Presents");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Presents",
                newName: "PresentId");

            migrationBuilder.AlterColumn<string>(
                name: "Photo",
                table: "Presents",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Presents",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 1000);
        }
    }
}
