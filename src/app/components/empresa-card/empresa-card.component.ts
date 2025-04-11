import { Component, Input } from '@angular/core';
import { Empresa } from '../../interface/empresa';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './empresa-card.component.html',
  styleUrl: './empresa-card.component.css'
})
export class EmpresaCardComponent {

  @Input() miEmpresa!: Empresa;

  constructor(private router: Router,
    private empresaService: EmpresaService) {}

   editarEmpresa() {
    this.router.navigate([`/empresas/editar/${this.miEmpresa.idEmpresa}`]);
  }

  eliminarEmpresa() {
    const confirmar = confirm(`¿Seguro que deseas eliminar a ${this.miEmpresa.nombre}?`);
    if (confirmar) {
      this.empresaService.eliminarEmpresa(this.miEmpresa.idEmpresa).subscribe({
        next: () => {
          alert('Empresa eliminada correctamente.');
          // Recarga la vista o redirige
          window.location.reload();
        },
        error: (err) => {
          alert('Error al eliminar la empresa.');
          console.error(err);
        },
      });
    }
  }

}
