import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://ponto-certo-3wj2.onrender.com/api/Usuario';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string): Observable<Usuario | null> {
    const body = { email, senha };
  
    return this.http.post<Usuario>(`${this.apiUrl}/login`, body).pipe(
      tap((usuario) => {
        if (usuario) {
          localStorage.setItem('user', JSON.stringify(usuario));
          localStorage.setItem('usuarioId', usuario.id.toString());
        }
      })
    );
  }
  

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
