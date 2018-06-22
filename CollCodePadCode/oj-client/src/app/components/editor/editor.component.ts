import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute,Params} from "@angular/router";

declare var ace:any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor:any;

  public languages: string[] = ['Java','Cpp','Python'];
  language: string = 'Java';

  output: string = '';
  sessionId: string;

  defaultContent = {
    'Java': `public class Example {
    public static void main(String[] args) {
      //Type your code here
    }
}`,
    'Cpp': `#include <iostream>
using namespace std;

int main() {
//Type your C++ code here
return 0;
}`,
    'Python': `class Solution:
def example():
# Write your Python code here`
  }

  constructor(@Inject('collaboration') private collaboration,@Inject('data') private data, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      });
  }
  initEditor(){

    let myLanguage=this.data.getLanguage();
    let modeLangeage=myLanguage.toLowerCase();
    if(modeLangeage=="cpp"){
      modeLangeage="c_cpp";
    }
    this.editor=ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.getSession().setMode('ace/mode/'+modeLangeage);
    this.resetEditor();
    this.editor.setValue(this.defaultContent[myLanguage]);


    document.getElementsByTagName('textarea')[0].focus();
    this.collaboration.init(this.editor,this.sessionId);
    this.editor.lastAppliedChange=null;

    this.editor.on('change',(e)=>{
     // console.log('editor changes '+JSON.stringify(e));
      if(this.editor.lastAppliedChange!=e){
        this.collaboration.change(JSON.stringify(e));
      }
    })
    this.editor.getSession().getSelection().on("changeCursor",()=>{
      let cursor=this.editor.getSession().getSelection().getCursor();
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    //this.collaboration.restoreBuffer();
  }
  setLanguage(language:string):void{
    this.language=language;
    this.resetEditor();
  }
  resetEditor():void{
    this.editor.getSession().setMode('ace/mode/'+this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
  }

  submit():void{

    let userCode=this.editor.getValue();
    //console.log(userCode);
  }
}
