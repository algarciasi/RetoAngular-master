import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../interface/empresa';


@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8086/empresas';
  insertObservable: any;

  constructor() {}

  /*getAllWithObservables(): Observable<Empresa[]>{
    return this.httpClient.get<Empresa[]>(`${this.baseUrl}/todas`);
  }*/

  getAllWithObservables(): Observable<Empresa[]> {
    // Recuperar las credenciales de localStorage (¡CUIDADO CON LA SEGURIDAD!)
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (
      email &&
      password &&
      typeof window !== 'undefined' &&
      typeof window.btoa !== 'undefined'
    ) {
      headers = headers.set(
        'Authorization',
        'Basic ' + window.btoa(email + ':' + password)
      );
    } else {
      console.error(
        'No se encontraron las credenciales o btoa no está disponible.'
      );
      // Manejar el error adecuadamente
      return new Observable((observer) =>
        observer.error('No se encontraron las credenciales')
      );
    }

    return this.httpClient.get<Empresa[]>(`${this.baseUrl}/todas`, {
      headers: headers,
    });
  }

  getDetalleIdWithObservables(id: number): Observable<Empresa> {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    if (
      email &&
      password &&
      typeof window !== 'undefined' &&
      typeof window.btoa !== 'undefined'
    ) {
      headers = headers.set(
        'Authorization',
        'Basic ' + window.btoa(email + ':' + password)
      );
    } else {
      console.error(
        'No se encontraron las credenciales o btoa no está disponible.'
      );
      return new Observable((observer) =>
        observer.error('No se encontraron las credenciales')
      );
    }
  
    return this.httpClient.get<Empresa>(`${this.baseUrl}/buscar/${id}`, {
      headers: headers,
    });
  }
  
  eliminarEmpresa(id: number): Observable<void> {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    if (email && password && typeof window !== 'undefined' && typeof window.btoa !== 'undefined') {
      headers = headers.set('Authorization', 'Basic ' + window.btoa(email + ':' + password));
    } else {
      console.error('No se encontraron las credenciales o btoa no está disponible.');
      return new Observable((observer) =>
        observer.error('No se encontraron las credenciales')
      );
    }
  
    return this.httpClient.delete<void>(`http://localhost:8086/empresas/eliminar/${id}`, {
      headers,
    });
  }
  

  getEmpresaByEmail(email: string): Observable<Empresa> {
    const password = localStorage.getItem('password');
  
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    if (email && password) {
      headers = headers.set(
        'Authorization',
        'Basic ' + window.btoa(email + ':' + password)
      );
    } else {
      return new Observable((observer) =>
        observer.error('Credenciales no encontradas')
      );
    }
  
    return this.httpClient.get<Empresa>(`${this.baseUrl}/buscar-por-email/${email}`, {
      headers
    });
  }
  
  
}
