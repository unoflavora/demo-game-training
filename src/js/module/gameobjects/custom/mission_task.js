import { GameplayAsset, FontAsset } from "../../../assetLibrary";
import { MissionHelper } from "../../../helper";
import ScreenUtilityController from "../../screenutility/screen_utility_controller";
import Sprite from "../sprite";
import Text from "../text";

/**
 * @typedef {import('../../../def/custom').Agate.Gameplay.MissionData} MissionData
 */
class MissionTask {

    /**@type {Text[]} */
    missionTxt = [];
    /**@type {Number} */
    missionTxtLength = 3;
    /**@type {string} */
    title;

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Number} x 
     * @param {Number} y 
     * @param {string} missionTitle
     */
    constructor(scene,x,y,missionTitle){
        this.scene = scene;
        this.container = this.scene.add.container(x,y);
        this.title = missionTitle;
        this.screenUtility = ScreenUtilityController.getInstance();

        this.missionBox = new Sprite(this.scene, 0, 0, GameplayAsset.ui_menu_objektif_box.key);
        this.missionBox.gameobject.setOrigin(0.5).setDepth(1);

        this.missionTitle = new Text(this.scene, this.missionBox.gameobject.x - this.missionBox.transform.displayWidth * 0.325, this.missionBox.gameobject.y - (this.missionBox.transform.displayHeight * 0.425), this.title, {
            color: "#42210B", fontSize: "25px", fontFamily: FontAsset.cabin_bold.key, align: "center" });
        this.missionTitle.gameobject.setOrigin(0.5).setDepth(1);
        this.missionTitle.transform.setFontSize(25);

        this.missionTask = new Sprite(this.scene, this.missionBox.gameobject.x - this.missionBox.transform.displayWidth * 0.4, this.missionBox.gameobject.y + (this.missionBox.transform.displayHeight * 0.05), GameplayAsset.ui_menu_task_iconn.key, 0);
        this.missionTask.gameobject.setOrigin(0.5).setDepth(1);
        this.missionTask.gameobject.setScale(this.screenUtility.screenPercentage * 1.5);

        this.container.add([this.missionBox.gameobject, this.missionTitle.gameobject, this.missionTask.gameobject]);
        this._createMissionText();

        this.missionBox.transform.registerOnTransformUpdate(()=>{
            this.missionTitle.gameobject.setPosition(this.missionBox.gameobject.x - this.missionBox.transform.displayWidth * 0.325, this.missionBox.gameobject.y - (this.missionBox.transform.displayHeight * 0.425), this.title);
            this.missionTask.gameobject.setPosition(this.missionBox.gameobject.x - this.missionBox.transform.displayWidth * 0.4, this.missionBox.gameobject.y + (this.missionBox.transform.displayHeight * 0.05));
            this._updateMissionText();
        });
       
    }

    _createMissionText = ()=>{
        for (let index = 0; index < this.missionTxtLength; index++) {
            const missionText = new Text(this.scene, this.missionBox.gameobject.x - this.missionBox.transform.displayWidth * 0.3, this.missionBox.gameobject.y + this.missionTitle.transform.displayHeight * ((index * 1.5) - 0.75), '• Kill Monster', {
                color: "#42210B",fontSize: "25px",fontFamily: FontAsset.cabin_bold.key,align: "center"});
            missionText.transform.setFontSize(30);
            missionText.gameobject.setOrigin(0, 0.5).setDepth(1);
            missionText.gameobject.setVisible(false);
            missionText.transform.setMaxPreferredDisplaySize(this.missionBox.transform.displayWidth * 0.75, missionText.transform.displayHeight);
            this.container.add(missionText.gameobject);
            this.missionTxt.push(missionText);
        }
    }

    _updateMissionText = ()=>{
        this.missionTxt.forEach((text,index)=>{
            text.gameobject.setPosition(this.missionBox.gameobject.x - this.missionBox.transform.displayWidth * 0.3, 
                this.missionBox.gameobject.y + this.missionTitle.transform.displayHeight * ((index * 1.5) - 0.75));
        })
    }

    /**
     * 
     * @param {MissionData[]} missionData 
     */
    setMissionText = (missionData)=>{
        if(missionData.length != 0){
            missionData.forEach((m,index) => {
                this.missionTxt[index].gameobject.setVisible(true);
                this.missionTxt[index].gameobject.setText('• ' +  MissionHelper.FindAndRephraseMissionDescription(m.mission, m.target));
            });
        }
    }

    disable = ()=>{
        this.missionTxt.forEach((mt)=> mt.gameobject.setVisible(false));
        this.container.setAlpha(0.5);
    }

    reset = ()=>{
        this.missionTxt.forEach((mt)=> mt.gameobject.setVisible(false));
        this.container.setAlpha(1);
    }

    get gameobject(){
        return this.missionBox.gameobject;
    }

    get transform(){
        return this.missionBox.transform;
    }
}

export  {MissionTask};