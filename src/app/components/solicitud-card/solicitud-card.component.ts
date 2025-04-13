import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../interface/solicitud'; // Ajusta si tu path es diferente
import { SolicitudesService } from '../../services/solicitudes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.css'],
})
export class SolicitudCardComponent {
  @Input() solicitud!: Solicitud;

  constructor(
    private solicitudesService: SolicitudesService,
    private router: Router
  ) {}

  verDetalle() {
    alert(`Detalles de la solicitud #${this.solicitud.idSolicitud}`);
  }

  cancelarSolicitud() {
    const confirmado = confirm('¿Estás seguro de que deseas cancelar esta solicitud?');

    if (confirmado) {
      this.solicitudesService.cancelarSolicitud(this.solicitud.idSolicitud).subscribe({
        next: () => {
          alert('✅ Solicitud cancelada correctamente.');
          // Recargamos la ruta para actualizar la lista
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/solicitudes/usuario']);
          });
        },
        error: (err) => {
          alert('❌ Error al cancelar solicitud: ' + err.error);
        }
      });
    }
  }


}
