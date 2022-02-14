import ScreenUtilityController from "../module/screenutility/screen_utility_controller";
import { LayerInfo } from "../module/screenutility/layer_info";

class BaseView extends Phaser.GameObjects.Container
{    
    /**
     * @param  {Phaser.Scene} scene
     */
    constructor(scene) {
        super(scene, 0, 0);

        this.scene = scene;
        this.screenUtility = ScreenUtilityController.getInstance();
        this.layer = LayerInfo;
        
        this.scene.add.existing(this);
    }

    /**
     * @param {Phaser.GameObjects.Graphics | Phaser.GameObjects.Text | Phaser.GameObjects.Sprite | Phaser.GameObjects.Image} gameobject
     * @param {String} layer
     * @param {Number} depth 
    */
    setLayerDepth = (gameobject, layer, depth = 0) =>{
        this.screenUtility.setLayerDepth(gameobject, layer, depth)
    }
}

export {BaseView}