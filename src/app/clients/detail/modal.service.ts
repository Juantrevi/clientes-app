import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modal: boolean = false;

  constructor() { }

  openModal(){
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }

}
