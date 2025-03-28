import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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
