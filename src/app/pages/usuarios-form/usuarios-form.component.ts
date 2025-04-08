import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interface/usuario';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.css'
})
export class UsuariosFormComponent {

  router = inject(Router);
  usuariosService = inject(UsuarioService);
  activatedRoute = inject(ActivatedRoute);

  usuariosForm : FormGroup;
  tipo: string = "Insertar";
  miUsuario: Usuario | null = null;
  
  constructor() {
    this.usuariosForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rol: new FormControl({ value: 'CLIENTE', disabled: true }, [Validators.required]),
      enabled: new FormControl({ value: 1, disabled: true })
    });
  }

  ngOnInit(): void {
    // cargar el usuario y modificar el formulario
  }

  getDataForm(): void {
    if (this.usuariosForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    let fechaActual = new Date();
    let fechaFormateada = fechaActual.toISOString().split('T')[0];

    let nuevoUsuario: Usuario = {
      ...this.usuariosForm.getRawValue(), // enviar al back con valores fijos y visibles
      fecha: fechaFormateada
    };

    this.usuariosService.registroUsuarioWithObservable(nuevoUsuario).subscribe({
      next: (response: Usuario) => {
        alert('Usuario creado correctamente: ' + response.nombre);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al crear el usuario:', err);
        alert('Hubo un error al intentar crear el usuario.');
      }
    });
  }



}
