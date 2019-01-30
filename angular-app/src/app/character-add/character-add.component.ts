import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.css']
})
export class CharacterAddComponent implements OnInit {
  characterInput:any
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
    this.characterInput={title:"", campaign:this.campaignId}
  
  }
  createCharacter(){
    this._dataService.createCharacter(this.characterInput).subscribe(
      (charactersCreated)=>{
        if(charactersCreated['status']==true){
          this._router.navigate(['/campaignhome/'+this.campaignId])
        }
        else{
          console.log("that character creation request had an error")
        }
      }
    )
  }

}
