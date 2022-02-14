import { GameplayAsset } from "../../../assetLibrary";
import ScreenUtilityController from "../../screenutility/screen_utility_controller";
import Sprite from "../sprite";

class FadeIn {
    /**@param {Phaser.Scene} scene*/
   constructor(scene){
       this.scene = scene;
       this.screenUtility = ScreenUtilityController.getInstance();

       this.transition = new Sprite(this.scene, 0, 0, GameplayAsset.screen_transition.key);
       this.transition.gameobject.setScale(this.screenUtility.screenPercentage);
       this.transition.gameobject.setDepth(100);
       this.transition.gameobject.setAlpha(0);
       this.transition.gameobject.setPosition(
            this.screenUtility.width / 2,
            this.screenUtility.height / 2
        )
        this.transition.gameobject.setVisible(false);
   }

   /**@param {Function} onFinish*/
   show = (onFinish = ()=>{})=>{
    this.transition.gameobject.setVisible(true);
       this.scene.tweens.add({
            targets: this.transition.gameobject,
            alpha: 1,
            duration: 250,
            ease: Phaser.Math.Easing.Sine.Out
        });
        this.scene.tweens.add({
            targets: this.transition.gameobject,
            scale: this.screenUtility.screenPercentage * 50,
            duration: 1000,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () => {
                if (onFinish != null)
                    onFinish();
            }
        });
   }

   hide = ()=>{
        this.transition.gameobject.setScale(0);
        this.transition.gameobject.setAlpha(0);
    }
}

export {FadeIn};