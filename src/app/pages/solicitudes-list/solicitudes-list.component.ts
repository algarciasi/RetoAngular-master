import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud } from '../../interface/solicitud';
import { SolicitudCardComponent } from '../../components/solicitud-card/solicitud-card.component';
import { AuthService } from '../../services/auth.service';


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
  private authService = inject(AuthService);

  /*ngOnInit(): void {
    this.solicitudesService.obtenerTodas().subscribe({
      next: (sols) => this.solicitudes = sols,
      error: (err) => {
        console.error('Error al cargar solicitudes', err);
      }
    });
  }*/

    ngOnInit(): void {
      const usuario = this.authService.usuario();
  
      if (!usuario) {
        console.error('❌ No hay usuario autenticado');
        return;
      }
  
      const email = usuario.email;
      const rol = usuario.rol;
  
      if (rol === 'EMPRESA') {
        this.solicitudesService.obtenerPorEmailEmpresa(email).subscribe({
          next: (sols) => this.solicitudes = sols,
          error: (err) => {
            console.error('❌ Error al obtener solicitudes por email:', err);
          }
        });
      } else {
        console.warn('⚠️ Este listado solo está habilitado para usuarios con rol EMPRESA');
        this.solicitudes = []; // Limpia el listado si no es empresa
      }
    }

}
