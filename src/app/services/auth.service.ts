import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { Usuario } from '../interface/usuario';
import { Observable, tap, map } from 'rxjs';
import { Router } from '@angular/router'; // Importa el Router

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario = signal<Usuario | null>(null);

  readonly usuario = computed(() => this._usuario());
  readonly isLoggedIn = computed(() => this._usuario() !== null);
  readonly isAdmin = computed(() => this._usuario()?.rol === 'ADMON');

  readonly isEmpresa = computed(() => this._usuario()?.rol === 'EMPRESA');
  readonly idEmpresa = computed(() => this._usuario()?.idEmpresa ?? null);

  readonly isCliente = computed(() => this._usuario()?.rol === 'CLIENTE');

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: Usuario) {
    this._usuario.set(usuario);
  }

  logout() {
    this._usuario.set(null);
    // Elimina las credenciales de localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    // Navega a la página de inicio
    this.router.navigate(['/home']);
  }

  loginPass(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (typeof window !== 'undefined' && typeof window.btoa !== 'undefined') {
      headers = headers.set(
        'Authorization',
        'Basic ' + window.btoa(email + ':' + password)
      );
    } else {
      console.error('btoa is not available in this environment.');
      // Manejar el error adecuadamente (mostrar mensaje al usuario,
      // usar un fallback, lanzar un error, etc.).
      return new Observable((observer) =>
        observer.error('btoa is not available')
      ); // Devolver un observable que emite un error
    }

    return this.http
      .get<any>('http://localhost:8086/auth/login', { headers: headers })
      .pipe(
        tap((response) => {
          console.log('Login exitoso:', response);
          this._usuario.set({
            email: response.username,
            rol: response.rol,
            nombre: response.nombre, // si lo tienes disponible
            idEmpresa: response.idEmpresa
          } as Usuario);
          // Guardar las credenciales en localStorage (¡CUIDADO CON LA SEGURIDAD!)
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          console.log('Credenciales guardadas en localStorage');
        })
      );
  }

  getEmail(): string {
    return this._usuario()?.email || '';
  }
  
}
