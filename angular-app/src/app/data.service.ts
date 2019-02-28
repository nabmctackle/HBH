import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  subject = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    console.log("Data Service Activated")
    this.userStatus()
   }
   createUser(obj){
     console.log("CreateUser Service Activated")
     return this.http.post("/user",obj)
   }
   loginUser(obj){
     console.log("LoginUser Service Activated")
     return this.http.post("/login",obj)
   }
   userStatus(){
     console.log("userStatus service activated")
     this.http.get("/login").subscribe((res)=>{
       console.log("userStatus", res)
      this.subject.next(res);
    })
   }    
   createCampaign(obj){
     console.log("createCampaign service activated")
      return this.http.post("/campaigns",obj)
  }
  getCampaign(id){
    console.log("getCampaign activated with id:",id)
    return this.http.get("/campaigns/"+id)
  }
  createPlot(obj){
    console.log("createPlot activated with obj:",obj)
    return this.http.post("/plot",obj)
  }
  createLocation(obj){
    console.log("createLoc activated with obj:", obj)
    return this.http.post("/location",obj)
  }
  createCharacter(obj){
    console.log("createChar activated with obj:",obj)
    return this.http.post("/character",obj)
  }
  getLocation(str){
    console.log("getLocation activated with str", str)
    return this.http.get("/location/"+str)
  }
  updateLocation(obj){
  console.log("updatelocation activated with obj", obj)
  return this.http.put("/location",obj)
  }
  setActiveCampaign(str){
    console.log("setActiveCampaign called with str ", str)
    return this.http.post("/campaigns/"+str,{})
  }
}
