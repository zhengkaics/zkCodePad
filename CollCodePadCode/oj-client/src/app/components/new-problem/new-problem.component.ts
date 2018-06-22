import {Component, Inject, OnInit} from '@angular/core';
import {Problem} from "../../models/problem.model";
import {error} from "@angular/compiler/src/util";
import {ActivatedRoute} from "@angular/router";
//import passwordHash =require('password-hash');
//declare var require:any;
//declare var crypto:any;
const DEFAULT_PROBLEM :Problem=Object.freeze({
  id:0,
  name:"",
  desc:"",
  language:"Java",
  password:""
})

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {


  public languages = ["Cpp","Java","Python"]

  newProblem: Problem = Object.assign({},DEFAULT_PROBLEM)

  constructor(private route: ActivatedRoute,
              @Inject("data") private data) { }

  ngOnInit() {
  }

  //passwordHash=require('password-hash');
  addProblem():void{
    let cProblem=this.newProblem;
    //cProblem.password=this.passwordHash.generate(cProblem.password);
    this.data.addProblem(cProblem)
      .then(problem=>{
        let id=problem.id;
        localStorage.setItem("accessKey"+id,problem.password);
        window.location.href=window.location.href+"/"+id;
      })
      .catch(error=>console.log(error.body));
    this.newProblem=Object.assign({},DEFAULT_PROBLEM)
  }

}
