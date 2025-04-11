import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpClient = inject(HttpClient);
  private baseUrl : string = 'http://localhost:8086/usuarios';
  insertObservable: any;

  constructor() { }

  registroUsuarioWithObservable(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.baseUrl}/registro`, usuario);
  }

  registroAdminWithObservable(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.baseUrl}/registro-admon`, usuario);
  }
  

  todosUsuariosWithObservable(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/todos`);
  }
  
  bajaUsuarioWithObservable(email: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/baja/${email}`);
  }

  
}
