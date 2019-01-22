import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeBrew Helper';
  subject: any;
  constructor(private _dataService: DataService){
    this._dataService.subject.subscribe((res) => {
      console.log(res)
      if (res!=null&&res.user!=null){
        this.subject = res;
        console.log("AppComponent, subject: ", this.subject);
      }else{
        console.log("didnt find a user")
      }

    })
  }
}
