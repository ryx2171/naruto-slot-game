import * as PIXI from 'pixi.js';
//import { SmoothGraphics } from "@pixi/graphics-smooth";




export default class Preload {

    public pixiapp:PIXI.Application

    public callBack:Function;

    private preloadbar:PIXI.Graphics;
    private preloadtext:PIXI.Text;
    private preloaderColor:number = 0xffcc00
    

    public constructor(app:PIXI.Application,callBackF:Function){
        this.callBack = callBackF;
        this.pixiapp = app;

        this.preloadbar = new PIXI.Graphics();
        this.preloadtext = new PIXI.Text("0%");



        this.drawPreloader(app);
        this.init();
    }

    private init(){
        
        this.pixiapp.loader.baseUrl = '../assets/img'
        this.pixiapp.loader
        
        //atlas

    
        .add('slot' ,    'slot.json')
        .add('hud' ,    'hud.json')
        .add('naruto' ,    'naruto.json')
        ;//end of preload

        this.pixiapp.loader.onProgress.add((e:PIXI.Loader)=>{
            this.showProgress(e);
        },this.pixiapp);

        this.pixiapp.loader.onComplete.add(this.loadComplete,this);
        //this.pixiapp.loader.onError.add(this.onError,this.pixiapp);
        this.pixiapp.loader.load();
    }


    public loadImage(image:string):PIXI.Texture<PIXI.Resource>|undefined{
        let txtr:PIXI.Texture<PIXI.Resource> = this.pixiapp.loader.resources[image].texture!
        return txtr;
    }


    public loadSpritesheet(atlas:string):PIXI.Spritesheet{
        let txtr:PIXI.Spritesheet = this.pixiapp.loader.resources[atlas].spritesheet!;
        return  txtr;
    }


    private onError(e:Event){
        console.log('error',e);
    }

    private showProgress(e:PIXI.Loader){
        this.preloadbar.scale.set(e.progress*0.01,1);
        this.preloadtext.text = String( Math.floor(Number(e.progress)) + '%' );
    }

    private loadComplete(){
        this.callBack();
        console.log("loadComplete");
    }

    private drawPreloader(app:PIXI.Application){

        let boxbg:PIXI.Graphics = app.stage.addChild(new PIXI.Graphics() );
            boxbg.beginFill(0x333333);

            boxbg.drawRect(-app.screen.width*0.5,-app.screen.height*0.5,app.screen.width,app.screen.height);
            boxbg.position.set(app.screen.width*0.5,app.screen.height*0.5);


        let loaderbg:PIXI.Graphics = app.stage.addChild(new PIXI.Graphics() );
            loaderbg.beginFill(0x0,1);
            loaderbg.drawRect(0,0,app.screen.width,50);
            loaderbg.position.set(0,app.screen.height-50);

            this.preloadbar = app.stage.addChild(new PIXI.Graphics() );
            this.preloadbar.beginFill(this.preloaderColor,1);
            this.preloadbar.drawRect(0,0,app.screen.width,50);
            this.preloadbar.scale.x = 0;
            this.preloadbar.position.set(0,app.screen.height-50);

            app.stage.addChild(this.preloadtext);
            this.preloadtext.position.set(app.screen.width*0.5-50,app.screen.height-50);
            this.preloadtext.style = {
                "fontSize":30,
                "fontWeight":"bolder",
                "fill":0xffffff,
                "stroke":0xccaa00,
                "strokeThickness":10
            }
    }   


}

