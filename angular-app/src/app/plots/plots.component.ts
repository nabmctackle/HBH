import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css']
})
export class PlotsComponent implements OnInit {
  subject:any
  campaignObj:any
  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._dataService.subject.subscribe((res) => {
      console.log(res)
      if (res!=null&&res.user!=null){
        this.subject = res;
        console.log("plotList, subject: ", this.subject);
        this.campaignObj=this.subject.currentCampaign
      }else{
        console.log("didnt find a user")
      }
  
    })
   }

  ngOnInit() {
    
  }
  deletePlot(id){
    this._dataService.deletePlot(id,this.campaignObj._id).subscribe((res)=>{
      console.log("here is the response for the deletePlot call:",res)


    })
  }

}
