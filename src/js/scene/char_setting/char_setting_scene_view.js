import {BaseView} from '../../core/'
import Sprite from '../../module/gameobjects/sprite';
import Text from '../../module/gameobjects/text';
import formUtil from '../../module/formUtility/formUtil';
import { AnimationHelper } from '../../helper';
import Button from '../../module/gameobjects/button';
import GamePlayData from '../gameplay/gameplay_data';
import { AudioAsset, FontAsset, GameplayAsset, Animations } from "../../assetLibrary"

export default class CharSettingSceneView extends BaseView {
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super(scene);

        this.charAnimations = {
            maleIdle: Animations.male_idle,
            femaleIdle: Animations.female_idle
        }

        this.style = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: 1600,
                useAdvancedWrap: true
            },
            color: '#42210B',
        }
        this.styleGray = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: 1000,
                useAdvancedWrap: true
            },
            color: '#5c4a3e',
        }

        this.styleWhite = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: 1000,
                useAdvancedWrap: true
            },
        }
    }

    create = () => {
        this.formUtil = new formUtil({
            scene: this.scene,
            rows: 11,
            cols: 11
        });
        this.formUtil.showNumbers();
        this.background = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.centerY, GameplayAsset.char_setting_background.key);
        this.background.gameobject.setScale(this.screenUtility.screenPercentage * 2);
        this.background.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height);

        this.gradient = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.height, GameplayAsset.gradient_quiz.key);
        this.gradient.gameobject.setOrigin(0.5, 1);
        this.gradient.transform.setMinPreferredDisplaySize(this.screenUtility.width * 1.155, this.screenUtility.height * 0.5);

        this._createCharacter();
        this._createInputPanel();

        //button
        this.selectCharButton = new Button(this.scene, this.screenUtility.centerX, this.screenUtility.height * 0.91, GameplayAsset.ui_result_play_button.key, 0, AudioAsset.sfx_button_main_menu.key);
        this.selectCharButton.setPressedTexture(GameplayAsset.ui_result_play_button.key, 2);
        this.selectCharButton.gameobject.setScale(this.screenUtility.screenPercentage * 2).setOrigin(0.5, 1).setInteractive().setVisible(false);
        this.selectCharButton.gameobject.setPosition(this.charSelectPanel.gameobject.x, this.charSelectPanel.gameobject.y - this.charSelectPanel.gameobject.displayHeight * 0.5 + this.selectCharButton.gameobject.displayHeight * 2);

        //animation
        AnimationHelper.AddAnimationList(this.scene, this.charAnimations);

        if(CONFIG.DEVELOPMENT_BUILD && CONFIG.CHEAT_MODE){
            this.cheatBattle = new Button(this.scene, this.screenUtility.centerX, 0 + (this.screenUtility.height * 0.1), GameplayAsset.submit_button.key);
            this.cheatBattle.click.on(()=>{
                GamePlayData.CHEAT = !GamePlayData.CHEAT;
                console.log(`CHEAT STATUS : ${GamePlayData.CHEAT}`);
            })
        }
    }

    _createCharacter = ()=>{
        this.characterContainer = this.scene.add.container(0,0);
        this.characterPanelContainer = this.scene.add.container(0,0);

        this.charFemale = new Sprite(this.scene, this.screenUtility.width * 0.3, this.screenUtility.height * 0.495, GameplayAsset.char_female.key);
        this.charFemale.gameobject.setScale(this.screenUtility.screenPercentage * 2).setOrigin(0.5).setInteractive().setTint(0x666666);

        this.charMale = new Sprite(this.scene, this.screenUtility.width * 0.7, this.screenUtility.height * 0.495, GameplayAsset.char_male.key);
        this.charMale.gameobject.setScale(this.screenUtility.screenPercentage * 2).setOrigin(0.5).setInteractive().setTint(0x666666);

        //panel char
        this.charSelectPanel = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.height * 0.8, GameplayAsset.ui_login_box_1.key);
        this.charSelectPanel.gameobject.setScale(this.screenUtility.screenPercentage * 2)
            .setOrigin(0.5, 1);
        this.charSelectPanelText = new Text(this.scene, 0, 0, 'Memeriksa data...', this.style);
        this.charSelectPanelText.transform.setFontSize(30);
        this.charSelectPanelText.gameobject.setOrigin(0.5)
            .setPosition(
                this.charSelectPanel.gameobject.x,
                this.charSelectPanel.gameobject.y - this.charSelectPanel.gameobject.displayHeight * 0.5 + this.charSelectPanelText.gameobject.displayHeight * 0.2);
        
        this.characterContainer.add(this.charMale.gameobject);
        this.characterContainer.add(this.charFemale.gameobject);

        this.characterPanelContainer.add(this.charSelectPanel.gameobject);
        this.characterPanelContainer.add(this.charSelectPanelText.gameobject);
    }

    _createInputPanel = ()=>{       
        //panel name
        this.inputContainer = this.scene.add.container(0,0);

        this.inputPanel = new Sprite(this.scene, 0, 0, GameplayAsset.ui_login_box_2.key);
        this.inputPanel.gameobject.setScale(this.screenUtility.screenPercentage * 2)
            .setOrigin(0.5, 1)
            .setPosition(this.charSelectPanel.gameobject.x, this.charSelectPanel.gameobject.y);
        this.inputPanelTitleText = new Text(this.scene, 0, 0, 'Siapa namamu? (Maksimal 12 karakter)', this.style);
        this.inputPanelTitleText.transform.setFontSize(30);
        this.inputPanelTitleText.gameobject.setOrigin(0.5, 1)
            .setPosition(
                this.inputPanel.gameobject.x,
                this.inputPanel.gameobject.y - this.inputPanel.gameobject.displayHeight * 0.5 - this.inputPanelTitleText.gameobject.displayHeight);
        this.inputBox = new Sprite(this.scene, 0, 0, GameplayAsset.question_box.key);
        this.inputBox.gameobject.setScale(this.screenUtility.screenPercentage * 1.75, this.screenUtility.screenPercentage)
            .setOrigin(0.5, 1)
            .setInteractive()
            .setPosition(
                this.inputPanel.gameobject.x,
                this.inputPanel.gameobject.y - this.inputPanel.gameobject.displayHeight * 0.5 + this.inputBox.gameobject.displayHeight * 0.75);
        this.inputText = new Text(this.scene, 0, 0, 'Masukkan Nama Anda', this.style);
        this.inputText.transform.setFontSize(30);
        this.inputText.gameobject.setOrigin(0.5, 1)
            .setPosition(
                this.inputBox.gameobject.x,
                this.inputBox.gameobject.y - this.inputBox.gameobject.displayHeight * 0.5 + this.inputText.gameobject.displayHeight * 0.5
            );

        this.inputContainer.add(this.inputPanel.gameobject);
        this.inputContainer.add(this.inputPanelTitleText.gameobject);
        this.inputContainer.add(this.inputBox.gameobject);
        this.inputContainer.add(this.inputText.gameobject);

        this.inputContainer.setVisible(false);
    }

    animationMaleIdle = () => {
        this.charMale.gameobject.anims.play(this.charAnimations.maleIdle.key);
    }

    animationFemaleIdle = () => {
        this.charFemale.gameobject.anims.play(this.charAnimations.femaleIdle.key);
    }

    animationMalePause = () => {
        this.charMale.gameobject.anims.pause();
    }

    animationFemalePause = () => {
        this.charFemale.gameobject.anims.pause();
    }

    selectCharFemale = ()=>{
        this.charFemale.gameobject.setTint(0xffffff);
        this.charMale.gameobject.setTint(0x666666);
        this.animationFemaleIdle();
        this.animationMalePause();
    }

    selectCharMale = ()=>{
        this.charMale.gameobject.setTint(0xffffff);
        this.charFemale.gameobject.setTint(0x666666);
        this.animationMaleIdle();
        this.animationFemalePause();
    }

    /**@param {boolean} isVisible */
    setSelectButtonVisible = (isVisible)=>{
        this.selectCharButton.gameobject.setVisible(isVisible);
    }

    /**@param {Function} event*/
    registerOnSelect = (event)=>{
        this.selectCharButton.click.on(event);
    }

}