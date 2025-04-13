import { Categoria } from "./categoria";
import { Empresa } from "./empresa";



export interface Vacante {
  idVacante: number;
  nombre: string;
  descripcion: string;
  fecha: string; // ISO string como "2025-04-01"
  salario: number;
  estatus: 'ACTIVA' | 'INACTIVA' | string; // Enum como string
  destacado: number; // Enum ordinal (0 o 1)
  imagen: string;
  detalles: string;
  nombreEmpresa: string;
  idEmpresa: number;
  idCategoria: number;
  categoria?: Categoria;
  empresa?: Empresa;
}