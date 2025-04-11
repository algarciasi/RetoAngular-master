import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  usuario;
  isLoggedIn;

  constructor(public authService: AuthService, private router: Router,
    private usuarioService: UsuarioService) {
    this.usuario = this.authService.usuario;
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
  }

  bajaUsuario(){
    const email = this.usuario()?.email;
    if (!email) return;

    const confirmar = confirm(`¿Seguro que deseas dar de baja al usuario ${email}?`);
    if (!confirmar) return;

    this.usuarioService.bajaUsuarioWithObservable(email).subscribe({
      next: () => {
        alert('Usuario dado de baja correctamente');
        this.logout(); // 👈 cerramos sesión
      },
      error: (err) => {
        console.error('Error al dar de baja al usuario', err);
        alert('No se pudo dar de baja al usuario');
      }
    });
  }
}
