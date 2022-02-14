import Button from "../../module/gameobjects/button";
import Sprite from "../../module/gameobjects/sprite";
import Text from "../../module/gameobjects/text";
import { FontAsset, GameplayAsset } from "../../assetLibrary";
import GameplayData from '../gameplay/gameplay_data';
import {BaseView} from "../../core";

export default class AlertView extends BaseView {
    /**@param {Phaser.Scene} scene*/
    constructor(scene) {
        super(scene)
    }

    init = () => {
        this.closeEvent = null;
        this.textStyle = {
            color: "#42210B",
            align: "center",
            fontFamily: FontAsset.cabin_bold.key,
            fontSize: "30px"
        };
        this.hudGroup = [];
        this.hudContainer = this.scene.add.container();
    }

    create = () => {

        this.panel = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.centerY, GameplayAsset.ui_result_box.key);
        this.panel.gameobject.setOrigin(0.5);
        this.panel.transform.setDisplayHeight(this.screenUtility.height * 0.8, false);
        this.panel.transform.setDisplayWidth(this.screenUtility.width * 0.8, false);
        this.hudGroup.push(this.panel);
        this.hudContainer.add(this.panel.gameobject);

        //Player Data, Map Data
        this.nameTitle = new Text(this.scene, this.panel.gameobject.x, this.panel.gameobject.y - this.panel.transform.displayHeight * 0.4, "Alert", this.textStyle);
        this.nameTitle.gameobject.setScale(this.screenUtility.screenPercentage * 2)
        this.nameTitle.gameobject.setOrigin(0.5);
        this.nameTitle.gameobject.displayHeight = this.panel.gameobject.displayHeight * 0.1;
        this.nameTitle.gameobject.displayWidth = this.nameTitle.gameobject.displayHeight * (this.nameTitle.gameobject.width / this.nameTitle.gameobject.height);
        // this.nameTitle.transform.setMaxPreferredDisplaySize(this.ribbonText.transform.displayWidth * 0.5);
        this.hudGroup.push(this.nameTitle);
        this.hudContainer.add(this.nameTitle.gameobject);

        this.errorName = new Text(this.scene, 0, 0, "Gagal mengambil data, pastikan koneksi anda terhubung dan tekan tombol di bawah", this.textStyle);
        this.errorName.gameobject.setOrigin(0.5, 0);
        this.errorName.gameobject.setScale(this.screenUtility.screenPercentage * 1)
        this.errorName.gameobject.setWordWrapWidth(this.panel.gameobject.displayWidth * 0.5);
        this.errorName.gameobject.setPosition(
            this.nameTitle.gameobject.x, this.nameTitle.gameobject.y + this.nameTitle.transform.displayHeight * 1.15
        )
        this.errorName.gameobject.displayHeight = this.panel.gameobject.displayHeight * 0.7;
        this.errorName.gameobject.displayWidth = this.errorName.gameobject.displayHeight * (this.errorName.gameobject.width / this.errorName.gameobject.height);
        this.errorName.gameobject.displayWidth = this.panel.gameobject.displayWidth * 0.8;
        this.errorName.gameobject.displayHeight = this.errorName.gameobject.displayWidth * (this.errorName.gameobject.height / this.errorName.gameobject.width);
        this.hudGroup.push(this.errorName);
        this.hudContainer.add(this.errorName.gameobject);

        this.buttonRetry = new Button(this.scene, this.panel.gameobject.x, this.panel.gameobject.y + this.panel.transform.displayHeight * 0.5, GameplayAsset.ui_result_replay_button.key, 0);
        this.buttonRetry.gameobject.setOrigin(0.5, 0);
        this.buttonRetry.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth / 6.5);
        this.buttonRetry.gameobject.displayHeight = this.screenUtility.height * 0.1;
        this.buttonRetry.gameobject.displayWidth = this.buttonRetry.gameobject.displayHeight * (this.buttonRetry.gameobject.width / this.buttonRetry.gameobject.height);
        this.hudGroup.push(this.buttonRetry);
        this.hudContainer.add(this.buttonRetry.gameobject);

        this.sandClock = new Sprite(this.scene, 0, 0, GameplayAsset.sand_clock.key);
        this.sandClock.gameobject.setOrigin(0.5);
        this.sandClock.gameobject.setScale(0.35);
        this.sandClock.gameobject.setPosition(this.screenUtility.centerX, this.screenUtility.centerY - this.sandClock.transform.displayWidth * 0.65);
        this.sandClock.gameobject.setAlpha(0);
        this.hudContainer.add(this.sandClock.gameobject);

        this.hudGroup.forEach(element => {
            element.gameobject.setVisible(false);
            element.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
        });
    }
    /**@param {string} text*/
    setAlertText = (text) => {
        this.errorName.gameobject.setText(text);
    }
    setDefaultText = () => {
        this.errorName.gameobject.setText( "Gagal mengambil data, pastikan koneksi anda terhubung dan tekan tombol di bawah");
    }

    /**@param {Function} onbuttonRetry*/
    registerButtonRetryEvent = (onbuttonRetry) => {
        this.buttonRetry.gameobject.on('pointerdown', () => {
            this.fetch(onbuttonRetry);
            // onbuttonRetry();
        });
    }
    
    /**
     * 
     * @param {boolean} show 
     * @param {Function} onStart 
     */
    showAlert = (show, onStart = null) => {
        this.hudGroup.forEach(element => {
            element.gameobject.setVisible(show);
        });
        this.buttonRetry.gameobject.on('pointerdown', () => {
            this.fetch();
            onStart();
        });
        this.sandClock.gameobject.setVisible(false);
    }
    hideAlert = () => {
        this.hudGroup.forEach(element => {
            element.gameobject.setVisible(false);
        });
        this.sandClock.gameobject.setVisible(false);
    }

    fetch = (onFinish = null) => {
        this.nameTitle.gameobject.setVisible(false);
        this.errorName.gameobject.setVisible(false);
        this.buttonRetry.gameobject.setVisible(false);
        this.scene.tweens.add({
            targets: this.sandClock.gameobject,
            alpha: 1,
            duration: GameplayData.delayLoading,
            ease: Phaser.Math.Easing.Sine.Out
        });
        this.scene.tweens.add({
            targets: this.sandClock.gameobject,
            angle: 364.5,
            duration: GameplayData.delayLoading,
            ease: Phaser.Math.Easing.Linear,
            loop: -1
        });
    }
}