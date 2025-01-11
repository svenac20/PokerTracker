using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PokerTrackerAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class PokerGameFixCasinoId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CasionId",
                table: "PokerGames");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CasionId",
                table: "PokerGames",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
