import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacantesService } from '../../services/vacante.service';
import { Vacante } from '../../interface/vacante';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vacantes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vacantes-list.component.html',
  styleUrl: './vacantes-list.component.css'
})
export class VacantesListComponent implements OnInit {

  private vacantesService = inject(VacantesService);
  vacantes: Vacante[] = [];

  constructor(public authService: AuthService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const tieneFiltros =
          params['nombre'] || params['categoria'] || params['pais'] || params['fechaDesde'] || params['salarioMin'];
    
        if (tieneFiltros) {
          const filtros = {
            nombre: params['nombre'] || '',
            categoria: params['categoria'] || '',
            pais: params['pais'] || '',
            fecha: params['fechaDesde'] || '',
            salario: params['salarioMin'] ? parseFloat(params['salarioMin']) : undefined
          };
    
          this.vacantesService.buscarVacantes(filtros).subscribe({
            next: (res) => {
              this.vacantes = this.authService.isCliente()
                ? res.filter(v => v.estatus === 'CREADA')
                : res;
            },
            error: (err) => console.error('❌ Error al filtrar vacantes:', err)
          });
        } else {
          this.vacantesService.obtenerTodas().subscribe({
            next: (res) => {
              this.vacantes = this.authService.isCliente()
                ? res.filter(v => v.estatus === 'CREADA')
                : res;
            },
            error: (err) => console.error('❌ Error al obtener vacantes:', err)
          });
        }
      });
    }
    
  eliminarVacante(id: number) {
    const confirmar = confirm(`¿Seguro que deseas eliminar la vacante con ID ${id}?`);
    if (!confirmar) return;

    this.vacantesService.cancelarVacante(id).subscribe({
      next: () => {
        alert('✅ Vacante eliminada correctamente');
        this.vacantes = this.vacantes.filter(v => v.idVacante !== id); // elimina de la lista local
      },
      error: (err) => {
        console.error('❌ Error al eliminar vacante:', err);
        alert('❌ No se pudo eliminar la vacante');
      }
    });
  }
}
