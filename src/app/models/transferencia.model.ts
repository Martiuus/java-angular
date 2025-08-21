import { Cuenta } from "./cuenta.model";

/**
 * Interfaz que define la estructura de un objeto Transferencia.
 */
export interface Transferencia {
    id: number;
    monto: number;
    fecha: string; // La fecha vendrá como un string en formato ISO
    cuentaOrigen: Cuenta;
    cuentaDestino: Cuenta;
}
