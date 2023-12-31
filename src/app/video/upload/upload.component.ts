import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {v4 as uuid} from 'uuid'
import {last, switchMap} from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {ClipService} from '../../services/clip.service'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  
  isDragOver = false;
  file: File | null =  null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = "Please wait! Your File is being uploaded."
  inSubmission = false;
  percentage = 0;
  showPercentage = false;
  user:  firebase.User | null =  null
  
  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService
  ){
    auth.user.subscribe(user=> this.user = user)
  }

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  uploadForm = new FormGroup({
    title: this.title
  })
  storeFile($event: Event){
    this.isDragOver = false;
/* Checking if the event is a DragEvent and if it is, it is checking if the dataTransfer property is
not null and if it is not null, it is checking if the files property is not null and if it is not
null, it is checking if the item(0) property is not null and if it is not null, it is assigning the
item(0) property to the file property. */
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null
    if(!this.file || this.file.type !== 'video/mp4'){
      return
    }
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true
  }

   uploadFile(){
    this.uploadForm.disable();
    this.showAlert = true;    
    this.alertColor = 'blue';
    this.alertMsg = "Please wait! Your File is being uploaded."
    this.inSubmission = true;
    this.showPercentage = true;
  
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    
    const task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath);

    task.percentageChanges().subscribe(progress => {
      this.percentage =  (progress as number)/100
    })
    // console.log("File Uploaded!")
    task.snapshotChanges().pipe(
      last(),
      switchMap(()=> clipRef.getDownloadURL())
    ).subscribe({
      next: (url)=>{
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value as string,
          fileName:  `${clipFileName}.mp4`,
          url
        };

        this.clipsService.createClip(clip);


        this.alertColor = "green";
        this.alertMsg = "Success! Your file is uploaded.";
        this.showPercentage = false
      },
      error: (error)=>{
        this.uploadForm.enable();
        this.alertColor = "red";
        this.alertMsg = "Failed! Your file is not uploaded.";
        this.showPercentage = false;
        this.inSubmission = true;
      }
    })
  }
}
