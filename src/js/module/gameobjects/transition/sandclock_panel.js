import Sprite from "../sprite";
import Text from "../text";
import { GameplayAsset, FontAsset } from "../../../assetLibrary";
import GameplayData from "../../../scene/gameplay/gameplay_data";

/**
 * @class Display loading clock before scene transition
 */
class SandClockPanel{
    /**@type {Phaser.Scene} */
    scene;
    /**@type {Phaser.GameObjects.Container} */
    gameobject;
    /**@type {Number} */
    delayLoading = 1500;

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x
     * @param {number} y
     */
    constructor(scene,x,y)
    {
        this.scene = scene;
        this.gameobject = this.scene.add.container(0,0);

        this.loadingMessage = new Text(this.scene, x, y, "Sedang Memuat ...", {
            fontSize: 27, fontFamily: FontAsset.cabin_bold.key, align: "center", wordWrap: { width: 800, useAdvancedWrap: true},
            color: 'white'
        });
        this.loadingMessage.gameobject.setOrigin(0.5);
        this.loadingMessage.gameobject.setScrollFactor(0);

        this.sandClock = new Sprite(this.scene, 0, 0, GameplayAsset.sand_clock.key);
        this.sandClock.gameobject.setOrigin(0.5);
        this.sandClock.gameobject.setScale(0.5);
        this.sandClock.gameobject.setPosition(x, y - this.sandClock.transform.displayWidth * 0.65);
        this.sandClock.gameobject.setAlpha(1);

        this.loadingMessage.gameobject.setOrigin(0.5);
        this.gameobject.add([this.loadingMessage.gameobject,this.sandClock.gameobject]);
    }

   /**
    * 
    * @returns {Promise}
    */
    onShow = ()=>{
        this.gameobject.setVisible(true);
        
        this.scene.tweens.add({
            targets: this.sandClock.gameobject,
            alpha: 1,
            duration: this.delayLoading,
            ease: Phaser.Math.Easing.Sine.Out
        });
        this.scene.tweens.add({
            targets: this.sandClock.gameobject,
            angle: 364.5,
            duration: this.delayLoading,
            ease: Phaser.Math.Easing.Linear,
            loop: -1
        });

        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve();
                this.gameobject.setVisible(false);
            }, this.delayLoading);
        })
    }

    shown = ()=>{
        this.gameobject.setVisible(true);
        this.scene.tweens.add({
            targets: this.sandClock.gameobject,
            alpha: 1,
            duration: this.delayLoading,
            ease: Phaser.Math.Easing.Sine.Out
        });
        this.scene.tweens.add({
            targets: this.sandClock.gameobject,
            angle: 364.5,
            duration: GameplayData.delayLoading,
            ease: Phaser.Math.Easing.Linear,
            loop: -1
        });
    }

    /**@param {boolean} isVisible*/
    setVisible = (isVisible)=>{
        this.gameobject.setVisible(isVisible);
    }
}

export {SandClockPanel}