import Button from '../../../module/gameobjects/button.js';
import Sprite from '../../../module/gameobjects/sprite';
import Text from '../../../module/gameobjects/text.js';
import { FontAsset, GameplayAsset } from '../../../assetLibrary';
import {BaseView} from '../../../core';

export default class BattleControllerView extends BaseView
{
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene)
    {
        super(scene);

        this.style = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.8, useAdvancedWrap: true },
            color: '#42210B',
        }

        this.styleWhite = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.8, useAdvancedWrap: true },
        }
    }

    /**
     * Function to create view
     * @public
     */
    create = () =>
    {
		this.container = this.scene.add.container(0,0);
		this.indicatorContainer = this.scene.add.container(0,0);
        this.setView();
        return this;
    }

    /**
     * Draw stuff here.
     * @private
     */
    setView = ()=>
    { 
        this.createBasicCommands();
        this.createIndicators();
        this.prepareContainer();
    }

    hideCommands = ()=>
    {
        // console.log('hide');
        this.container.setVisible(false);
    }

    showCommands = ()=>
    {
        // console.log('show');
        this.container.setVisible(true);
    }

    /**
     * Create main buttons for attack, heal, and special attack.
     * @private
     */
    createBasicCommands = () =>
    {
        this.attackButton = new Button(this.scene, 0,0,GameplayAsset.submit_button.key);
        this.attackButton.gameobject.setPosition(this.screenUtility.width/2, 
            this.screenUtility.height* 0.65);
        this.attackButton.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.5,
            this.screenUtility.screenPercentage * 2.1 );

        //LABEL GAMBAR
        this.attackLabel = new Text(this.scene, 0,0, 'Perbaiki',this.style);
        this.attackLabel.gameobject.setScale(this.screenUtility.screenPercentage * 1.5);
        this.attackLabel.gameobject.setPosition(
            this.attackButton.gameobject.x, 
            this.attackButton.gameobject.y
            );
        this.attackButton.addTexture({texture: GameplayAsset.submit_button.key, frame: 2});

        this.healButton = new Button(this.scene, 0,0,GameplayAsset.submit_button.key);
       
        this.healButton.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.5,
            this.screenUtility.screenPercentage * 2.1 );
            this.healButton.gameobject.setPosition(this.screenUtility.width/2,
                this.attackButton.gameobject.y + this.healButton.gameobject.displayHeight * 1.25);
        this.healButton.addTexture({texture: GameplayAsset.submit_button.key, frame: 2});
        this.healLabel = new Text(this.scene, 0,0, 'Sembuhkan',this.style);
        this.healLabel.gameobject.setScale(this.screenUtility.screenPercentage * 1.5);
        this.healLabel.gameobject.setPosition(
            this.healButton.gameobject.x, 
            this.healButton.gameobject.y
            );

        this.specialButton = new Button(this.scene, 0,0,GameplayAsset.submit_button.key, 2);
        
        this.specialButton.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.5,
            this.screenUtility.screenPercentage * 2.1 );
            this.specialButton.gameobject.setPosition(this.screenUtility.width/2, 
                this.healButton.gameobject.y + this.specialButton.gameobject.displayHeight * 1.25);
        this.specialButton.addTexture({texture: GameplayAsset.submit_button.key, frame: 1},{texture: GameplayAsset.submit_button.key, frame: 1},{texture: GameplayAsset.submit_button.key, frame: 0});
        this.specialLabel = new Text(this.scene, 0,0, 'Kemampuan',this.style);
        this.specialLabel.gameobject.setScale(this.screenUtility.screenPercentage * 1.5);
        this.specialLabel.gameobject.setPosition(
            this.specialButton.gameobject.x, 
            this.specialButton.gameobject.y
            );
    }

    createIndicators = () =>
    {
        //create the correct and wrong indicator
        this.correctIndicator = new Sprite(this.scene,0,0,GameplayAsset.correct_answer_notif.key);
        this.correctIndicator.gameobject.setScale(
            this.screenUtility.screenPercentage * 2,
            this.screenUtility.screenPercentage * 2
        );
        this.correctIndicator.gameobject.setPosition(
            this.screenUtility.width/2,
            this.screenUtility.height * 0.35
        );
        this.wrongIndicator = new Sprite(this.scene,0,0,GameplayAsset.wrong_answer_notif.key);
        this.wrongIndicator.gameobject.setScale(
            this.screenUtility.screenPercentage * 2,
            this.screenUtility.screenPercentage * 2
        );
        this.wrongIndicator.gameobject.setPosition(
            this.screenUtility.width/2,
            this.screenUtility.height * 0.35
        );

        this.correctIndicator.gameobject.setVisible(false);
        this.wrongIndicator.gameobject.setVisible(false);
    }

    /**
     * @param {boolean} isCorrect
     * @param {Function} onFinish
     */
    showIndicator = (isCorrect, onFinish = null) =>
    {
        var indicator = this.wrongIndicator;
        if(isCorrect)
        {
            indicator = this.correctIndicator;
        }

        indicator.gameobject.setVisible(true);
        indicator.gameobject.setScale(0,0);
        this.scene.tweens.add({
            targets: indicator.gameobject,
            scaleX: 1,
            scaleY: 1,
            duration:250,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () =>
            {
                this.timer = this.scene.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        indicator.gameobject.setVisible(false);
                        if(onFinish !=null)
                        {
                            onFinish();
                        }
                    }
                });
            }
        });
    }

    /**
     * Prepare the container for player controls
     * @private
     */
    prepareContainer = () =>
    {
        this.container.add(this.attackButton.gameobject);
        this.container.add(this.healButton.gameobject);
        this.container.add(this.specialButton.gameobject);
        // this.container.add(this.background.gameobject);
        this.container.add(this.attackLabel.gameobject);
        this.container.add(this.healLabel.gameobject);
        this.container.add(this.specialLabel.gameobject);
        // this.container.sendToBack(this.background.gameobject);
    }

    /**
     * register attack button action
     * @param {Function} onClick
     * @public
     */
    registerOnAttackButtonPressed = (onClick) =>
    {
        this.attackButton.gameobject.on('pointerdown', () => { 
            // console.log('PRESSED ATTACK BUTTON');
            this.scene.time.delayedCall(10, onClick, [], this);
		});
    }

    /**
     * register heal button action
     * @param {Function} onClick
     * @public
     */
    registerOnHealButtonPressed = (onClick) =>
    {
        this.healButton.gameobject.on('pointerdown', () => { 
            // console.log('PRESSED HEAL BUTTON');
            this.scene.time.delayedCall(10, onClick, [], this);
		});
    }

    /**
     * register 
     * @param {Function} onClick
     * @public
     */
    registerOnSpecialButtonPressed = (onClick) =>
    {
        this.specialButton.gameobject.on('pointerdown', () => { 
            // console.log('PRESSED SPECIAL BUTTON');
            this.scene.time.delayedCall(10, onClick, [], this);
		});
    }

    /**@param {boolean} isAvailable */
    toggleSpecial = (isAvailable) =>
    {
        if(!isAvailable)
        {
            this.specialButton.gameobject.disableInteractive();
            this.specialButton.gameobject.setTexture(GameplayAsset.submit_button.key, 2);
            this.specialButton.setNormalTexture(GameplayAsset.submit_button.key, 2);
            this.specialButton.addTexture({texture: GameplayAsset.submit_button.key, frame: 2}, {texture: GameplayAsset.submit_button.key, frame: 2});
        }

        if(isAvailable)
        {
            this.specialButton.gameobject.setInteractive();
            this.specialButton.setNormalTexture(GameplayAsset.submit_button.key, 1);
            this.specialButton.addTexture({texture: GameplayAsset.submit_button.key, frame: 1}, {texture: GameplayAsset.submit_button.key, frame: 1});
        }
    }

    /**@param {Function} onFinish */
    fadeToBlack = (onFinish = null) =>
    {
       this.transitionSprite = new Sprite(this.scene, 0,0, GameplayAsset.screen_transition.key);
       this.transitionSprite.gameobject.setScale(0);
       this.transitionSprite.gameobject.setAlpha(0);
       this.transitionSprite.gameobject.setPosition(
           this.screenUtility.width/2,
           this.screenUtility.height/2
       )
       this.transitionSprite.gameobject.setDepth(150);
        this.scene.tweens.add({
           targets: this.transitionSprite.gameobject,
           alpha:1,
           duration:250,
           ease: Phaser.Math.Easing.Sine.Out
       });
       this.scene.tweens.add({
           targets: this.transitionSprite.gameobject,
           scale: this.screenUtility.screenPercentage * 50,
           duration:1000,
           ease: Phaser.Math.Easing.Sine.Out,
           onComplete: () =>
           {
               onFinish();
           }
       });
   }
}