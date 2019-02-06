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
    this.addPOIobj={PoiNum:undefined,PoiTitle:"",PoiDesc:"",PoiLink:"", locationId:this.locationId}
  }
  getLocation(){
    this._dataService.getLocation(this.locationId).subscribe(
      (locationFound)=>{
        if (locationFound['status']){
          this.locationObj = locationFound['location']
          if(this.locationObj.POIarr==undefined){
            this.locationObj.POIarr = []
          }
          if(this.locationObj.title==undefined){
            this.locationObj.title = "Undefined Title"
          }
          if(this.locationObj.links==undefined){
            this.locationObj.links = []
          }
          if(this.locationObj.content==undefined){
            this.locationObj.content = ""
          }
          if(this.locationObj.map==undefined){
            this.locationObj.map = "https://imgur.com/hp3bUTY.jpg"
          }
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
  infoBoxUpdate(){
    this.updateLocation()
    this.infoBoxToggle=false
  }
  updateLocation(){
    this._dataService.updateLocation({location:this.locationObj}).subscribe(
      (locationUpdated)=>{
        if(locationUpdated["status"]){
          console.log("location updated")
        }
        else{
          console.log("failed to update")
        }
      }
    )
  }
  addPoiFunction(){
    this.locationObj["POIarr"].push(this.addPOIobj)
    this.PoiSort()
    this.updateLocation()
    this.addPOIobj={PoiNum:undefined,PoiTitle:"",PoiDesc:"",PoiLink:"", locationId:this.locationId}
  }
  PoiSort(){
    for(var i=0;i<this.locationObj["POIarr"].length-1;i++){
      for(var j=0; j<this.locationObj["POIarr"].length-i;j++){
        if(this.locationObj["POIarr"][j]["POINum"]>this.locationObj["POIarr"][j+1]["POINum"]){
          var temp = this.locationObj["POIarr"][j]
          this.locationObj["POIarr"][j] = this.locationObj["POIarr"][j+1]
          this.locationObj["POIarr"][j+1] = temp
        }
      }
    }
  }

}
