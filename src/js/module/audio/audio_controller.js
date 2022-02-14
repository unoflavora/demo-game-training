import Phaser from 'phaser'
import { EventEmitter } from 'events'

/**
 * @class
 * This class is a module to manage Screen Utility
 */
export default class AudioController {
    constructor() {
        
        /**
         * @type {Phaser.Scene}
         * @private
         */
        this.scene;

        /**
         * @type {Phaser.Sound.BaseSound}
         * @public
         */
        this.bgm;

        /**
         * @type {boolean}
         */
        this.isAudioActive = false;
        
        this.event = new EventEmitter();

        this.eventName = {
   
        }
    }

    /** @type {AudioController} */
    static instance;

    /** @returns {AudioController} */
    static getInstance = () => {
        if (!AudioController.instance) {
            AudioController.instance = new AudioController();
        }

        return AudioController.instance;
    };

    /**
     * Function to Initialize Screen Utility
    * @param {Phaser.Scene} scene 
    * @param {boolean} isAudioActive 
    * @return {Promise}
    */
    init = (scene, isAudioActive = true) => {
        return new Promise((resolve) => {
            this.scene = scene;
            
            
            this.scene.game.events.on('hidden', () =>{
                this.scene.sound.mute = true;
            },this)

            this.scene.game.events.on('visible', () =>{
                if(this.isAudioActive){
                    this.setAudioActive(true);
                }
                
            },this)

            this.setAudioActive(isAudioActive);
            resolve();  
        });
    }

    /**
    * @param {Boolean} isAudioOn 
    */
    setAudioActive = (isAudioActive = true) =>{
        this.isAudioActive = isAudioActive;
        this.scene.sound.mute = !isAudioActive;
    }

    /**
    * @param {string} key 
    */
    playBGM = (key)=>{

        let config = {
            loop:-1,
            volume: 1,
        }

        if(!this.bgm){
            this.bgm = this.scene.sound.add(key, config);
            this.bgm.play();
        }else if(this.bgm.key != key){
            this.bgm.stop();
            this.bgm = this.scene.sound.add(key, config);
            this.bgm.play();
        }else{
            this.bgm.volume = config.volume;
        }

    }

    /**
     * @param {boolean} fadeout
     */
    stopBGM = (fadeOut = false) =>{
        if(this.bgm)
        {
            if(fadeOut){
                this.scene.tweens.add({
                    targets: this.bgm,
                    volume: 0,
                    duration: 500,
                })
            }else{
                this.bgm.stop();
            }
        }
        
    }

    /**
     * @param {number} value
     * @param {boolean} fade
     */
    setBGMVolume = (value, fade = true) =>{
        if(fade){
            this.scene.tweens.add({
                targets: this.bgm,
                volume: value,
                duration: 300
            })
        }else{
            this.bgm.volume = value;
        }
    }

    /**
     * @param {string} key
     * @param checkOverlap
     */
     play = (key, checkOverlap = false) =>
     {
         if (checkOverlap && this.scene.sound.get(key)) return;
         this.scene.sound.play(key)
     }
 
     /**
      * @param {string} key
      */
     stop(key)
     {
         const correspondingSound = this.scene.sound.get(key);
         if (!correspondingSound) return;
         correspondingSound.stop();
         this.scene.sound.remove(correspondingSound);
     }
 
}