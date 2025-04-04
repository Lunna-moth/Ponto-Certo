import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

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
      var username = this.formulario.get('login')?.value;
      var password = this.formulario.get('senha')?.value;

      if (this.authService.login(username, password)) {
        this.router.navigate(['home']);
      } else {
        console.log('Usuário ou senha inválidos!');
      }
    }
  }
}
