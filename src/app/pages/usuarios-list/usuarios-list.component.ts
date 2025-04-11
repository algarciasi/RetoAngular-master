import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interface/usuario';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.todosUsuariosWithObservable().subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminarUsuario(email: string) {
    const confirmar = confirm(`¿Estás seguro que deseas eliminar el usuario: ${email}?`);
    if (!confirmar) return;

    this.usuarioService.bajaUsuarioWithObservable(email).subscribe({
      next: () => {
        alert('Usuario eliminado correctamente');
        this.usuarios = this.usuarios.filter(u => u.email !== email); // actualizar lista
      },
      error: err => {
        console.error('Error al eliminar usuario', err);
        alert('No se pudo eliminar el usuario');
      }
    });
  }

}
