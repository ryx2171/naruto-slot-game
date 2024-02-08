
import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power1} from "gsap";
import { PixiAtlas } from '../../core/components/PixiAtlas';

import { generateRandom } from '../../core/components/Utils';
import Button from "../../core/components/Button";



 
export default class DayBoard extends PIXI.Sprite{

       
        private weatherbar:PixiAtlas
        private startButton:Button

       private fnc:Function

        private TextFormat:PIXI.TextStyle = new PIXI.TextStyle({
            fontFamily:"Arial",
            fontSize:50,
            fontWeight:"bolder",
            fill:0xffffff
        });

        private DayField:PIXI.Text = new PIXI.Text("Test",this.TextFormat);
        private TempField:PIXI.Text = new PIXI.Text("Word",this.TextFormat);

        //private head:PixiAtlas;
        constructor(fnc:Function){

            super();

            this.fnc = fnc;

            const bg  = new PIXI.Graphics();
            bg.beginFill(0xffffff);
            bg.lineStyle(5,0x00ccff)
            bg.drawRoundedRect(-300,-550, 600,1000,20);
            bg.endFill();

            this.addChild(bg)

            this.weatherbar = this.addChild( new PixiAtlas("weather",{container:this},"sunny") );
            this.weatherbar.position.set(0,-520);
            this.weatherbar.anchor.set(0.5,0);

            this.startButton = new Button(()=>{
                console.log("start");
                fnc();
            },"START",200,80,0x99ff00,35);  

            this.addChild(this.startButton);
            this.startButton.y = 430;

            this.TempField.text = "31 °C"
            this.TempField.position.set(-50,-450)
            this.TempField.style.fontSize = 20;

            this.DayField.text = "FRI 1";
            this.DayField.position.set(-220,-450)
            this.TempField.style.fontSize = 50;

            this.addChild(this.TempField);
            this.addChild(this.DayField);

        }


        public closeBoard(){
            this.visible = false;
        }

        public showBoard(){
            this.visible = true;
        }
}