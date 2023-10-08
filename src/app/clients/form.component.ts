import { Component } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  public client: Client = new Client();
  title: string = 'Create Client';

  public constructor(private clienteService: ClientService, private router: Router ) { }

  public createClient(): void {
    this.clienteService.create(this.client).subscribe(
      client => { 
      this.router.navigate(['/clients'])
      Swal.fire('New Client', `Client ${client.name} created successfully!`, 'success')
      });
  }
}
