import {Inject, Injectable} from '@angular/core';
import {Router,CanActivate} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(@Inject('auth') private auth, private router:Router) { }

  //如果用户可以访问return true
  canActivate():boolean{
    if(this.auth.isAuthenticated()){
      return true;
    }else {
      //redirect to home page if not logged in
      this.router.navigate(['/problems']);
      return false;
    }
  }
}
