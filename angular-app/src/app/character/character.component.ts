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
  actionAdd: any
  descEdit:any



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

    this.statBlockToggle=false
    this.descEdit=false

  }
  editCheck(){
    if(this.characterObj.owner==this.subject.user){
      this.editing=true
      console.log("match confirmed")
      
    }else{
      this.editing=false
      console.log("owner did not match chracterobj, charobj:",this.characterObj,"subject user:",this.subject.user)
    }
 
  }
  getCharacter(){
    console.log("get character function activateD")
    this._dataService.getCharacter(this.characterId).subscribe(
      (data)=>{
        if(data['status']){
          this.characterObj=data['character']
          this.editCheck()
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
  addSkill(){
    this.characterObj.skills.push(this.skillsAdd)
    this.updateCharacter()
    this.skillsAdd=""
  }
  addDI(){
    this.characterObj.damageimmunities.push(this.DIAdd)
    this.updateCharacter()
    this.DIAdd=""
  }
  addSense(){
    this.characterObj.senses.push(this.senseAdd)
    this.updateCharacter()
    this.senseAdd=""
  }
  addLanguage(){
    this.characterObj.languages.push(this.languagesAdd)
    this.updateCharacter()
    this.languagesAdd=""
  }
  addAbility(){
    this.characterObj.abilities.push(this.abilitiesAdd)
    this.updateCharacter()
    this.abilitiesAdd=""
  }
  addAction(){
    this.characterObj.actions.push(this.actionAdd)
    this.updateCharacter()
    this.actionAdd=""
  }
  descEditToggle(){
    if(this.descEdit){
      this.descEdit=false
    }else{
      this.descEdit=true
    }
  }
  descSubmit(){
    this.updateCharacter()
    this.descEdit=false
  }
  statEdit(){
    this.updateCharacter()
    this.statBlockToggle=false
  }


}
