import { Component } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Router } from '@angular/router';

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
      response => this.router.navigate(['/clients'])
    );
  }
}
