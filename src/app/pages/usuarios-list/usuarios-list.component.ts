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

  campoOrden: keyof Usuario = 'email';
  ascendente: boolean = true;

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
        alert('✅ Usuario eliminado correctamente');
        this.usuarios = this.usuarios.filter(u => u.email !== email); // actualizar lista
      },
      error: err => {
        console.error('❌ Error al eliminar usuario', err);
        alert('❌ No se pudo eliminar el usuario');
      }
    });
  }

  ordenarPor(campo: keyof Usuario) {
    if (this.campoOrden === campo) {
      this.ascendente = !this.ascendente; // alterna asc/desc
    } else {
      this.campoOrden = campo;
      this.ascendente = true; // nuevo campo: reset a ascendente
    }

    this.ordenarLista();
  }

  private ordenarLista() {
    this.usuarios.sort((a, b) => {
      const valorA = (a[this.campoOrden] ?? '').toString().toLowerCase();
      const valorB = (b[this.campoOrden] ?? '').toString().toLowerCase();

      if (valorA < valorB) return this.ascendente ? -1 : 1;
      if (valorA > valorB) return this.ascendente ? 1 : -1;
      return 0;
    });
  }

}
