using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VrpBackend.Migrations
{
    public partial class CaseUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ApplicationUserId",
                table: "Cases",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId1",
                table: "Cases",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ApplicationUser",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    NormalizedUserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    NormalizedEmail = table.Column<string>(nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUser", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cases_ApplicationUserId1",
                table: "Cases",
                column: "ApplicationUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Cases_ApplicationUser_ApplicationUserId1",
                table: "Cases",
                column: "ApplicationUserId1",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cases_ApplicationUser_ApplicationUserId1",
                table: "Cases");

            migrationBuilder.DropTable(
                name: "ApplicationUser");

            migrationBuilder.DropIndex(
                name: "IX_Cases_ApplicationUserId1",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId1",
                table: "Cases");
        }
    }
}
