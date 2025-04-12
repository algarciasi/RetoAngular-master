import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud } from '../../interface/solicitud';
import { SolicitudCardComponent } from '../../components/solicitud-card/solicitud-card.component';


@Component({
  selector: 'app-solicitudes-list',
  standalone:true,
  imports: [CommonModule, SolicitudCardComponent],
  templateUrl: './solicitudes-list.component.html',
  styleUrl: './solicitudes-list.component.css'
})
export class SolicitudesListComponent implements OnInit {
  private solicitudesService = inject(SolicitudesService);
  solicitudes: Solicitud[] = [];

  ngOnInit(): void {
    this.solicitudesService.obtenerTodas().subscribe({
      next: (sols) => this.solicitudes = sols,
      error: (err) => {
        console.error('Error al cargar solicitudes', err);
      }
    });
  }
}
