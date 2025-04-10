import { Component, Input } from '@angular/core';
import { Empresa } from '../../interface/empresa';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empresa-card.component.html',
  styleUrl: './empresa-card.component.css'
})
export class EmpresaCardComponent {

  @Input() miEmpresa!: Empresa;

  constructor(private router: Router) {}

   editarEmpresa() {
    this.router.navigate([`/empresas/editar/${this.miEmpresa.idEmpresa}`]);
  }

  eliminarEmpresa() {
    const confirmar = confirm(`¿Seguro que deseas eliminar a ${this.miEmpresa.nombre}?`);
    if (confirmar) {
      this.router.navigate([`/empresas/eliminar/${this.miEmpresa.idEmpresa}`]);
    }
  }

}
