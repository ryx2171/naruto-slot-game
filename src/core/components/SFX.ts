//My custom class for Howler Js
//I made this to control sound easier
import { Howl, Howler } from "howler";

export default class SoundFX {

  public BGM_VOLUME:number = 0;
  public SFX_VOLUME:number = 0;
  public SOUND_STATUS:string = "";

  private SoundList:[string,Howl][];

  constructor() {
    this.BGM_VOLUME = 0.8;

    this.SFX_VOLUME = 0.5;
    this.SOUND_STATUS = "NORMAL";
    this.SoundList = [];
    this.initSounds();
  }

  //init sounds should be customized and load data from JSON file
  //still work in progress for this class;

  private initSounds() {

    let dir:string = "assets/sndm4a/";
    let ext:string = ".m4a";

    let sound_list:[string,boolean,number][]  =
    
    [
      //title / loop / volume
      //sfx
      ["sfx-kagebunshin", false, this.SFX_VOLUME],
      ["sfx-clone-dispel", false, this.SFX_VOLUME],
      ["sfx-clone", false, this.SFX_VOLUME],
      ["sfx-sasuke", false, this.SFX_VOLUME],

      //bgm
      ["bgm-naruto-theme", true, this.BGM_VOLUME],
    
    ];

    let i:number = 0;
    let len:number = sound_list.length;

    for (i = 0; i < len; i++) {
      //this[sound_list[i][0]] = new Howl({
      this.SoundList[i] = [sound_list[i][0], 
                      new Howl({ 
                          src: [dir + sound_list[i][0] + ext],
                          loop: sound_list[i][1],
                          volume: sound_list[i][2],
                      })];
    }
  }


  private searchID(_id:string, arr:[string,Howl][]){
      let i:number = 0;
      for(i=0 ; i<arr.length; i++){
          if(arr[i][0] == _id){
              return i;
          }
      }

      return -1;
  }

  public play(snd:string, _rate:number = 1) {

      let _id:number = this.searchID(snd,this.SoundList);

      if(_id == -1){
          return;
      }
      this.SoundList[_id][1].rate(_rate);
      this.SoundList[_id][1].play();
  }

  public stop(snd:string) {

    let _id:number = this.searchID(snd,this.SoundList);
    if(_id == -1){
        return;
    }
    this.SoundList[_id][1].stop();
}


  mute(id:boolean) {
    if (id) {
      Howler.volume(0);
    } else {
      Howler.volume(1);
    }
    
  }

  toggleAudio(_id:boolean, _idle:boolean) {
    if (_id == false) {
      Howler.mute(true);
      if (_idle == false) {
        this.SOUND_STATUS = "MUTED";
      }
    } else if (_id == true) {
      Howler.mute(false);
      if (_idle == false) {
        this.SOUND_STATUS = "NORMAL";
      }
    }
  }

  fadeOutPlay(_id:string, _delay:number, _duration:number) {
    let self = this;

    this.play(_id);
    //this[_id].volume(1);

    let obj = { volume: 1 };

    gsap.to(obj, _duration, {
      volume: 0,
      delay: _delay,
      onUpdate: function () {
        //SFX[_id].volume(obj.volume);
      },
      onComplete: function () {
        self.stop(_id);
        //  SFX[_id].volume(1);
      },
    });
  }
}
