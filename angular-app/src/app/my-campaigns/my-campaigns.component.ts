import { Component, OnInit } from '@angular/core';
import { DataService} from "../data.service"
@Component({
  selector: 'app-my-campaigns',
  templateUrl: './my-campaigns.component.html',
  styleUrls: ['./my-campaigns.component.css']
})
export class MyCampaignsComponent implements OnInit {
  subject: any
  campaigns:any
  noUser: boolean
  constructor(private _dataService: DataService) {
    this._dataService.userStatus();
    this._dataService.subject.subscribe((res) => {
      console.log(res)
      if (res!=null&&res.user!=null){
        this.subject = res;
        this.campaigns = res.campaigns;
        this.noUser=false;
        console.log("AppComponent, subject: ", this.subject);
      }else{
        console.log("didnt find a user")
        this.noUser=true
      }

    })
   }

  ngOnInit() {
  }

}
