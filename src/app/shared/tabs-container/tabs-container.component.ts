import { Component, ContentChildren, AfterContentInit , QueryList} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit{

  @ContentChildren(TabComponent) tabs :  QueryList<TabComponent> = new QueryList()

  ngAfterContentInit(): void {
    //tabs property is QueryList object it contains filter() function
    const activeTabs= this.tabs.filter(tab=> tab.active);
    
    
/* Checking if the activeTabs variable is null or undefined.  */
    if(!activeTabs || activeTabs.length === 0){

      this.selectTab(this.tabs?.first);
    }
  }
  selectTab(tab: TabComponent){
    this.tabs?.forEach(tab=> {
      tab.active = false;
    })

    tab.active = true;
  }
  constructor(){

  }
}
