import { PixiAtlas } from "./PixiAtlas";

export default class PixiAnimation{

        constructor(){
                //this.animateMotionPath(_obj,_pts,_delay);
        }

        public animateMotionPath(obj:PixiAtlas,pts:number[][],_delay:number = 0){
            gsap.to(obj, pts.length*3, {
                motionPath: { 
                    path: this.generatePath(pts),
                    autoRotate: true ,
                    useRadians: true,
                    alignOrigin: [0.5, 0.5],
                    curviness: 1,
                },
                repeat: -1,
                delay:_delay,
                ease:Power0.easeNone
            });
        }

        
        private generatePath(pts:number[][]){
            let values = [];
            for (var i = 0; i < pts.length; i ++) {
                values.push({ x: pts[i][0], y: pts[i][1]+0});
            }
            return values;
        }

}