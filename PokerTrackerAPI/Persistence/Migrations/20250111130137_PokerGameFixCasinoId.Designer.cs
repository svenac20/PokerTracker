﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PokerTrackerAPI.Persistence;

#nullable disable

namespace PokerTrackerAPI.Persistence.Migrations
{
    [DbContext(typeof(PokerTrackerDbContext))]
    [Migration("20250111130137_PokerGameFixCasinoId")]
    partial class PokerGameFixCasinoId
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("PokerTrackerAPI.Entities.Casino", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("TownId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TownId");

                    b.ToTable("Casinos");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.GameType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("GameTypes");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.PokerGame", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CasinoId")
                        .HasColumnType("int");

                    b.Property<int>("GameTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Limit")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PlayerWaiting")
                        .HasColumnType("int");

                    b.Property<int>("TablesNumber")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CasinoId");

                    b.HasIndex("GameTypeId");

                    b.ToTable("PokerGames");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.Town", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CountryId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.ToTable("Towns");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.Casino", b =>
                {
                    b.HasOne("PokerTrackerAPI.Entities.Town", "Town")
                        .WithMany()
                        .HasForeignKey("TownId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Town");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.PokerGame", b =>
                {
                    b.HasOne("PokerTrackerAPI.Entities.Casino", "Casino")
                        .WithMany("PokerGames")
                        .HasForeignKey("CasinoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PokerTrackerAPI.Entities.GameType", "GameType")
                        .WithMany()
                        .HasForeignKey("GameTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Casino");

                    b.Navigation("GameType");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.Town", b =>
                {
                    b.HasOne("PokerTrackerAPI.Entities.Country", "Country")
                        .WithMany("Towns")
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Country");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.User", b =>
                {
                    b.HasOne("PokerTrackerAPI.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.Casino", b =>
                {
                    b.Navigation("PokerGames");
                });

            modelBuilder.Entity("PokerTrackerAPI.Entities.Country", b =>
                {
                    b.Navigation("Towns");
                });
#pragma warning restore 612, 618
        }
    }
}
