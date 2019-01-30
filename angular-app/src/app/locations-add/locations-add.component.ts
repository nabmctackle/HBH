import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-locations-add',
  templateUrl: './locations-add.component.html',
  styleUrls: ['./locations-add.component.css']
})
export class LocationsAddComponent implements OnInit {
  locationInput:any
  campaignId:any
  subject:any

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
    this.locationInput={title:"", campaign:this.campaignId}
  }
  createLocation(){
    this._dataService.createLocation(this.locationInput).subscribe(
      (locationsCreated)=>{
        if(locationsCreated['status']==true){
          this._router.navigate(['/campaignhome/'+this.campaignId])
        }
        else{
          console.log("that location creation request had an error")
        }
      }
    )
  }

}
