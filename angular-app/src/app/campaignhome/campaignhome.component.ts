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
  campaignCheck:Boolean
  plot:any
  chars:any
  items:any
  beasts:any
  locations:any
  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
  
}
  ngOnInit() {
    this.campaignCheck=false
    this._route.params.subscribe((params: Params)=>{
      console.log(params['id'])
      this.campaignId=params['id']
    })
    this.setActiveCampaign()
    this.getCampaign()
    this.setSubject()
  }
  getCampaign(){
    this._dataService.getCampaign(this.campaignId).subscribe((campaign)=>{
      if(campaign['status']==true){
        console.log("*********************************",campaign)
        this.campaignCheck=true
        this.campaign=campaign['campaign']
        console.log("*********************************",this.campaign)

        // this.plot= this.campaign['plots'].slice(0,5)
        // this.locations= this.campaign['locations'].slice(0,5)
        // this.chars= this.campaign['characters'].slice(0,5)
        // this.items= this.campaign['items'].slice(0,5)
        console.log("*********************************",this.campaign)
      }else{
        console.log("campaign status is false")
      }
    })
  }
  setActiveCampaign(){
    console.log("setActivatecampaign activated on campaignhomecomponent")
    this._dataService.setActiveCampaign(this.campaignId).subscribe(
      (response)=>{
        if(response["status"]){
          console.log("campaign set")
          this._dataService.userStatus()
        }else{
          console.log("campaign not set")
        }
      }

    )
  }
  setSubject(){
    this._dataService.subject.subscribe((res) => {
      console.log("set subject called on campaignhome",res)
      if (res!=null&&res.user!=null){
        this.subject = res;
        console.log("campaignHomeComponent, subject: ", this.subject);
      }else{
        console.log("campaignHomeComponent didnt find a user")
      }
  
    })
  }
}

