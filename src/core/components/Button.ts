
import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power1} from "gsap";


import { generateRandom } from './Utils';

export default class Button extends PIXI.Sprite{

        public boxbg:PIXI.Graphics = new PIXI.Graphics();

        public cvalueField:PIXI.Text = new PIXI.Text("");
        public labelField:PIXI.Text = new PIXI.Text("");
        public notifLabel:PIXI.Text = new PIXI.Text("");

        private _color:number = 0;

        public notificationDot:PIXI.Graphics = new PIXI.Graphics();

        constructor(fnc:Function,cname:string="button",_width:number=80,_height:number=80,_color:number=0xcccccc,_fontSize:number = 20){
            super();
            this.drawComponent(fnc,cname,_width,_height,_color,_fontSize);

            this.drawDot();
            this.setNotif(0);
        }
        
        private drawComponent(fnc:Function,cname:string,_width:number,_height:number,_color:number,_fontSize:number) {

            this._color = _color;
           
            this.boxbg.beginFill(0xcccccc);
            this.boxbg.drawRoundedRect(-_width*0.5,(-_height*0.5)+5,_width,_height,15);
            this.boxbg.beginFill(0xf0f0f0);
            this.boxbg.drawRoundedRect(-_width*0.5,-_height*0.5,_width,_height,15);
            this.boxbg.beginFill(0xffffff);
            this.boxbg.drawRoundedRect(-_width*0.5,-_height*0.5,_width,_height*0.5,15);
            this.boxbg.position.set(0,0);
            this.addChild(this.boxbg);
            this.boxbg.tint = _color;
           
            this.labelField.position.set(0,0);
            this.labelField.anchor.set(0.5);
            this.labelField.style.fontFamily = "Arial Black",
            this.labelField.style.fill = 0xffffff
            this.labelField.style.fontSize = _fontSize;
            this.labelField.style.align = "center";
            this.labelField.text = cname; 
            this.labelField.style.fontWeight = "bolder";
            this.labelField.resolution = 2;
            this.labelField.style.dropShadow = true;
            this.labelField.style.dropShadowAlpha = 0.5;
            this.labelField.style.dropShadowAngle = 1;
            this.labelField.style.dropShadowDistance = 3;

            this.addChild(this.labelField);

            this.boxbg.interactive = true;
            this.boxbg.buttonMode = true;

            this.boxbg.on("pointerdown",()=>{
                fnc();
                this.boxbg.tint = _color * 2;
            });

            this.boxbg.on("pointerup",()=>{
                this.boxbg.tint = _color;
            });

            this.boxbg.on("pointerout",()=>{
                this.boxbg.tint = _color;
            });

            this.boxbg.on("touchend",()=>{
                this.boxbg.tint = _color;
            });

            this.boxbg.on("touchendoutside",()=>{
                this.boxbg.tint = _color;
            });
    
        }

        public setDisable(){
            this.boxbg.interactive = false;
            this.boxbg.buttonMode = false;
            this.boxbg.tint = 0x999999;
        }

        public setEnable(){
            this.boxbg.interactive = true;
            this.boxbg.buttonMode = true;
            this.boxbg.tint = this._color;
        }

        private drawDot(){
            this.notificationDot.beginFill(0xff0000);
            this.notificationDot.drawCircle(0,0,15);
            this.notificationDot.position.set(60,-30);
            this.addChild(this.notificationDot);

            this.notifLabel.anchor.set(0.5);
            this.notifLabel.style.fontFamily = "Arial",
            this.notifLabel.style.fill = 0xffffff
            this.notifLabel.style.fontSize = 20;
            this.notifLabel.style.align = "center";
            this.notifLabel.text = 5; 
            this.notifLabel.style.fontWeight = "bolder";
            this.notifLabel.resolution = 2;
            this.notificationDot.addChild(this.notifLabel);
        }

        public setNotif(qty:number = 0){
            if(qty<=0){
                this.notifLabel.text = 0;
                this.notificationDot.visible = false;
            }else{
                this.notifLabel.text = qty;
                this.notificationDot.visible = true;
            }
        }

        
        public show(){
            this.visible = true;
        }

        public hide(){
            this.visible = false;
        }
    

}