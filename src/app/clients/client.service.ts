import { Injectable } from '@angular/core';
import { CLIENTS } from './clientes.json';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClients(): Client[] {
    return CLIENTS;
  }
}
