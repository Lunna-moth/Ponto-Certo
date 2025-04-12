# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia os arquivos de projeto e restaura dependências
COPY *.csproj ./
RUN dotnet restore

# Copia o restante e publica o app
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa final
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Expõe a porta que o Render usará
EXPOSE 80

# Comando de inicialização
ENTRYPOINT ["dotnet", "PontoCerto.API.dll"]
