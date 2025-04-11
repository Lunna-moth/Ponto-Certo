import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { HomeComponent } from './modules/home/home.component';
import { CommonModule } from '@angular/common';
import { HistoricoComponent } from './modules/historico/historico.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RegistroComponent } from './modules/registro/registro.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { MeuPerfilComponent } from './modules/meu-perfil/meu-perfil.component';
import { MinhaEquipeComponent } from './modules/minha-equipe/minha-equipe.component';
import { ConfiguracaoComponent } from './modules/configuracao/configuracao.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    HistoricoComponent,
    RegistroComponent,
    SidebarComponent,
    HeaderComponent,
    MeuPerfilComponent,
    MinhaEquipeComponent,
    ConfiguracaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
