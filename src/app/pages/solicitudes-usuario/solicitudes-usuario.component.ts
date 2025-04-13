import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SolicitudCardComponent } from '../../components/solicitud-card/solicitud-card.component';
import { Solicitud } from '../../interface/solicitud';
import { SolicitudesService } from '../../services/solicitudes.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitudes-usuario',
  standalone: true,
  imports: [CommonModule, SolicitudCardComponent, RouterModule],
  templateUrl: './solicitudes-usuario.component.html',
  styleUrl: './solicitudes-usuario.component.css'
})
export class SolicitudesUsuarioComponent implements OnInit {
  private solicitudesService = inject(SolicitudesService);
  private authService = inject(AuthService);

  solicitudes: Solicitud[] = [];

  ngOnInit(): void {
    const email = this.authService.usuario()?.email;

    if (email) {
      this.solicitudesService.obtenerPorEmail(email).subscribe({
        next: (data) => {
          this.solicitudes = data;
          console.log('📄 Solicitudes del usuario:', data);
        },
        error: (err) => console.error('❌ Error al obtener solicitudes del usuario', err)
      });
    }
  }
}
