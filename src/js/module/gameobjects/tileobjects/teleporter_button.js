import { GameplayAsset } from "../../../assetLibrary";
import Button from "../button";

/**
 * @typedef {"u" | "d" | "l" | "r"} Direction
 * @typedef {import('../../../def/custom').Agate.Tiled.Object} Object
 */

 /**
  * @typedef {Object} Args 
  * @property {Phaser.Scene} scene
  * @property {Object} object
  */

class TeleporterButton {

    /**@param {Args} args*/
    constructor(args) {
        
        const {scene, object} = args;

        /** @private @type {Phaser.Scene} */
        this.scene = scene;

        /**@type {Direction} */
        this.direction = object.properties.find(prop => prop.name == "face_direction").value; 
        this.button = new Button(this.scene, object.x, object.y, this._getAssetDirection(this.direction), 0);

        /**@type {string} */
        this.targetMap = object.properties.find(prop => prop.name == "next_map_name").value;

        var offset = {
            x: this.button.gameobject.originX * object.width,
            y: (this.button.gameobject.originY - 1) * object.height
        };
        this.button.gameobject.x += offset.x;
        this.button.gameobject.y += offset.y;
        this.button.click.on(()=>{
            //console.log("TELEPORT");
        })
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
}

export {TeleporterButton}