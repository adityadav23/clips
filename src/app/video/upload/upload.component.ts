import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  
  isDragOver = false;
  file: File | null =  null;
  nextStep = false

  storeFile($event: Event){
    this.isDragOver = false;
/* Checking if the event is a DragEvent and if it is, it is checking if the dataTransfer property is
not null and if it is not null, it is checking if the files property is not null and if it is not
null, it is checking if the item(0) property is not null and if it is not null, it is assigning the
item(0) property to the file property. */
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null
    // console.log(this.file)
    this.nextStep = true
    if(!this.file || this.file.type !== 'video/mp4'){
      return
    }
  }
}
