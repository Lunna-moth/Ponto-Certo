using Microsoft.EntityFrameworkCore;
using PontoCerto.API.Data;
using PontoCerto.API.Models;

namespace PontoCerto.API.Repositories;

public class SolicitacaoPontoRepository : IRepository<SolicitacaoPonto>
{
  private readonly PontoCertoContext _context;

  public SolicitacaoPontoRepository(PontoCertoContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<SolicitacaoPonto>> GetAllAsync()
  {
    return await _context.SolicitacoesPonto.ToListAsync();
  }
  public async Task<SolicitacaoPonto> GetByIdAsync(int id)
  {
    return await _context.SolicitacoesPonto.FindAsync(id);
  }

  public async Task<SolicitacaoPonto> CreateAsync(SolicitacaoPonto solicitacaoPonto)
  {
    _context.SolicitacoesPonto.Add(solicitacaoPonto);
    await _context.SaveChangesAsync();
    return solicitacaoPonto;
  }

  public async Task<SolicitacaoPonto> UpdateAsync(SolicitacaoPonto solicitacaoPonto)
  {
    _context.SolicitacoesPonto.Update(solicitacaoPonto);
    await _context.SaveChangesAsync();
    return solicitacaoPonto;
  }

  public async Task<bool> Delete(int id)
  {
    var solicitacaoPonto = await _context.SolicitacoesPonto.FindAsync(id);
    if (solicitacaoPonto == null)
    {
      return false;
    }
    _context.SolicitacoesPonto.Remove(solicitacaoPonto);
    await _context.SaveChangesAsync();
    return true;
  }
}
