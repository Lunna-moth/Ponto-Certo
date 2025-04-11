using Microsoft.AspNetCore.Mvc;
using PontoCerto.API.Models;
using PontoCerto.API.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PontoCerto.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SolicitacaoPontoController : ControllerBase
  {
    private readonly IRepository<SolicitacaoPonto> _pontoRepository;

    public SolicitacaoPontoController(IRepository<SolicitacaoPonto> pontoRepository)
    {
      _pontoRepository = pontoRepository;
    }

    // GET: api/<SolicitacaoPontoController>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SolicitacaoPonto>>> GetAll()
    {
      IEnumerable<SolicitacaoPonto> pontos = await _pontoRepository.GetAllAsync();
      return Ok(pontos);
    }

    // GET api/<SolicitacaoPontoController>/5
    [HttpGet("{id}")]
    public async Task<ActionResult<SolicitacaoPonto>> GetById(int id)
    {
      var solicitacaoPonto = await _pontoRepository.GetByIdAsync(id);
      return Ok(solicitacaoPonto);
    }

    // POST api/<SolicitacaoPontoController>
    [HttpPost]
    public async Task<ActionResult<SolicitacaoPonto>> CreateAsync([FromBody] SolicitacaoPonto solictacaoPonto)
    {
      var solictacaoPontoCriada = await _pontoRepository.CreateAsync(solictacaoPonto);
      return CreatedAtAction(nameof(GetById), new { id = solictacaoPontoCriada.Id }, solictacaoPontoCriada);
    }

    // PUT api/<SolicitacaoPontoController>/5
    [HttpPut("{id}")]
    public async Task<ActionResult<SolicitacaoPonto>> UpdateAsync(int id, [FromBody] SolicitacaoPonto solicitacaoPonto)
    {
      var solicitacaoPontoAtualizada = await _pontoRepository.UpdateAsync(solicitacaoPonto);
      return Ok(solicitacaoPontoAtualizada);
    }

    // DELETE api/<SolicitacaoPontoController>/5
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
      bool resultado = await _pontoRepository.Delete(id);
      if (!resultado) return NotFound();

      return NoContent();
    }
  }
}
