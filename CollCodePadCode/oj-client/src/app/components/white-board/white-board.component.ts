import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute,Params} from "@angular/router";
import {convertActionBinding} from "@angular/compiler/src/compiler_util/expression_converter";
declare var io:any;
var drawing:boolean;
var current:any;
var context:any;
var colors:any;
var canvas:any;
var sessionId:string;
var drawPadSocket:any;
@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

 // sessionId:string;
  //canvas:any;
  //colors:any;
  //context:any;
  //current:any;
  //drawing:boolean;
  //drawPadSocket:any;
  clientsInfo:Object={};
  clientNum: number = 0;
  //constructor(@Inject('drawPad') private drawPad, private route:ActivatedRoute) { }
  constructor( private route:ActivatedRoute) { }
  ngOnInit() {
    this.route.params
      .subscribe(params => {
        sessionId = params['id'];
        this.initWhiteBoard();
      });
    //this.initWhiteBoard();
  }
  initWhiteBoard(){
    drawPadSocket=io(window.location.origin, {query:'sessionId='+ sessionId});
    // drawPadSocket=io(window.location.origin, {query:'message='+'drawpad123'});
    // drawPadSocket.on("message",(message)=>{
    //   console.log("recived: "+ message);
    // })
    canvas=document.getElementsByClassName('whiteboard')[0];
    colors=document.getElementsByClassName('colors');
    context=canvas.getContext('2d');
    current={
      color: 'black'
      //x:0,
     // y:0

    }
    drawing=false;
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
    for (let i = 0; i < colors.length; i++){
      colors[i].addEventListener('click', onColorUpdate, false);
    }
    drawPadSocket.on('drawing', onDrawingEvent);
    drawPadSocket.on('cleanBoard', this.onClean);
    window.addEventListener('resize', onResize, false);
    onResize();
  }
  onClean(){
    context.clearRect(0,0,canvas.width,canvas.height);
  }
  cleanBoard() {
    context.clearRect(0,0,canvas.width,canvas.height);
    drawPadSocket.emit('cleanBoard',{c:"clean"});
  }


}
function drawLine(x0, y0, x1, y1, color, emit?){
  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.strokeStyle = color;
  context.lineWidth = 2;
  context.stroke();
  context.closePath();

  if (!emit) { return; }
  let w = canvas.width;
  let h = canvas.height;
  // let data={
  //   x0: x0 / w,
  //   y0: y0 / h,
  //   x1: x1 / w,
  //   y1: y1 / h,
  //   color: color
  // }
  //console.log(data);
  //drawPadSocket.emit('drawing',JSON.stringify(data));
  drawPadSocket.emit('drawing', {
    x0: x0 / w,
    y0: y0 / h,
    x1: x1 / w,
    y1: y1 / h,
    color: color
  });
}

function getPointOnCanvas(x, y) {

  var bbox =canvas.getBoundingClientRect();

  return { x: x- bbox.left *(canvas.width / bbox.width),

    y:y - bbox.top  * (canvas.height / bbox.height)

  };

}
function onMouseDown(e){
  drawing = true;
  let locations=getPointOnCanvas(e.clientX,e.clientY);
  current.x=locations.x;
  current.y=locations.y;
  // current.x = e.clientX;
  // current.y = e.clientY;
}

function onMouseUp(e){
  if (!drawing) { return; }
  drawing = false;
  let locations=getPointOnCanvas(e.clientX,e.clientY);
  drawLine(locations.x, locations.y, locations.x+1, locations.y+1, current.color, true);

  //drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
}

function onMouseMove(e){
  if (!drawing) { return; }
  let locations1=getPointOnCanvas(e.clientX,e.clientY);
  //drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
  drawLine(current.x, current.y, locations1.x, locations1.y, current.color, true);

  let locations=getPointOnCanvas(e.clientX,e.clientY);
  current.x=locations.x;
  current.y=locations.y;
  // current.x = e.clientX;
  // current.y = e.clientY;
}

function onDrawingEvent(data){
  let w = canvas.width;
  let h = canvas.height;
  drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
}
function onColorUpdate(e){
  current.color = e.target.className.split(' ')[1];
}
function onResize() {
  //canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight;
  canvas.width = 700;
    canvas.height = 300;
}

function throttle(callback, delay) {
  let previousCall = new Date().getTime();
  return function() {
    let time = new Date().getTime();

    if ((time - previousCall) >= delay) {
      previousCall = time;
      callback.apply(null, arguments);
    }
  };
}
