import { Usuario } from "./usuario";

export interface Empresa {

    idEmpresa: number;
    cif: string;
    nombre: string;
    direccion: string;
    pais: string;
    usuario: Usuario;

}
