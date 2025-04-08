import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../interface/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  httpClient = inject(HttpClient);
  private baseUrl : string = 'http://localhost:8086/empresas';
  insertObservable: any;

  constructor() { }

  getAllWithObservables(): Observable<Empresa[]>{
    return this.httpClient.get<Empresa[]>(`${this.baseUrl}/todas`);
  }

  /*getByIdWithObservable(_id: string): Observable<Empresa>{
    return this.httpClient.get<Empresa>(`${this.baseUrl}/${_id}`);
  }

  borrar(_id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${_id}`);
  }*/
}
