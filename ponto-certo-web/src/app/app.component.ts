import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ponto-certo-web';
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Página Inicial',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Registrar Ponto',
        icon: 'pi pi-pen-to-square',
        routerLink: ['/registro'],
      },
      {
        label: 'Histórico',
        icon: 'pi pi-book',
        routerLink: ['/historico'],
      },
      { label: 'Sair', icon: 'pi pi-sign-out', command: () => this.logout() },
    ];
  }

  logout() {
    console.log('### Logout');
  }
}
