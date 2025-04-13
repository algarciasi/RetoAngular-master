import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolicitudNuevaDto } from '../../interface/solicitud-dto';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './solicitud-form.component.html',
  styleUrl: './solicitud-form.component.css'
})
export class SolicitudFormComponent implements OnInit {

  idVacante!: number;
  comentarios: string = '';
  curriculum: string = '';
  archivoBase64: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private solicitudService: SolicitudesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.idVacante = id ? +id : 0;
  }

  enviarSolicitud(): void {
    const usuario = this.authService.usuario();
  
    if (!usuario || !usuario.email) {
      alert('Usuario no autenticado');
      return;
    }
  
    const payload: SolicitudNuevaDto = {
      idVacante: this.idVacante,
      emailUsuario: usuario.email,
      solicitud: {
        comentarios: this.comentarios,
        curriculum: this.curriculum,
        archivo: this.archivoBase64 ?? '',
        fecha: '',
        estado: 0,
        nombreVacante: '',
        emailUsuario: ''
      }
    };
    
  
    this.solicitudService.crear(payload).subscribe({
      next: () => {
        alert('Solicitud enviada con éxito');
        this.router.navigate(['/vacantes/todas']);
      },
      error: (err) => {
        console.error('Error al enviar solicitud:', err);
        alert('No se pudo enviar la solicitud');
      }
    });
  }
  


  subirArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.archivoBase64 = reader.result?.toString().split(',')[1] ?? null;
      };
      reader.readAsDataURL(file);
    }
  }
}
