import { Component, OnInit } from '@angular/core';
import  {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent  implements OnInit{ 
  
  videoOrder = '1';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void{
    this.route.queryParams.subscribe((params: Params)=>{
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1'; 
    })
  }

  sort(event: Event){
   /* Destructuring the event.target object. */
    const {value} = (event.target as HTMLSelectElement);
    console.log(value)
   /* Using the router to navigate to the manage route and passing in a query parameter. */
    this.router.navigateByUrl(`/manage?sort=${value}`)
  }

}
