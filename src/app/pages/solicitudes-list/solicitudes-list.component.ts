import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitudes-list',
  imports: [CommonModule ],
  templateUrl: './solicitudes-list.component.html',
  styleUrl: './solicitudes-list.component.css'
})
export class SolicitudesListComponent {
  solicitudes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8086/solicitudes/todas').subscribe({
      next: (data) => {
        this.solicitudes = data;
        console.log('Solicitudes cargadas:', data);
      },
      error: (error) => {
        console.error('Error al cargar solicitudes', error);
      }
    });
  }
}
