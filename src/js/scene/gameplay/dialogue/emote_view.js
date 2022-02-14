import Sprite from '../../../module/gameobjects/sprite';
import { RoleplayAsset, FontAsset, GameplayAsset } from '../../../assetLibrary';
import {BaseView} from '../../../core';

export default class EmoteView extends BaseView
{
    /**
     * The dialogue view.
     * @param {Phaser.Scene} scene 
     */
    constructor(scene)
    {
        super(scene);

        this.container = this.scene.add.container(0,0);

        this.style = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.8, useAdvancedWrap: true },
            color: '#444400',
        }

        this.styleLeft = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "left",
            wordWrap: { width: this.screenUtility.width * 1.4, useAdvancedWrap: true },
            color: '#444400',
        }

        this.styleWhite = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.8, useAdvancedWrap: true },
        }
        /**
         * @type {import('../../../def/custom').Agate.Gameplay.Dialogue.ContentLineData}
         */
        this.dialogueData;

        this.emoteKeys = [
            'ui_rp_emote_marah',
            'ui_rp_emote_kecewa',
            'ui_rp_emote_netral',
            'ui_rp_emote_senang',
            'ui_rp_emote_puas'
        ]

        this.isdestroyed = false;
    }

    /**
     * @param {number} startingEmoteIndex Emote index ranging from `0` to `4`, from angry to happy respectively. Default is `2` (neutral)
     * @param {number} x 
     * @param {number} y
     */
    create = (startingEmoteIndex = 2, x = this.screenUtility.width/2, y = this.screenUtility.height * 0.4) =>
    {
        if(startingEmoteIndex < 0)
            startingEmoteIndex = 0;
        if(startingEmoteIndex > 4)
            startingEmoteIndex = 4;

        this.emoteBalloon = new Sprite(this.scene, 0,0, RoleplayAsset.ui_rp_balloon.key);
        this.emoteBalloon.gameobject.setPosition
        (
            x,y
        );

        this.emoteSprite = new Sprite(this.scene, 0,0, this.emoteKeys[startingEmoteIndex]);
        this.zoomScale = this.scene.cameras.main.zoom > 1 ? 1.5 : 0.9;
        this.emoteSprite.gameobject.setScale(
            this.screenUtility.screenPercentage * 2 / this.zoomScale,
            this.screenUtility.screenPercentage * 2 / this.zoomScale
        );
        this.emoteSprite.gameobject.setPosition
        (
            x,y
        );

        this.animateEmoteGrow(this.emoteSprite.gameobject);
        this.emoteSprite.gameobject.setVisible(false);
        this.emoteSprite.gameobject.setOrigin(0.55,0.5);
        this.emoteBalloon.gameobject.setScale(0,0);
        this.emoteBalloon.gameobject.setOrigin(1,1);
        if (this.scene.secondCamera != undefined){
            this.scene.secondCamera.ignore(this.emoteBalloon.gameobject);
            this.scene.secondCamera.ignore(this.emoteSprite.gameobject);
        }
        this.emotex = this.screenUtility.width/2;
        this.emotey = this.screenUtility.height * 0.4;
        
        return this;
    }
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    setEmotePosition = (x = this.emotex, y = this.emotey)=>{
        this.emotex = x;
        this.emotey = y;

        this.emoteBalloon.gameobject.setPosition (x, y);
        this.emoteSprite.gameobject.setPosition(
            this.emoteBalloon.gameobject.x - this.emoteBalloon.transform.displayWidth * 0.5,this.emoteBalloon.gameobject.y - this.emoteBalloon.transform.displayHeight * 0.5
        );
    }
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    showEmote = (x = this.emotex, y = this.emotey) =>
    {
        // console.log(x,y);
        this.emotex = x;
        this.emotey = y;

        this.emoteBalloon.gameobject.setPosition
        (
            x,y
        );
        this.emoteSprite.gameobject.setPosition
        (
            this.emoteBalloon.gameobject.x - this.emoteBalloon.transform.displayWidth * 0.5,this.emoteBalloon.gameobject.y - this.emoteBalloon.transform.displayHeight * 0.5
        );

        this.emoteBalloon.gameobject.setScale(0,0);
        this.scene.tweens.add({
            targets: this.emoteBalloon.gameobject,
            scale: this.screenUtility.screenPercentage * 2 / (this.zoomScale < 1 ? 1 : 1.5),
            duration: 200,
            ease: Phaser.Math.Easing.Sine.In,
            onComplete: () =>
            {
                this.emoteSprite.gameobject.setVisible(true);
                this.emoteSprite.gameobject.setPosition
                (
                    this.emoteBalloon.gameobject.x - this.emoteBalloon.transform.displayWidth * 0.5,this.emoteBalloon.gameobject.y - this.emoteBalloon.transform.displayHeight * 0.5
                );
            }
        });
        this.container.add(this.emoteBalloon.gameobject);
        this.container.add(this.emoteSprite.gameobject);
        this.container.setDepth(6);
    }
    /**@param {Number} level*/
    changeEmote = (level) =>
    {
        if(level < 0)
            level = 0;
        if(level > 4)
            level = 4;

        this.emoteSprite.gameobject.setScale(0,0);
        this.emoteSprite.gameobject.setTexture(this.emoteKeys[level]);
    }

    destroyEmoteView = () =>
    {
        this.emoteBalloon.gameobject.setVisible(false);
        this.emoteSprite.gameobject.setVisible(false);
        this.emoteBalloon.gameobject.destroy();
        this.emoteSprite.gameobject.destroy();
    }
    /**@param {Phaser.GameObjects} gameobject*/
    animateEmoteGrow = (gameobject) =>
    {
        this.scene.tweens.add({
            targets: gameobject,
            scale: this.screenUtility.screenPercentage * 2 * 1.1 / this.zoomScale,
            duration: 500,
            ease: Phaser.Math.Easing.Linear,
            onComplete: () =>
            {
                if(!this.isdestroyed)
                this.animateEmoteShrink(gameobject);
                else
                {
                    this.destroy();
                }
            }
        });
    }
    /**@param {Phaser.GameObjects} gameobject*/
    animateEmoteShrink = (gameobject) =>
    {
        this.scene.tweens.add({
            targets: gameobject,
            scale: this.screenUtility.screenPercentage * 2 * 0.9 / this.zoomScale,
            duration: 500,
            ease: Phaser.Math.Easing.Linear,
            onComplete: () =>
            {
                if(!this.isdestroyed)
                this.animateEmoteGrow(gameobject);
                else
                {
                    this.destroy();
                }
            }
        });
    }
}