import { Injectable } from '@angular/core';
import { CLIENTS } from './clientes.json';
import { Client } from './client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClients(): Observable <Client[]> {
    return of(CLIENTS);
  }
}
