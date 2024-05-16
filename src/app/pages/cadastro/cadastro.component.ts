import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { VeiculosService } from '../../api/veiculos.service';
import { Veiculo } from '../../api/veiculo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  constructor(private service: VeiculosService, private router: Router) {}

  cadastrarVeiculo(form: NgForm): void {
    if (!form.valid) {
      alert('Formulario Invalido');
      return;
    }

    let request: Veiculo = {
      id: '',
      modelo: form.value.modelo,
      marca: form.value.marca,
      anoFab: form.value.anoFab,
    };

    this.service.cadastrarVeiculo(request).subscribe(() => {
      alert('Veiculo cadastrado com sucesso');
      form.reset();
    });
  }
}
