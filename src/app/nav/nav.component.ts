import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {


 constructor(
  public modal: ModalService,
  public auth: AuthService,
  ){}

 /**
  * The function takes an event as an argument, and then calls the toggleModal function on the modal
  * service, passing in the string 'auth' as an argument
  * @param {Event}  - Event - This is the event that is triggered when the user clicks on the
  * button.
  */
 openModal($event:Event){
  
  this.modal.toggleModal('auth');
 }

 /**
  * We're using the AngularFireAuth service to sign out the user
  * @param {Event}  - Event - This is the event that is triggered when the user clicks the logout
  * button.
  */
 
}
