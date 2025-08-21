import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Cliente } from '../../models/cliente.model';
import { Cuenta } from '../../models/cuenta.model';
import { AuthService } from '../../services/auth';
import { CuentaService } from '../../services/cuenta.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  cliente: Cliente | null = null;
  cuentas: Cuenta[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private cuentaService: CuentaService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: Cliente | null) => {
      this.cliente = user;
      if (user) {
        this.cargarCuentas(user.id);
      }
    });
  }

  cargarCuentas(clienteId: number): void {
    this.isLoading = true;
    this.cuentaService.getCuentasByClienteId(clienteId).subscribe(data => {
      this.cuentas = data;
      this.isLoading = false;
    });
  }
}
