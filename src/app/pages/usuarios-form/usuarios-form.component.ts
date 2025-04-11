import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interface/usuario';
import { AuthService } from '../../services/auth.service';


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
  authService = inject(AuthService);


  usuariosForm : FormGroup;
  tipo: string = "Insertar";
  miUsuario: Usuario | null = null;
  volverPath: string;
  
  constructor() {
    this.usuariosForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]), // inicializa vacío
      enabled: new FormControl({ value: 1, disabled: true })
    });
  
    // Verificamos si es un ADMON logueado
    const user = this.authService.usuario();
    const esAdmon = user && user.rol === 'ADMON';
  
    const rol = esAdmon ? 'ADMON' : 'CLIENTE';
  
    this.usuariosForm.get('rol')?.setValue(rol);
    this.usuariosForm.get('rol')?.disable(); // seguir deshabilitado para seguridad visual

    this.volverPath = esAdmon ? '/admon' : '/home'; // si es ADMON vuelve a la pagina /admon sino al /home
  }

  ngOnInit(): void {
  }

  getDataForm(): void {
    if (this.usuariosForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
  
    let fechaActual = new Date();
    let fechaFormateada = fechaActual.toISOString().split('T')[0];
  
    // getRawValue porque el campo 'rol' está deshabilitado
    let nuevoUsuario: Usuario = {
      ...this.usuariosForm.getRawValue(),
      fecha: fechaFormateada
    };
  
    const user = this.authService.usuario(); // Usuario logueado
    const esAdmon = user && user.rol === 'ADMON';
  
    const registro$ = esAdmon
      ? this.usuariosService.registroAdminWithObservable(nuevoUsuario) // Usa el endpoint especial
      : this.usuariosService.registroUsuarioWithObservable(nuevoUsuario); // Usa el normal
  
    registro$.subscribe({
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
