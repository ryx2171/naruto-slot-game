
import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power0} from "gsap";
import { PixiAtlas } from '../core/components/PixiAtlas';
import Reel from "./Reel";
import { generateRandom } from "../core/components/Utils";


 
export default class Slotmachine extends PIXI.Container{


        private blurFilter = new PIXI.filters.BlurFilter()



        public reel_id:number[][] = [
            [12,1,2,3,8,5,6,7,1,6,4,1,12,0,5,9,5,14,2,8,3,6,1,0,3,9,12,13,5,6,7,1,6,7,1,12,8],
            [11,4,6,9,12,13,5,6,7,1,1,4,9,5,14,2,8,3,6,1,3,9,12,13,6,1,3,9,7,1,12,6,0,1,3,9],
            [5,1,6,11,0,15,12,0,3,9,12,13,5,6,7,1,6,14,0,1,3,4,5,6,7,1,6,7,1,0,12,5,9,12,13],
            [6,3,6,14,11,1,7,14,12,7,1,2,3,4,5,6,7,1,6,7,1,12,0,5,9,5,14,2,8,3,6,1,3,9,12,13],
            [0,8,11,14,11,1,7,14,12,7,1,2,3,4,5,6,7,1,6,7,1,12,5,9,5,14,2,8,3,6,1,3,9,12,13,0]
        ];

        public id:number = 0;
        private reeltop:Reel[] = [];//this will reveal the final result;
        private reelbot:Reel[] = [];// this is just for animation

        private previousReelIds:number[] = [];

 
        constructor(){

            super();

          const bgmask  = new PIXI.Graphics();
                bgmask.beginFill(0xffffff,0.5);
                bgmask.drawRoundedRect(-410,-240, 840,490,20);
                bgmask.endFill();
                this.addChild(bgmask)
                this.mask = bgmask;

          const bg  = new PIXI.Graphics();
                bg.beginFill(0xffffff,0.15);
                bg.drawRoundedRect(-410,-240, 840,490,20);
                bg.endFill();
                this.addChild(bg)

                let i:number = 0;

                for(i=0; i<5; i++){
                        this.reeltop[i] = this.addChild( new Reel());
                        this.reeltop[i].position.set(-330 + (165*i),-740);
                        this.reelbot[i] = this.addChild( new Reel());
                        this.reelbot[i].position.set(-330 + (165*i),-250);
                }

                this.updateReelTexture();
                this.updateBottomReelTexture(this.previousReelIds);
        }

        public animateReels(){

            let i:number = 0;
            let spd:number = 0.15;
            
            //reset
            for(i=0; i<5; i++){
                this.reeltop[i].position.y = -750;
                this.reelbot[i].position.y= -250;
            }


            for(i=0; i<5; i++){
                let a:number = i
                gsap.to(this.reeltop[i],spd,{y:-250,ease:Power0.easeNone,repeat:5,delay:i*0.1,
                    onStart:()=>{
                        this.reeltop[a].filters = [this.blurFilter];
                    }
                });
                gsap.to(this.reelbot[i],spd,{y:250,ease:Power0.easeNone,repeat:5,delay:i*0.1,
                    onStart:()=>{
                        this.reelbot[a].filters = [this.blurFilter]
                    }
                });
            }

            gsap.delayedCall(spd*5,()=>{
                this.updateBottomReelTexture(this.previousReelIds)
                for(i=0; i<5; i++){
                    this.reeltop[i].filters = [];
                    this.reelbot[i].filters = [];
                }
            })
        }



        public updateReelTexture(){
            let i:number = 0;
            let randomNumbers:number[] = [];

            for(i=0;i<5;i++){
                randomNumbers[i] = generateRandom(this.reel_id[i].length)
                this.reeltop[i].updateReelSymbols( this.generateReelId(i,randomNumbers[i]) );
            }

            this.previousReelIds = randomNumbers;
        }

        private updateBottomReelTexture(prevID:number[]){
            let i:number = 0;
            for(i=0;i<5;i++){
                this.reelbot[i].updateReelSymbols( this.generateReelId(i,prevID[i]) );
            }
        }

        private generateReelId(reelId:number,idStop:number):number[]{

            let temp_arr:number[] = this.reel_id[reelId].concat(this.reel_id[reelId]);
            let reel_ids:number[] = [ 
                                      Number( temp_arr.at(idStop) ), 
                                      Number( temp_arr.at(idStop+1) ),
                                      Number( temp_arr.at(idStop+2) )
                                    ];

            return reel_ids;
        }

        
}