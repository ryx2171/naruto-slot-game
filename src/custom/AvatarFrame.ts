import * as PIXI from "pixi.js"


export default class AvatarFrame extends PIXI.Sprite{

        public boxbg:PIXI.Graphics = new PIXI.Graphics();

        public cvalueField:PIXI.Text = new PIXI.Text("");
        public labelField:PIXI.Text = new PIXI.Text("");
        public notificationDot:PIXI.Graphics = new PIXI.Graphics();
        public notifLabel:PIXI.Text = new PIXI.Text("");

        constructor(fnc:Function,cname:string="button",_width:number=80,_height:number=80,_color:number=0xcccccc,_fontSize:number = 20){
            super();
            this.drawComponent(fnc,cname,_width,_height,_color,_fontSize);
            //this.drawDot(_width);
        }
        
        private drawComponent(fnc:Function,cname:string,_width:number,_height:number,_color:number,_fontSize:number) {
           
            
            this.boxbg.beginFill(0xcccccc);
            this.boxbg.drawRoundedRect(-_width*0.5,5,_width,_height,15);
            this.boxbg.beginFill(0xf0f0f0);
            this.boxbg.drawRoundedRect(-_width*0.5,0,_width,_height,15);
    
            this.boxbg.position.set(0,0);
            this.addChild(this.boxbg);
            //this.boxbg.tint = _color;
           
            this.labelField.position.set((-_width*0.5)+20,+20);
            this.labelField.anchor.set(0,0.5);
            this.labelField.style.fontFamily = "Arial",
            this.labelField.style.fill = 0x0
            this.labelField.style.fontSize = _fontSize;
            this.labelField.style.align = "left";
            this.labelField.text = cname; 
            this.labelField.style.fontWeight = "bolder";
            this.labelField.resolution = 2;
            //this.labelField.style.dropShadow = true;
            //this.labelField.style.dropShadowAlpha = 0.5;
            //this.labelField.style.dropShadowAngle = 1;
            //this.labelField.style.dropShadowDistance = 3;

            this.addChild(this.labelField);

            /*this.boxbg.interactive = true;
            this.boxbg.buttonMode = true;

            this.boxbg.on("pointerdown",()=>{
                fnc();
                this.boxbg.tint = _color * 2;
            });

            this.boxbg.on("pointerup",()=>{
                this.boxbg.tint = _color;
            });

            this.boxbg.on("pointerout",()=>{
                this.boxbg.tint = _color;
            });

            this.boxbg.on("touchend",()=>{
                this.boxbg.tint = _color;
            });

            this.boxbg.on("touchendoutside",()=>{
                this.boxbg.tint = _color;
            });*/
        
        
        }


        private drawDot(_width:number){
            this.notificationDot.beginFill(0xff3333);
            this.notificationDot.drawCircle(0,0,6);
            this.notificationDot.position.set( (_width*0.5 - 20),30);
            this.addChild(this.notificationDot);

            /*  this.notifLabel.anchor.set(0.5);
                this.notifLabel.style.fontFamily = "Arial Black",
                this.notifLabel.style.fill = 0xffffff
                this.notifLabel.style.fontSize = 20;
                this.notifLabel.style.align = "center";
                this.notifLabel.text = 5; 
                this.notifLabel.style.fontWeight = "bolder";
                this.notifLabel.resolution = 2;
                this.notificationDot.addChild(this.notifLabel);*/
        }

        public setNotif(qty:number = 0){
            if(qty<=0){
                //this.notifLabel.text = 0;
                this.notificationDot.visible = false;
            }else{
                //this.notifLabel.text = qty;
                this.notificationDot.visible = true;
            }
        }

    

}