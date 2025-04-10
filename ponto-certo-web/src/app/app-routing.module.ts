import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { HomeComponent } from './modules/home/home.component';
import { HistoricoComponent } from './modules/historico/historico.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { MeuPerfilComponent } from './modules/meu-perfil/meu-perfil.component';
import { MinhaEquipeComponent } from './modules/minha-equipe/minha-equipe.component';
import { ConfiguracaoComponent } from './modules/configuracao/configuracao.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard] },
  {
    path: 'meu-perfil',
    component: MeuPerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'historico',
    component: HistoricoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'minha-equipe',
    component: MinhaEquipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracao',
    component: ConfiguracaoComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
