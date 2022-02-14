import { GameplayAsset } from "../../../assetLibrary";
import ScreenUtilityController from "../../screenutility/screen_utility_controller";
import Sprite from "../sprite";

class FadeOut {
    /**@param {Phaser.Scene} scene*/
    constructor(scene){
        this.scene = scene;
        this.screenUtility = ScreenUtilityController.getInstance();

        this.transition = new Sprite(this.scene, 0, 0, GameplayAsset.screen_transition.key);
        this.transition.gameobject.setDepth(100);
        this.transition.gameobject.setScale(this.screenUtility.screenPercentage * 50);
        this.transition.gameobject.setAlpha(1);
        this.transition.gameobject.setPosition(
            this.screenUtility.width / 2,
            this.screenUtility.height / 2
        );
        this.transition.gameobject.setVisible(false);
    }

    /**@param {Function} onFinish*/
    show = (onFinish = ()=>{})=>{
        this.transition.gameobject.setVisible(true);
        this.scene.tweens.add({
            targets: this.transition.gameobject,
            alpha: 0,
            duration: 1000,
            ease: Phaser.Math.Easing.Sine.Out
        });
        this.scene.tweens.add({
            targets: this.transition.gameobject,
            scale: 0,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () => {
                if (onFinish != null)
                    onFinish();
            }
        });
    }
}

export {FadeOut}