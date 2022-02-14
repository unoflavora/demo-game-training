import Transform from "./transform/image_transform";
import { Hierarky } from "./constraints/constraints_index";

/**
 * @class
 * This class is a gameobject to manage Image Type Object
 */
export default class Image {
    
    /** 
    * @param {Phaser.Scene} scene 
    * @param {Number} x
    * @param {Number} y
    * @param {String} texture
    */
    constructor(scene, x, y, texture, frame = 0){
        
        /** @private @type {Phaser.Scene} */
        this.scene = scene;

        /** @public @readonly @type {Phaser.GameObjects.Image} */
        this.gameobject = this.scene.add.image(x, y, texture, frame);

        /** @public @readonly @type {Transform} */
        this.transform = new Transform(this.scene, this.gameobject);

        /** @public @readonly @type {Hierarky} */
        this.hierarky = new Hierarky(this.scene, this.transform);
    }

}