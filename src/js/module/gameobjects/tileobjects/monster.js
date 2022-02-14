import Transform from "../transform/image_transform";
import { Hierarky } from "../constraints/constraints_index";
import { AnimationHelper } from "../../../helper";
import { MonsterAnimations } from "../../../assetLibrary";


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
 * @class
 * This Monster object class which using custom property from tiled
 */
class Monster {
    /**
     * 
     * @param {Args} args 
     */
    constructor(args) {

        const {scene, object} = args;
        
        /** @private @type {Phaser.Scene} */
        this.scene = scene;

        /**@type {Number} */
        this.id = object.id;

        /** @public @readonly @type {Phaser.Physics.Arcade.Sprite} */
        this.monsterSprite = this._getMonsterSprite(object.properties);
        this.gameobject = this.scene.physics.add.sprite(object.x, object.y, this.monsterSprite, 0);

        /**@type {number} level*/
        this.level = object.properties.find(prop => prop.name == "Level").value;
        this.gameobject.setData('level', this.level);

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
        this.animKey = this._getMonsterAnimInfo(this.monsterSprite).key;

        AnimationHelper.AddAnimation(this.scene, this._getMonsterAnimInfo(this.monsterSprite));
    }

    playIdleAnimation = ()=>{
        this.gameobject.anims.play(this.animKey);
    }

    /**
     * 
     * @param {Property[]} property 
     * @returns {string}
     */
    _getMonsterSprite = (property)=>{
        const level = property.find(prop => prop.name == "Level");
        let monsterSprite = "";
        const type = property.find(prop => prop.name == "Type");
        if (type != undefined || type != null)
        {
            if (type === "B" || type === "boss")
            {
                if (level === 6 || level === "6")
                    monsterSprite = `monster_${level}_B`;
                else
                    monsterSprite = `monster_${level}_B`;			
            }
            else{
                monsterSprite = `monster_${level.value}`;
            }
        }
        return monsterSprite;
    }
    

    /**
     * 
     * @param {string} monsterSprite 
     * @returns {AnimationInfo}
     */
    _getMonsterAnimInfo = (monsterSprite)=>{
        let animInfo = MonsterAnimations['base_idle'];
        animInfo.key = `${monsterSprite}_idle`;
        animInfo.spritesheet = monsterSprite;
        return animInfo;
    }

    disable = ()=>{
        this.gameobject.disableBody();
    }

}

export {Monster}