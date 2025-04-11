using Microsoft.EntityFrameworkCore;
using PontoCerto.API.Models;

namespace PontoCerto.API.Data;

public class PontoCertoContext : DbContext
{
  public PontoCertoContext(DbContextOptions<PontoCertoContext> options) : base(options)
  {
  }
  public DbSet<Usuario> Usuarios { get; set; }
  public DbSet<Ponto> Pontos { get; set; }
  public DbSet<SolicitacaoPonto> SolicitacoesPonto { get; set; }
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    // Configurações adicionais, se necessário
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Ponto>()
    .Property(p => p.Tipo)
    .HasConversion<string>();

    modelBuilder.Entity<SolicitacaoPonto>()
        .Property(s => s.Tipo)
        .HasConversion<string>();
    modelBuilder.Entity<SolicitacaoPonto>()
        .Property(s => s.Status)
        .HasConversion<string>();
  }
}
