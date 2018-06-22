import { Component, OnInit, Inject } from '@angular/core';
import {Problem} from "../../models/problem.model";
import {ActivatedRoute,Params} from "@angular/router";

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {

  problem: Problem;
  canPass:boolean;
  notInput:boolean;
  myPassword:string;
  constructor(
    private route: ActivatedRoute,
    @Inject("data") private data
  ) { }

  ngOnInit() {
    this.canPass=false;
    this.notInput=true;
    this.route.params.subscribe(params =>{
      this.data.getProblem(+params['id'])
        //.then(problem=>this.problem=problem);
        .then(problem=>{
          this.problem=problem;
          let id=this.problem.id;
          let passw=this.problem.password;
          let accessPass=localStorage.getItem("accessKey"+id);
          if(accessPass==passw)
            this.canPass=true;
         // console.log("pass word is "+this.problem.password);
        })

    });

  }
  checkPass(){
    if(this.myPassword==this.problem.password){
      this.canPass=true;
      localStorage.setItem("accessKey"+this.problem.id,this.myPassword);
    }else {
      this.notInput=false;
    }
  }


}
