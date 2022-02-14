import {BaseController} from "../../../../../core/";
import CharacterView from "./character_view";
import AudioController from "../../../../../module/audio/audio_controller";
import { AudioAsset } from "../../../../../assetLibrary";
import GameplayData from "../../../gameplay_data";

/**
 * @class Character controller for explore using physics
 */
export default class CharacterController extends BaseController {

    /**@type {"male" | "female"} */
    gender;
    /**@type {"l" | "u" | "r" | "d"} */
    direction;
    /**@type {number} */
    speed;

    /**@param {Phaser.Scene} scene */
    constructor(scene){
        super();
        this.scene = scene;
        this.gender = "male";      
        this.direction = "l";
        this.speed = 400;
    }

    create = ()=>{
        this.view = new CharacterView(this.scene);

        this.setGender();
        this.audioController = AudioController.getInstance();
        this.view.create(this.gender);
        this.getCharacter().anims.play(`${this.gender}_idle_left`);
    }

    
    setGender = ()=>{
        this.gender = GameplayData.Gender == 2 ? "female" : "male";
    }

    /**
     * 
     * @param {string} dir 
     */
    setIdle = (dir = null)=>{
        if(dir)
            this.direction = dir;

        if (this.direction == 'l') this.getCharacter().anims.play(`${this.gender}_idle_left`, true);
        else if (this.direction == 'r') this.getCharacter().anims.play(`${this.gender}_idle_right`, true);
        else if (this.direction == 'u') this.getCharacter().anims.play(`${this.gender}_idle_up`, true);
        else if (this.direction == 'd') this.getCharacter().anims.play(`${this.gender}_idle_down`, true);
    }

    setWalk(){
        if (this.direction == 'l') this.getCharacter().anims.play(`${this.gender}_walk_left`, true);
        else if (this.direction == 'r') this.getCharacter().anims.play(`${this.gender}_walk_right`, true);
        else if (this.direction == 'u') this.getCharacter().anims.play(`${this.gender}_walk_up`, true);
        else if (this.direction == 'd') this.getCharacter().anims.play(`${this.gender}_walk_down`, true);
    }

    /**
     * Move player along horizontal axis
     * @param {number} axis 
     */
    moveHorizontal = (axis)=>{
        this.getCharacter().body.setVelocityX(axis * this.speed);
        this.audioController.play(AudioAsset.sfx_player_walk.key, true);
    }

    /**
     * Move player along vertical axis 
     * @param {number} axis 
     */
    moveVertical = (axis)=>{
        this.getCharacter().body.setVelocityY(axis * this.speed);
        this.audioController.play(AudioAsset.sfx_player_walk.key, true);
    }

    normalizeSpeed = ()=>{
        this.getCharacter().body.velocity.normalize().scale(this.speed);
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    setPosPlayer = (x,y) => {
        this.getCharacter().setPosition(Math.floor(x),Math.floor(y));
    }

    /**Get x and y player position */
    getPlayerPos = ()=>{
        return {x: this.getCharacter().x, y: this.getCharacter().y}
    }

    getCharacter = ()=> this.view.character.gameobject;
}