import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/models/registro';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit {
  registros: Registro[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.recuperarRegistros();
  }

  recuperarRegistros(): void {
    const usuarioId = localStorage.getItem('usuarioId');

    if (!usuarioId) {
      console.error('Usuário não está logado.');
      this.registros = [];
      return;
    }

    const id = Number(usuarioId);

    this.http
    this.http.get<Registro[]>(`https://ponto-certo-3wj2.onrender.com/api/Ponto/usuario/${id}`)
      .subscribe({
        next: (dados) => {
          this.registros = dados;
        },
        error: (erro) => {
          console.error('Erro ao recuperar registros:', erro);
          this.registros = [];
        },
      });
  }

  formatarTipo(tipo: number): string {
    switch (tipo) {
      case 0: return 'Entrada';
      case 1: return 'Saída';
      default: return 'Desconhecido';
    }
  }
  
}
