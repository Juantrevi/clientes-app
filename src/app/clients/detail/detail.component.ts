import { Component, Input } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'client-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  @Input() client: Client;
  public title: string = "Client detail";
  public photoSelected: File;
  public progress: number = 0;

  constructor(public clientService: ClientService, 
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public modalService: ModalService) { }

  ngOnInit() {

  }

  selectPhoto(event){
    this.photoSelected = event.target.files[0];
    this.progress = 0;
    if(this.photoSelected.type.indexOf('image') < 0){
      swal.fire('Error uploading photo', 'The file must be an image', 'error');
      this.photoSelected = null;
    }

  }

  uploadPhoto(){

    if(!this.photoSelected){
      swal.fire('Error uploading photo', 'You must select a photo', 'error');
    }else{
      this.clientService.uploadPhoto(this.photoSelected, this.client.id).subscribe(
        event => {
          //this.client = client;
          //Show the progress bar
          if(event.type === HttpEventType.UploadProgress){
            this.progress = Math.round((event.loaded/event.total)*100);
          }else if(event.type === HttpEventType.Response){
            let response: any = event.body;
            this.client = response.client as Client;
            swal.fire('Photo uploaded', `The photo has been uploaded successfully: ${this.client.photo}`, 'success');
            // this.router.navigate(['/clients']);
            this.photoSelected = null;
          }
        }
      );
    }


  }

  closeModal(){
    this.modalService.closeModal();
    this.photoSelected = null;
    this.progress = 0;
  }

}
