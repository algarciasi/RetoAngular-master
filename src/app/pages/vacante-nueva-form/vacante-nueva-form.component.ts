import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VacantesService } from '../../services/vacante.service';
import { Vacante } from '../../interface/vacante';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interface/categoria';

@Component({
  selector: 'app-vacante-nueva-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './vacante-nueva-form.component.html',
  styleUrl: './vacante-nueva-form.component.css',
})
export class VacantesFormComponent implements OnInit {
  form!: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private vacantesService: VacantesService,
    private router: Router,
    private categoriasService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: [this.getFechaActual(), Validators.required],
      salario: ['', [Validators.required, Validators.min(0)]],
      estatus: ['CREADA', Validators.required],
      destacado: ['S', Validators.required],
      idCategoria: [null, Validators.required],
      detalles: ['', Validators.required]
    });

    // Cargamos las categorías desde el backend
    this.categoriasService.obtenerTodas().subscribe({
      next: (data) => {
        console.log('✅ Categorías recibidas desde el back:', data);
        this.categorias = data;
      },
      error: (err) => console.error('❌ Error al cargar categorías', err),
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    console.log('Form Value:', this.form.value);
    console.log('Tiene detalles?', 'detalles' in this.form.value);
    console.log('Valor de detalles:', this.form.value.detalles);


    const formValue = this.form.value;

    // Asegurarse de que idCategoria sea number
    const idCategoria = Number(formValue.idCategoria);
    if (!idCategoria || isNaN(idCategoria)) {
      console.error('Categoría inválida. Valor:', formValue.idCategoria);
      return;
    }

    // Formateado de la fecha a string compatible con backend
    const fechaFormateada = new Date(formValue.fecha).toISOString().split('T')[0];

    const payload: Vacante = {
      ...formValue,
      fecha: fechaFormateada,
      idCategoria: idCategoria,
      idEmpresa: 1,
      idVacante: 0,
      destacado: formValue.destacado,
      imagen: '',
      detalles: formValue.detalles || 'Detalles no especificados',
      nombreEmpresa: ''
    };

    console.log('Payload enviado al backend:', payload);

    this.vacantesService.crearVacante(payload).subscribe({
      next: () => this.router.navigate(['/solicitudes']),
      error: (err) => console.error('❌ Error al crear vacante:', err),
    });
  }

  private getFechaActual(): string {
    const today = new Date();
    // Devuelve la fecha en formato 'YYYY-MM-DD' (para inputs tipo date)
    return today.toISOString().substring(0, 10);
  }


}
