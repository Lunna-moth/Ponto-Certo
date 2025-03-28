import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
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

  registrarPonto() {
    console.log('### Ponto Registrado => ', {
      data: this.dateTime.toISOString(),
      latitude: this.latitude,
      longitude: this.longitude,
    });
  }
}
