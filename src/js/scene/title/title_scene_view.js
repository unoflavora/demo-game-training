import Image from '../../module/gameobjects/image';
import Text from '../../module/gameobjects/text';
import { LayerInfo } from '../../module/screenutility/layer_info';
import { LoadingAsset, FontAsset } from '../../assetLibrary';
import Sprite from '../../module/gameobjects/sprite';
import { BaseView } from '../../core';

export default class TitleSceneView extends BaseView {
    constructor(scene) {
        super(scene);
        this.styleWhite = {
            fontSize: 40,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: this.screenUtility.width * 0.8,
                useAdvancedWrap: true
            },
        }
        this.eventName = {
            onPlayClick: 'onPlayClick'
        }
    }


    create = () => {
        this.screenUtility.setLayerDepth(this, LayerInfo.UI);
        this._setBackground();
        this._setTitle();
        this._setStart();
    }

    _setBackground = () =>{
        this.background = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.centerY, LoadingAsset.loading_bg.key);
        this.background.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height);
        this.background.gameobject.setInteractive();
        this.background.gameobject.on('pointerdown',()=>{this.emit(this.eventName.onPlayClick)})
    }

    _setTitle = () =>{
        this.titleLogo = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.height / 6.5, LoadingAsset.loading_logo.key);
        this.titleLogo.transform.setMaxPreferredDisplaySize(this.screenUtility.width*0.8, this.screenUtility.height*0.3);
    }

    _setStart = () => {
        this.tapToStart = new Text(this.scene, this.screenUtility.centerX, this.screenUtility.height /1.1, 'Tap Untuk Bermain', this.styleWhite);
        this.tapToStart.gameobject.setOrigin(0.5, 1);
        this.tapToStart.transform.setFontSize(40);
    }
}