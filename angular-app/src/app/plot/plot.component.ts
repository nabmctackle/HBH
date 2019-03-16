import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {
  subject:any
  plotId:any
  plotObj:any
  editing:any
  mapEdit:any
  mapEditString:""
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
  infoBoxToggle:Boolean
  noteAddBool: boolean
  dmNote:""
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
      this.plotId=params['id']
    })
    this.getPlotPage()
    this.editing=true
    this.pageLinkAdd = false
    this.linkDescHide=false
    this.infoBoxToggle=false
    this.noteAddBool=false

  }
  updatePlot(){
    this._dataService.updatePlot({plot:this.plotObj}).subscribe(
      (plotUpdated)=>{
        if(plotUpdated['status']){
          console.log("plot updated")
        }else{
          console.log("failed to update")
        }
      }
    )
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
    // NOT FINISHED
    if(this.plotObj.imgHide==="true"){
      this.plotObj.imgHide="false"
    }else{
      this.plotObj.imgHide="true"
    }
    this.updatePlot()
    this.getPlotPage()
  }
  toggleInfoBoxEdit(){
    if(this.infoBoxToggle){
      this.infoBoxToggle=false
    }else{
      this.infoBoxToggle=true
    }
  }
  infoBoxUpdate(){
    this.updatePlot()
    this.infoBoxToggle=false
  }
  getPlotPage(){
    this._dataService.getPlot(this.plotId).subscribe(
      (plotFound)=>{
        if(plotFound["status"]){
          console.log("heres what we got from the server:",plotFound['plot'])
          this.plotObj = plotFound["plot"]
          if(this.plotObj.title==undefined){
            this.plotObj.title="No Title"
          }
          if(this.plotObj.content==undefined){
            this.plotObj.content="No Content"
          }
          if(this.plotObj.img==undefined){
            this.plotObj.img="https://imgur.com/hp3bUTY.jpg"
            console.log("test1")
          }
          if(this.plotObj.imgHide==undefined){
            this.plotObj.imgHide="false"
          }
          if(this.plotObj.notes==undefined){
            this.plotObj.notes=[]
          }
          if(this.plotObj.links==undefined){
            this.plotObj.links=[]
          }
          for(var i= 0; i<this.plotObj.links.length;i++){
            this.plotObj.links[i]["Sort"]=i
            
          }


        }
        else{
          this.plotObj=false
        }
      }
    )

  }
  noteAddToggle(){
  if(this.noteAddBool){
    this.noteAddBool =false
  }else{
    this.noteAddBool=true
  }
  }
  noteAdd(){
    this.plotObj.notes.push(this.dmNote)
    this.updatePlot()
  }
  submitLink(){
    this.plotObj.links.push({title:this.pageSelect.title, type:this.linkSelect1,description:this.linkDescription, link:("/"+this.linkSelect1+"s/"+this.pageSelect._id)})
    this.updatePlot()
  }
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
  toggleEdit(){
    if(this.editing==true){
      this.editing=false
      console.log("toggled edit false")
    }else{
      this.editing=true
      console.log("toggled edit true")

    }
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

}
