using Microsoft.AspNetCore.Mvc;
using PontoCerto.API.Models;
using PontoCerto.API.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PontoCerto.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsuarioController : ControllerBase
  {
    private readonly IRepository<Usuario> _usuarioRepository;

    public UsuarioController(IRepository<Usuario> repository)
    {
      _usuarioRepository = repository;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Usuario>>> GetAll()
    {
      IEnumerable<Usuario> usuarios = await _usuarioRepository.GetAllAsync();
      return Ok(usuarios);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Usuario>> GetById(int id)
    {
      Usuario usuario = await _usuarioRepository.GetByIdAsync(id);

      return Ok(usuario);
    }


    [HttpPost]
    public async Task<ActionResult<Usuario>>Create([FromBody] Usuario usuario)
    {
      Usuario criado = await _usuarioRepository.CreateAsync(usuario);
      return CreatedAtAction(nameof(GetById), new { id = criado.Id }, criado );
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult<Usuario>> Update(int id, [FromBody] Usuario usuario)
    {
      usuario.Id = id; // Atribui o ID do usuário a ser atualizado
      var usuarioAtualizado = await _usuarioRepository.UpdateAsync(usuario);

      if(usuarioAtualizado == null)
      {
        return NotFound("Usuário não encontrado.");
      }
      return Ok(usuarioAtualizado);
    }

    
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
      bool resultado = await _usuarioRepository.Delete(id);
      if(!resultado) return NotFound();

      return NoContent();
    }

    [HttpPost("login")]
    public async Task<ActionResult<Usuario>> Login(string email, string senha)
    {
      var usuarios = await _usuarioRepository.GetAllAsync();

      var usuario = usuarios.FirstOrDefault(u =>
          u.Email == email && u.Senha == senha);

      if (usuario == null)
        return Unauthorized("Email ou senha inválidos.");

      return Ok(usuario); // Aqui você pode depois retornar um token, se quiser adicionar JWT futuramente
    }
  }
}
