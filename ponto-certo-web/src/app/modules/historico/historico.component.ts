import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/models/registro';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit {
  registros: Registro[] = [];

  ngOnInit(): void {
    this.recuperarRegistros();
  }

  recuperarRegistros(): void {
    const registroString = localStorage.getItem('registro');

    if (registroString) {
      try {
        const registrosRecuperados = JSON.parse(registroString);

        // Verifica se os dados recuperados são um array
        if (Array.isArray(registrosRecuperados)) {
          this.registros = registrosRecuperados;
        } else {
          // Se os dados não forem um array, inicializa um array vazio
          console.error(
            'Os dados no localStorage não são um array de registros.'
          );
          this.registros = [];
        }
      } catch (error) {
        console.error('Erro ao recuperar registros do localStorage:', error);
        this.registros = [];
      }
    } else {
      this.registros = []; // Se não houver nada no localStorage, inicializa vazio
    }
  }
}
