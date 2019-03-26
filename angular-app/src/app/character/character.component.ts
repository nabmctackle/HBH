import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  subject:any
  characterId: any
  characterObj: any
  editing:any
  statBlockToggle: any
  updateStat:any
  skillsAdd:any
  DIAdd:any
  senseAdd:any
  languagesAdd:any
  abilitiesAdd:any



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
      this.characterId=params['id']
    })
    this.getCharacter()
    this.editing=true
    this.statBlockToggle=false

  }
  getCharacter(){
    console.log("get character function activateD")
    this._dataService.getCharacter(this.characterId).subscribe(
      (data)=>{
        if(data['status']){
          this.characterObj=data['character']
        }else{
          console.log("character not found")
        }

      }
    )
  }
  toggleEdit(){
    if(this.editing){
      this.editing=false
    }else{
      this.editing=true
    }
  }
  toggleStatEdit(){
    if(this.statBlockToggle){
      this.statBlockToggle=false
    }else{
      this.statBlockToggle=true
    }
  }
  updateCharacter(){
    this._dataService.updateCharacter({character:this.characterObj}).subscribe(
      (data)=>{
        if(data["status"]){
          console.log("character updated")
          this.getCharacter()
        }else{
          console.log("failed to update, errors:",data['err'])
        }
      }
    )
  }
  test1(){
    
  }

}
