import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  formulario: FormGroup;

  constructor(readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group(
      {
        login: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.email])
        ),
        senha: new FormControl('', Validators.required),
        confirmSenha: new FormControl('', Validators.required),
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Validador customizado para confirmar se as senhas são iguais
  passwordMatchValidator(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmSenha = group.get('confirmSenha')?.value;
    return senha === confirmSenha ? null : { mismatch: true };
  }

  cadastrar() {
    if (this.formulario.valid) {
      console.log('### Formulário Cadastro => ', this.formulario.value);
    }
  }
}
