using Microsoft.EntityFrameworkCore;
using PontoCerto.API.Data;
using PontoCerto.API.Models;
using PontoCerto.API.Repositories;

var builder = WebApplication.CreateBuilder(args);

// 🔧 Força o uso da porta definida pelo Render
builder.WebHost.ConfigureKestrel(serverOptions =>
{
  var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
  serverOptions.ListenAnyIP(int.Parse(port));
});

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var url = Environment.GetEnvironmentVariable("DATABASE_URL");

var databaseUri = new Uri(url);
var userInfo = databaseUri.UserInfo.Split(':');

var connectionString = $"Host={databaseUri.Host};" +
                       $"Port={(databaseUri.Port > 0 ? databaseUri.Port : 5432)};" +
                       $"Database={databaseUri.AbsolutePath.TrimStart('/')};" +
                       $"Username={userInfo[0]};" +
                       $"Password={userInfo[1]};";

builder.Services.AddDbContext<PontoCertoContext>(options =>
    options.UseNpgsql(connectionString));





builder.Services.AddScoped<IRepository<Ponto>, PontoRepository>();
builder.Services.AddScoped<IRepository<Usuario>, UsuarioRepository>();
builder.Services.AddScoped<IRepository<SolicitacaoPonto>, SolicitacaoPontoRepository>();

var app = builder.Build();

// Middleware
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();
app.MapControllers();

app.Run();
