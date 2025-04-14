import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empresa } from '../../interface/empresa';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresas-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './empresas-form.component.html',
  styleUrl: './empresas-form.component.css'
})
export class EmpresaFormComponent implements OnInit {
  empresa: Empresa = {
    idEmpresa: 0,
    nombre: '',
    cif: '',
    direccion: '',
    pais: '',
    usuario: {
      email: '',
      nombre: '',
      apellidos: '',
      enabled: 1,
      fecha: new Date(),
      rol: 'EMPRESA',
      password: ''
    }
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public authService: AuthService,
    private empresaService: EmpresaService  //13/04
  ) {}

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    const id = Number(rawId);
  
    if (rawId && !isNaN(id) && id > 0) {
      console.log('[EDITAR EMPRESA] ID de la ruta:', id);
      this.http.get<Empresa>(`http://localhost:8086/empresas/buscar/${id}`)
        .subscribe({
          next: (data) => this.empresa = data,
          error: (err) => {
            console.error('Error al obtener empresa por ID', err);
            alert('No se pudo cargar la empresa por ID.');
          }
        });
    } else {
      const email = this.authService.usuario()?.email;
  
      if (!email) {
        console.warn('[EDITAR EMPRESA] No se encontró email del usuario autenticado');
        return;
      }
  
      console.log('[EDITAR EMPRESA] Buscando empresa por email:', email);
  
      this.empresaService.getEmpresaByEmail(email).subscribe({
        next: (data) => this.empresa = data,
        error: (err) => {
          console.error('Error al obtener empresa por email', err);
          alert('No se pudo cargar la empresa del usuario autenticado.');
        }
      });
    }
  }
  

  guardarCambios(): void {
    const id = this.empresa.idEmpresa;

    const usuarioPayload = {
      email: this.empresa.usuario.email,
      nombre: this.empresa.usuario.nombre,
      apellidos: this.empresa.usuario.apellidos
    };

    const payload = {
      empresa: {
        nombre: this.empresa.nombre,
        cif: this.empresa.cif,
        direccion: this.empresa.direccion,
        pais: this.empresa.pais,
        usuario: usuarioPayload
      },
      usuario: usuarioPayload
    };

    this.http.put(`http://localhost:8086/empresas/editar/${id}`, payload)
      .subscribe({
        next: () => {
          alert('✅ Empresa actualizada');
          const redirectPath = this.authService.isAdmin() ? '/admon' : '/solicitudes';
          this.router.navigate([redirectPath]);
        },
        error: err => {
          console.error('❌ ERROR al actualizar la empresa', err);
          alert('❌ No se pudo actualizar. Revisa tu rol o los datos enviados.');
        }
      });
  }

}  
