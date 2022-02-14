import ResultView from "./result_view";
import GameplayData from '../../gameplay_data';
import { AudioAsset } from "../../../../assetLibrary";
import MissionController from "../mission/mission_controller";
import { SceneInfo } from "../../../../info";
import { BaseController } from "../../../../core";
import AudioController from "../../../../module/audio/audio_controller";

/**
 * @typedef {import("../../../../def/custom").Agate.Gameplay.Mission} Mission
 */

/**
 * A class to display result after completing mission
 * @class
 */
export default class ResultController extends BaseController {
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super();
        this.scene = scene;

    }

    init = () => {
        this.audioController = AudioController.getInstance();
        this.view = new ResultView(this.scene);
        this.view.init();
    
        this.missionController = new MissionController();
        this.missionController.init();

    }

    create = () => {
        this.view.createHUD();
        this.audioController.play(AudioAsset.bgm_mission_complete.key);
        this.registerOnCreateMissionListHUD();
        this.view.registerButtonBackEvent(() => {
            this.audioController.stopBGM();
            //next mission
            this.scene.scene.start(SceneInfo.WORLDMAP.key, {
                refresh: false
            });
        });


        this.view.registerButtonSSEvent(() => { 
            var canvas;

            function exportCanvasAsPNG(id, fileName, dataUrl) {
                var canvasElement = document.getElementById(id);
                var MIME_TYPE = "image/png";
                var imgURL = dataUrl;
                var dlLink = document.createElement('a');
                dlLink.download = fileName;
                dlLink.href = imgURL;
                dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
                document.body.appendChild(dlLink);
                dlLink.click();
                document.body.removeChild(dlLink);
            }

            this.scene.game.renderer.snapshot(function (image) {
                exportCanvasAsPNG(canvas, 'dshima-snapshot', image.src);
            });
        });

        this.view.registerButtonNextEvent(() => {
            //Load next level if available
            if(GameplayData.NextMap.nextMapName == 'Kluster 2_2-1b'){
                GameplayData.NextMap.nextMapName = 'Kluster 2_2-1a'
            }
            const nextMissionIdx = GameplayData.missionList.findIndex(e=> e.mission.mission_name === GameplayData.NextMap.mission_name) + 1;

            if(nextMissionIdx < GameplayData.missionList.length ){

                this.missionController.createDefaultGameplayData(this.scene.scene.key);
                const {categoryName, mission} = GameplayData.missionList[nextMissionIdx];
                console.log(categoryName, mission)
                this.loadExplore(categoryName, mission);
            }else{
                this.scene.scene.start(SceneInfo.TITLE.key);
            }
        });
    }

    /**
     * 
     * @param {string} categoryname
     * @param {Mission} mission 
     */
    loadExplore = (categoryname,mission)=>{
        //NOTE: may be useful
        GameplayData.NextMap.mission_id = mission.mission_id;
        GameplayData.NextMap.mission_name = mission.mission_name;
        GameplayData.NextMap.categoryMission = categoryname;
        GameplayData.NextMap.nextMapName = mission.next_map;
        GameplayData.NextMap.dataMap = mission;

        GameplayData.currentTopicId = GameplayData.currentTopic.findIndex(category => category.category === categoryname)

        let currentMain = [];
        let currentBonus = [];
        mission.mission_types.main_missions.forEach(m => {
            currentMain.push({mission: m.mission, target: 0})
        } );
        mission.mission_types.bonus_missions.forEach(m => {
            currentBonus.push({mission: m.mission, target: 0})
        } );

        /**@type {ExploreData} */
        let exploreData = {
            category: categoryname, 
            map_name: mission.next_map, 
            mission_target: mission.mission_types,
            mission_current: {main_missions: currentMain, bonus_missions: currentBonus}
        } 
         /**
         * if main mission is watch VN, then launch VN controller.
         */

        if(currentMain[0].mission === 'Watch VN') {
            this.view.fadein.show(() => {
            this.audioController.stopBGM();
            this.scene.scene.start(SceneInfo.VISUALNOVEL.key)    
            })
        } else {
            this.view.fadein.show(()=>{
                this.audioController.stopBGM();
                this.scene.scene.start(SceneInfo.EXPLORE.key, {
                    refresh: true,
                    exploreData: exploreData
                });
            });
        }

    }

    registerOnCreateMissionListHUD = () => {
        const statusMonster = GameplayData.result.statusMonster;
        this.view.createMissionResultListHUD(1, GameplayData.result.mainMission.mission, GameplayData.baseScore);
        const bonusScore = GameplayData.bonusScore;
        if(bonusScore > 0){
            this.view.createMissionResultListHUD(2, GameplayData.result.bonusMission.mission, GameplayData.bonusScore);
        }

        if (statusMonster) {
            this.view.createMissionResultListHUD(3, GameplayData.result.bonusMonster.mission, GameplayData.MonsterScore);
            this.view.createMissionResultListHUD(4, GameplayData.result.bonusCombo.mission, GameplayData.ComboScore);
        }

        this.view.TotalScore.gameobject.setText(GameplayData.Score);
    }
}