export interface Solicitud {
  idSolicitud: number;
  fecha: string;
  curriculum: string;
  comentarios: string;
  archivo: string;
  estado: number;

  // directamente como viene del backend:
  nombreVacante: string;
  emailUsuario: string;
}
