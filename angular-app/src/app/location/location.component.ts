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
pageLinkAdd:any
linkSelect1:any
linkPlot:boolean
linkLocation:boolean
linkCharacter:boolean
linkBeast:boolean
linkItem:boolean
linkDescHide:boolean
linkDescription:""
pageSelect:any


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
    this.addPOIobj={PoiTitle:"",PoiDesc:"",PoiLink:"", locationId:this.locationId}
    this.pageLinkAdd = false
    this.linkDescHide=false
  }
  getLocation(){
    this._dataService.getLocation(this.locationId).subscribe(
      (locationFound)=>{
        if (locationFound['status']){
          console.log("heres what we got from server",locationFound['location'])
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
          if(this.locationObj.mapHide==undefined){
            console.log("this is the locationObj",this.locationObj)
            console.log("this is the maphide",this.locationObj["mapHide"])
            console.log("maphide changed from undefined to false")
            this.locationObj.mapHide = "false";
          }
          for(var i= 0; i<this.locationObj.links.length;i++){
            this.locationObj.links[i]["Sort"]=i
            
          }
          for(var i= 0; i<this.locationObj.POIarr.length;i++){
            this.locationObj.POIarr[i]["Sort"]=i
            
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
  mapHideToggle(){
    if(this.locationObj.mapHide=="true"){
      this.locationObj.mapHide = "false"
      this.updateLocation()
      this.getLocation()
    }else{
      this.locationObj.mapHide= "true";
      this.updateLocation()
      this.getLocation()
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
    this.updateLocation()
    this.getLocation()
    this.addPOIobj={PoiTitle:"",PoiDesc:"",PoiLink:"", locationId:this.locationId}
  }
  // PoiSort(){
  //   for(var i=0;i<this.locationObj["POIarr"].length-1;i++){
  //     for(var j=0; j<this.locationObj["POIarr"].length-i;j++){
  //       if(this.locationObj["POIarr"][j]["POINum"]>this.locationObj["POIarr"][j+1]["POINum"]){
  //         var temp = this.locationObj["POIarr"][j]
  //         this.locationObj["POIarr"][j] = this.locationObj["POIarr"][j+1]
  //         this.locationObj["POIarr"][j+1] = temp
  //       }
  //     }
  //   }
  // }
  pageLinkAddToggle(){
    console.log("pageLinkAddToggle")
    if(this.pageLinkAdd){
      console.log("pageLinkAddToggle false")
      this.pageLinkAdd=false
    }else{
      console.log("pageLinkAddToggle true")
      this.pageLinkAdd=true
    }
  }
  submitLink(){
    this.locationObj.links.push({title:this.pageSelect.title, type:this.linkSelect1,description:this.linkDescription, link:("/"+this.linkSelect1+"s/"+this.pageSelect._id)})
    this.updateLocation()
  }
  setLinkType(){
    if(this.linkSelect1=="plot"){
      this.linkPlot=true
      this.linkBeast=false
      this.linkCharacter=false
      this.linkLocation=false
      this.linkItem=false
    }
    if(this.linkSelect1=="beast"){
      this.linkPlot=false
      this.linkBeast=true
      this.linkCharacter=false
      this.linkLocation=false
      this.linkItem=false
    }
    if(this.linkSelect1=="location"){
      this.linkPlot=false
      this.linkBeast=false
      this.linkCharacter=false
      this.linkLocation=true
      this.linkItem=false
    }
    if(this.linkSelect1=="character"){
      this.linkPlot=false
      this.linkBeast=false
      this.linkCharacter=true
      this.linkLocation=false
      this.linkItem=false
    }
    if(this.linkSelect1=="item"){
      this.linkPlot=false
      this.linkBeast=false
      this.linkCharacter=false
      this.linkLocation=false
      this.linkItem=true
    }
    this.linkDescHide=true
  }
  linkDelete(num){
    for(var i=0;i<this.locationObj.links.length;i++){
      if(this.locationObj.links[i]["Sort"]==num){
        for(var j=i;j<this.locationObj.links.length-1;j++){
          this.locationObj.links[j]=this.locationObj.links[j+1]
        }
      }
      this.locationObj.links.pop()
      this.updateLocation()
      this.getLocation()
    }

  }
  poiDelete(num){
    for(var i=0;i<this.locationObj.POIarr.length;i++){
      if(this.locationObj.POIarr[i]["PoiNum"]==num){
        for(var j=i;j<this.locationObj.POIarr.length-1;j++){
          this.locationObj.POIarr[j]=this.locationObj.POIarr[j+1]
        }
      }
      this.locationObj.POIarr.pop()
      this.updateLocation()
      this.getLocation()
    }

  }

}
