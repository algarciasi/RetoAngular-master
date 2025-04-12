import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interface/categoria';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categorias-list.component.html',
  styleUrl: './categorias-list.component.css'
})
export class CategoriasListComponent {
  categoriaService = inject(CategoriaService);
  categorias: Categoria[] = [];

  ngOnInit() {
    this.categoriaService.obtenerTodas().subscribe((data) => {
      this.categorias = data;
    });
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro que deseas eliminar esta categoría?')) {
      this.categoriaService.eliminar(id).subscribe({
        next: () => {
          // Eliminamos de la lista actual sin recargar
          this.categorias = this.categorias.filter(c => c.id !== id);
          alert('Categoría eliminada correctamente.');
        },
        error: (err) => {
          if (err.status === 409) {
            alert('No se puede eliminar: la categoría tiene vacantes asociadas.');
          } else {
            alert('Error inesperado al eliminar la categoría.');
            console.error(err);
          }
        }
      });
    }
  }
  
}
