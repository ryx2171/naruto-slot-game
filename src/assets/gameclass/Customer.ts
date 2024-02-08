
import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power1} from "gsap";
import { PixiAtlas } from '../../core/components/PixiAtlas';

import { generateRandom } from '../../core/components/Utils';


enum WEATHER{
    STORMY = "stormy",
    RAINY = "rainy",
    SUNNY = "sunny",
    SUNNYCLOUDY = "sunnycloudy",
    NIGHT = "night",
    CLOUDY = "cloudy",
}
 
export default class Customer extends PIXI.Container{


        public willBuy:boolean = false;

        public id:number = 0;

        private head:PixiAtlas;
        private shirt:PixiAtlas;
        private feet:PixiAtlas;
        private face_ac:PixiAtlas;
        private head_ac:PixiAtlas;

        private handfront:PixiAtlas;
        private handback:PixiAtlas;

        private shoulder1:PixiAtlas;
        private shoulder2:PixiAtlas;
        public _customerID:number = 0;

        private glasses:string[] = [
            "eye_glasses1",
            "shades1"
        ]


        private boycolors:number[] = [
            0xffcc00,//orange
            0xffffff,//white
            0xaaaaaa,//light gray
            0x333333,//darkgray
            0xff0000,//red
            0x000099,//blue
            0x3333cc,//dark blue
            0x009900//green
        ];

        private girlcolors:number[] = [
            0xffcc00,//orange
            0xffffff,//white
            0xaaaaaa,//lightgray
            0xff9999,//pink
            //0x9999ff,//lavender
            0xccff00//lightgreen
        ];

        constructor(_customerID:number){
            super();

            const gr2  = new PIXI.Graphics();
            gr2.beginFill(0x0);
    
            gr2.drawEllipse(0, 40, 45,15);
            gr2.endFill();
            gr2.alpha = 0.2;
            this.addChild(gr2)

            this._customerID = _customerID;

            this.feet = this.addChild( new PixiAtlas("walk1",{container:this}) );
            this.feet.position.set(0,0);
            this.feet.anchor.set(0.5,0);

            this.handback = this.addChild( new PixiAtlas("hand",{container:this},"hand1") ) 
            this.handback.position.set(20,-25);
            this.handback.anchor.set(0.5,0);
            this.handback.scale.x = -1;

            this.shoulder1 = this.handback.addChild(new PixiAtlas("hand",{container:this},"shoulder1") );
            this.shoulder1 .y = 5;

            this.shirt = this.addChild(new PixiAtlas("shirt",{container:this},"shirt_m_1") );
            this.shirt.position.set(0,10);
            this.shirt.anchor.set(0.5,1);

            this.head = this.addChild( new PixiAtlas("heads",{container:this},"headm2") ) 
            this.head.position.set(0,-22);
            this.head.anchor.set(0.5,1);

            this.head_ac = this.addChild( new PixiAtlas("accessories",{container:this},"umbrella1") ) 
            this.head_ac.position.set(10,-45);
            this.head_ac.anchor.set(0.5,1);
            this.head_ac.visible = false;

            this.face_ac = this.head.addChild( new PixiAtlas("accessories",{container:this},"eye_glasses1") ) 
            this.face_ac.position.set(15,-45);
            this.face_ac.anchor.set(0.5);
            this.face_ac.visible = false;

            this.handfront = this.addChild( new PixiAtlas("hand",{container:this},"hand1") ) 
            this.handfront.position.set(-20,-25);
            this.handfront.anchor.set(0.5,0);

            this.shoulder2 = this.handfront.addChild(new PixiAtlas("hand",{container:this},"shoulder1") );
            this.shoulder2 .y = 5;
        }

        public randomizeCharacter(weather:string = WEATHER.SUNNY){

            console.log("weather",weather);

            let gender:number = generateRandom(2);
            let maxhead:number = 5;

            if(gender == 1){
                //male
                this.shirt.changeTexture("shirt_m_1");
                this.shirt.tint = this.boycolors[ generateRandom(  this.boycolors.length  ) ];
                this.head.changeTexture("headm" + (generateRandom(maxhead)+1) );
           
            }else{
                //female
                this.shirt.changeTexture("shirt_f_1");
                this.shirt.tint = this.girlcolors[ generateRandom(  this.girlcolors.length  ) ];
                this.head.changeTexture("headf" + (generateRandom(maxhead)+1) );
            }

            this.shoulder1.tint = this.shirt.tint;
            this.shoulder2.tint = this.shirt.tint;
            this.adjustToWeather(weather);
        }

        

        public adjustToWeather(weather:string){
            this.face_ac.visible = false;
            this.head_ac.visible = false;

            let rnd:number = 0;

            switch(weather){
                case WEATHER.SUNNY || WEATHER.SUNNYCLOUDY:

                        if(generateRandom(5) == 0){
                            this.face_ac.visible = true;
                            this.face_ac.changeTexture( this.glasses[generateRandom(2)] );
                        }

                        if(generateRandom(3) == 0){
                            this.head_ac.visible = true;
                            this.head_ac.tint = this.boycolors[ generateRandom(  this.boycolors.length  ) ];
                            this.head_ac.changeTexture( "cap1" );

                            if(generateRandom(10) == 0){
                                this.head_ac.changeTexture( "cap1" );
                            }else{
                                this.head_ac.changeTexture( "umbrella1" );
                            }
                        }
                        
                    break;

                case WEATHER.RAINY:
                        this.head_ac.visible = true;
                        this.head_ac.tint = this.boycolors[ generateRandom(  this.boycolors.length  ) ];
                        this.head_ac.changeTexture( "umbrella1" );
                    break;
            }
        }

        public startWalk() {
            let _id=1;
            gsap.to(this.feet,0.15,{ repeat:-1,
                                    onRepeat:()=>{
                                        this.feet.gotoAndStop(_id)
                                        _id+=1;
                                        if(_id>4){
                                            _id=1;
                                        }
                                    }
            });
        }

        public stopWalk() {
            let _id=1;
            gsap.killTweensOf(this.feet);
            this.feet.gotoAndStop(0);
        }

}