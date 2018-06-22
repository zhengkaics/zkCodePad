import { Injectable } from '@angular/core';
declare var io:any;
declare var canvas:any;
declare var colors:any;
declare var context:any;
@Injectable({
  providedIn: 'root'
})
export class DrawPadService {

  drawPadSocket:any;
  clientsInfo:Object={};
  clientNum: number = 0;
  constructor() { }
  // init(drawpad:any,sessionId:string):void{
  //   this.drawPadSocket=io(window.location.origin, {query:'sessionId='+ sessionId});
  //
  //   this.drawPadSocket.on('drawing', this.onDrawingEvent);
  //   canvas=document.getElementsByTagName('whiteboard')[0];
  //   colors=document.getElementsByTagName('color');
  //   context=canvas.getContext('2d');
  //
  // }
  //
  // onDrawingEvent(data){
  //   let w=canvas.width;
  //   let h=canvas.height;
  //   this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  // }
  //
  // drawLine(x0,y0,x1,y1,color,emit){
  //   context.beginPath();
  //   context.moveTo(x0, y0);
  //   context.lineTo(x1, y1);
  //   context.strokeStyle = color;
  //   context.lineWidth = 2;
  //   context.stroke();
  //   context.closePath();
  //
  //   if (!emit) { return; }
  //   let w = canvas.width;
  //   let h = canvas.height;
  //
  //   this.drawPadSocket.emit('drawing', {
  //     x0: x0 / w,
  //     y0: y0 / h,
  //     x1: x1 / w,
  //     y1: y1 / h,
  //     color: color
  //   });
  // }
  // throttle(callback, delay) {
  //   var previousCall = new Date().getTime();
  //   return function() {
  //     var time = new Date().getTime();
  //
  //     if ((time - previousCall) >= delay) {
  //       previousCall = time;
  //       callback.apply(null, arguments);
  //     }
  //   };
  // }

}
