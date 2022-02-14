import Transform from "../transform/image_transform";
import { Hierarky } from "../constraints/constraints_index";
import { GameplayAsset } from "../../../assetLibrary";
import { SceneInfo } from "../../../info";
import Sprite from "../sprite";

/**
 *@typedef {import('../../../def/custom').Agate.Tiled.Property} Property 
 *@typedef {import('../../../def/custom').Agate.Tiled.Object} Object 
 */

/**
* @typedef {Object} Args 
* @property {Phaser.Scene} scene
* @property {Object} object
*/

/**
 * @typedef {Object} nextEvent
 * @property {string} beforeId
 * @property {string} type 
 * @property {number} id
 */

const MINI_GAMES_CHOICES = {
    GOLF: "golf",
    FRUIT: "fruit",
    BALLOON: "balloon"
};

/**
 * @class
 * This Monster object class which using custom property from tiled
 */
class Chest {

    /**@param {Args} args*/
    constructor(args) {
        const {scene, object} = args;
        
        /** @private @type {Phaser.Scene} */
        this.scene = scene;

        /**@type {Number} */
        this.id = object.id;

        /**@type {"peti" | "peti_part"} */
        this.type = object.type;

        /**@type {boolean} */
        this.hasOpened = false;

        /**@type {Number} */
        this.nextEvent = object.properties.find(prop => prop.name == "nextEvent")?.value;

        if (this.type === "peti_part"){
            this.chestPartEffect = new Sprite (this.scene, object.x, object.y, GameplayAsset.ui_result_light.key);
            this.chestPartEffect.gameobject.setDisplaySize(GameplayAsset.chest_mini_game.height * 1.5, GameplayAsset.chest_mini_game.height * 1.5);
            var offset = {
                x: this.chestPartEffect.gameobject.originX * object.width,
                y: (this.chestPartEffect.gameobject.originY - 1) * object.height
            };
            this.chestPartEffect.gameobject.x += offset.x;
            this.chestPartEffect.gameobject.y += offset.y;
            this.chestPartEffect.gameobject.setVisible(false);
            this.scene.tweens.add({
                targets: this.chestPartEffect.gameobject,
                alpha: 1,
                duration:2500,
                ease: Phaser.Math.Easing.Sine.Out
            });
            this.scene.tweens.add({
                targets: this.chestPartEffect.gameobject,
                angle: 360,
                duration:3000,
                ease: Phaser.Math.Easing.Linear,
                loop: -1
            });
        }

        /** @public @readonly @type {Phaser.Physics.Arcade.Sprite} */
        this.gameobject = this.scene.physics.add.sprite(object.x, object.y, GameplayAsset.chest_mini_game.key, 0);
        this.gameobject.setImmovable(true);
        let minigameKey = object.properties.find(prop => prop.name == "type")?.value;
        this.gameobject.setData('minigame',this._setMiniGameSceneKey(minigameKey));

        var offset = {
            x: this.gameobject.originX * object.width,
            y: (this.gameobject.originY - 1) * object.height
        };
        this.gameobject.x += offset.x;
        this.gameobject.y += offset.y;

        /** @public @readonly @type {Transform} */
        this.transform = new Transform(this.scene, this.gameobject);

        /** @public @readonly @type {Hierarky} */
        this.hierarky = new Hierarky(this.scene, this.transform);

    }

    /**
     * 
     * @param {string} value 
     * @returns {string}
     */
    _setMiniGameSceneKey = (value)=>{
        switch(value){
            case MINI_GAMES_CHOICES.BALLOON :
                return SceneInfo.MINIGAMEBALOON.key;
            break;
            case MINI_GAMES_CHOICES.FRUIT:
                return SceneInfo.MINIGAMEFRUIT.key;
            break;
            case MINI_GAMES_CHOICES.GOLF:
                return (Math.floor(Math.random() * 2) === 1)? SceneInfo.MINIGAMEBALOON.key : SceneInfo.MINIGAMEFRUIT.key;
            break;
            default:
                return SceneInfo.WORLDMAP.key;
            break;
        }
    }

    open = ()=>{
        this.hasOpened = true;
        this.gameobject.setTexture(GameplayAsset.chest_mini_game.key, 2);
    }

    /**@param {boolean} */
    setActive = (active = true)=>{
        this.gameobject.setVisible(active);
        (!active)?this.gameobject.disableBody():this.gameobject.enableBody(); 
        if(this.type == "peti_part"){
            this.chestPartEffect.gameobject.setVisible(active)
        };      
    }

}

export {Chest}