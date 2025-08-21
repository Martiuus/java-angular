import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-lista',
  standalone: true,
  imports: [CommonModule, RouterLink], // Importamos CommonModule para usar *ngFor y RouterLink para la navegación
  templateUrl: './cliente-lista.html',
  styleUrls: ['./cliente-lista.css']
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[] = [];

  // Inyectamos nuestro servicio en el constructor
  constructor(private clienteService: ClienteService) { }

  // ngOnInit se ejecuta una vez que el componente se ha inicializado
  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    // Llamamos al método del servicio, que devuelve un Observable
    this.clienteService.getClientes().subscribe(data => {
      // Cuando la respuesta llega, la asignamos a nuestra variable local
      this.clientes = data;
    });
  }
}
