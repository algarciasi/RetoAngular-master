import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


}
