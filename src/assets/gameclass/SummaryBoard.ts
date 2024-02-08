
import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power1} from "gsap";
import { PixiAtlas } from '../../core/components/PixiAtlas';

import { generateRandom } from '../../core/components/Utils';
import Button from "../../core/components/Button";


export default class SummaryBoard extends PIXI.Sprite{

        private closeButton:Button

       private fnc:Function

        private TextFormat:PIXI.TextStyle = new PIXI.TextStyle({
            fontFamily:"Arial",
            fontSize:50,
            fontWeight:"bolder",
            fill:0xffffff
        });

        private titleField:PIXI.Text = new PIXI.Text("Test",this.TextFormat);

        private statsLabelField:PIXI.Text[] = [];
        private statsValueField:PIXI.Text[] = []; 

        private statsLabels:string[] = ["Total Cups Sold","Satisfied Customer","Total Earnings"];
        private statsValue:number[] = [0,0,0];


        //private head:PixiAtlas;
        constructor(fnc:Function){

            super();

            this.fnc = fnc;

            const bg  = this.addChild(new PIXI.Graphics());
            bg.beginFill(0x00ccff);
            bg.lineStyle(5,0x00ccff)
            bg.drawRoundedRect(-300,-550, 600,1000,20);
            bg.endFill();

            this.closeButton = new Button(()=>{
                console.log("close");
                fnc();
            },"CLOSE",200,80,0x99ff00,35);  

            this.addChild(this.closeButton);
            this.closeButton.y = 430;

            //texts
            this.titleField.position.set(-220,-520);
            this.titleField.text = "That's all for today!";
            this.addChild(this.titleField);

           

            let i:number = 0;
            for(i=0; i<this.statsLabels.length; i++){
                this.statsLabelField[i] =  this.addChild(new PIXI.Text(this.statsLabels[i]+": ",{fontSize:30,fill:0xffffff,fontWeight:"bolder"}));
                this.statsLabelField[i].position.set(-250,-400 +(60*i) );
            }

            for(i=0; i<this.statsValue.length; i++){
                this.statsValueField[i] =  this.addChild(new PIXI.Text(this.statsValue[i],{fontSize:30,fill:0xffffff,fontWeight:"bolder"}));
                this.statsValueField[i].position.set(200,-400 +(60*i) );
            }
        }

        public closeBoard(){
            this.visible = false;
        }

        public showBoard(){
            this.visible = true;
        }

        public updateValues(arr:number[] = [10,10,10]){
            let i:number = 0;
            
            for(i=0; i<this.statsLabels.length; i++){
                let a:PIXI.Text = this.statsLabelField[i];
                let b:PIXI.Text = this.statsValueField[i];
                let val:number = arr[i]
                
                a.alpha = b.alpha = 0;
                b.text = 0;

                gsap.to([a,b],1,{alpha:1,delay:(2*i),onComplete:()=>{
                    b.text = val
                }});
            }
        }

}