using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

namespace VrpBackend.Migrations
{
    public partial class stats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComputationTime",
                table: "Cases");

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

            migrationBuilder.AddColumn<LineString>(
                name: "LongestRoute",
                table: "Results",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfRoutes",
                table: "Results",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CombinedLength",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "ComputationTime",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "LongestRoute",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "NumberOfRoutes",
                table: "Results");

            migrationBuilder.AddColumn<double>(
                name: "ComputationTime",
                table: "Cases",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
