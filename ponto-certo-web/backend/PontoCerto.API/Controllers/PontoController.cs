using Microsoft.AspNetCore.Mvc;
using PontoCerto.API.Models;
using PontoCerto.API.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PontoCerto.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PontoController : ControllerBase
  {
    private readonly IRepository<Ponto> _pontoRepository;

    public PontoController(IRepository<Ponto> repository)
    {
      _pontoRepository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ponto>>> GetAll()
    {
      var pontos = await _pontoRepository.GetAllAsync();
      return Ok(pontos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Ponto>> GetById(int id)
    {
      var ponto = await _pontoRepository.GetByIdAsync(id);
      return Ok(ponto);
    }

    [HttpPost]
    public async Task<ActionResult<Ponto>> Create([FromBody] Ponto ponto)
    {
      Ponto pontoCriado = await _pontoRepository.CreateAsync(ponto);

      // Parâmetros do CreatedAt
      // nameof(GetByIdAsync) -> Nome do método que retorna o ponto criado
      // new { id = pontoCriado.Id } -> Objeto anônimo com o ID do ponto criado
      // pontoCriado -> O ponto criado
      return CreatedAtAction(nameof(GetById), new { id = pontoCriado.Id }, pontoCriado );
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Ponto>> Put(int id, [FromBody] Ponto ponto)
    {
      var pontoAtualizado = await _pontoRepository.UpdateAsync(ponto);
      return Ok(pontoAtualizado);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
      var pontoDeletado = await _pontoRepository.Delete(id);
      return NoContent();
    }
  }
}
