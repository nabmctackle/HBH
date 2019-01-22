import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-plot-add',
  templateUrl: './plot-add.component.html',
  styleUrls: ['./plot-add.component.css']
})
export class PlotAddComponent implements OnInit {
  subject:any
  campaignId:any
  plotInput: any
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
    this.plotInput={title:"",content:"", campaign:this.campaignId}
  }
  createPlot(){
    this._dataService.createPlot(this.plotInput)
    .subscribe(
      (plotsCreated)=>{
        if(plotsCreated['status']==true){
          this._router.navigate(["/campaignhome/"+this.campaignId])
        }else{
          console.log("that plot didnt get created")
        }
      }
    )
  }

}
