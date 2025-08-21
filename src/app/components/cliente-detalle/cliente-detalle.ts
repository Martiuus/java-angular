import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cliente } from '../../models/cliente.model';
import { Cuenta } from '../../models/cuenta.model';
import { ClienteService } from '../../services/cliente.service';
import { CuentaService } from '../../services/cuenta.service';
import { TransferenciaFormComponent } from '../transferencia-form/transferencia-form';

@Component({
  selector: 'app-cliente-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, TransferenciaFormComponent],
  templateUrl: './cliente-detalle.html', // Corregido para que no tenga .component
  styleUrls: ['./cliente-detalle.css'] // Corregido para que no tenga .component
})
export class ClienteDetalleComponent implements OnInit {

  cliente: Cliente | null = null;
  cuentas: Cuenta[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private cuentaService: CuentaService
  ) {}

  ngOnInit(): void {
    // Obtenemos el 'id' de los parámetros de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const clienteId = +id; // Convertimos el id de string a number
      this.cargarDatosCliente(clienteId);
    }
  }

  cargarDatosCliente(id: number): void {
    this.isLoading = true;
    // Buscamos la información del cliente
    this.clienteService.getClienteById(id).subscribe(clienteData => {
      this.cliente = clienteData;

      // Una vez que tenemos el cliente, buscamos sus cuentas
      this.cuentaService.getCuentasByClienteId(id).subscribe(cuentasData => {
        this.cuentas = cuentasData;
        this.isLoading = false; // Terminamos de cargar
      });
    });
  }
}
