import Button from "../../../../module/gameobjects/button";
import Sprite from "../../../../module/gameobjects/sprite";
import Text from "../../../../module/gameobjects/text";
import { FontAsset, GameplayAsset } from "../../../../assetLibrary";
import GameplayData from '../../gameplay_data';
import { BaseView } from "../../../../core";
import { FadeIn} from "../../../../module/gameobjects/transition"

export default class ResultView extends BaseView {
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene){
        super(scene);
    }

    init = () =>{
		this.closeEvent = null;
        this.textStyle = {color:"#42210B", align:"center",fontFamily:FontAsset.cabin_bold.key,fontSize:"35px"};
        
    }

    createHUD = () =>{
        console.log('create HUD...')
        this.hudGroup = [];
        this.hudContainer = this.scene.add.container();
        this.fadein = new FadeIn(this.scene);

        this.victoryEffect = new Sprite (this.scene, 0,0 , GameplayAsset.ui_result_light.key);
        this.victoryEffect.gameobject.setScale(this.screenUtility.screenPercentage * 3);
        this.victoryEffect.gameobject.setPosition(
            this.screenUtility.width/2,
            this.screenUtility.height/2
        )
        this.victoryEffect.gameobject.setAlpha(0);
        this.scene.tweens.add({
            targets: this.victoryEffect.gameobject,
            alpha: 1,
            duration:2500,
            ease: Phaser.Math.Easing.Sine.Out
        });
        this.scene.tweens.add({
            targets: this.victoryEffect.gameobject,
            angle: 360,
            duration:3000,
            ease: Phaser.Math.Easing.Linear,
            loop: -1
        });
        this.hudGroup.push(this.victoryEffect);
        this.hudContainer.add(this.victoryEffect.gameobject);

        this.panel = new Sprite(this.scene, this.screenUtility.centerX,this.screenUtility.centerY, GameplayAsset.ui_result_box.key);
		this.panel.gameobject.setOrigin(0.5);
        this.panel.transform.setMinPreferredDisplaySize(this.screenUtility.width * 0.75);
        this.panel.transform.setDisplayHeight(this.screenUtility.height * 0.7);
        this.hudGroup.push(this.panel);
        this.hudContainer.add(this.panel.gameobject);

        this.ribbon = new Sprite(this.scene, this.panel.gameobject.x, this.panel.gameobject.y - this.panel.transform.displayHeight * 0.5, GameplayAsset.ui_result_title_ribbon.key)
		this.ribbon.gameobject.setOrigin(0.5);
        this.ribbon.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.7);
        this.hudGroup.push(this.ribbon);
        this.hudContainer.add(this.ribbon.gameobject);

        this.ribbonText = new Text(this.scene, this.ribbon.gameobject.x, this.ribbon.gameobject.y, "MISI SELESAI", {color:"white", align:"center",fontFamily:FontAsset.cabin_bold.key,fontSize:"30px"});
		this.ribbonText.gameobject.setOrigin(0.5,0.725);
        this.ribbonText.transform.setMinPreferredDisplaySize(this.ribbon.transform.displayWidth * 0.5);
        this.hudGroup.push(this.ribbonText);
        this.hudContainer.add(this.ribbonText.gameobject);

        //Player Data, Map Data
        let nameTitle = new Text(this.scene, this.ribbon.gameobject.x, this.ribbon.gameobject.y + this.ribbon.transform.displayHeight * 0.9, "", this.textStyle);
        nameTitle.gameobject.setScale(this.screenUtility.screenPercentage * 2)
		nameTitle.gameobject.setOrigin(0.5);

        this.hudGroup.push(nameTitle);
        this.hudContainer.add(nameTitle.gameobject);

        this.playerName = new Text(this.scene, 0,0, GameplayData.PlayerName, this.textStyle);
		this.playerName.gameobject.setOrigin(0.5);
        this.playerName.gameobject.setScale(this.screenUtility.screenPercentage * 2)
        this.playerName.gameobject.setPosition(
            nameTitle.gameobject.x, nameTitle.gameobject.y + nameTitle.transform.displayHeight * 1
        )
        this.hudGroup.push(this.playerName);
        this.hudContainer.add(this.playerName.gameobject);

        this.cluster = new Text(this.scene, 0,0, GameplayData.NextMap.categoryMission + "\n" + GameplayData.NextMap.mission_name, this.textStyle);
        this.cluster.gameobject.setOrigin(0.5,0);
        this.cluster.gameobject.setWordWrapWidth(600);
        this.cluster.gameobject.setScale(this.screenUtility.screenPercentage)
        this.cluster.gameobject.setPosition(
            this.playerName.gameobject.x, this.playerName.gameobject.y + this.playerName.gameobject.displayHeight * 0.5 + this.cluster.transform.displayHeight * 0.25
        )
        this.hudGroup.push(this.cluster);
        this.hudContainer.add(this.cluster.gameobject);

        //score
        this.TotalScore = new Text(this.scene, this.panel.gameobject.x, this.panel.gameobject.y - this.panel.transform.displayHeight * 0.05, "50000", {color:"#42210B", align:"center",fontFamily:FontAsset.cabin_bold.key,fontSize:"120px"});
        this.TotalScore.gameobject.setOrigin(0.5);
        this.TotalScore.transform.setMaxPreferredDisplaySize(this.panel.transform.displayWidth * 0.7);
        this.hudGroup.push(this.TotalScore);
        this.hudContainer.add(this.TotalScore.gameobject);

        this.detilScoreTitle = new Sprite(this.scene, this.panel.gameobject.x, this.panel.gameobject.y + this.panel.transform.displayHeight * 0.1, GameplayAsset.ui_detil_skor_box.key)
		this.detilScoreTitle.gameobject.setOrigin(0.5);
        this.detilScoreTitle.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.75);
        this.hudGroup.push(this.detilScoreTitle);
        this.hudContainer.add(this.detilScoreTitle.gameobject);

        this.detilScoreTitleText = new Text(this.scene, this.detilScoreTitle.gameobject.x, this.detilScoreTitle.gameobject.y, "Detail Skor", {color:"white", align:"center",fontFamily:FontAsset.cabin_bold.key,fontSize:"30px"});
        this.detilScoreTitleText.gameobject.setOrigin(0.5);
        this.detilScoreTitleText.transform.setMinPreferredDisplaySize(this.detilScoreTitle.transform.displayWidth * 0.3);
        this.hudGroup.push(this.detilScoreTitleText);
        this.hudContainer.add(this.detilScoreTitleText.gameobject);

        this.buttonBack = new Button(this.scene, this.panel.gameobject.x - this.panel.transform.displayWidth * 0.3, this.panel.gameobject.y + this.panel.transform.displayHeight * 0.55, GameplayAsset.ui_result_menu_button.key, 0);
        this.buttonBack.gameobject.setOrigin(0.5);
        this.buttonBack.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth / 6.5);
        this.hudGroup.push(this.buttonBack);
        this.hudContainer.add(this.buttonBack.gameobject);

        this.buttonNext = new Button(this.scene, this.panel.gameobject.x + this.panel.transform.displayWidth * 0.3, this.panel.gameobject.y + this.panel.transform.displayHeight * 0.55, GameplayAsset.ui_result_next_button.key, 0);
        this.buttonNext.gameobject.setOrigin(0.5);
        this.buttonNext.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth / 6.5);
        this.hudGroup.push(this.buttonNext);
        this.hudContainer.add(this.buttonNext.gameobject);

        this.buttonSS = new Button(this.scene, this.panel.gameobject.x, this.panel.gameobject.y + this.panel.transform.displayHeight * 0.55, GameplayAsset.ui_result_screenshot_button.key, 0);
        this.buttonSS.gameobject.setOrigin(0.5);
        this.buttonSS.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth / 6.5);
        this.hudGroup.push(this.buttonSS);
        this.hudContainer.add(this.buttonSS.gameobject);

        this.hudGroup.forEach(element => {
            element.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
        });
    }

    /**
     * 
     * @param {Number} y 
     * @param {String} mission 
     * @param {Number} count 
     */
    createMissionResultListHUD = (y = 1, mission = "Misi Utama", count = 1) =>{
        
        let dummy = new Text(this.scene, this.detilScoreTitle.gameobject.x - this.detilScoreTitle.transform.displayWidth * 0.5, this.detilScoreTitle.gameobject.y + this.detilScoreTitle.transform.displayHeight * y, mission, this.textStyle);
        dummy.gameobject.setOrigin(0,0.5);
        dummy.gameobject.setScale(this.screenUtility.screenPercentage)
        this.hudContainer.add(dummy.gameobject);
        let dummyValue = new Text(this.scene, this.detilScoreTitle.gameobject.x + this.detilScoreTitle.transform.displayWidth * 0.3, this.detilScoreTitle.gameobject.y + this.detilScoreTitle.transform.displayHeight * y, ":" + count, this.textStyle);
        dummyValue.gameobject.setOrigin(0,0.5);
        dummyValue.gameobject.setScale(this.screenUtility.screenPercentage)
        this.hudContainer.add(dummyValue.gameobject);

        dummy.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
        dummyValue.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
    }

    /**
     * 
     * @param {Event} onButtonBack 
     */
    registerButtonBackEvent = (onButtonBack) =>{
        this.buttonBack.gameobject.on('pointerdown',() =>{
            this.fadein.show(onButtonBack);
        });
    }

    /**
     * 
     * @param {Event} onButtonNext 
     */
    registerButtonNextEvent = (onButtonNext) =>{
        this.buttonNext.gameobject.on('pointerdown',() =>{
            this.fadein.show(onButtonNext);
        });
    }

    /**
     * 
     * @param {Event} onButtonSS 
     */
    registerButtonSSEvent = (onButtonSS) =>{
        this.buttonSS.gameobject.on('pointerdown',() =>{
            onButtonSS();
        });
    }
}