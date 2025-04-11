using Microsoft.EntityFrameworkCore;
using PontoCerto.API.Data;
using PontoCerto.API.Models;
using PontoCerto.API.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configuração do Kestrel para funcionar no Render
builder.WebHost.ConfigureKestrel(options =>
{
  var port = Environment.GetEnvironmentVariable("PORT");
  if (!string.IsNullOrEmpty(port))
  {
    options.ListenAnyIP(int.Parse(port));
  }
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PontoCertoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IRepository<Ponto>, PontoRepository>();
builder.Services.AddScoped<IRepository<Usuario>, UsuarioRepository>();
builder.Services.AddScoped<IRepository<SolicitacaoPonto>, SolicitacaoPontoRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}


app.UseAuthorization();
app.MapControllers();

app.Run();
