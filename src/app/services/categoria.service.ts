import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interface/categoria';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:8086/categorias';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/todas`);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  obtenerCategoriaPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/buscar/${id}`);
  }
  
  actualizarCategoria(categoria: Categoria): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${categoria.id}`, categoria);
  }

  crearCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(`${this.apiUrl}/nueva`, categoria);
  }

}
