﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using react_asp.Models;

namespace react_asp.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220129173104_update")]
    partial class update
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.22")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("react_asp.Models.BloodPressureMeasurement", b =>
                {
                    b.Property<int>("RecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Date")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Reading1")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Reading2")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RecordId");

                    b.ToTable("BloodPressureMeasurement");
                });
#pragma warning restore 612, 618
        }
    }
}