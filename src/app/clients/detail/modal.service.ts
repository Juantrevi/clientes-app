import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modal: boolean = false;
  public notificationUpload = new EventEmitter<any>();


  constructor() { }

  openModal(){
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }

}
