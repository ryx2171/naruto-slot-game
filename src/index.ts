console.log("H5 2.0.1");

import SoundFX from './core/components/SFX';
import PixiMain from './PixiMain';
import { isLandscape } from './core/components/Utils';
import * as PIXI from "pixi.js"

const cssstyle = require('./assets/css/style.css');
//
//PIXI.settings.PRECISION_FRAGMENT;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.RESOLUTION = window.devicePixelRatio;
PIXI.settings.ANISOTROPIC_LEVEL = 0;

export const app:PixiMain = new PixiMain(true,isLandscape() );
export const SFX:SoundFX = new SoundFX();


