import { Component } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2' ;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  public client: Client = new Client();
  title: string = 'Create Client';

  public constructor(private clienteService: ClientService,
                     private router: Router,
                     private activatedRoute: ActivatedRoute ) { }

  ngOnInit(){
    this.getClient();
  }

  //Method to create a new client
  public createClient(): void {
    this.clienteService.create(this.client).subscribe(
      client => { 
      this.router.navigate(['/clients'])
      swal.fire('New Client', `Client ${client.name} created successfully!`, 'success')
      });
  }

  //Method to show a client
  public getClient(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if(id){
        this.clienteService.getClient(id).subscribe((client) => this.client = client)
      }
    });
  }

  //Method to update a client
  public updateClient(): void {
    this.clienteService.update(this.client).subscribe(
      client => { 
      this.router.navigate(['/clients']);
      swal.fire('Client Updated', `Client ${client.name} updated successfully!`, 'success')
      });
  }


}
