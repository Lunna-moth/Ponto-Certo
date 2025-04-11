using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PontoCerto.API.Migrations
{
    /// <inheritdoc />
    public partial class MudandoPropriedadesDaTabelaPonto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pontos_Usuarios_UsuarioId",
                table: "Pontos");

            migrationBuilder.DropIndex(
                name: "IX_Pontos_UsuarioId",
                table: "Pontos");

            migrationBuilder.AddColumn<string>(
                name: "Usuario",
                table: "Pontos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Usuario",
                table: "Pontos");

            migrationBuilder.CreateIndex(
                name: "IX_Pontos_UsuarioId",
                table: "Pontos",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pontos_Usuarios_UsuarioId",
                table: "Pontos",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
