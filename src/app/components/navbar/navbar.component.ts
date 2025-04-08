import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) {
    this.usuario = this.authService.usuario;
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
