using Microsoft.EntityFrameworkCore.Migrations;

namespace react_asp.Migrations
{
    public partial class updateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "BloodPressureMeasurement");

            migrationBuilder.DropColumn(
                name: "Reading1",
                table: "BloodPressureMeasurement");

            migrationBuilder.DropColumn(
                name: "Reading2",
                table: "BloodPressureMeasurement");

            migrationBuilder.AddColumn<string>(
                name: "CreatedDate",
                table: "BloodPressureMeasurement",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "DiastolicMeasurement",
                table: "BloodPressureMeasurement",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ExamDate",
                table: "BloodPressureMeasurement",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "HeartRate",
                table: "BloodPressureMeasurement",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SystolicMeasurement",
                table: "BloodPressureMeasurement",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "BloodPressureMeasurement");

            migrationBuilder.DropColumn(
                name: "DiastolicMeasurement",
                table: "BloodPressureMeasurement");

            migrationBuilder.DropColumn(
                name: "ExamDate",
                table: "BloodPressureMeasurement");

            migrationBuilder.DropColumn(
                name: "HeartRate",
                table: "BloodPressureMeasurement");

            migrationBuilder.DropColumn(
                name: "SystolicMeasurement",
                table: "BloodPressureMeasurement");

            migrationBuilder.AddColumn<string>(
                name: "Date",
                table: "BloodPressureMeasurement",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Reading1",
                table: "BloodPressureMeasurement",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Reading2",
                table: "BloodPressureMeasurement",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
