import { HttpClient } from '@angular/common/http';
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

  loginPass(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(
      'http://localhost:8086/auth/login',
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(usuario => this._usuario.set(usuario))
    );
  }
  
}
