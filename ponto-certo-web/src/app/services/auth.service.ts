import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('user', JSON.stringify({ username }));
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
