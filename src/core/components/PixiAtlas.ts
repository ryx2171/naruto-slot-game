import * as PIXI from 'pixi.js'
import {gsap, Sine, Elastic, Power0} from "gsap";
import {app} from '../../index'

//-------------------------------------------------------------
export class PixiAtlas extends PIXI.AnimatedSprite{

	public atlas:any;
	public _id:number;

	//dragData
	public dragging:boolean = false;
	public mouse_pointer_x:number = 0;
	public mouse_pointer_y:number = 0;
	public dragOccupied:boolean = false;
	public eventData:PIXI.InteractionData;

	private animteOn:PIXI.Sprite = new PIXI.Sprite();

	constructor(sheet:string,obj:any,_id:string=""){

			let atlas:any = null;

			if(_id==undefined){
				atlas = app.preload.loadSpritesheet(sheet)?.animations[sheet];
			}else{
				atlas = app.preload.loadSpritesheet(sheet)?.animations["img"];
			}

			super(atlas);

			this._id = 0;

			this.anchor.set(0.5);	
			this.animationSpeed = 1;
			this.loop = false;

			this.dragging = false;
			this.dragOccupied = false;

			this.atlas = atlas;
			this.init(obj,_id);

			this.eventData = new PIXI.InteractionData();
	}

	init(parent:any,_id:string){
			parent.container.addChild(this);
			if(_id != undefined){
				this.changeTexture(_id)
			}
	}

	public changeTexture(_id:string){
		let self = this;

		this.atlas.forEach(function(obj:any,atlas_id:number){

			let str:string = _id + "0000"; 
			let arr:string[] = [str];
			let otxr:string[] = obj.textureCacheIds;

			if(JSON.stringify(otxr) === JSON.stringify(arr)){
				self.gotoAndStop(atlas_id);
				return;
			}
		})
	}

	public changeAtlas(sheet:string,obj:any,_id:string=""){
		this.textures = app.preload.loadSpritesheet(sheet).animations["img"];
	}

	public animate(frames:number ,loop:boolean = true ,_spd:number = 5){
		
		let page:number = 0;
		let ctr:number = 0;

		gsap.killTweensOf( this.animteOn );

		gsap.to(this.animteOn,0.5,{
			repeat:-1,
			onUpdate:()=>{
				ctr+=1;
				if(ctr>_spd){
					ctr=0;
					page+=1;
					if(page>=frames){
						page = 0;
					}
					this.gotoAndStop(page);
				}	
			}
		});
	}

	public stopAnimate(){
		gsap.killTweensOf( this.animteOn );
		this.gotoAndStop(0);
	}
}
