import { Component } from '@angular/core';
import { Client } from './client';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})

export class ClientsComponent {

  clients: Client[] = [
    {id: 1, name: 'John', lastName: 'Doe', email: 'john@gmail.com', createAt: '2017-12-11'},
    {id: 2, name: 'Jane', lastName: 'Doe', email: 'jane@gmail.com', createAt: '2017-12-11'},
    {id: 3, name: 'Jack', lastName: 'Doe', email: 'jack@gmail.com', createAt: '2017-12-11'},
    {id: 4, name: 'Jill', lastName: 'Doe', email: 'jill@gmail.com', createAt: '2017-12-11'},
    {id: 5, name: 'Johnatan', lastName: 'Doe', email: 'johnatan@gmail.com', createAt: '2017-12-11'},
  ];


}
