import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(usuario: Usuario): boolean {
    if (usuario.login === 'admin' && usuario.senha === '1234') {
      localStorage.setItem('user', JSON.stringify(usuario));
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
