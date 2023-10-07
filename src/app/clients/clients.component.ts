import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { CLIENTS } from './clientes.json';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})

export class ClientsComponent implements OnInit{

  clients: Client[];

  constructor() { }

  ngOnInit() {
    this.clients = CLIENTS;
  }
}
