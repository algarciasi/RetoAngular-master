import { Component, Input } from '@angular/core';
import { Empresa } from '../../interface/empresa';

@Component({
  selector: 'app-empresa-card',
  imports: [],
  templateUrl: './empresa-card.component.html',
  styleUrl: './empresa-card.component.css'
})
export class EmpresaCardComponent {

  @Input() miEmpresa!: Empresa;

}
