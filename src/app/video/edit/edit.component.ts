import { Component, Input, OnDestroy, OnInit , OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

@Input() activeClip: IClip | null = null;
showAlert = false;
inSubmission = false;
alertMsg = 'Please wait! Updating clip.';
alertColor = 'blue';
@Output() update = new EventEmitter()
clipId = new FormControl('')
title = new FormControl('', [
  Validators.required,
  Validators.minLength(3)
])
editForm = new FormGroup({
  title: this.title,
  id: this.clipId
})
 constructor( 
   private modal:  ModalService,
   private clipService: ClipService 
  ){ };

 ngOnInit(): void {
     this.modal.register("editClip")
 }
 ngOnDestroy(): void {
     this.modal.unregister("editClip")
 }
 ngOnChanges(): void {
     if(!this.activeClip){ return;}
     this.clipId.setValue((this.activeClip.docId as string));
     this.title.setValue(this.activeClip.title);

     this.inSubmission = false;
     this.showAlert = false;
 }

 async submit(){
    if(!this.activeClip){ return;}

    this.showAlert = true;
    this.inSubmission = true;
    this.alertMsg = 'Please wait! Updating clip.';
    this.alertColor = 'blue';
    if(!this.clipId.value || !this.title.value)return;
    try {
      await this.clipService.updateClip(this.clipId.value, this.title.value)
      
    } catch (error) {
      this.inSubmission = false;
      this.alertMsg = 'Something went wrong! Try again later';
      this.alertColor = 'red';
      return;
    }
    this.inSubmission = false;
    this.alertMsg = 'Success';
    this.alertColor = 'green';
    
    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip);
 }
}
