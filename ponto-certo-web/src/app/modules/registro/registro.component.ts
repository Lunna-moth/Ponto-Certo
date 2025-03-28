import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  dateTime: Date = new Date();

  constructor() {
    setInterval(() => {
      this.dateTime = new Date();
    }, 1000);
  }

  registrarPonto() {
    console.log('### Ponto Registrado => ', this.dateTime.toISOString());
  }
}
