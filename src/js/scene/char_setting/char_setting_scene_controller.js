import CharSettingView from "./char_setting_scene_view";
import AlertController from "../alert/alert_controller";
import { AudioAsset } from '../../assetLibrary';
import GamePlayData from '../gameplay/gameplay_data';
import { SceneInfo } from "../../info";
import AudioController from "../../module/audio/audio_controller";
import RequestController from "../../module/request/request_controller";
import { GENDER } from "./gender";
import { CheckInput } from "./input_check";
import { BaseSceneController } from "../../core";

/**
 * Scene class where user select character gender
 * @class
 */
export default class CharSettingSceneController extends BaseSceneController {


    /**
     * @param {Phaser.Scene} scene 
     */
    constructor() {
        super({
            key: SceneInfo.CHARCREATION.key
        });
    }
    init = () => {
        /**@private */
        this.alertController = new AlertController(this);
        this.view = new CharSettingView(this);

        this.audioController = AudioController.getInstance();
        this.requestController = RequestController.getInstance();

        /**@type {string} */
        this.charSelected = GENDER.MALE;
        /**@type {string} */
        this.playerName = "default ";
        /**@type {string} */
        this.playerNip = "0128332832";
        /**@type {"SELECT_CHAR" | "INPUT_NAME" | "INPUT_NIP" | "FINALIZE" | "LOAD_SCENE" } */
        this.currentState = "SELECT_CHAR";

    }

    preload = () => {
        this.audioController.playBGM(AudioAsset.bgm_adventure_fall.key);
        this.audioController.setBGMVolume(0.7);
        this.getSCORMData();
    }

    getSCORMData = () =>{
        GamePlayData.isConnected = this.requestController.getConnection();

        this.requestController.getStudentName().then((response)=>{
            let splitedName = response.split(',');
        
            GamePlayData.PlayerName = splitedName[1];
            GamePlayData.LastName = splitedName[0];

            this.playerName = GamePlayData.PlayerName;
        });

        this.requestController.getStudentId()
            .then((response)=>{
                GamePlayData.PlayerUID = response;
                this.playerNip = GamePlayData.PlayerUID;
            });
    }

    /**
     * Function to create event while button clicked (select character, button next, button submit, name box, nip box)
     * @private
     */
    create = () => {
        this.view.create();
        this.alertController.init();

        /**Select character female event */
        this.view.charFemale.gameobject.on('pointerdown', () => {
            if(this.currentState === 'SELECT_CHAR'){
                this.audioController.play(AudioAsset.sfx_button_main_menu.key);
                this.selectChar(GENDER.FEMALE);
            }
        });

        /**Select character male event */
        this.view.charMale.gameobject.on('pointerdown', () => {
            if(this.currentState == 'SELECT_CHAR')
            {
                this.audioController.play(AudioAsset.sfx_button_main_menu.key);
                this.selectChar(GENDER.MALE);
            }
        });

        
        this.view.selectCharButton.click.on(() => {
            this.audioController.play(AudioAsset.sfx_button_main_menu.key);
            if (this.charSelected != null) {
                this.onSelectCharButtonClicked();
            } 
        });

        this.view.inputBox.gameobject.on('pointerdown',this.inputPrompt);

        this.alertController.setDefaultText();
        this.alertController._hideAlert();

        this.view.charSelectPanelText.gameobject.text = 'Pilih karaktermu';

        this.view.selectCharButton.gameobject.setVisible(false);

    }

    /**
     * 
     * @param {String} gender 
     */
    selectChar = (gender) => {
        if(gender === GENDER.MALE)
        {
            this.charSelected = GENDER.FEMALE;
            GamePlayData.Gender = 1;
            
            this.view.selectCharMale();
            this.view.setSelectButtonVisible(true);
        }
        else if(gender === GENDER.FEMALE)
        {
            this.charSelected = GENDER.FEMALE;
            GamePlayData.Gender = 2;

            this.view.selectCharFemale();
            this.view.setSelectButtonVisible(true);

        }
    }

    inputPrompt = ()=>{
        if(this.currentState === 'INPUT_NAME')
        {
            this.playerName = prompt("Masukkan nama", "");
            const errorMsg = CheckInput.isValidName(this.playerName);
            if(!errorMsg){
                this.view.inputText.gameobject.setText(this.playerName);
                this.view.setSelectButtonVisible(true);
            }
        }
        else if(this.currentState === 'INPUT_NIP'){
            this.playerNip = prompt("Berapa Nomor Induk Kepegawaian kamu?", "");
            const errorMsg = CheckInput.isValidNIP(this.playerNip);
            if(!errorMsg){
                this.view.inputText.gameobject.setText(this.playerNip);
                this.view.setSelectButtonVisible(true);
            }

        }
    }

    nextState = ()=>{
        switch(this.currentState){
            case "SELECT_CHAR":
                this.currentState = "INPUT_NAME";
                break;
            case "INPUT_NAME":
                this.currentState = "INPUT_NIP";
                break;
            case "INPUT_NIP":
                this.currentState = "FINALIZE";
                break;
            case "FINALIZE":
            default:
                this.currentState = "LOAD_SCENE";
                break;
        }
    }


    onSelectCharButtonClicked = () => {
        this.nextState();
        this.view.setSelectButtonVisible(false);

        
        if(this.currentState === 'INPUT_NAME'){
            this.view.inputContainer.setVisible(true);
            this.view.characterPanelContainer.setVisible(false);
            this.view.inputPanelTitleText.gameobject.setText('Siapa namamu? (Maksimal 12 karakter)');
            this.view.inputText.gameobject.setText('Masukkan Nama Anda');
        }
        else if(this.currentState === 'INPUT_NIP'){
            this.view.inputContainer.setVisible(true);
            this.view.characterPanelContainer.setVisible(false);
            this.view.inputPanelTitleText.gameobject.setText('Masukan Nomor Induk Kepegawaian kamu');
            this.view.inputText.gameobject.setText('NIK');
        }
        else if(this.currentState === 'FINALIZE')
        {
            this.view.setSelectButtonVisible(true);
            this.view.inputContainer.setVisible(false);
            this.view.characterPanelContainer.setVisible(true);
            this.view.charSelectPanelText.gameobject.text = `Selamat datang, ${this.playerName}.\nSelamat berpetualang!`;
        }
        else if(this.currentState === 'LOAD_SCENE')
        {
            this.loadMissionScene();
        }
    }

    
    loadMissionScene = () => {
        GamePlayData.PlayerName = this.playerName;
        GamePlayData.playerNip = this.playerNip;

        this.audioController.stopBGM(true);
        //Refresh game state, hacky implementation
        this.scene.start(SceneInfo.WORLDMAP.key,{
                refresh: undefined
            });
    }
}