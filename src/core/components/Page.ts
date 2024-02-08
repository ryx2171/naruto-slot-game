import * as PIXI from "pixi.js"



export default class Page extends PIXI.Sprite{


    constructor(pageName:string=""){
        super();
       
        this.createBase(pageName);
    }

    public createBase(pageName:string){
        let gfxbg:PIXI.Graphics = this.addChild( new PIXI.Graphics() );
        gfxbg.beginFill(0x00aaff);
        gfxbg.drawRect(-360,-640,720,100);
        gfxbg.beginFill(0x00bbff);
        gfxbg.drawRect(-360,-640,720,30);
        gfxbg.beginFill(0x0099ff);
        gfxbg.drawRect(-360,-550,720,10);


        let labelField:PIXI.Text = this.addChild(new PIXI.Text(pageName));
        
        labelField.position.set(-330,-590);
        labelField.anchor.set(0,0.5);
        labelField.style.fontFamily = "Arial Black",
        labelField.style.fill = 0xffffff
        labelField.style.fontSize = 30;
        labelField.style.align = "left";
        labelField.text = pageName; 
        labelField.style.fontWeight = "bolder";
        labelField.resolution = 2;
        labelField.style.dropShadow = true;
        labelField.style.dropShadowAlpha = 0.5;
        labelField.style.dropShadowAngle = 1;
        labelField.style.dropShadowDistance = 5;


    }

    public onShow(){
        console.log("on show")
    }



}