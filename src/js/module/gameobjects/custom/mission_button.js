import { AudioAsset, FontAsset, GameplayAsset } from "../../../assetLibrary"
import Button from "../button";
import Text from "../text";

class MissionButton {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} frame
     * @param {string} missionName
     * @param {string} categoryName
     * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle
     * @param {number}
     */
    constructor(scene,x,y, frame, missionName, categoryName, textStyle, screenPrecentage){
        this.scene = scene;
        this.button = new Button(this.scene, x, y, GameplayAsset.ui_mission_overview_button.key, frame, AudioAsset.sfx_button_main_menu.key);
        this.button.gameobject.setScale(screenPrecentage * 2);
        
        this.missionText = new Text(this.scene, 0, 0, missionName, textStyle);
        this.missionText.transform.setFontSize(30);
        this.missionText.gameobject.setWordWrapWidth(this.button.transform.displayWidth * 0.25);
        this.missionText.gameobject.setPosition(this.button.gameobject.x - this.button.transform.displayWidth * 0.385, 
            this.button.gameobject.y).setOrigin(0.5);

        this.categoryText = new Text(this.scene, 0, 0, categoryName, {
                color: "black", fontFamily: FontAsset.cabin_bold.key, FontAssetize: "25px", align: "left" });
        this.categoryText.transform.setFontSize(30);
        this.categoryText.gameobject.setWordWrapWidth(this.button.transform.displayWidth* 0.65);
        this.categoryText.gameobject.setPosition(this.button.gameobject.x - this.button.transform.displayWidth * 0.255, 
            this.button.gameobject.y).setOrigin(0, 0.5);

        this.button.container.add([this.missionText.gameobject, this.categoryText.gameobject]);
    }

    /**
     * 
     * @param {string} missionName 
     * @param {string} categoryName 
     */
    setText = (missionName,categoryName)=>{
        this.missionText.gameobject.setText(missionName);
        this.categoryText.gameobject.setText(categoryName);
    }

    get click(){
        return this.button.click;
    }

    get gameobject() {
        return this.button.gameobject;
    }

    get container(){
        return this.button.container;
    }

    get transform(){
        return this.button.transform;
    }

    removeAllListener = ()=>{
        this.button.removeAllListener();
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    setPosition = (x,y)=>{
        this.button.container.setPosition(x,y);
    }
}

export  {MissionButton};