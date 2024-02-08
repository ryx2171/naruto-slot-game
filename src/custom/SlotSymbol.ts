
import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power1} from "gsap";
import { PixiAtlas } from '../core/components/PixiAtlas';
import { generateRandom } from "../core/components/Utils";


 
export default class SlotSymbol extends PIXI.Sprite{


        private symbol_names:string[] = [
            "symbol_wild",
            "symbol_scatter",
            "symbol_freespin",
            "symbol_naruto",
            "symbol_sasuke",
            "symbol_sakura",
            "symbol_gaara",
            "symbol_scroll",
            "symbol_ramen",
            "symbol_a",
            "symbol_k",
            "symbol_q",
            "symbol_j",
            "symbol_10",
            "symbol_9",
        ]


        public id:number = 0;
        private background:PixiAtlas;
        private front:PixiAtlas;
 
        constructor(symbol_id:number = 0){
            super();
            this.background = this.addChild( new PixiAtlas("slot",{container:this},this.symbol_names[symbol_id]     ) );
            this.background.position.set(0,0);
            this.background.anchor.set(0.5,0);

            this.front = this.addChild( new PixiAtlas("slot",{container:this},this.symbol_names[symbol_id] + "_b"    ) );
            this.front.position.set(0,0);
            this.front.anchor.set(0.5,0);
            this.front.visible = false;

            
        }

        private animateSymbol(){
            this.front.visible = true;
            gsap.to(this.front,0.25,{alpha:0.1,repeat:5,yoyo:true})
        }


        public updateSymbol(id:number){
            this.background.changeTexture(this.symbol_names[id]);
            this.front.changeTexture(this.symbol_names[id] + "_b");
        }


}