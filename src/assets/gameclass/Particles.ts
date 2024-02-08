
import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power1} from "gsap";
import { PixiAtlas } from '../../core/components/PixiAtlas';

import { generateRandom } from '../../core/components/Utils'

export default class Particles extends PIXI.Container{

        private particle:PIXI.Graphics;

        private rain1:PIXI.Graphics = new PIXI.Graphics();
        private rain2:PIXI.Graphics = new PIXI.Graphics();
        private rain3:PIXI.Graphics = new PIXI.Graphics();

        constructor(){
            super();
            this.particle = new PIXI.Graphics();
            this.drawComponent();
        }

        private drawComponent() {

            let i:number = 0;
                this.rain1.lineStyle( 1, 0xffffff),0.5;
                this.rain2.lineStyle( 3, 0xffffff),0.5;
                this.rain3.lineStyle( 2, 0xffffff),0.5;

            let xpos:number = 0;
           
            for(i=0; i<15; i++){
                xpos = 45//generateRandom(50,40);
                this.rain1.moveTo(-250 + (i*xpos), generateRandom(900,50)).lineTo( -250 + (i*xpos) , generateRandom(300,50)+100)
            }

            for(i=0; i<15; i++){
                xpos = 50//generateRandom(50,40);
                this.rain2.moveTo(-250 + (i*xpos), generateRandom(500,50)).lineTo( -250 + (i*xpos) , generateRandom(150,50))
            }

            for(i=0; i<15; i++){
                xpos = 40//generateRandom(50,40);
                this.rain3.moveTo(-250 + (i*xpos), generateRandom(100,50)).lineTo( -250 + (i*xpos) , generateRandom(0,50))
            }
       
            this.rain1.position.set(0,0);
            this.particle.addChild(this.rain1);
            this.rain1.y = -800;

            this.rain2.position.set(0,0);
            this.particle.addChild(this.rain2);
            this.rain2.y = -800;

            this.rain3.position.set(0,0);
            this.particle.addChild(this.rain3);
            this.rain3.y = -800;


            this.particle.position.set(-100,-10);
            
            this.addChild(this.particle)
        }

        public animatePartilce(particleID:string = "rain"){
            if(particleID == "rain"){

                this.stopRainParticle();

                gsap.to(this.rain1,0.6,{startAt:{y:-1000,alpha:0.5},y: -100,repeat:-1,alpha:0,delay:0.25});
                gsap.to(this.rain2,0.8,{startAt:{y:-800,alpha:0.5},y: 300,repeat:-1,alpha:0,delay:0.5});
                gsap.to(this.rain3,0.4,{startAt:{y:-1100,alpha:0.5},y: 500,repeat:-1,alpha:0,delay:0.75});
            }

        }


        public stopRainParticle(){
            gsap.killTweensOf(this.rain1);
            gsap.killTweensOf(this.rain2);
            gsap.killTweensOf(this.rain3);

            this.rain1.alpha = 0;
            this.rain2.alpha = 0;
            this.rain3.alpha = 0;
        }



}