export interface Usuario {

      email: string;
      nombre: string;
      apellidos: string;
      password: string;
      enabled: number;
      fecha: Date;
      rol: string;

      idEmpresa?: number;
    

}
