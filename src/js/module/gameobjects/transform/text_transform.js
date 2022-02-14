import Transform from './transform'
import ScreenUtilityController from '../../screenutility/screen_utility_controller';

export default class TextTransform extends Transform {

    /**
     * @param {Phaser.Scene} scene
     * @param {Phaser.GameObjects.Text} gameobject 
     */
    constructor(scene, gameobject) {
        super(scene, gameobject);
        
        this.default();
    }
    
    default = () =>{
        this.gameobject.setOrigin(0.5);
    }

    setFontSize = (value) =>{
        this.gameobject.setFontSize(value * ScreenUtilityController.getInstance().screenPercentage);
    }
    /**
     * @param {number} size
     * @param {number} size2
     */
    setFontSizeWithRatio = (size, size2) =>{
        let currentRatio = this.screenUtility.height / this.screenUtility.width;
        let ratio = 16/10;
        let selectedSize= (currentRatio < ratio) ? size : size2;
        
        this.gameobject.setFontSize(selectedSize * this.screenUtility.screenPercentage);
    }

    /**
     * 
     * @param {number} size 
     * @param {number} [minWidth] 
     * @param {number} [maxWidth] 
     */
    setFontSizeResponsive = (size, minWidth, maxWidth) =>{
        this.gameobject.setFontSize(size * this.screenUtility.screenPercentage);

        if(minWidth != undefined && this.displayWidth < minWidth ){
            this.setDisplayWidth(minWidth, true);

        }else if(maxWidth != undefined &&this.displayWidth > maxWidth ){

            this.setDisplayWidth(maxWidth, true);
        }
    }

    /**
     * 
     * @param {number} size 
     * @param {number} [width] 
     */
    setFontSizeAndWidth = (size, width) =>{
        this.gameobject.setFontSize(size * this.screenUtility.screenPercentage);
        this.setDisplayWidth(width, true);
    }

        /**
     * 
     * @param {number} size 
     * @param {number} [height] 
     */
    setFontSizeAndHeight = (size, height) =>{
        this.gameobject.setFontSize(size * this.screenUtility.screenPercentage);
        this.setDisplayHeight(height, true);
    }


}