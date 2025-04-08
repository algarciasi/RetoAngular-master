import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interface/empresa';
import { EmpresaCardComponent } from '../../components/empresa-card/empresa-card.component';

@Component({
  selector: 'app-empresas-list',
  standalone: true,
  imports: [EmpresaCardComponent],
  templateUrl: './empresas-list.component.html',
  styleUrl: './empresas-list.component.css'
})
export class EmpresasListComponent{

  arrEmpresas: Empresa[];
  empresaService = inject(EmpresaService);

  constructor(){
    this.arrEmpresas =[];
  }

  /*ngOnInit() {
    this.empresaService.getAllWithObservables().subscribe({
      next: (data) => {
        this.arrEmpresas = data;
        console.log('Empresas cargadas:', this.arrEmpresas);
      },
      error: (err) => {
        console.error('Error al cargar empresas:', err);
      }
    });
  }*/

    ngOnInit(): void{
      console.log("paso por aqui");
        /*this.empresaService.getAllWithObservables().pipe(Array =>{
          Array.filter
        })*/
        
        this.empresaService.getAllWithObservables().subscribe((data: Empresa[]) => {
        console.log("datos", data);
        this.arrEmpresas = data;
      });
    }

}
