import { Component, OnInit } from '@angular/core';
import { DataService} from "../data.service"
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.css']
})
export class NewCampaignComponent implements OnInit {
  subject: any
  noUser: boolean
  newCampaign: any
  createError: any
  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this._dataService.subject.subscribe((res) => {
      console.log(res)
      if (res!=null&&res.user!=null){
        this.subject = res;
        this.noUser=false;
        console.log("AppComponent, subject: ", this.subject);
      }else{
        console.log("didnt find a user")
        this.noUser=true
      }

    })
   }

  ngOnInit() {
    this.newCampaign={title:"",plothook:""}
  }
  createCampaign(){
    this._dataService.createCampaign(this.newCampaign)
    .subscribe(
      (campaignCreated)=>{
        if(campaignCreated['status']==true){
         this._router.navigate(["/mycampaigns"])
        }else{
          console.log(campaignCreated)
        }
      }
    )
  }

}