import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interface/empresa';
import { EmpresaCardComponent } from '../../components/empresa-card/empresa-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresas-list',
  standalone: true,
  imports: [CommonModule, EmpresaCardComponent],
  templateUrl: './empresas-list.component.html',
  styleUrl: './empresas-list.component.css'
})
export class EmpresasListComponent {

  arrEmpresas: Empresa[];
  empresaService = inject(EmpresaService);

  constructor() {
    this.arrEmpresas = [];
  }

  ngOnInit(): void {
    console.log("paso por aqui");

    this.empresaService.getAllWithObservables().subscribe((data: Empresa[]) => {
      console.log("datos", data);
      this.arrEmpresas = data;
    });
  }

}
