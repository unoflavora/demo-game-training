import Transform from "./transform/image_transform";
import { Hierarky } from "./constraints/constraints_index";

/**
 * @class
 * This class is a gameobject to manage Sprite Type Object with physiscs
 */
export default class Character {
    
    /** 
    * @param {Phaser.Scene} scene 
    * @param {Number} x
    * @param {Number} y
    * @param {String} texture
    * @param {Number} frame
    */
    constructor(scene, x, y, texture, frame = 0) {
        
        /** @private @type {Phaser.Scene} */
        this.scene = scene;

        /** @public @readonly @type {Phaser.Physics.Arcade.Sprite} */
        this.gameobject = this.scene.physics.add.sprite(x, y, texture, frame);

        /** @public @readonly @type {Transform} */
        this.transform = new Transform(this.scene, this.gameobject);

        /** @public @readonly @type {Hierarky} */
        this.hierarky = new Hierarky(this.scene, this.transform);
        
    }

}