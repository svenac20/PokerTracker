using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PokerTrackerAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationForUserAndCasino : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CasinoUser",
                columns: table => new
                {
                    CasinosId = table.Column<int>(type: "int", nullable: false),
                    OwnersId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CasinoUser", x => new { x.CasinosId, x.OwnersId });
                    table.ForeignKey(
                        name: "FK_CasinoUser_Casinos_CasinosId",
                        column: x => x.CasinosId,
                        principalTable: "Casinos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CasinoUser_Users_OwnersId",
                        column: x => x.OwnersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CasinoUser_OwnersId",
                table: "CasinoUser",
                column: "OwnersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CasinoUser");
        }
    }
}
