import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacante } from '../interface/vacante'; // Asegúrate de tener esta interfaz

@Injectable({
  providedIn: 'root'
})
export class VacantesService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8086/vacantes';

  obtenerTodas(): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(`${this.baseUrl}/todas`);
  }

  cancelarVacante(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cancelar/${id}`);
  }

  crearVacante(vacante: Vacante): Observable<any> {
    return this.http.post(`${this.baseUrl}/nueva`, vacante);
  }
  
  buscarVacantes(filtros: {
    nombre?: string;
    categoria?: string;
    pais?: string;
    fecha?: string;
    salario?: number;
  }): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(`${this.baseUrl}/buscar`, {
      params: {
        ...(filtros.nombre && { nombre: filtros.nombre }),
        ...(filtros.categoria && { categoria: filtros.categoria }),
        ...(filtros.pais && { pais: filtros.pais }),
        ...(filtros.fecha && { fecha: filtros.fecha }),
        ...(filtros.salario != null && { salario: filtros.salario.toString() })
      }
    });
  }


}
