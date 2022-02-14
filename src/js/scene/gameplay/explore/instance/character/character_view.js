import { GameplayAsset, CharAnimations } from "../../../../../assetLibrary";
import {BaseView} from "../../../../../core";
import { AnimationHelper } from "../../../../../helper";
import Character from "../../../../../module/gameobjects/character";

export default class CharacterView extends BaseView {

    /**@param {Phaser.Scene} */
    constructor(scene){
        super(scene)
        this.TILE_SIZE = 64;
		this.MARGIN_BOTTOM_ENTITY = 30;
    }

    /**@param {"male" | "female"} gender */
    create = (gender = "male")=>{
        let chosenChar = (gender == 'female')?GameplayAsset.char_female.key:GameplayAsset.char_male.key;
        this.character = new Character(this.scene, 0, 0, chosenChar, 0);
        this.character.gameobject.setOrigin(1 - this.TILE_SIZE / this.character.gameobject.width,1 - this.TILE_SIZE / this.character.gameobject.height + this.MARGIN_BOTTOM_ENTITY / this.character.gameobject.height);
        this.character.gameobject.setOffset(this.character.gameobject.displayWidth * 0.16,this.character.gameobject.displayHeight * 0.5);
        this.character.gameobject.setBodySize(this.character.gameobject.displayWidth * 0.7,this.character.gameobject.displayHeight * 0.5, false);
        AnimationHelper.AddAnimationList(this.scene, this._createAnimationKey(chosenChar));
    }

    /**@param {string} key*/
    _createAnimationKey = (key)=>{
        let animInfos = Object.values(CharAnimations).filter((v)=> v.spritesheet == key);
        return animInfos;
    }
}