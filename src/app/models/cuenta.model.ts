// src/app/models/cuenta.model.ts

import { Cliente } from "./cliente.model";

/**
 * Interfaz que define la estructura de un objeto Cuenta.
 */
export interface Cuenta {
    id: number;
    numeroCuenta: string;
    tipoCuenta: string;
    saldo: number;
    cliente: Cliente; // Un objeto Cuenta contiene la información de su Cliente asociado.
}
