import { GameplayAsset } from "../../../../assetLibrary";
import {BaseController} from "../../../../core";
import { SceneInfo } from "../../../../info";
import MissionController from "../mission/mission_controller";
import MenuView from "./menu_view";

/**
 * @typedef {import('../../../../def/custom').Agate.Gameplay.MissionType} MissionType
 * @typedef {import('../../../../def/custom').Agate.Gameplay.MissionData} MissionData 
 */
export default class MenuController extends BaseController{
    /**@param {Phaser.Scene} scene*/
    constructor(scene){
        super();
        this.scene = scene;

        this.view = new MenuView(this.scene);
        this.missionController = new MissionController();
        this.missionController.init();

        this.onShowPanel;
        this.onHidePanel;

        this.haveBonusMission = false;
    }

    /**
     * 
     * @param {MissionType} missionData 
     */
    create = (missionData = undefined)=>{
        this.view.createIcon();
        this.view.createMenuPanel();
		this.view.createPanelButton();
        this._createMissionText(missionData.main_missions, missionData.bonus_missions);
        

        this.view.on(this.view.event.SHOWPANEL, this.onShowMissionPanel);
        this.view.on(this.view.event.HIDEPANEL, this.onHideMissionpanel);
        this.view.on(this.view.event.EXITCLICK, this.onExitClicked);
        this.view.on(this.view.event.SHOWMAINMISSION, this.onShowMainMission);
        this.view.on(this.view.event.SHOWBONUSMISSION, this.onShowBonusMission);
    }

    /**
     * 
     * @param {MissionData[]} misionUtama 
     * @param {MissionData[]} missionBonus 
     */
    _createMissionText = (misionUtama = [], missionBonus = [])=>{
        if(misionUtama.length != 0){
            misionUtama.forEach((mission,index)=>{
                this.view.createMainMissionText(mission, index);
            });
        }
        this.haveBonusMission = missionBonus.length != 0;
        if(this.haveBonusMission){
            missionBonus.forEach((mission,index)=>{
                this.view.createBonusMissionText(mission, index);
            });
        }else{
            this.view.bonusMissionButton.container.setVisible(false);
        }
    }

    /**
     * 
     * @param {MissionData[]} missionUtama 
     * @param {MissionData[]} currentMainMission 
     * @param {MissionData[]} missionBonus 
     * @param {MissionData[]} currentBonusMission 
     */
    updateMissionText = (missionUtama = [], currentMainMission = [], missionBonus = [], currentBonusMission = [])=>{
        missionUtama.forEach((mission,index)=>{
            if(mission.target == currentMainMission[index].target){
                this.view.missionTargetText[index].missionIcon.gameobject.setTexture(GameplayAsset.ui_menu_task_iconn.key, 1);
            }
            this.view.missionTargetText[index].missionTarget.gameobject.setText(`${currentMainMission[index].target}/${mission.target}`);
        });
        missionBonus.forEach((mission,index)=>{
            if(mission.target == currentBonusMission[index].target){
                this.view.bonusMissionList[index].missionIcon.gameobject.setTexture(GameplayAsset.ui_menu_task_iconn.key, 1);
            }
            this.view.bonusMissionList[index].missionTarget.gameobject.setText(`${currentBonusMission[index].target}/${mission.target}`);
        })
    }

    onShowMainMission = ()=>{
        this.view.showMainMission(true);
        this.view.showBonusMission(false);
        if(!this.haveBonusMission){
            this.view.bonusMissionButton.container.setVisible(false);
        }
    }

    onShowBonusMission = ()=>{
        this.view.showMainMission(false);
        this.view.showBonusMission(true);
    }

    onExitClicked = ()=>{
        this.scene.scene.start(SceneInfo.WORLDMAP.key);
    }

    /**@param {boolean} value*/
    showMenuIcon(value){
        this.view.menuButton.gameobject.setVisible(value);
    }

    onShowMissionPanel = ()=>{
        this.onShowPanel();
        let show = ! this.view.menuPanel.visible;
		this.view.menuButton.gameobject.setVisible(false);
        this.view.menuPanel.setVisible(show);
    }

    onHideMissionpanel = ()=>{
        this.onHidePanel();
        this.onShowMainMission();
        this.view.menuButton.gameobject.setVisible(true);
		this.view.menuPanel.setVisible(false);
    }
}