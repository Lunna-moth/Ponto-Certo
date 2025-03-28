import { Component } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent {
  mocks = [
    {
      nome: 'Leonardo',
      tipoMarcacao: 'Entrada',
      dateTime: new Date('2025-03-27T08:05:00'),
    },
    {
      nome: 'Bruno',
      tipoMarcacao: 'Saída',
      dateTime: new Date('2025-03-26T14:30:00'),
    },
    {
      nome: 'Felipe',
      tipoMarcacao: 'Entrada',
      dateTime: new Date('2025-03-25T12:15:00'),
    },
    {
      nome: 'Rennan',
      tipoMarcacao: 'Entrada',
      dateTime: new Date('2025-03-24T18:10:00'),
    },
  ];
}
