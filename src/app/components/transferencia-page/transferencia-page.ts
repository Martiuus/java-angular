import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cuenta } from '../../models/cuenta.model';
import { Cliente } from '../../models/cliente.model';
import { CuentaService } from '../../services/cuenta.service';
import { TransferenciaService } from '../../services/transferencia.service';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-transferencia-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transferencia-page.html',
  styleUrls: ['./transferencia-page.css']
})
export class TransferenciaPageComponent implements OnInit {

  cuentasOrigen: Cuenta[] = [];
  todasLasCuentas: Cuenta[] = [];
  transferenciaForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  clienteActual: Cliente | null = null;

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private transferenciaService: TransferenciaService,
    private authService: AuthService
  ) {
    this.transferenciaForm = this.fb.group({
      idCuentaOrigen: ['', Validators.required],
      idCuentaDestino: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: Cliente | null) => {
      if (user) {
        this.clienteActual = user;
        this.cargarCuentasOrigen(user.id);
      }
    });
    this.cargarTodasLasCuentas();
  }

  cargarCuentasOrigen(clienteId: number): void {
    this.cuentaService.getCuentasByClienteId(clienteId).subscribe(data => {
      this.cuentasOrigen = data;
    });
  }

  cargarTodasLasCuentas(): void {
    this.cuentaService.getCuentas().subscribe(data => {
      this.todasLasCuentas = data;
    });
  }

  onSubmit(): void {
    if (this.transferenciaForm.invalid) {
      this.mensajeError = 'Por favor, completa todos los campos correctamente.';
      return;
    }
    if (this.transferenciaForm.value.idCuentaOrigen === this.transferenciaForm.value.idCuentaDestino) {
        this.mensajeError = 'La cuenta de origen y destino no pueden ser la misma.';
        return;
    }

    this.mensajeExito = null;
    this.mensajeError = null;

    this.transferenciaService.realizarTransferencia(this.transferenciaForm.value)
      .subscribe({
        next: () => {
          this.mensajeExito = `Transferencia de S/${this.transferenciaForm.value.monto} realizada con éxito!`;
          this.transferenciaForm.reset();
          if (this.clienteActual) {
            this.cargarCuentasOrigen(this.clienteActual.id);
          }
        },
        error: (err: any) => {
          this.mensajeError = err.error?.message || err.error || 'Ocurrió un error al realizar la transferencia.';
        }
      });
  }
}
