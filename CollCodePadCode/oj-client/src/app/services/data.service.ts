import { Injectable } from '@angular/core';
import {Problem} from "../models/problem.model";
import {NgModule} from "@angular/core";
import {HttpClientModule, HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs/index";


@NgModule({
  imports:[
    HttpClient,
    HttpClientModule,
  ],
  providers:[HttpClientModule],
  })

@Injectable({
  providedIn: 'root'
})
export class DataService {

  myProblem:Problem;
  problemLang:string;
  private problemSource=new BehaviorSubject<any>([]);
  constructor(private http:HttpClient) { }
  getProblems():Observable<Problem[]>{
    this.http.get("api/v1/problems")
      .toPromise()
      .then((res:Response)=>{
        this.problemSource.next(res);
    }).catch(this.handleError);
    return this.problemSource.asObservable();
  }
  getProblem(id:number): Promise<Problem>{
    return this.http.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res:Problem)=> {
        this.myProblem=res;
        return res;
      })
      // .then((res:Response)=>{
      //   return res;
      //})
      .catch(this.handleError);
  }

  httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/json'
    })
  };
  addProblem(problem:Problem):Promise<Problem>{
    return this.http.post('/api/v1/problems',problem,this.httpOptions)
      .toPromise()
      .then((res:Problem)=>{
        this.myProblem=res;
          this.getProblems();
          return res;
      })
      .catch(this.handleError);
  }
  getLanguage(){
    return this.myProblem.language;
  }
  private handleError(error:any):Promise<any>{
    console.error('An error occurred',error);
    return Promise.reject(error.body||error);
  }
}

