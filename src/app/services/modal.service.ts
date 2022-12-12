import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  //declaring private will help while debugging hence we will know 
  //that its value is getting changed only here


  private modals: IModal[] = [];
  
  constructor() { }

  isModalopen(){
    return true;
  }
  toggleModal(){
    // this.visible = !this.visible
  }

  register(id: string){
    this.modals.push({
      id,
      visible: false
    })
  }
}
