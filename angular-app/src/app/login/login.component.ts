import { Component, OnInit } from '@angular/core';
import { DataService} from "../data.service"
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: any
  returningUser: any
  nicknameErr:any
  passwordErr: any
  subject: any

  constructor(
    private _dataService:DataService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.newUser={nickname:"",password:"",pwc:""};
    this.returningUser={nickname:"",password:""};
    this.userStatus();

  }
  userStatus(){
    this._dataService.subject.subscribe((res) => {
      this.subject = res;
      console.log("AppComponent, subject: ", this.subject);
    })
  }
  createUser(){
    console.log("createUser function is working; src loginregi comp")
    this._dataService.createUser(this.newUser)
    .subscribe(      
      (userCreated)=>{
      if(userCreated['status']==true){
        this._dataService.userStatus()
        this._router.navigate(['/home'])
      }
      else{
        this.nicknameErr=false
        this.passwordErr=false
        console.log("error in response", userCreated);
          if(userCreated['error']['errors']['nickname']){
            this.nicknameErr = {message:userCreated['error']['errors']['nickname']}
          }
          if(userCreated['error']['errors']['password']){
            this.passwordErr=  {message:userCreated['error']['errors']['password']}
          }
        }
      }
    )
  }
  loginUser(){
    console.log("loginUser function is working; src loginregi comp")
    this._dataService.loginUser(this.returningUser)
    .subscribe(
      (userLoggedin)=>{
        if(userLoggedin["status"]==true){
          this._dataService.userStatus()
          this.userStatus()
          this._router.navigate(['/home'])
        }
        else{
          console.log(userLoggedin['error'])
          if(userLoggedin['error']['errors']['nickname']){
            this.nicknameErr = {}
            this.nicknameErr['message']=userLoggedin['error']['errors']['nickname']
          }
          if(userLoggedin['error']['errors']['password']){
            this.passwordErr = {}
            this.passwordErr['message']=userLoggedin['error']['errors']['password']
          }
        }
      }
    )
  }

}
