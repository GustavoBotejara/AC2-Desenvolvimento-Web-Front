import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Veiculo } from '../../api/veiculo';
import { VeiculosService } from '../../api/veiculos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
})
export class EditarComponent implements OnInit {
  listaVeiculos: any[] = [];
  inscricao: Subscription = new Subscription();
  veiculoSelecionadoId: any;
  veiculoSelecionado: any;

  constructor(private service: VeiculosService, private router: Router) {}

  ngOnInit(): void {
    this.obterVeiculos();
  }

  obterVeiculos(): void {
    this.inscricao = this.service.obterVeiculos().subscribe((veiculos) => {
      this.listaVeiculos = veiculos;
    });
  }

  onChangeVeiculoSelecionado(event: any): void {
    if (event) {
      this.obterVeiculoPorId(event);
    }
  }

  obterVeiculoPorId(id: any): void {
    this.service.obterVeiculoPorId(id).subscribe((veiculo) => {
      this.veiculoSelecionado = veiculo;
    });
  }

  editarVeiculo(form: NgForm) {
    if (!form.valid) {
      alert('Formulário Inválido');
    }

    let request: Veiculo = {
      id: this.veiculoSelecionadoId,
      modelo: form.value.modelo,
      marca: form.value.marca,
      anoFab: form.value.anoFab,
    };

    this.service.editarVeiculo(request).subscribe(() => {
      alert('Editação realizada com sucesso');
      form.reset();
      this.veiculoSelecionadoId = '';
      this.veiculoSelecionado = null;
    });
  }
}
