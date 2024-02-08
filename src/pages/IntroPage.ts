import * as PIXI from "pixi.js"
import Page from "../core/components/Page";



export default class IntroPage extends Page{


    constructor(pageName:string=""){
        super(pageName);
        this.init();
    }

    public init(){
        let bg:PIXI.Sprite = this.addChild(new PIXI.Sprite( PIXI.Texture.from('./assets/img/bg/bg.png')) );
            bg.anchor.set(0.5);
            this.addChild(bg);
    }


    public onShow(){
        //this.questPanel[0].resetPosition();
    }


}