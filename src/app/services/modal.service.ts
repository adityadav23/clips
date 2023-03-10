import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  //declaring private will help while debugging hence we will know
  //that its value is getting changed only here

  private modals: IModal[] = [];

  constructor() {}

  isModalopen(id: string) {
    return !!this.modals.find((element) => element.id === id)?.visible;
  }
  toggleModal(id: string) {
    // this.visible = !this.visible
    const modal = this.modals.find((element) => element.id === id);

    if (modal) {
      modal.visible = !modal.visible;
    }
  }

  register(id: string) {
    this.modals.push({
      id,
      visible: false,
    });
  }

  unregister(id: string){
    this.modals = this.modals.filter(element=>  element.id !== id)
  }
}
