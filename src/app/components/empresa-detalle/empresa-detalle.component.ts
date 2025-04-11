import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empresa-detalle',
  imports: [CommonModule, RouterModule],
  templateUrl: './empresa-detalle.component.html',
  styleUrl: './empresa-detalle.component.css'
})
export class EmpresaDetalleComponent implements OnInit {
  empresa: any;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.empresaService.getDetalleIdWithObservables(+id).subscribe((data) => {
        this.empresa = data;
      });
    }
  }
}