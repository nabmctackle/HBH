import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
locationId:any
subject:any
locationObj: any
editing:Boolean
mapEdit:any
mapEditString:""
addPOI:Boolean
addPOIobj:any
infoBoxToggle:boolean
infoBoxString:""

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
      this.locationId=params['id']
    })
    this.getLocation()
    this.editing=true
    this.mapEdit=false
    this.infoBoxToggle=false
    this.addPOIobj={PoiNum:undefined,PoiTitle:"",PoiDesc:"",PoiLink:"",update:"POI", locationId:this.locationId}
  }
  getLocation(){
    this._dataService.getLocation(this.locationId).subscribe(
      (locationFound)=>{
        if (locationFound['status']){
          this.locationObj = locationFound['location']
        }
        else{
          this.locationObj= false
        }
      }
    )
  }
  toggleEdit(){
    if(this.editing==true){
      this.editing=false
      console.log("toggled edit false")
    }else{
      this.editing=true
      console.log("toggled edit true")

    }
  }
  mapEditToggle(){
    if(this.mapEdit){
      this.mapEdit=false
      console.log("mapEdit toggled false")
    }else{
      this.mapEdit=true
      console.log("mapEdit toggled true")
    }
  }
  toggleAddPOI(){
    if(this.addPOI){
      this.addPOI=false
    }else{
      this.addPOI=true
    }
  }
  toggleInfoBoxEdit(){
    if(this.infoBoxToggle){
      this.infoBoxToggle=false
    }else{
      this.infoBoxToggle=true
    }
  }
  addPoiFunction(){
    this._dataService.updateLocation(this.addPOIobj).subscribe(
      (locationUpdated)=>{

      }
    )
  }

}
