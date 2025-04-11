namespace PontoCerto.API.Models.Enums;

public enum TipoSolicitacao
{
  Ajuste, // Ajuste de ponto
  Falta, // Falta não justificada
  Justificativa, // Justificativa de falta
  Atraso, // Atraso não justificado
  Antecipacao, // Antecipação de horário
  Compensacao, // Compensação de horas
  Outros // Outros tipos de solicitação
}
