using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PontoCerto.API.Models.Enums;

namespace PontoCerto.API.Models;

public class SolicitacaoPonto
{
  [Key]
  public int Id { get; set; }
  public DateTime Data { get; set; } = DateTime.Now; // Data da solicitação
  public TipoSolicitacao Tipo { get; set; } // Ajuste, Falta, etc.
  public TipoStatus Status { get; set; } // Pendente, Aprovado, Rejeitado

  [ForeignKey("Usuario")]
  [Required]
  public int UsuarioId { get; set; }

  // Propriedade de Navegação para usuário
  public Usuario? Usuario { get; set; }
}
