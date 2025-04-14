import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../interface/solicitud'; // Ajusta si tu path es diferente
import { SolicitudesService } from '../../services/solicitudes.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private router: Router,
    public authService: AuthService
  ) { }

  verDetalle() {
    const estado = String(this.solicitud.estado); // casteo de number a string

    if (estado === '1') {
      alert(`🎉 ¡Has sido seleccionado para esta vacante!\n\n ${this.solicitud.nombreVacante}`);
    } else {
      alert(`☹️ De momento no hay respuesta de la empresa`);
    }
  }



  cancelarSolicitud() {
    const confirmado = confirm('¿Estás seguro de que deseas cancelar esta solicitud?');

    if (confirmado) {
      this.solicitudesService.cancelarSolicitud(this.solicitud.idSolicitud).subscribe({
        next: () => {
          alert('✅ Solicitud cancelada correctamente.');

          const destino = this.authService.isEmpresa() ? '/solicitudes' : '/solicitudes/usuario';

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([destino]);
          });
        },
        error: (err) => {
          alert('❌ Error al cancelar solicitud: ' + err.error);
        }
      });
    }
  }

  asignarVacante() {
    const confirmado = confirm(`¿Deseas asignar esta vacante a este candidato?`);

    if (!confirmado) return;

    this.solicitudesService.asignarVacante(this.solicitud.idSolicitud).subscribe({
      next: () => {
        alert('✅ Vacante asignada correctamente.');
        this.router.navigate(['/solicitudes']);
      },
      error: (err) => {
        alert('❌ Error al asignar vacante: ' + err.error);
      }
    });
  }




}
