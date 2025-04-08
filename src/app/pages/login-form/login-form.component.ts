import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  standalone: true
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
    const usuario = this.authService.loginWithCredentials(email, password); // <-- este devuelve algo
  
    if (usuario) {
      this.router.navigate(['/home']);
    } else {
      this.error = 'Credenciales incorrectas';
    }
  }
  
}
