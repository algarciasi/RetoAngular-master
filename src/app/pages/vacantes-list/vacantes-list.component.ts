import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-vacantes-list',
  imports: [CommonModule],
  templateUrl: './vacantes-list.component.html',
  styleUrl: './vacantes-list.component.css'
})
export class VacantesListComponent implements OnInit {

  public vacantes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8086/vacantes/todas')
      .subscribe({
        next: data => {
          this.vacantes = data;
          console.log('Vacantes cargadas:', this.vacantes);
        },
        error: err => {
          console.error('Error cargando vacantes', err);
        }
      });
  }
}
