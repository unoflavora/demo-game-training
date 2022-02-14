import ActorView from '../actor/actor_view.js';
import Sprite from '../../../../module/gameobjects/sprite.js';
import { GameplayAsset } from '../../../../assetLibrary';

export default class BattlerView extends ActorView
{
    /**
     * @param {Phaser.Scene} scene 
     * @param {string} texture 
     * @param {import('../../../../def/custom').Agate.Gameplay.Direction} direction
     */
    constructor(scene, texture, direction)
    {
        super(scene,texture,direction, 0, 0);

        this.leftPos = new Phaser.Math.Vector2(this.screenUtility.width * 0.8, this.screenUtility.height * 0.45);
        this.rightPos = new Phaser.Math.Vector2(this.screenUtility.width * 0.2, this.screenUtility.height * 0.45);
        this.centerPos = new Phaser.Math.Vector2(this.screenUtility.width * 0.5, this.screenUtility.height * 0.45);
    
        this.onActionFinish = null;
    }

    /**
     * Creates the battler view.
     * @param {import('../../../../def/custom').Agate.Gameplay.Direction} direction
     * @returns {BattlerView} Returns BattlerView class.
     */
    create = () =>
    {
        if(this.direction == 'LEFT')
        {
            this.battlerSprite = new Sprite(this.scene, this.leftPos.x, this.leftPos.y, this.spriteTexture, 64);
            this.scene.anims.create({
                key: "idle",
                frames: this.scene.anims.generateFrameNumbers(this.spriteTexture,{ start: 64, end: 71, first: 64 }),
                frameRate:10,
                repeat:-1
            });
        this.battlerSprite.gameobject.play("idle");
        }
        if(this.direction == 'RIGHT')
        {
            // console.log('create battler using texture key: ' + this.spriteTexture);
            this.battlerSprite = new Sprite(this.scene, this.rightPos.x, this.rightPos.y, this.spriteTexture);
            if(this.spriteTexture != 'monster_6_B')
            {
                this.scene.anims.create({
                    key: "idle-monster",
                    frames: this.scene.anims.generateFrameNumbers(this.spriteTexture,{ start: 0, end: 7, first: 0 }),
                    frameRate:15,
                    repeat:-1
                });
            }
            else
            {
                this.scene.anims.create({
                    key: "idle-monster",
                    frames: this.scene.anims.generateFrameNumbers(this.spriteTexture,{ start: 8, end: 15, first: 8 }),
                    frameRate:15,
                    repeat:-1
                });
            }
            
        this.battlerSprite.gameobject.play("idle-monster");
        }
        this.battlerSprite.gameobject.setScale(this.screenUtility.screenPercentage * 1.5);

        this.attackSprite = new Sprite(this.scene, 0,0, GameplayAsset.normal_battle_fx.key, 0);
        this.attackSprite.gameobject.setScale(
            this.screenUtility.screenPercentage * 2,
            this.screenUtility.screenPercentage * 2
        )
        this.scene.anims.create({
            key: "atk-effect",
            frames: this.scene.anims.generateFrameNumbers(GameplayAsset.normal_battle_fx.key,{ start: 0, end: 9, first: 0 }),
            frameRate:15
        });
        this.attackSprite.gameobject.setPosition(
            this.centerPos.x,
            this.centerPos.y
        )
        this.attackSprite.gameobject.setVisible(false);

        this.healSprite = new Sprite(this.scene, 0,0, GameplayAsset.heal2_battle_fx.key, 0);
        this.healSprite.gameobject.setScale(
            this.screenUtility.screenPercentage * 2,
            this.screenUtility.screenPercentage * 2
        )

        this.scene.anims.create({
            key: "heal-effect",
            frames: this.scene.anims.generateFrameNumbers(GameplayAsset.heal2_battle_fx.key,{ start: 0, end: 4, first: 0 }),
            frameRate:15
        });
        this.healSprite.gameobject.setVisible(false);
        return this;
    }
    
    /**
     * @param {Function} onFinish
     * @public
     */
    attack = (onFinish) =>
    {
        this.onActionFinish = onFinish;
        this.slideToCenter();
            
    }

    slideToCenter = () =>
    {
        // console.log('move to center');
        this.scene.tweens.add({
            targets: this.battlerSprite.gameobject,
            x: this.centerPos.x,
            duration:750,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () =>
            {
                this.createAttackEffect();
            }
        });
    }

    createAttackEffect = () =>
    {
        // console.log('create effect');
        var atkPos = this.leftPos.x;
        if(this.direction == 'LEFT')
        {
            atkPos = this.rightPos.x;
        }

        this.attackSprite.gameobject.setVisible(true);
        this.attackSprite.gameobject.setDepth(100);
        this.attackSprite.gameobject.setPosition(
            atkPos,
            this.centerPos.y
        );
        this.attackSprite.gameobject.play("atk-effect");
        this.timer = this.scene.time.addEvent({
            delay: 600,
            callback: ()=>{
                this.returnToOrigin();
            }
        });
    }

    returnToOrigin = () =>
    {
        this.attackSprite.gameobject.setVisible(false);
        var originXPos = this.rightPos.x;
        if(this.direction == 'LEFT')
        {
            originXPos = this.leftPos.x;
        }
        // console.log('move to origin');
        this.battlerSprite.gameobject.x
        this.scene.tweens.add({
            targets: this.battlerSprite.gameobject,
            x: originXPos,
            duration:750,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () =>
            {
                // console.log('executing onAttackFinish inside battler view');
                this.onActionFinish();
            }
        });
    }

    /**@param {Function} onFinish */
    heal = (onFinish) =>
    {
        // create attack effect sprite
        this.onActionFinish = onFinish;
        this.createHealEffect();
        //onFinish();
    }

    createHealEffect = () =>
    {
        // console.log('create effect');
        var atkPos = this.rightPos.x;
        if(this.direction == 'LEFT')
        {
            atkPos = this.leftPos.x;
        }

        this.healSprite.gameobject.setVisible(true);
        this.healSprite.gameobject.setDepth(100);
        this.healSprite.gameobject.setPosition(
            atkPos,
            this.centerPos.y
        );
        this.healSprite.gameobject.play("heal-effect");
        this.timer = this.scene.time.addEvent({
            delay: 600,
            callback: ()=>{
            this.healSprite.gameobject.setVisible(false);
            this.onActionFinish();
            }
        });
    }
    /**@param {Function} onFinish */
    die = (onFinish) =>
    {
        this.scene.tweens.add({
            targets: this.battlerSprite.gameobject,
            alpha: 0,
            duration:750,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () =>
            {
                if(onFinish != null)
                {
                    onFinish();
                }
                this.battlerSprite.gameobject.destroy();
                this.scene.anims.remove('idle-monster');
                this.scene.anims.remove('idle');
                this.scene.anims.remove('atk-effect');
                this.scene.anims.remove('heal-effect');
                this.destroy();
            }
        });
    }
}