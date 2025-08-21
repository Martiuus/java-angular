// src/app/services/cuenta.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuenta } from '../models/cuenta.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiUrl = 'http://localhost:8080/api/cuentas';

  constructor(private http: HttpClient) { }

  // Obtener todas las cuentas
  getCuentas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.apiUrl);
  }

  // Obtener las cuentas de un cliente específico
  getCuentasByClienteId(clienteId: number): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  // Crear una nueva cuenta
  crearCuenta(cuenta: Omit<Cuenta, 'id' | 'cliente'> & { clienteId: number }): Observable<Cuenta> {
    // El backend espera un objeto Cuenta completo, pero desde el front solo necesitamos enviar el ID del cliente.
    // El DTO en el backend se encargará de asociarlo correctamente.
    const payload = {
      ...cuenta,
      cliente: { id: cuenta.clienteId }
    };
    return this.http.post<Cuenta>(this.apiUrl, payload);
  }
}
