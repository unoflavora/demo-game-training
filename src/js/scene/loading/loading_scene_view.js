import Image from '../../module/gameobjects/image';
import { LoadingAsset } from '../../assetLibrary';
import Sprite from '../../module/gameobjects/sprite';
import { BaseView } from '../../core';

export default class LoadingSceneView extends BaseView
{    
    /**@param {Phaser.Scene} scene*/
    constructor(scene){
        super(scene);

    }

    create = () => {
        this.setLayerDepth(this, this.layer.MAIN, 0);
        this._setBackground();
        this._setTitle();
        this._setLoading();
    }

    _setBackground = ()=>{
        this.bg = new Image(this.scene, this.screenUtility.centerX, this.screenUtility.centerY, LoadingAsset.loading_bg.key);
        this.bg.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height);
    }

    _setTitle = ()=>{
        this.titleLogo  = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.height/6.5, LoadingAsset.loading_logo.key);
        this.titleLogo.transform.setMaxPreferredDisplaySize(this.screenUtility.width*0.8, this.screenUtility.height*0.3);
    }

    _setLoading = ()=>{
        this.frame = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.height/1.08, LoadingAsset.title_loading_bar.key, 0);
        this.frame.gameobject.setScale(this.screenUtility.screenPercentage * 1.5);
        this.frame.gameobject.setOrigin(0.5);
        
        this.bar = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.height/1.08, LoadingAsset.title_loading_bar.key, 1);
        this.bar.gameobject.setOrigin(0,0.5)
        .setPosition(
            this.frame.gameobject.x - this.frame.gameobject.displayWidth * 0.5,
            this.frame.gameobject.y
        )
    }

    initLoading = (value) => {
        this.bar.gameobject.setScale(this.screenUtility.screenPercentage * 1.49 * value,this.screenUtility.screenPercentage * 1.5);      
    }
}