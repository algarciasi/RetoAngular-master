import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { Usuario } from '../interface/usuario';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario = signal<Usuario | null>(null);

  readonly usuario = computed(() => this._usuario());
  isLoggedIn = computed(() => this._usuario() !== null);

  constructor(private http: HttpClient) {}

  login(usuario: Usuario) {
    this._usuario.set(usuario);
  }

  logout() {
    this._usuario.set(null);
  }

  loginPass(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (typeof window !== 'undefined' && typeof window.btoa !== 'undefined') {
      headers = headers.set('Authorization', 'Basic ' + window.btoa(email + ':' + password));
    } else {
      console.error('btoa is not available in this environment.');
      // Manejar el error adecuadamente (mostrar mensaje al usuario,
      // usar un fallback, lanzar un error, etc.).
      return new Observable(observer => observer.error('btoa is not available')); // Devolver un observable que emite un error
    }

    return this.http.get<any>(
      'http://localhost:8086/auth/login',
      { headers: headers }
    ).pipe(
      tap(response => {
        console.log("Login exitoso:", response);
        this._usuario.set({ email: email } as Usuario);
      })
    );
  }
}