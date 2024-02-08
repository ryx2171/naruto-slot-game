
import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power0} from "gsap";


 
export default class PurchaseProgressBar extends PIXI.Container{

    private bgBar:PIXI.Graphics = new PIXI.Graphics();
    private progressBar:PIXI.Graphics = new PIXI.Graphics();

        constructor(){
            super();
            this.init();
        }

        private init() {
            this.bgBar.beginFill(0x0)
            this.bgBar.drawRect(0,0,100,20);
            this.bgBar.x = -50;
            this.addChild(this.bgBar);

            this.progressBar.beginFill(0xffcc00);
            this.progressBar.x = -50;
            this.progressBar.drawRect(4,0,92,16);
            this.addChild(this.progressBar);
            this.visible = false;
        }

        public processPurchase(_time:number=1){
            this.visible = true;
            this.progressBar.scale.x = 0;
            gsap.to(this.progressBar.scale,_time,{x:1,onComplete:()=>{
                this.visible = false;
            }});
        }

}

