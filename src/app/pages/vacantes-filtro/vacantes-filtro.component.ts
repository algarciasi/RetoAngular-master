import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Categoria } from '../../interface/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { VacantesService } from '../../services/vacante.service';
import { Vacante } from '../../interface/vacante';

@Component({
  selector: 'app-vacantes-filtro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vacantes-filtro.component.html',
  styleUrl: './vacantes-filtro.component.css',
})
export class VacantesFiltroComponent {
  volverPath = '/vacantes/todas';
  @Output() filtrar = new EventEmitter<any>();

  filtros = {
    nombre: '',
    categoria: '',
    pais: '',
    fechaDesde: '',
    salarioMin: '',
  };

  categorias: Categoria[] = [];
  paises: string[] = [];
  nombresVacantes: string[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private vacantesService: VacantesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoriaService.obtenerTodas().subscribe({
      next: (data) => {
        this.categorias = data;
        console.log('📂 Categorías cargadas:', data);
      },
      error: (err) => console.error('❌ Error al cargar categorías:', err),
    });
    // Cargar países únicos desde las vacantes
    this.vacantesService.obtenerTodas().subscribe({
      next: (vacantes: Vacante[]) => {
        const paisesUnicos = new Set<string>();
        const nombresUnicos = new Set<string>();
        vacantes.forEach((v) => {
          if (v.empresa?.pais) {
            paisesUnicos.add(v.empresa.pais);
          }
          if (v.nombre) nombresUnicos.add(v.nombre);
        });
        this.paises = Array.from(paisesUnicos);
        console.log('🌍 Países detectados:', this.paises);
        this.nombresVacantes = Array.from(nombresUnicos);
        console.log('📛 Nombres de vacantes detectados:', this.nombresVacantes);

      },
      error: (err) =>
        console.error('❌ Error al cargar vacantes:', err),
    });
  }

    filtro(): void {
      // Redirige a vacantes/listado con filtros en la URL
      this.router.navigate(['/vacantes/todas'], {
        queryParams: this.filtros
      });
    }

    vaciarFiltro(): void {
      this.filtros = {
        nombre: '',
        categoria: '',
        pais: '',
        fechaDesde: '',
        salarioMin: ''
      };
      this.router.navigate(['/vacantes/todas']);
    }
    
}
