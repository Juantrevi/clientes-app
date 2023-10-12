import { Component } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { tap, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  public client: Client = new Client();
  public title: string = 'Create Client';
  public errores: string[];

  public constructor(private clienteService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getClient();
  }

  //Method to create a new client
  public createClient(): void {
    this.clienteService.create(this.client)
      //Method subscribe, when everything went OK
      .pipe(tap((client) => {
        this.router.navigate(['/clients']);
        swal.fire('Client Created', `The client ${client.name}: was created successfully`, 'success');
      }),
      //Method subscribe, when something went wrong
      catchError((err) => {
        console.log(err.error.errors + " Is the error");
        this.errores = err.error.errors as string[];
        console.log('Backend code error: ' + err.status);
        console.log(err.error.errors);
        return this.errores;
      })).subscribe();
}

  //Method to show a client
  public getClient(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id) {
        this.clienteService.getClient(id).subscribe((client) => this.client = client)
      }
    });
  }


  //Method to update a client
  public updateClient(): void {
    
    this.clienteService.update(this.client)
      //Method subscribe, when everything went OK
      .pipe(tap((client) => {
          this.router.navigate(['/clients']);
          swal.fire('Client Updated', `The client ${client.name}: was updated successfully`, 'success');
          console.log("Enters the pipe");
        }),
        //Method subscribe, when something went wrong
        catchError((err) => {
          console.log(err + " Is the error");
          this.errores = err.error.errors as string[];
          console.error('Backend code error: ' + err.status);
          console.error(err.error.errors);
          return this.errores;
        })).subscribe();
  }

  // //Method to delete a client //METHOD MAID IN clients.component.ts
  // public deleteClient(): void {
  //   this.clienteService.delete(this.client.id).subscribe(
  //     response => {
  //       this.router.navigate(['/clients']);
  //       swal.fire('Client Deleted', `Client ${this.client.name} deleted successfully!`, 'success')
  //     });
  // }

  // Method to update a client
  // public updateClient(): void {
  //   this.clienteService.update(this.client)
  //       //Method subscribe, when everything went OK
  //   .subscribe(client => { 
  //     this.router.navigate(['/clients']);
  //     swal.fire('Client Updated', `The client ${client.name}: was updated succesfully`, 'success')
  //     },
  //     //Method subscribe, when something went wrong
  //     err => {
  //       this.errors = err.error.errors as string[];
  //       console.error('Backend code error: ' + err.status);
  //       console.error(err.error.errors);
  //     }
  //     );
  // }

    //Method to create a new client
    // public createClient(): void {
    //   this.clienteService.create(this.client)
    //     //Method subscribe, when everything went OK
    //     .subscribe(json => {
    //       this.router.navigate(['/clients'])
    //       swal.fire('New Client', `${json.message}: ${json.client.name}`, 'success')
    //     },
    //       //Method subscribe, when something went wrong
    //       err => {
    //         this.errors = err.error.errors as string[];
    //         console.error('Backend code error: ' + err.status);
    //         console.error(err.error.errors);
    //       }
    //     );
    // }


}
