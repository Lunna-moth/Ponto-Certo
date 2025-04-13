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
      const email = this.formulario.get('login')?.value;
      const senha = this.formulario.get('senha')?.value;

      this.authService.login(email, senha).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.router.navigate(['home']);
          } else {
            console.log('Usuário ou senha inválidos!');
          }
        },
        error: (erro) => {
          console.error('Erro de autenticação:', erro);
        },
      })
    }
  }
}
