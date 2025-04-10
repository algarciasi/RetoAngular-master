import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empresa } from '../../interface/empresa';
import { HttpClient } from '@angular/common/http';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Empresa>(`http://localhost:8086/empresas/buscar/${id}`)
      .subscribe(data => this.empresa = data);
  }

  guardarCambios(): void {
    const id = this.empresa.idEmpresa;
  
    // Limpiamos campos que el backend no necesita o no puede procesar
    const usuarioPayload = {
      email: this.empresa.usuario.email,
      nombre: this.empresa.usuario.nombre,
      apellidos: this.empresa.usuario.apellidos
      // ⚠️ No enviamos password ni fecha
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
          alert('Empresa actualizada');
          this.router.navigate(['/admon']);
        },
        error: err => {
          console.error('ERROR al actualizar la empresa', err);
          alert('No se pudo actualizar. Revisa tu rol o los datos enviados.');
        }
      });
  }

}  
