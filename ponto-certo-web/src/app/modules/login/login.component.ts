import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  usuario: Usuario = new Usuario();

  constructor(
    readonly authService: AuthService,
    readonly formBuilder: FormBuilder,
    readonly router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.formulario.valid) {
      this.usuario.login = this.formulario.get('login')?.value;
      this.usuario.senha = this.formulario.get('senha')?.value;

      if (this.authService.login(this.usuario)) {
        this.router.navigate(['home']);
      } else {
        console.log('Usuário ou senha inválidos!');
      }
    }
  }
}
