import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../interface/solicitud';
import { SolicitudNuevaDto } from '../interface/solicitud-dto';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private http = inject(HttpClient);
  //private apiUrl = 'http://localhost:8086/solicitudes';
  //private apiUrl : string = 'https://algarciasi.com/api/solicitudes';
  private apiUrl: string = `${environment.apiBaseUrl}/solicitudes`;

  // GET /solicitudes/todas
  obtenerTodas(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/todas`);
  }

  // POST /solicitudes/nueva
  crear(solicitud: SolicitudNuevaDto): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.apiUrl}/nueva`, solicitud);
  }

  // GET /solicitudes/usuario?email=...
  obtenerPorEmail(email: string): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/usuario?email=${email}`);
  }

  // DELETE /usuarios/cancelar/{idSolicitud}
  cancelarSolicitud(idSolicitud: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/cancelar/${idSolicitud}`, {
      responseType: 'text'
    });
  }

  // PUT asignar vacante del endpoint de empresa "cagada"
  asignarVacante(idSolicitud: number) {
    return this.http.put(`https://algarciasi.com/api/empresas/asignar/${idSolicitud}`, null, {
      responseType: 'text'
    });
  }

  // GET /solicitudes/empresa?email=...
  obtenerPorEmailEmpresa(email: string): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/empresa?email=${email}`);
  }


}
