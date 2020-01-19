using Microsoft.EntityFrameworkCore.Migrations;

namespace VrpBackend.Migrations
{
    public partial class UniqueAndColors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Results",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Cases",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ComputationTime",
                table: "Cases",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_Workers_Name",
                table: "Workers",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Workers_Name",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "ComputationTime",
                table: "Cases");
        }
    }
}
