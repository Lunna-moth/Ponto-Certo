import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

  constructor(readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.formulario.valid) {
      console.log('### Formulário => ', this.formulario.value);
    } else {
      console.log('### Formulário Inválido');
    }
  }
}
