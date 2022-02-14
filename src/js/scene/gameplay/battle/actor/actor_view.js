import {BaseView} from '../../../../core';
import Sprite from '../../../../module/gameobjects/sprite';

export default class ActorView extends BaseView
{
    /**
     * @param {Phaser.Scene} scene 
     * @param {string} texture 
     * @param {import('../../../../def/custom').Agate.Gameplay.Direction} direction Starting direction
     * @param {number} x X position on screen
     * @param {number} y Y position on screen
     */
    constructor(scene, texture, direction = 'DOWN', x = 0, y = 0)
    {
        super(scene);

        /**
         * @type {import('../../../../def/custom').Agate.Gameplay.Direction}
         */
        this.direction = direction;

        this.startposX = 0;
        this.startposY = 0;
        this.spriteTexture = texture;

        /**
         * @type {Function}
         */
        this.onMoveFinish = null;
        this.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);

    }

    /**
     * Function to create view
     * @public
     * @returns {ActorView}
     */
    create = () =>
    {
        this.sprite = new Sprite(this.scene,this.startposX,this.startposY,this.spriteTexture,0);
        this.idle(this.direction);
        return this;
    }

    update = () =>
    {

    }

    /**
     * Function to make the actor idle facing direction
     * @param {import('../../../../def/custom').Agate.Gameplay.Direction} direction 0=bottom 1=left 2=up 3=right
     * @public
     */
    idle = (direction) =>
    {
        //do idle anim
    }

    /**
     * Function to make the actor move to target position
     * @param {Phaser.Math.Vector2} targetPosition
     * @public
     */
    move = (targetPosition) =>
    {
        //do move anim
        this.onMoveFinish();
    } 
}