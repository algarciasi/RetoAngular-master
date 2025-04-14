import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interface/categoria';

@Component({
  selector: 'app-categorias-alta-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './categorias-alta-form.component.html',
  styleUrl: './categorias-alta-form.component.css'
})
export class AltaCategoriaComponent {
  categoria: Categoria = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  crearCategoria(): void {
    this.categoriaService.crearCategoria(this.categoria).subscribe({
      next: () => {
        alert('✅ Categoría creada correctamente');
        this.router.navigate(['/categorias/lista']);
      },
      error: (err) => {
        alert('❌ Error al crear la categoría');
        console.error(err);
      }
    });
  }
}
