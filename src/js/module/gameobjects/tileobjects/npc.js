import Transform from "../transform/image_transform";
import { Hierarky } from "../constraints/constraints_index";
import { AnimationHelper } from "../../../helper";
import { NpcAnimations } from "../../../assetLibrary";

/**
 * @typedef {import('../../../def/custom').Agate.Asset.AnimationInfo} AnimationInfo
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
 * @property {string} type 
 * @property {number} id
 */

/**
 * @class
 * This Monster object class which using custom property from tiled
 */
class Npc {
    
    /**@param {Args} args*/
    constructor(args) {

        const {scene, object} = args;
        
        /** @private @type {Phaser.Scene} */
        this.scene = scene;

        /**@type {Number} */
        this.id = object.id;
        
        /**@type {String} */
        this.name = object.name;

        /**@type {boolean} */
        this.hasTalked = false;

        /**@type {"npc" | "npc_part"} */
        this.type = object.type;

        /**@type {boolean} */
        this.deact = false;

        /**@type {Number} */
        this.nextEvent = object.properties.find(prop => prop.name == "nextEvent")?.value;

        /** @public @readonly @type {Phaser.Physics.Arcade.Sprite} */
        this.npcSprite = this._getNpcSprite(object.properties);
        this.gameobject = this.scene.physics.add.sprite(object.x, object.y, this.npcSprite, 0);
        this.gameobject.setImmovable(true);

        this.dialogData = this._getDialogData(object.properties);

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

        /**@type {string} */
        this.animKey = this._getNpcAnimationInfo(this.npcSprite).key;

        AnimationHelper.AddAnimation(this.scene, this._getNpcAnimationInfo(this.npcSprite));
    }

    playIdleAnimation = ()=>{
        this.gameobject.anims.play(this.animKey);
    }

    /**@private @param {Array<Property>} property */
    _getNpcSprite = (property)=>{
        let imageName = property.find(prop => prop.name == "image_name").value;
        return imageName;
    }

    /**
     * 
     * @param {string} spriteKey 
     * @returns {AnimationInfo}
     */
    _getNpcAnimationInfo = (spriteKey)=>{
        let animInfo = NpcAnimations['base_idle'];
        animInfo.key = `${spriteKey}_idle`;
        animInfo.spritesheet = spriteKey;
        return animInfo;
    }

    /**@param {boolean} active*/
    setActive = (active = true)=>{
        this.gameobject.setVisible(active);
        (!active)?this.gameobject.disableBody():this.gameobject.enableBody();
        this.deact = !active;
    }

    /**@param {Array<Property>} property*/
    _getDialogData = (property)=>{      
        let dialog = property.find(prop => prop.name == "dialogue_name").value;
        let dialogData = `${dialog}_dialogue`
        return dialogData;
    }

}

export {Npc}