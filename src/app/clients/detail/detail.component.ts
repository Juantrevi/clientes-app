import { Component } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'client-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  client: Client;
  public title: string = "Client detail";
  private photoSelected: File;

  constructor(private clientService: ClientService, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.clientService.getClient(id).subscribe(client => this.client = client);
      }
    });
  }

  selectPhoto(event){
    this.photoSelected = event.target.files[0];
    console.log(this.photoSelected);
  }

  uploadPhoto(){
    this.clientService.uploadPhoto(this.photoSelected, this.client.id).subscribe(
      client => {
        this.client = client;
        swal.fire('Photo uploaded', `The photo has been uploaded successfully: ${this.client.photo}`, 'success');
      }
    );
  }
}
