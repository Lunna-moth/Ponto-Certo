import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from 'src/app/models/registro';  // Aqui você deve importar a model correta

@Injectable({
  providedIn: 'root',
})
export class PontoService {
  private apiUrl = 'https://ponto-certo-3wj2.onrender.com/api/Ponto';  // URL da sua API

  constructor(private http: HttpClient) {}

  // Método para registrar o ponto
  registrarPonto(ponto: Registro): Observable<Registro> {
    return this.http.post<Registro>(this.apiUrl, ponto);  // Envia o ponto para a API
  }
}
