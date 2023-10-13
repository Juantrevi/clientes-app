import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detail/modal.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})

export class ClientsComponent implements OnInit {

  public clients: Client[];
  public paginatorFather: any;
  public selectedClient: Client;


  constructor(private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.clientService.getClientsPage(page).subscribe(
        response => {
          this.clients = response.content as Client[];
          this.paginatorFather = response;

        });
    });
  }

  delete(client: Client): void {
    console.log(client.name + "Is here");
    swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${client.name} ${client.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.clientService.delete(client.id).subscribe(
          response => {
            this.clients = this.clients.filter(cli => cli !== client)
            swal.fire(
              'Client Deleted!',
              `Client ${client.name} ${client.lastName} has been deleted.`,
              'success'
            )
          }
        )
      }
    })
  }

  openModal(client: Client) {
    this.selectedClient = client;
    this.modalService.openModal();
  }

}
