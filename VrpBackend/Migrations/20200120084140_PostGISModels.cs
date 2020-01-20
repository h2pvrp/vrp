using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VrpBackend.Migrations
{
    public partial class PostGISModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Info",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "Results",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Cases");

            migrationBuilder.AddColumn<string>(
                name: "Endpoint",
                table: "Workers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Host",
                table: "Workers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Port",
                table: "Workers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "CaseId",
                table: "Results",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<double>(
                name: "CombinedLength",
                table: "Results",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ComputationTime",
                table: "Results",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LongestRouteLength",
                table: "Results",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LongestRouteTime",
                table: "Results",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfRoutes",
                table: "Results",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Workers_Name",
                table: "Workers",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Results_CaseId",
                table: "Results",
                column: "CaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Cases_CaseId",
                table: "Results",
                column: "CaseId",
                principalTable: "Cases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Cases_CaseId",
                table: "Results");

            migrationBuilder.DropIndex(
                name: "IX_Workers_Name",
                table: "Workers");

            migrationBuilder.DropIndex(
                name: "IX_Results_CaseId",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "Endpoint",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "Host",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "Port",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "CaseId",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "CombinedLength",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "ComputationTime",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "LongestRouteLength",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "LongestRouteTime",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "NumberOfRoutes",
                table: "Results");

            migrationBuilder.AddColumn<string>(
                name: "Info",
                table: "Workers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long[]>(
                name: "Results",
                table: "Cases",
                type: "bigint[]",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Timestamp",
                table: "Cases",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Cases",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
