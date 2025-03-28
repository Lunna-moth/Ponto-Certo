import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  dateTime: Date = new Date();
  registros: string[] = [];

  constructor() {
    setInterval(() => {
      this.dateTime = new Date();
    }, 1000);
  }

  registrarPonto() {
    this.registros.push(this.dateTime.toLocaleString());
    console.log('### Ponto Registrado => ', this.registros);
  }
}
