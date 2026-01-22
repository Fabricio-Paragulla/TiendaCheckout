export interface Direccion {
    nombre: string;
    nif: string;
    email: string;
    telefono: string;
    calle: string;
    codigoPostal: string;
    ciudad: string;
    provincia: string;
    pais: string;
}

export interface DatosEnvio extends Direccion {
    instrucciones?: string;
}