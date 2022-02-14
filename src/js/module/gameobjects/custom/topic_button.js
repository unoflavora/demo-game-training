import { AudioAsset, GameplayAsset } from "../../../assetLibrary"
import Button from "../button";
import Sprite from "../sprite";
import Text from "../text";

class TopicButton {
    /**
     * 
     * @param {Phaser.Scene} scene
     * @param {Number} x 
     * @param {Number} y 
     * @param {string} text
     * @param {Number} precentage 
     * @param {Phaser.Types.GameObjects.Text.TextStyle} style
     */
    constructor(scene,x,y,text, precentage, style){
        this.scene = scene;
        this.button = new Button(this.scene, x, y, GameplayAsset.ui_mission_topic_button.key, 1, AudioAsset.sfx_button_main_menu.key);
        this.button.gameobject.setScale(precentage * 1.4);
        
        this.balloon = new Sprite(this.scene, 0, this.button.y - this.button.height * 0.7, GameplayAsset.ui_mission_topic_balloon.key);
        this.balloon.gameobject.setOrigin(0.5, 1);
        this.balloon.gameobject.setScale(precentage * 1.8, precentage * 2);
        this.balloon.gameobject.setPosition( Math.floor(this.button.gameobject.x), 
                Math.floor(this.button.gameobject.y - this.button.gameobject.displayHeight * 0.7));
                
        this.balloonText = new Text(this.scene, 0, 0, text, style);
        this.balloonText.gameobject.setOrigin(0.5);
        this.balloonText.gameobject.setWordWrapWidth(this.balloon.transform.displayWidth * 0.9);
        this.balloonText.gameobject.setLineSpacing(-2);
        this.balloonText.transform.setFontSize(30);
        this.balloonText.gameobject.setPosition(Math.floor(this.balloon.gameobject.x), 
                Math.floor(this.balloon.gameobject.y - this.balloon.transform.displayHeight * 0.6));
        
        this.button.container.add([this.balloon.gameobject, this.balloonText.gameobject]);
    
    }

    setUnlocked = ()=>{
        this.button.gameobject.setFrame(2);
        //     topicButton.inputEnabled = false;
        //     topicButton.freezeFrames = true;
    }
}

export {TopicButton}