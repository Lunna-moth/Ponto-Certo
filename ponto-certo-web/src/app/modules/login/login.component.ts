import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

  constructor(readonly formBuilder: FormBuilder, readonly router: Router) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.formulario.valid) {
      this.router.navigate(['home']);
    }
  }
}
