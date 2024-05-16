import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { VeiculosService } from '../../api/veiculos.service';
import { Veiculo } from '../../api/veiculo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  listaVeiculos: Veiculo[] = [];
  inscricao: Subscription = new Subscription();
  inscricaoExcluir: Subscription = new Subscription();

  constructor(private service: VeiculosService) {}

  ngOnInit(): void {
    this.obterVeiculos();
  }

  obterVeiculos(): void {
    this.inscricao = this.service.obterVeiculos().subscribe((veiculos) => {
      this.listaVeiculos = veiculos;
    });
  }

  onClickExcluir(veiculo: any): void {
    this.inscricaoExcluir = this.service
      .excluirVeiculo(veiculo._id)
      .subscribe(() => {
        this.obterVeiculos();
      });
  }

  corVeiculo(veiculo: any): string {
    if (veiculo.anoFab < 2010) {
      return 'red';
    } else {
      return 'black';
    }
  }
}
