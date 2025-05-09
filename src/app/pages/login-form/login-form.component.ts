import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.authService.loginPass(email, password).subscribe({
      next: usuario => {
        console.log('Login exitoso:', usuario);

        // Guardar usuario en localStorage para el resto de la app
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redirigir según rol
        switch (usuario.rol) {
          case 'ADMON':
            this.router.navigate(['/admon']);
            break;
          case 'CLIENTE':
            this.router.navigate(['/vacantes/todas']);
            break;
          case 'EMPRESA':
            this.router.navigate(['/solicitudes']);
            break;
          default:
            this.router.navigate(['/home']);
            break;
        }
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }



}
