import { Component, OnInit } from '@angular/core';
import  {Router, ActivatedRoute, Params} from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent  implements OnInit{ 
  
  videoOrder = '1';
  clips: IClip[] = []
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService
  ){}

  ngOnInit(): void{
    this.route.queryParams.subscribe((params: Params)=>{
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1'; 
    });
    this.clipService.getUserClips().subscribe(docs=>{
      this.clips = [];
      docs.forEach(doc=>{
        this.clips.push(
          {
            docId: doc.id,
            ...doc.data()
          }
        )
      })
    })
  }

  sort(event: Event){
   /* Destructuring the event.target object. */
    const {value} = (event.target as HTMLSelectElement);
   /* Using the router to navigate to the manage route and passing in a query parameter. */
    this.router.navigate([],{
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    })
  }

}
