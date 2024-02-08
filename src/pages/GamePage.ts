import * as PIXI from "pixi.js"
import Page from "../core/components/Page";
import { PixiAtlas } from "../core/components/PixiAtlas";
import {gsap, Sine, Elastic, Power0} from "gsap";
import Slotmachine from "../custom/Slotmachine";
import { SFX } from "../index";



export default class GamePage extends Page{


    private gameContainer:PIXI.Container = new PIXI.Container();
    private slotmachine:Slotmachine = new Slotmachine();

    private skyBg:PIXI.Sprite[] = [];
    private bg:PIXI.Sprite = new PIXI.Sprite();

    private naruto_idle:PIXI.Sprite = new PIXI.Sprite();

    private naruto_normal:PIXI.Sprite = new PIXI.Sprite();
    private naruto_aura:PIXI.Sprite = new PIXI.Sprite();

    private naruto_normal2:PIXI.Sprite = new PIXI.Sprite();
    private naruto_aura2:PIXI.Sprite = new PIXI.Sprite();

    private smoke:PIXI.Sprite = new PIXI.Sprite();
    private smoke2:PIXI.Sprite = new PIXI.Sprite();

    private hud:PIXI.Sprite = new PIXI.Sprite();
    private btn_spin:PIXI.Sprite = new PIXI.Sprite();
    private btn_auto:PIXI.Sprite = new PIXI.Sprite();
    private btn_maxbet:PIXI.Sprite = new PIXI.Sprite();

    private btn_add:PIXI.Sprite = new PIXI.Sprite();
    private btn_minus:PIXI.Sprite = new PIXI.Sprite();
    
    
    private spinCounterId:number = 0;
   
    constructor(){
        super();

        //init assets
        this.init();
    }
    public init(){
            this.addChild(this.gameContainer);
            this.drawBg();
            this.drawHud();
            this.drawCharacter();
            this.addSlotMachine();

            this.addControl();
    }

    private drawBg(){

        let i:number = 0;
        for( i=0 ; i<3; i++){
            this.skyBg[i] = this.addChild( new PIXI.Sprite( PIXI.Texture.from('./assets/img/bg/sky-bg.png')) );
            this.skyBg[i].anchor.set(0.5);
            this.skyBg[i].position.set(i* (1738),-200);
            if(i % 2 != 0){
                this.skyBg[i].scale.set(-1,1);
            }
        }

        this.bg = this.addChild( new PIXI.Sprite( PIXI.Texture.from('./assets/img/bg/konoha-bg.png')) );
        this.bg.anchor.set(0.5);
        this.bg.y = 220;
    
        //animate sky
        this.animateSky(this.skyBg);
    }


    private animateSky(sky:PIXI.Sprite[]){
        let spd:number = 70;
        gsap.to(sky[0],spd ,{x:-1738,ease:Power0.easeNone,repeat:-1,repeatDelay:spd});
        gsap.to(sky[1],spd*2,{x:-1738,ease:Power0.easeNone,repeat:-1});
        gsap.to(sky[2],spd*2,{x:0,ease:Power0.easeNone,repeat:-1});
    }


    private drawCharacter(){
        this.naruto_idle = this.addChild( new PIXI.Sprite( PIXI.Texture.from('./assets/img/naruto_idle.png')) );
        this.naruto_idle.anchor.set(0.5);
        this.naruto_idle.position.set(-525,0);
        this.drawNarutoClone();
    }


    private drawNarutoClone(){
        this.naruto_normal = this.addChild( new PixiAtlas("naruto",{container:this},"naruto"), );
        this.naruto_normal.position.set(-520,-0);
        this.naruto_normal.anchor.set(0.5,0.5);
        this.naruto_normal.visible = false;

        this.naruto_aura = this.naruto_normal.addChild( new PixiAtlas("naruto",{container:this},"naruto_b"), );
        this.naruto_aura.anchor.set(0.5,0.5);
        this.naruto_aura.visible = false;

        this.naruto_normal2 = this.addChild( new PixiAtlas("naruto",{container:this},"naruto"), );
        this.naruto_normal2.position.set(520,-0);
        this.naruto_normal2.anchor.set(0.5,0.5);
        this.naruto_normal2.scale.x = -1;
        this.naruto_normal2.visible = false;

        this.naruto_aura2 = this.naruto_normal2.addChild( new PixiAtlas("naruto",{container:this},"naruto_b"), );
        this.naruto_aura2.anchor.set(0.5,0.5);
        this.naruto_aura2.visible = false;

        this.smoke = this.addChild( new PIXI.Sprite( PIXI.Texture.from('./assets/img/smoke.png')) );
        this.smoke.anchor.set(0.5);
        this.smoke.position.set(-520,50);
        this.smoke.alpha = 0;

        this.smoke2 = this.addChild( new PIXI.Sprite( PIXI.Texture.from('./assets/img/smoke.png')) );
        this.smoke2.anchor.set(0.5);
        this.smoke2.position.set(520,50);
        this.smoke2.alpha = 0;
    }

    
    private drawHud(){
        this.hud = this.addChild( new PixiAtlas("hud",{container:this},"hud"), );
        this.hud.position.set(0,310);
        this.hud.anchor.set(0.5,0.5);

        this.btn_spin = this.hud.addChild( new PixiAtlas("hud",{container:this},"btn_spin"), );
        this.btn_spin.position.set(0,-5);
        this.btn_spin.anchor.set(0.5,0.5);

        this.btn_auto = this.hud.addChild( new PixiAtlas("hud",{container:this},"btn_auto"), );
        this.btn_auto.position.set(120,-5);
        this.btn_auto.anchor.set(0.5,0.5);

        this.btn_maxbet = this.hud.addChild( new PixiAtlas("hud",{container:this},"btn_maxbet"), );
        this.btn_maxbet.position.set(-120,-5);
        this.btn_maxbet.anchor.set(0.5,0.5);

        this.btn_add = this.hud.addChild( new PixiAtlas("hud",{container:this},"btn_add"), );
        this.btn_add.position.set(-426,10);
        this.btn_add.anchor.set(0.5,0.5);

        this.btn_minus = this.hud.addChild( new PixiAtlas("hud",{container:this},"btn_minus"), );
        this.btn_minus.position.set(-580,10);
        this.btn_minus.anchor.set(0.5,0.5);
    }


    private showClone(){
        SFX.play("sfx-kagebunshin");

       gsap.delayedCall(2,()=>{
            this.naruto_normal.visible = true;
            this.naruto_normal.alpha = 0;
            this.naruto_normal2.visible = true;
            this.naruto_normal2.alpha = 0;
            this.naruto_idle.visible = false;

            this.animateSmoke();

            gsap.to(this.naruto_normal2,1,{alpha:1});
            gsap.to(this.naruto_normal,1,{alpha:1});
       })
    }


    private animateSmoke(){
        this.smoke.alpha = 0;
        this.smoke.scale.set(1);
        this.smoke2.alpha = 0;
        this.smoke2.scale.set(1);
        
        gsap.to(this.smoke,0.45,{alpha:1,repeat:1,yoyo:true});
        gsap.to(this.smoke.scale,1,{x:1.5,y:1.5,yoyo:true});

        gsap.to(this.smoke2,0.45,{alpha:1,repeat:1,yoyo:true});
        gsap.to(this.smoke2.scale,1,{x:2,y:2,yoyo:true});
    }   
    
    private animateFreeSpin(){
        this.animateNaruto(true);
        this.toggleMode("freespin")
        SFX.play("sfx-sasuke");
    }

    private removeFreeSpin(){
        this.animateNaruto(false);
        this.toggleMode("normal")
        SFX.play("sfx-clone-dispel");
    }

    private toggleMode(mode:string = "normal"){
        if(mode == "normal"){
            this.skyBg[0].tint = 0xffffff;
            this.skyBg[1].tint = 0xffffff;
            this.skyBg[2].tint = 0xffffff;
            this.bg.tint = 0xffffff;
            
            this.naruto_aura.visible = false;
            this.naruto_normal.visible = false;
            this.naruto_aura2.visible = false;
            this.naruto_normal2.visible = false;
            this.animateSmoke();
            this.naruto_idle.visible = true;
          
        }else
        if(mode == "freespin"){
            this.skyBg[0].tint = 0x660000;
            this.skyBg[1].tint = 0x660000;
            this.skyBg[2].tint = 0x660000;
            this.bg.tint = 0x663333;
            this.naruto_aura.visible = true;
            this.naruto_aura.alpha = 1;
            this.naruto_aura2.visible = true;
            this.naruto_aura2.alpha = 1;
        }
    }

    private animateNaruto(id:boolean){
        if(id== false){
            gsap.killTweensOf(this.naruto_aura);
            gsap.killTweensOf(this.naruto_normal);
            gsap.killTweensOf(this.naruto_aura2);
            gsap.killTweensOf(this.naruto_normal2);
            this.naruto_normal.position.set(-520,0);
        }else{
            gsap.to(this.naruto_aura,0.5,{alpha:0.3,repeat:-1,yoyo:true,ease:Power0.easeNone});
            gsap.to(this.naruto_normal,0.5,{y:5,repeat:-1,yoyo:true,ease:Power0.easeNone});
            gsap.to(this.naruto_aura2,0.5,{alpha:0.3,repeat:-1,yoyo:true,ease:Power0.easeNone});
            gsap.to(this.naruto_normal2,0.5,{y:5,repeat:-1,yoyo:true,ease:Power0.easeNone});
        }
    }

    private addSlotMachine(){
        this.addChild(this.slotmachine );
        let logo:PixiAtlas = this.addChild( new PixiAtlas("slot",{container:this},"logo"), );
            logo.position.set(0,-280);
            logo.anchor.set(0.5,0.5);
    }

    private checkScenes(){
        switch(this.spinCounterId){
            case 5:
                this.showClone();
                break;

            case 10:
                this.animateFreeSpin();
                break;
            case 15:
                this.removeFreeSpin();
                break;
        }
        
        if(this.spinCounterId > 15){
            this.spinCounterId = 0;
        }
    }


    private addControl(){
        
        this.btn_spin.interactive = true;
        this.btn_spin.on("pointerup",()=>{
            this.btn_spin.interactive = false;
            this.spinSlot();
        });
    }
    
    private spinSlot(){

        SFX.play("bgm-naruto-theme");

        this.slotmachine.updateReelTexture();
        this.slotmachine.animateReels();
        this.spinCounterId += 1;
        this.checkScenes();

        this.btn_add.scale.set(1);
        gsap.to(this.btn_spin.scale,0.1,{x:0.8,y:0.8,repeat:1,yoyo:true});

        gsap.delayedCall(0.15*10,()=>{
            this.btn_spin.interactive = true;
            SFX.stop("bgm-naruto-theme");
        });
    }

}//

