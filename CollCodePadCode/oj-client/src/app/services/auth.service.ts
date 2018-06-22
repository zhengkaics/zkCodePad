// src/app/auth/auth.service.ts

import {Inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as auth0 from 'auth0-js';
import {reject} from "q";

(window as any).global = window;
//declare var Auth0Lock: any;
@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'X3AxqhDHhoI2XdP_NgWFQw7o2mvFA1pO',
    domain: 'zkcodepad.auth0.com',
    responseType: 'token id_token',
    audience: 'https://zkcodepad.auth0.com/userinfo',
    //redirectUri: 'http://localhost:3000/callback',
    redirectUri: 'http://localhost:3000/',
    scope: 'openid profile roles'
  });
  clientId = 'X3AxqhDHhoI2XdP_NgWFQw7o2mvFA1pO';
  domain = 'zkcodepad.auth0.com';
  //lock=new Auth0Lock(this.clientId,this.domain,{});
  userProfile:any;




  constructor(public router: Router) {}
  public login():Promise<void>{
    return new Promise<void>((resolve, reject1) => {
      return this.auth0.authorize();
    })
  }
/*
  public login():Promise<Object>{
    return new Promise<Object>((resolve, reject1) => {
      return this.auth0.authorize().then(()=>{
        return this.userProfile;
      });
      //localStorage.setItem("haha","hehe");
      //resolve(this.userProfile);
    })
  }
  */
  /*
  public login()  {
      this.auth0.authorize();
  }
  */
  /*
  public login(){
    this.auth0.authorize()
  }
  */
  /*
  public login(): Promise<Object> {
    localStorage.setItem('step0','s00000');
      return new Promise((resolve ,reject)=> {
        localStorage.setItem('step1','s1111');

        this.auth0.authorize();
        localStorage.setItem('step2','s22222');
        this.getProfile((err,profile)=>{
          localStorage.setItem('step3','s33333');
          if(err){
            localStorage.setItem('rj','rjjjj');
            reject(err);
          }else {
            this.userProfile=profile;
            localStorage.setItem('haha','papapa');
            localStorage.setItem('profile',JSON.stringify(profile));
            resolve(profile);
          }
          localStorage.setItem('step4','s444444');
        })
      })
      }



this.getProfile((err, profile) => {
          if(err){
            reject(err);
          }else {
            this.userProfile = profile;
          }

        });

       this.auth0.authorize();
      this.getProfile((err, profile) => {
        this.userProfile = profile;
      });
      localStorage.setItem('profile',JSON.stringify(this.userProfile));



  public login(): void  {
    this.lock.on("authenticated", function(authResult) {
      this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          console.log(error);
          return;
        }
        // Save token and profile locally
        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        // Update DOM
      });
    });
   // this.auth0.authorize();
  }
  */
  public getProfile2(): any {
    return JSON.parse(localStorage.getItem('profile'));
  }
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }
  //cb is  callback
  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }
  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.getProfile((err, profile) => {
      localStorage.setItem('profile',JSON.stringify(profile));
      location.reload();
      this.userProfile=profile;
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    //localStorage.removeItem('id_token2');
    localStorage.removeItem('profile');

    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }






}
