// src/app/models/cliente.model.ts

/**
 * Interfaz que define la estructura de un objeto Cliente.
 * Debe coincidir con la entidad Cliente del backend.
 */
export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}
