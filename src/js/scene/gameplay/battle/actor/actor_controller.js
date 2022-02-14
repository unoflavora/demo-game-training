import {BaseController} from '../../../../core';
import ActorView from './actor_view';

export default class ActorController extends BaseController
{
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene)
    {
        super(scene);
    }

    init = () =>
    {
        this.view = new ActorView(this.scene).create();
    }

    preload = ()=>
    {
        //play sound here
    }

    create = ()=>
    {
        
    }

    update = ()=>
    {

    }

    /**
     * Function to make the actor idle facing direction
     * @param {import('../../../../def/custom').Agate.Gameplay.Direction} direction
     * @public
     */
    idle = (direction) =>
    {
        //do something
        this.view.idle(direction);
    }

    /**
     * Function to make the actor move to target position
     * @param {Phaser.Math.Vector2} targetPosition
     * @public
     */
    move = (targetPosition)=>
    {
        //do something
        this.view.move(targetPosition, this.onMoveFinish);
    }

    /**
     * Callback after moving and reached destination
     * @param {Function} event
     * @public
     */
    registerOnMoveFinish = (event) =>
    {
        this.view.onMoveFinish = event;
    }
}