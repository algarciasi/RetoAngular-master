import { Solicitud } from './solicitud';

export interface SolicitudNuevaDto {
  idVacante: number;
  emailUsuario: string;
  solicitud: Omit<Solicitud, 'idSolicitud' | 'vacante' | 'usuario'>;
}