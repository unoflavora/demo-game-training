import MissionView from './worldmap_scene_view';
import MissionController from '../gameplay/explore/mission/mission_controller';
import ParseJson from '../../module/parsejson/convert_csv_to_json';
import GameplayData from '../gameplay/gameplay_data';
import { SceneInfo } from '../../info';
import AudioController from '../../module/audio/audio_controller';
import TutorialController from '../gameplay/explore/tutorial/tutorial_controller';
import { MissionsAsset, AudioAsset } from "../../assetLibrary"
import { BaseSceneController } from '../../core';

/**
 * @typedef {import('../../def/custom').Agate.Gameplay.MissionContent} MissionContent
 * @typedef {import('../../def/custom').Agate.Gameplay.Mission} Mission
 * @typedef {import('../../def/custom').Agate.Gameplay.ExploreData} ExploreData
 * @typedef {import('../../def/custom').Agate.Gameplay.CategoryContent} CategoryContent
 */

/**
 * Cluster will define questions that will be asked.
 * It is indexed by mission's cluster.
 * @type {string}
 */
const CLUSTER = [
    "Trakindo Demo",
]

/**
 * Scene class that display mission list
 * @class
 */
export default class WorldmapSceneController extends BaseSceneController {
    /**@type {MissionContent} */
    chosenMapMissionContent;
    /**@type {MissionContent[]} */
    mapMissionContent;
    /**@type {Number} */
    clusterLength;

    constructor() {
        super({
            key: SceneInfo.WORLDMAP.key
        });
    }

    init = (data) => {
        console.log('create world map scene controller')
        this.audioController = AudioController.getInstance();
        this.view = new MissionView(this);
        this.parseJson = new ParseJson(this);
        this.missionController = new MissionController();

        this.exploreTutorialController = new TutorialController(this);
        this.battleTutorialController = new TutorialController(this);

        this.chosenIndex = GameplayData.kluster;
        this.missionController.init();
    }

    preload = () => {
        this.view.preload(()=>{
            this.audioController.playBGM(AudioAsset.bgm_main_menu.key);
            this.createMission();
        })
    }

    createMission = () => {
        console.log('creating mission')
        this.missionController.createDefaultGameplayData(this.scene.key);

        /**Get map mission content */
        const mapMission = this.cache.text.get(MissionsAsset.map_mission_content.key);
        
        if(GameplayData.mapMissionContent == null) {
            GameplayData.mapMissionContent = this.parseJson.ConvertMissionContentToJson(mapMission);
            
            //Minus by 1 because we using array
            this.clusterLength = GameplayData.mapMissionContent.length-1;
            GameplayData.chosenMapMissionContent = GameplayData.mapMissionContent[this.chosenIndex];
        } else{
            GameplayData.chosenMapMissionContent = GameplayData.mapMissionContent[this.chosenIndex];
        }  

        //if later found that every topic can have multiple category content, change this
        GameplayData.currentTopic = GameplayData.chosenMapMissionContent.topic_contents[0].category_content
            

        this.view.create(this.chosenIndex);

        if(this.clusterLength > 0){
            this.createPrevNext();
        }

        this.view.createTopicButton(GameplayData.chosenMapMissionContent);
        this.view.createSoundButton(this.audioController.isAudioActive);
        this.view.createRibbonPanel(CLUSTER[this.chosenIndex]);
        this.view.createSelectedMissionHUD();
        this.view.createMission();
        this.view.createMissionDetail();
        
        this.exploreTutorialController.create();
        this.battleTutorialController.create();

        this.view.on('SHOWMISSION',(topicName,categoryContent)=>{
            this.view.showMissionList(topicName,categoryContent);
            this.createMissionList(categoryContent);
        });

        this.view.on('SHOWMISSIONDETAL',(category, mission)=>{
            this.view.showMissionDetail(category, mission);
        });

        this.view.on('HIDEMISSION',()=>{
            this.view.hideMissionList();
            this.createMissionList();
        });

        this.view.on('HIDEMISSIONDETAL',()=>{
            this.view.hideMissionDetail();
        });

        this.view.on('LOADEXPLORE',(category, mission)=>{
            console.log('load explore')
            this.loadExplore(category, mission);
        });

        this.view.registerOnSoundButtonClicked(()=>{
            let isActive = ! this.audioController.isAudioActive;
            this.audioController.setAudioActive(isActive);
            this.view.setSoundButtonTexture(isActive);
        });  
    }

    createPrevNext = ()=>{
        this.view.createButtonNextPrevCluster(this.chosenIndex,this.clusterLength);
        this.view.registerButtonNextPrevCluster(
            () =>{              
                GameplayData.kluster = this.chosenIndex + 1;
                GameplayData.IS_WINTER = GameplayData.kluster > 0;
                this.scene.start(SceneInfo.WORLDMAP.key);
            },
            () => {           
                GameplayData.kluster = this.chosenIndex - 1;
                GameplayData.IS_WINTER = GameplayData.kluster > 0;
                this.scene.start(SceneInfo.WORLDMAP.key);
            }
        );
    }

    /**
     * Rephrase mission from different category into one LONG array, if length zero, empty the array
     * @param {CategoryContent[]} categoryContent 
     */
    createMissionList = (categoryContent = [])=>{
        if(categoryContent.length <= 0){
            GameplayData.missionList = [];
        }else{
            categoryContent.forEach((category)=>{
                category.missions.forEach((mission)=>{
                    GameplayData.missionList.push({categoryName: category.category, is_unlocked: category.is_unlocked, mission: mission});
                });
            });
        }
    }

    /**
     * 
     * @param {string} categoryName 
     * @param {Mission} mission 
     */
    loadExplore = (categoryName,mission)=>{
        //NOTE: may be useful
        GameplayData.NextMap.mission_id = mission.mission_id;
        GameplayData.NextMap.cluster = CLUSTER[this.chosenIndex];
        GameplayData.NextMap.mission_name = mission.mission_name;
        GameplayData.NextMap.categoryMission = categoryName;
        GameplayData.NextMap.nextMapName = mission.next_map;
        GameplayData.NextMap.dataMap = mission;
        
        //for next mission
        GameplayData.currentTopicId = GameplayData.currentTopic.findIndex(category => category.category === categoryName)

        
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
            category: categoryName, 
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
            this.scene.start(SceneInfo.VISUALNOVEL.key, {
                refresh: true,
            })    
            })
        } else {
            this.view.fadein.show(()=>{
                this.audioController.stopBGM();
                this.scene.start(SceneInfo.EXPLORE.key, {
                    refresh: true,
                    exploreData: exploreData
                });
            });
        }

      
    }
}