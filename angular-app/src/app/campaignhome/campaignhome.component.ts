import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-campaignhome',
  templateUrl: './campaignhome.component.html',
  styleUrls: ['./campaignhome.component.css']
})
export class CampaignhomeComponent implements OnInit {
  subject:any
  campaignId:any
  campaign:any
  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
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
  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      console.log(params['id'])
      this.campaignId=params['id']
    })
    this.getCampaign()
  }
  getCampaign(){
    this._dataService.getCampaign(this.campaignId).subscribe((campaign)=>{
      if(campaign['status']==true){
        console.log("*********************************",campaign)
        this.campaign=campaign['campaign']
      }else{
        console.log("campaign status is false")
      }
    })
  }
}
