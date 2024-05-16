import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Veiculo } from './veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculosService {
  url: string = 'http://localhost:3000/veiculos';

  constructor(private http: HttpClient) {}

  obterVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.url}`);
  }

  obterVeiculoPorId(id: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.url}/${id}`);
  }

  cadastrarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(`${this.url}/`, veiculo);
  }

  editarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.patch<Veiculo>(`${this.url}/${veiculo.id}`, veiculo);
  }

  excluirVeiculo(id: string): Observable<Veiculo> {
    return this.http.delete<Veiculo>(`${this.url}/${id}`);
  }
}
