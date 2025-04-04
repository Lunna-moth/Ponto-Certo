import { Component } from '@angular/core';
import * as L from 'leaflet';
import { TipoMarcacao } from 'src/app/enums/tipo-marcacao.enum';
import { Registro } from 'src/app/models/registro';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registro: Registro = new Registro();
  registros: Registro[] = [];
  dateTime: Date = new Date();
  latitude: number = 0;
  longitude: number = 0;
  map: L.Map | undefined;

  constructor() {
    this.getUserLocation();
    setInterval(() => {
      this.dateTime = new Date();
    }, 1000);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.loadMap();
      });
    } else {
      alert('Geolocalização não é suportada neste navegador.');
    }
  }

  loadMap(): void {
    if (this.latitude && this.longitude) {
      // Cria o mapa centrado na localização do usuário
      this.map = L.map('map').setView([this.latitude, this.longitude], 13);

      // Adiciona o tile layer do OpenStreetMap (opção gratuita)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // Adiciona um marcador na posição do usuário
      L.marker([this.latitude, this.longitude])
        .addTo(this.map)
        .bindPopup('Você está aqui!')
        .openPopup();
    }
  }

  recuperarUsuario() {
    const usuarioLogado = localStorage.getItem('user');

    if (usuarioLogado) {
      const usuario: Usuario = JSON.parse(usuarioLogado);
      return usuario;
    } else {
      console.log('### Falha ao recuperar usuário');
      return new Usuario();
    }
  }

  registrarPonto() {
    this.registro.tipoMarcacao = TipoMarcacao.ENTRADA;
    this.registro.data = this.dateTime;
    this.registro.dataIsoString = this.dateTime.toISOString();
    this.registro.latitude = this.latitude;
    this.registro.longitude = this.longitude;
    this.registro.usuario = this.recuperarUsuario();

    console.log('### Ponto Registrado => ', this.registro);
    this.salvarRegistrosNoStorage();
  }

  salvarRegistrosNoStorage() {
    const registrosString = localStorage.getItem('registro');
    let registros: Registro[] = [];

    if (registrosString) {
      try {
        registros = JSON.parse(registrosString); // Converte JSON para array
        if (!Array.isArray(registros)) {
          registros = []; // Garante que seja um array
        }
        registros.map((registro) => {
          registro.tipoMarcacao === TipoMarcacao.ENTRADA
            ? (registro.tipoMarcacao = TipoMarcacao.SAIDA)
            : (registro.tipoMarcacao = TipoMarcacao.ENTRADA);
        });
      } catch (error) {
        console.error('Erro ao recuperar registros do localStorage:', error);
        registros = [];
      }
    }

    registros.push(this.registro);

    // Salva o array atualizado no localStorage
    localStorage.setItem('registro', JSON.stringify(registros));
  }
}
