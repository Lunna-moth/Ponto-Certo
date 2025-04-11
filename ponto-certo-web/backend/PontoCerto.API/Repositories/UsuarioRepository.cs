using Microsoft.EntityFrameworkCore;
using PontoCerto.API.Data;
using PontoCerto.API.Models;

namespace PontoCerto.API.Repositories;

public class UsuarioRepository : IRepository<Usuario>
{

  private readonly PontoCertoContext _context;

  public UsuarioRepository(PontoCertoContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<Usuario>> GetAllAsync()
  {
    return await _context.Usuarios.ToListAsync();
  }

  public async Task<Usuario> GetByIdAsync(int id)
  {
    return await _context.Usuarios.FindAsync(id);
  }

  public async Task<Usuario> CreateAsync(Usuario usuario)
  {
    _context.Usuarios.Add(usuario);
    await _context.SaveChangesAsync();
    return usuario;
  }

  public async Task<Usuario> UpdateAsync(Usuario usuario)
  {
    var usuarioExistente = await _context.Usuarios.FindAsync(usuario.Id);
    if (usuarioExistente == null)
    {
      return null;
    }
    
    usuarioExistente.Nome = usuario.Nome;
    usuarioExistente.Email = usuario.Email;
    usuarioExistente.Senha = usuario.Senha;
    _context.Usuarios.Update(usuarioExistente);
    await _context.SaveChangesAsync();
    return usuarioExistente;
  }

  public async Task<bool> Delete(int id)
  {
    var usuario = await _context.Usuarios.FindAsync(id);
    if (usuario == null)
    {
      return false;
    }
    _context.Usuarios.Remove(usuario);
    await _context.SaveChangesAsync();
    return true;
  }

  public async Task<Usuario> ValidarLoginAsync(string email, string senha)
  {
    return await _context.Usuarios
        .FirstOrDefaultAsync(u => u.Email == email && u.Senha == senha);
  }
}
