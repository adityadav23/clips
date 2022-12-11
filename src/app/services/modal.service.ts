import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  //declaring private will help while debugging hence we will know 
  //that its value is getting changed only here

  private visible = false;
  
  constructor() { }

  isModalopen(){
    return this.visible;
  }
  toggleModal(){
    this.visible = !this.visible
  }
}
