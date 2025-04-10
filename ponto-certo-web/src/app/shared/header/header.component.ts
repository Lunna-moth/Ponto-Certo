import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(readonly authService: AuthService) {}

  logout() {
    console.log('### Logout');
    this.authService.logout();
  }
}
