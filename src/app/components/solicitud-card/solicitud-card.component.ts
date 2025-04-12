import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../interface/solicitud'; // Ajusta si tu path es diferente

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.css'],
})
export class SolicitudCardComponent {
  @Input() solicitud!: Solicitud;

  verDetalle() {
    alert(`Detalles de la solicitud #${this.solicitud.idSolicitud}`);
  }
}
