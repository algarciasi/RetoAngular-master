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

  eliminarCategoria(id: number) {
    if (confirm('¿Seguro de que quieres eliminar esta categoría?')) {
      this.categoriaService.eliminar(id).subscribe(() => {
        this.categorias = this.categorias.filter(c => c.id !== id);
      });
    }
  }
}
