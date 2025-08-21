import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente.model';
import { Transferencia } from '../../models/transferencia.model';
import { AuthService } from '../../services/auth';
import { TransferenciaService } from '../../services/transferencia.service';

@Component({
  selector: 'app-historial-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-page.html',
  styleUrls: ['./historial-page.css']
})
export class HistorialPageComponent implements OnInit {

  historial: Transferencia[] = [];
  clienteActual: Cliente | null = null;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private transferenciaService: TransferenciaService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: Cliente | null) => {
      if (user) {
        this.clienteActual = user;
        this.cargarHistorial(user.id);
      }
    });
  }

  cargarHistorial(clienteId: number): void {
    this.isLoading = true;
    this.transferenciaService.getHistorialPorCliente(clienteId).subscribe(data => {
      this.historial = data;
      this.isLoading = false;
    });
  }
}
