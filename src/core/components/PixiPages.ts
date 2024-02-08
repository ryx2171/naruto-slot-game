import * as PIXI from "pixi.js"
import {gsap, Sine, Elastic, Power1} from "gsap";
import {PixiAtlas} from '../components/PixiAtlas'
import {app} from '../../index'
import PixiMain from "../../PixiMain";

export default class PixiPages extends PIXI.Sprite{


    private spritePage:any

    constructor(app:PixiMain,fnc:Function,_spritePage:any){
        super();

        //init objects
        //init assets
        this.init(app,fnc,_spritePage);
    }

    public init( _app:PixiMain, _fnc:Function, _spritePage:any ){

        this.spritePage = _spritePage;

        let bg:PIXI.Graphics = this.addChild( new PIXI.Graphics() );
        bg.beginFill(0xcccccc);
        if(_app.isCenter){
            bg.drawRect(-app.gameWidth*0.5,-app.gameHeight*0.5,app.gameWidth,app.gameHeight);
        }else{
            bg.drawRect(-app.gameWidth,-app.gameHeight,app.gameWidth,app.gameHeight);
        }
        
        this.addChild(_spritePage);
    }

    public onShow(){
        this.spritePage.onShow();
    }
}//