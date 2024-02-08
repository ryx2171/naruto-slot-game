
import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power1} from "gsap";
import { PixiAtlas } from '../core/components/PixiAtlas';
import SlotSymbol from "./SlotSymbol";


 
export default class Reel extends PIXI.Container{


        public id:number = 0;
        public symbol:SlotSymbol[] = [];

 
        constructor(num:number[]=[0,1,2]){
            super();

            /*const bg  = new PIXI.Graphics();
            bg.beginFill(0xffffff,0.15);
            bg.drawRoundedRect(-80,0, 160,510,20);
            bg.endFill();
            this.addChild(bg)*/

            let i:number = 0;
            for(i=0; i<3; i++){
                this.symbol[i] = this.addChild(new SlotSymbol(num[i]));
                this.symbol[i].anchor.set(0.5);
                this.symbol[i].position.set(0,165 * i);
            }
        }

        public animateSymbols(){
            //animateSymbol
        }

        public updateReelSymbols(num:number[] = [0,0,0]){
            this.symbol[0].updateSymbol(num[0]);
            this.symbol[1].updateSymbol(num[1]);
            this.symbol[2].updateSymbol(num[2]);
        }

}