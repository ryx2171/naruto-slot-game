import * as PIXI from "pixi.js"
import {gsap} from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";



export function generateRandom( _range:number,startAt:number = 0 ):number{
    let rdm:number = Math.floor( Math.random()*( startAt + _range) );
    return rdm;
}

export function setFullscreen(_id:boolean):void{

    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
        webkitRequestFullscreen(): Promise<void>;
    };

    const docWithBrowsersExitFunctions = document as Document & {
          webkitExitFullscreen(): Promise<void>;
      };
    
        if(_id == true){
            try {
                docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
              }
              catch(err) {
            }
        }else{
            try {
                docWithBrowsersExitFunctions.webkitExitFullscreen();
              }
              catch(err) {
            }
    }
}

export function shuffleArray(arr:number[]):number[]{
    
    let i:number = 0;
    let temp:number = 0;
    let j:number = 0;

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    
    return arr;
}
export function  degToRad(angle:number):number
{
        return angle * (Math.PI/180);
}


export function radToDeg(radians:number)
{
  return radians * (180/Math.PI);
}
    

export function isLandscape(){
    return window.matchMedia("(orientation: landscape)").matches;
}

export function isPortrait(){
  return window.matchMedia("(orientation: portrait)").matches;
}

export function kFormatter(num:number) {
  return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num)/1000).toFixed(1) as any) + 'k' : Math.sign(num)*Math.abs(num)
}


export function changeColor(gfx:PIXI.Graphics,color:string,duration:number=1){
  gsap.to(gfx, {duration: duration, pixi: {lineColor: color}});
}

export function numberFormatter(number:number){

  var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled:number = number / scale;

    // format number and add suffix
    return scaled.toFixed(2) + suffix;
}

export function nFormatter(num:number) {
  if (num >= 1000000000) {
     return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
     return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
     return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K';
  }
  return num;
}


export function setDraggable(obj: PIXI.DisplayObject,onDragStart:Function,onDragEnd:Function,onDragMove:Function) {
  // Rotate around the center

  let dragTarget:PIXI.DisplayObject = obj
  let lastPosition:PIXI.Point;
  

  obj.interactive = obj.buttonMode = true;
  obj
    .on('pointerdown', (e:PIXI.InteractionEvent)=>{
          onDragStart(e);
          e.data = e.data;  
          lastPosition = e.data.getLocalPosition(dragTarget.parent);
    })

    .on('pointerup', (e:PIXI.InteractionEvent)=>{
          onDragEnd(e)
          
    })

    //.on('pointerupoutside', (e:PIXI.InteractionEvent)=>{onDragEnd(e)})

    .on('pointermove', (e:PIXI.InteractionEvent)=>{
          ///onDragMove(e)  



          if (lastPosition) {
              let boundHeight:number = obj.getBounds().height;
              let newPosition = e.data.getLocalPosition(dragTarget.parent);    
              //dragTarget.position.x += (newPosition.x - lastPosition.x);
             
              if(dragTarget.position.y>0){
                dragTarget.position.y=0;
        
              }else

              if(dragTarget.position.y < -(boundHeight-1000)  ){
                dragTarget.position.y= -(boundHeight-1000);
               
              }

              if( boundHeight > 1050){
                dragTarget.position.y += (newPosition.y - lastPosition.y);
              }

              lastPosition = newPosition;
          }
    });
}



