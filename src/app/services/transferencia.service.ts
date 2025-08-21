import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transferencia } from '../models/transferencia.model';

// --- INTERFAZ CORREGIDA ---
// Cambiamos idCuentaDestino por numeroCuentaDestino para que coincida con el backend y el formulario.
export interface TransferenciaRequest {
  idCuentaOrigen: number;
  numeroCuentaDestino: string;
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  private apiUrl = 'http://localhost:8080/api/transferencias';

  constructor(private http: HttpClient) { }

  realizarTransferencia(request: TransferenciaRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }

  getHistorialPorCliente(clienteId: number): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }
}
