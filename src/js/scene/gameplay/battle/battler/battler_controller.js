import BattlerView from './battler_view';
import ActorController from '../actor/actor_controller.js';

import GamePlayData from '../../gameplay_data.js'; //no need for direct import? maybe change to battle data later

export default class BattlerController extends ActorController
{
    //the battler entity.
    //has battler data such as current hp, mp, atk, lvl, etc

    /**
     * @param {Phaser.Scene} scene
     * @param {import('../../../../def/custom').Agate.Gameplay.Battle.BattlerData} battlerData
     */
    constructor(scene, battlerData)
    {
        super(scene);
        // console.log(scene);
        this.scene = scene;
        this.battlerData = battlerData;

        // console.log("Created Battler for " + battlerData.name);

        /**
        * @type {BattlerView}
        */
        this.view = null;

        this.init();
    }

    /**
     * Create the view
     * @private
     */
    init = () =>
    {
        if(this.battlerData.isplayer)
        {
            if(GamePlayData.Gender == 1)
            {
                this.view = new BattlerView(this.scene,'char_male','LEFT').create();
            }
            else
            {
                this.view = new BattlerView(this.scene,'char_female','LEFT').create();
            }
        }
        else
        {
            if(this.battlerData.level < 6)
            {
                if(GamePlayData.IS_WINTER)
                {
                    this.view = new BattlerView(this.scene,'monster_' + this.battlerData.level + '_B','RIGHT').create();

                }
                else
                {
                    this.view = new BattlerView(this.scene,'monster_' + this.battlerData.level,'RIGHT').create();
                }
            }
            else
            {
                this.view = new BattlerView(this.scene,'monster_6_B','RIGHT').create();
            }
        }
    }

    /**
     * Calls 'attack' animation on view
     * @param {Function} onAttackFinish
     * @public
     */
    attack = (onAttackFinish)=>
    {
        // console.log('passing attack action into view');
        this.view.attack(onAttackFinish);
    }
    /**
     * Calls 'heal' animation on view
     * @param {Function} onAttackFinish
     * @public
     */
    heal = (onFinish) =>
    {
        this.view.heal(onFinish);
    }
    /**
     * Calls 'die' animation on view
     * @param {Function} onFinish
     * @public
     */
    die = (onFinish)=>
    {
        this.view.die(onFinish);
    }
}