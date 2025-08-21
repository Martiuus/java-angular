import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cuenta } from '../../models/cuenta.model';
import { CuentaService } from '../../services/cuenta.service';
import { TransferenciaService } from '../../services/transferencia.service';

@Component({
  selector: 'app-transferencia-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importamos ReactiveFormsModule
  templateUrl: './transferencia-form.html',
  styleUrls: ['./transferencia-form.css']
})
export class TransferenciaFormComponent implements OnInit {

  // Recibimos las cuentas del cliente actual desde el componente padre (cliente-detalle)
  @Input() cuentasOrigen: Cuenta[] = [];

  todasLasCuentas: Cuenta[] = [];
  transferenciaForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private transferenciaService: TransferenciaService
  ) {
    // Inicializamos el formulario con sus campos y validaciones
    this.transferenciaForm = this.fb.group({
      idCuentaOrigen: ['', Validators.required],
      idCuentaDestino: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.cargarTodasLasCuentas();
  }

  // Obtenemos todas las cuentas para el desplegable de destino
  cargarTodasLasCuentas(): void {
    this.cuentaService.getCuentas().subscribe(data => {
      this.todasLasCuentas = data;
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.transferenciaForm.invalid) {
      this.mensajeError = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.mensajeExito = null;
    this.mensajeError = null;

    // Llamamos al servicio de transferencia con los datos del formulario
    this.transferenciaService.realizarTransferencia(this.transferenciaForm.value)
      .subscribe({
        next: (response) => {
          this.mensajeExito = `Transferencia de S/${this.transferenciaForm.value.monto} realizada con éxito!`;
          this.transferenciaForm.reset();
          // Podríamos emitir un evento para que el componente padre actualice los saldos
        },
        error: (err) => {
          // Mostramos el mensaje de error que viene del backend (ej: "Saldo insuficiente")
          this.mensajeError = err.error || 'Ocurrió un error al realizar la transferencia.';
        }
      });
  }
}
