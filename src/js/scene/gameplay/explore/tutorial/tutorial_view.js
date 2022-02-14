import Button from "../../../../module/gameobjects/button";
import Sprite from "../../../../module/gameobjects/sprite";
import { EventEmitter } from 'events';
import { BaseView } from "../../../../core";
import { RoleplayAsset, GameplayAsset } from "../../../../assetLibrary";

export default class TutorialView extends BaseView{

    /**
     * @type {Sprite | undefined}
     */
    tutorialSprite;

    /**
     * @type {Phaser.GameObjects.Container}
     */
    container;

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene){
        super(scene);

        this.event = new EventEmitter();
        
        this.eventName = {
            
            
        }
        
    }


    /**
     * 
     * @param {Function} clickEvent 
     */
    create = (clickEvent = ()=>{}) =>{
        this.container = this.scene.add.container(0, 0);
        
        this.bg = new Button(this.scene, this.screenUtility.centerX, this.screenUtility.centerY, GameplayAsset.ui_mission_topic_overlay.key);
        this.bg.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height * 1.2);
        this.bg.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y)
        this.bg.gameobject.setDepth(10);
        this.bg.gameobject.on('pointerdown', clickEvent)
        this.container.add(this.bg.gameobject);

        this.tutorialSprite = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.centerY, RoleplayAsset.tutorial_roleplay_1.key);
        this.tutorialSprite.gameobject.setOrigin(0.5);
        this.tutorialSprite.gameobject.setDepth(11);
        this.container.add(this.tutorialSprite.gameobject);
        // sprite.gameobject.setScale(this.screenUtility.screenPercentage * 2);      

        this.setVisible(false);
    }
    
    /**
     * @param {boolean} isVisible 
     */
    setVisible = (isVisible) =>{
        this.container.setVisible(isVisible);
    }

    /**
     * @param {string} imageKey 
     */
    setTutorialImage = (imageKey)=>{
        this.tutorialSprite.gameobject.setTexture(imageKey, 0);
        this.tutorialSprite.transform.setMaxPreferredDisplaySize(this.screenUtility.width * 0.8, this.screenUtility.height * 0.8);
        this.tutorialSprite.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
    }

    disableTutorial = () =>{
        this.tutorialSpriteArr.forEach(element => {
            element.setVisible(false);
        });
    }
}
