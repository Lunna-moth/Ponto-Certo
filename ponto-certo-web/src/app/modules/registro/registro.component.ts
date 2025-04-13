import { Component } from '@angular/core';
import * as L from 'leaflet';
import { TipoMarcacao } from 'src/app/enums/tipo-marcacao.enum';
import { Registro } from 'src/app/models/registro';
import { Usuario } from 'src/app/models/usuario';
import { PontoService } from 'src/app/services/ponto.service';

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
  registrando: boolean = false; // 🔄 Flag de carregamento

  constructor(private pontoService: PontoService) {
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
      this.map = L.map('map').setView([this.latitude, this.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      L.marker([this.latitude, this.longitude])
        .addTo(this.map)
        .bindPopup('Você está aqui!')
        .openPopup();
    }
  }

  recuperarUsuario(): Usuario | null {
    const usuarioLogado = localStorage.getItem('user');
    if (usuarioLogado) {
      return JSON.parse(usuarioLogado);
    }
    return null;
  }

  registrarPonto() {
    const usuarioIdString = localStorage.getItem('usuarioId');

    if (!usuarioIdString) {
      console.error('Usuário não está logado!');
      return;
    }

    const usuarioId = parseInt(usuarioIdString, 10);
    this.registrando = true; // ✅ Início da ação

    // Alterna o tipo: Entrada (0) → Saída (1) → Entrada (0)...
    this.registro.tipo = this.registro.tipo === 0 ? 1 : 0;
    this.registro.dataHora = this.dateTime.toISOString();
    this.registro.latitude = this.latitude;
    this.registro.longitude = this.longitude;
    this.registro.usuarioId = usuarioId;

    this.pontoService.registrarPonto(this.registro).subscribe(
      (response) => {
        console.log('✅ Ponto registrado com sucesso!', response);
        this.registros.unshift(response); // ⬆ Insere no topo da lista
        this.registrando = false;
      },
      (error) => {
        console.error('❌ Erro ao registrar ponto:', error);
        this.registrando = false;
      }
    );
  }
}
