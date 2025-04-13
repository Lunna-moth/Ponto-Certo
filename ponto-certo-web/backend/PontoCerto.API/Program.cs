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

// ⛑️ Configura CORS
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowFrontend", policy =>
  {
    policy.WithOrigins(
        "https://ponto-certo-2.onrender.com",
        "http://localhost:4200"
    )
    .AllowAnyHeader()
    .AllowAnyMethod();
  });
});


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

// 🧠 ATIVA o CORS ANTES do MapControllers()
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();
