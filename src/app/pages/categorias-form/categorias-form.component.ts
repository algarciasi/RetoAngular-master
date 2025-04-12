import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interface/categoria';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categorias-form',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './categorias-form.component.html',
  styleUrl: './categorias-form.component.css'
})
export class CategoriasFormComponent implements OnInit {
  form!: FormGroup;
  idCategoria!: number;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idCategoria = +id;
      this.categoriaService.obtenerCategoriaPorId(this.idCategoria).subscribe({
        next: (categoria) => {
          this.form.patchValue(categoria);
        },
        error: (err) => console.error('Error cargando categoría', err)
      });
    }
  }

  guardar(): void {
    const categoria: Categoria = {
      id: this.idCategoria,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion
    };
  
    this.categoriaService.actualizarCategoria(categoria).subscribe({
      next: () => this.router.navigate(['/categorias/lista']),
      error: err => console.error('Error al guardar', err)
    });
  }
  

  /*volver(): void {
    this.router.navigate(['/categorias']);
  }*/
}