import { Component, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import {v4 as uuid} from 'uuid'
import {last, switchMap} from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {ClipService} from '../../services/clip.service'
import { Router } from '@angular/router';
import { FfmpegService } from 'src/app/services/ffmpeg.service'
import { combineLatest, forkJoin } from 'rxjs';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  
  isDragOver = false;
  file: File | null =  null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = "Please wait! Your File is being uploaded."
  inSubmission = false;
  percentage = 0;
  showPercentage = false;
  user:  firebase.User | null =  null;
  task?: AngularFireUploadTask;
  screenshots : string[] = [];
  selectedScreenshot = '';
  screenshotTask?: AngularFireUploadTask;

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService,
    private router: Router,
    public ffmpegService: FfmpegService
  ){
    auth.user.subscribe(user=> this.user = user);
    this.ffmpegService.init();
  }
  
  ngOnDestroy(): void {
     this.task?.cancel(); //cancels API request if omponent destroyed
  }
  
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  uploadForm = new FormGroup({
    title: this.title
  })
  async storeFile($event: Event){
    if(this.ffmpegService.isRunning){ return;}
    this.isDragOver = false;
    /* Checking if the event is a DragEvent and if it is, it is checking if the dataTransfer property is
    not null and if it is not null, it is checking if the files property is not null and if it is not
    null, it is checking if the item(0) property is not null and if it is not null, it is assigning the
    item(0) property to the file property. */
    
    this.file = ($event as DragEvent).dataTransfer?.files.item(0)
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if(!this.file || this.file.type !== 'video/mp4'){
      return
    }

    this.screenshots = await this.ffmpegService.getScreenshots(this.file);
    this.selectedScreenshot = this.screenshots[0];
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true
  }

   async uploadFile(){
    this.uploadForm.disable();
    this.showAlert = true;    
    this.alertColor = 'blue';
    this.alertMsg = "Please wait! Your File is being uploaded."
    this.inSubmission = true;
    this.showPercentage = true;
  
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    
    const screenshotBlob = await this.ffmpegService.blobFromURL(this.selectedScreenshot);
    const screenshotPath = `screenshots/${clipFileName}.png`

    this.task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath);
  
    this.screenshotTask = this.storage.upload(screenshotPath, screenshotBlob);
    const screenshotRef = this.storage.ref(screenshotPath);

    combineLatest([
      this.task.percentageChanges(),
      this.screenshotTask.percentageChanges()
    ]).subscribe((progress) => {
      const [clipProgress, screenshotProgress] = progress;
      if(!clipProgress || !screenshotProgress){return};
      let total = clipProgress + screenshotProgress;
      this.percentage =  (total as number)/200
    })
    // console.log("File Uploaded!")
    forkJoin([
      this.task.snapshotChanges(),
      this.screenshotTask.snapshotChanges()
    ]).pipe(
      switchMap(()=> forkJoin([
        clipRef.getDownloadURL(),
        screenshotRef.getDownloadURL()
      ]))
    ).subscribe({
      next: async (urls)=>{
        const [clipUrl, screenshotUrl] = urls;
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value as string,
          fileName:  `${clipFileName}.mp4`,
          url: clipUrl,
          screenshotUrl,
          screenshotFileName:`${clipFileName}.png`,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        const clipDocRef = await this.clipsService.createClip(clip);

        
        this.alertColor = "green";
        this.alertMsg = "Success! Your file is uploaded.";
        this.showPercentage = false;

        setTimeout(()=>{
          this.router.navigate([
            'clip',
            clipDocRef.id
          ])
        },1000)
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
