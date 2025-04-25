import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Empresa } from '../../interface/empresa';

@Component({
  selector: 'app-empresa-nueva',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './empresa-nueva.component.html',
  styleUrl: './empresa-nueva.component.css'
})
export class EmpresaNuevaComponent {
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

  constructor(private http: HttpClient, private router: Router) {}

  crearEmpresa(): void {
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

    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (email && password) {
      headers = headers.set('Authorization', 'Basic ' + btoa(`${email}:${password}`));
    }

    //this.http.post(`http://localhost:8086/empresas/nueva`, payload, { headers })
    this.http.post(`https://algarciasi.com/api/empresas/nueva`, payload, { headers })
      .subscribe({
        next: () => {
          alert('Empresa creada correctamente');
          this.router.navigate(['/admon']);
        },
        error: (err) => {
          console.error('Error al crear empresa', err);
          alert('❌ Error al crear la empresa. Revisa los datos.');
        }
      });
  }
}
