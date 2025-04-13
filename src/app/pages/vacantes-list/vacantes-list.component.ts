import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacantesService } from '../../services/vacante.service';
import { Vacante } from '../../interface/vacante';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VacantesFiltroComponent } from "../vacantes-filtro/vacantes-filtro.component";

@Component({
  selector: 'app-vacantes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, VacantesFiltroComponent],
  templateUrl: './vacantes-list.component.html',
  styleUrl: './vacantes-list.component.css'
})
export class VacantesListComponent implements OnInit {

  private vacantesService = inject(VacantesService);
  vacantes: Vacante[] = [];

  constructor(public authService: AuthService,
    private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.vacantesService.obtenerTodas().subscribe({
      next: (res) =>{
        if (this.authService.isCliente()) {
          this.vacantes = res.filter(v => v.estatus === 'CREADA');
        } else {
          this.vacantes = res;
        }
      },
      error: (err) => console.error('Error al obtener vacantes:', err)
    });
  }

 
  eliminarVacante(id: number) {
    const confirmar = confirm(`¿Seguro que deseas eliminar la vacante con ID ${id}?`);
    if (!confirmar) return;

    this.vacantesService.cancelarVacante(id).subscribe({
      next: () => {
        alert('Vacante eliminada correctamente');
        this.vacantes = this.vacantes.filter(v => v.idVacante !== id); // elimina de la lista local
      },
      error: (err) => {
        console.error('Error al eliminar vacante:', err);
        alert('No se pudo eliminar la vacante');
      }
    });
  }


  
}
