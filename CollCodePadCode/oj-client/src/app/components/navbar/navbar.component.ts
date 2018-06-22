import {Component, OnInit, Inject, inject} from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  NVBtitle= "ZKCodePad";

  username="";
  profile:any;
  constructor(@Inject('auth') private auth) { }

  ngOnInit() {
    /*
    if(this.auth.isAuthenticated()){
      this.username=this.auth.getProfile().nickname;
    }
    */

    if(this.auth.isAuthenticated()){
      this.username=this.auth.getProfile2().nickname;
    }
    /*
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.username=this.profile.nickname;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.username=this.profile.nickname;
      });
    }

    this.getProfile((err, profile) => {
      localStorage.setItem('profile',JSON.stringify(profile));
    });
    */


  }

  /*
   sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }
  setUsername(){
    this.username=this.auth.getProfile2().nickname;
  }
  login(cb):void{
    this.auth.login();
    cb()
  }
  gologin():void{
    this.login(this.setUsername());
  }
  */
   login():void{
   // this.username='11111'
    this.auth.login().then(()=>{
      this.username='333333'
    })
      // .then(()=>this.username='12132421');
   // this.username='444444'
  }
  /*
  login():void{
    this.auth.login();
   // this.username="hahaha";
    console.log("finish login");
  }
  */
  logout():void{
    this.auth.logout();
  }

}
