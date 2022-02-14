import { GameplayAsset } from "../../../assetLibrary";
import Hierarky from "../constraints/hierarky";
import Sprite from "../sprite";
import Transform from "../transform/transform";

/**
 * @typedef {"u" | "d" | "l" | "r"} Direction
 * @typedef {import('../../../def/custom').Agate.Tiled.Object} Object
 */

/**
 * @typedef {Object} nextEvent
 * @property {string} type
 * @property {number} beforeId 
 * @property {number} id
 */

 /**
  * @typedef {Object} Args 
  * @property {Phaser.Scene} scene
  * @property {Object} object
  */

 /**
  * @typedef {Object} nextTile 
  * @property {Number} x 
  * @property {Number} y
  */

class Teleporter {
    /**@param {Args} args*/
    constructor(args) {

        const {scene, object} = args;
        
        /** @private @type {Phaser.Scene} */
        this.scene = scene;

        /**@type {"go_to" | "go_to_part"} */
        this.type = object.type;

        /**@type {Direction} */
        this.direction = object.properties.find(prop => prop.name == "face_direction").value; 
        //Multipled with obj dimension because object dimension is same with tile size
        let x = object.properties.find(prop => prop.name == "next_x_tile").value * object.width;
        let y = object.properties.find(prop => prop.name == "next_y_tile").value * object.height;

        /**@type {nextTile} */
        this.nextTile = {x: x, y: y}

        this.gameobject = this.scene.physics.add.sprite(object.x, object.y, this._getAssetDirection(this.direction), 0);
        this.gameobject.setImmovable(true);

        /**@type {boolean} */
        let animation = object.properties.find(prop => prop.name == "animation");

        if(animation){
            if(animation.value)
                this._createTeleportAnimation(object.x, object.y, object.width, object.height);
        }

        /**@type {string} */
        this.targetMap = object.properties.find(prop => prop.name == "next_map_name").value;

        /**@type {Number} */
        this.nextEvent = object.properties.find(prop => prop.name == "nextEvent")?.value;

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

    /**@param {boolean} active*/
    setActive = (active = true)=>{
        this.gameobject.setVisible(active);
        (!active)?this.gameobject.disableBody():this.gameobject.enableBody();       
    }

    getOppositeDirection = ()=>{
        if (this.direction == "u")
			return "d";			
		else if (this.direction == "d")
			return "u";
		else if (this.direction == "l")
		{
			return "r";
		}
		else if (this.direction == "r")
		{
			return "l";
		}
        else{
            return "u";
        }
    }

    /**
     * 
     * @param {Direction} direction 
     */
    _getAssetDirection = (direction)=>{
        if (direction == "u")
			return GameplayAsset.up_direction_button.key;			
		else if (direction == "d")
			return GameplayAsset.down_direction_button.key;
		else if (direction == "l")
		{
			return GameplayAsset.left_direction_button.key;
		}
		else if (direction == "r")
		{
			return GameplayAsset.right_direction_button.key;
		}
        else{
            return GameplayAsset.up_direction_button.key;
        }		
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     */
    _createTeleportAnimation = (x,y,width,height)=>{
        this.teleportEffect = new Sprite(this.scene, x,y , GameplayAsset.ui_result_light.key);

        var offset = {
                x: this.teleportEffect.gameobject.originX * width,
                y: (this.teleportEffect.gameobject.originY - 1) * height
            };
        this.teleportEffect.gameobject.x += offset.x;
        this.teleportEffect.gameobject.y += offset.y;
        this.teleportEffect.gameobject.setVisible(false);
        this.teleportEffect.gameobject.setAlpha(0);
            this.scene.tweens.add({
                targets: this.teleportEffect.gameobject,
                alpha: 1,
                duration:2500,
                ease: Phaser.Math.Easing.Sine.Out
            });
            this.scene.tweens.add({
                targets: this.teleportEffect.gameobject,
                angle: 360,
                duration:3000,
                ease: Phaser.Math.Easing.Linear,
                loop: -1
            });
    }
}

export {Teleporter}