import * as PIXI from "pixi.js"

import Preload from "./Preload";
import PixiPages from "./core/components/PixiPages";
import IntroPage from "./pages/IntroPage";
import GamePage from "./pages/GamePage";
import { setFullscreen } from './core/components/Utils';
import Button from "./core/components/Button";
import {gsap, Sine, Elastic, Power0} from "gsap";


/**
* PixiMain
* @param bar This is the bar parameter
* @returns returns a string version of bar
*/
export default class PixiMain extends PIXI.Application{

    public gameWidth:number;
    public gameHeight:number;
    public preload:Preload;
    public centerX:number;
    public centerY:number;
    public pages:PixiPages[] = [];
    public CANVAS:HTMLElement|null = null;
    public isCenter:boolean = true;
    public isFullscreenMode:boolean = false;
    private gameContainer:PIXI.Container

    //insert custom pages here
    private customPages:any[] = [];


    constructor(_center:boolean = true, isLandscape:boolean = true){

        let gameWidth:number = 720;//
        let gameHeight:number = 1280;//1280

        console.log("orientation",isLandscape);

        if(isLandscape){
            gameWidth = 1280;
            gameHeight = 720;
        }

        super({
            width : gameWidth,
            height : gameHeight,
            backgroundColor : 0xffcc00,
            antialias : false,
            resolution : 2// window.devicePixelRatio
        });

        //delcare
        this.preload = new Preload(this,()=>{
            this.assetsLoadedComplete();
        });  

        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;

        this.isCenter = _center

        if(_center){
            this.centerX = ( this.gameWidth  * 0.5 );
            this.centerY = ( this.gameHeight * 0.5 );
        }else{
            this.centerX = 0;
            this.centerY = 0;
        }
       
        window.addEventListener("load", (event) => {
            console.log('pixijs5.3.12-ts-dev started!!!');
            this.CANVAS = document.getElementById('gamecanvas');
            this.CANVAS?.appendChild(this.view);    
       });


       this.gameContainer = this.stage.addChild(new PIXI.Container());
       this.gameContainer.position.set(this.centerX,this.centerY);
    }

    private assetsLoadedComplete(){
        console.log("assets complete");
        this.customPages = [
                                new GamePage(),
                                /*new QuestPage(this.navButtonLabels[1]),
                                new UpgradePage(this.navButtonLabels[2]),
                                new ShopPage(this.navButtonLabels[3]),*/
                          ]
    
       this.createPage();
  
    }


    private switchPage(pageId:number){
        this.hideAllPages();
        this.pages[pageId].visible = true;
        this.pages[pageId].onShow();
    }

    //pages
    private createPage(){
                let i:number = 0;
                let pageCount:number = this.customPages.length;
                
                for(i=0;i<pageCount; i++){
                    this.pages[i] = this.gameContainer.addChild( new PixiPages(this,this.switchPage,this.customPages[i]) );
                    this.pages[i].visible = false;  
                    if( this.isCenter ){ this.pages[i].anchor.set(0.5) }
                }       
                this.pages[0].visible = true;
    }

    private hideAllPages(){
        let i:number = 0;
        for(i=0;i<this.pages.length; i++){
            this.pages[i].visible = false;
        }
    }

    public setFullscreen(){  
        this.isFullscreenMode = !this.isFullscreenMode;
        setFullscreen(this.isFullscreenMode);
    }



        
}