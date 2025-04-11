using Microsoft.EntityFrameworkCore;
using PontoCerto.API.Data;
using PontoCerto.API.Models;

namespace PontoCerto.API.Repositories;

public class PontoRepository : IRepository<Ponto>
{
  private readonly PontoCertoContext _context;

  public PontoRepository(PontoCertoContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<Ponto>> GetAllAsync()
  {
    return await _context.Pontos.ToListAsync();
  }

  public async Task<Ponto> GetByIdAsync(int id)
  {
    return await _context.Pontos.FindAsync(id);
  }

  public async Task<Ponto> CreateAsync(Ponto ponto)
  {
    _context.Pontos.Add(ponto);
    await _context.SaveChangesAsync();
    return ponto;
  }

  public async Task<Ponto> UpdateAsync(Ponto ponto)
  {
    _context.Pontos.Update(ponto);
    await _context.SaveChangesAsync();
    return ponto;
  }

  public async Task<bool> Delete(int id)
  {
    var ponto = await _context.Pontos.FindAsync(id);
    if (ponto == null)
    {
      return false;
    }
    _context.Pontos.Remove(ponto);
    await _context.SaveChangesAsync();
    return true;
  }
}
