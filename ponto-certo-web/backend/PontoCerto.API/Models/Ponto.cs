using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PontoCerto.API.Models.Enums;

namespace PontoCerto.API.Models;

public class Ponto
{
  [Key]
  public int Id { get; set; }
  public DateTime DataHora { get; set; } = DateTime.Now; // Data e hora da marcação
  public TipoMarcacao Tipo { get; set; } // Entrada ou Saída
  public double? Latitude { get; set; }
  public double? Longitude { get; set; }

  [ForeignKey("Usuario")]
  [Required]
  public int UsuarioId { get; set; }
  public Usuario? Usuario { get; set; } // Propriedade de Navegação para usuário
}
