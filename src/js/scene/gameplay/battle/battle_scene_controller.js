import BattleSceneView from './battle_scene_view';
import BattleController from './battle_controller';
import GamePlayData from '../gameplay_data.js';
import { SceneInfo } from '../../../info';
import { EventName, MissionPubSub } from '../../../module/pubsub';
import { MissionHelper } from '../../../helper';
import { MISSION_DATA, MISSION_LIST } from '../explore/mission/mission_data';
import TutorialController from "../explore/tutorial/tutorial_controller";
import { BaseSceneController } from '../../../core';
import { battleTutorialKeys } from '../explore/tutorial/tutorial_data';

/**
 * Scene class that handle battle scene
 * @class
 */
export default class BattleSceneController extends BaseSceneController
{
    //IMPORTANT: during explore, when player interacts with monster, set enemy type in gameplay data before calling this scene.
    constructor()
    {
        super({key: SceneInfo.BATTLE.key});
    }


    init = () =>
    {
        console.log("Battle Scene Controller Loaded");

        if(CONFIG.DEVELOPMENT_BUILD){
            if(GamePlayData.CHEAT){
                GamePlayData.Atk = 1000000;
            }
        }
        GamePlayData.scene = SceneInfo.BATTLE.key;
        this.view = new BattleSceneView(this).create();
        // console.log(GamePlayData.BattleQuizData);

        this.battleController = new BattleController(this);
        this.battleController.init(this.view.updateHpDisplay, {questions: GamePlayData.BattleQuizData});
        this.tutorialController = new TutorialController(this);

        this.tutorialController.create();

        if (!GamePlayData.HasShowBattleTutorial) {
            GamePlayData.HasShowBattleTutorial = true;
            this.tutorialController.activeTutorialView(battleTutorialKeys, ()=>{
                this.battleController.configureViewButtons();
            })
        }else{
            this.battleController.configureViewButtons();
        }

        this.battleController.registerOnNextTurn(()=>{
            this.view.updateHpDisplay(this.battleController.playerBattlerData, this.battleController.enemyBattlerData);
        });
        this.battleController.registerOnEnemyTurnEnd(()=>{
            //console.log("enemy turn ended.");
        });
        this.battleController.registerOnDefeat(()=>{
            //console.log("you are defeated");
            this.scene.stop(SceneInfo.EXPLORE.key);
            this.scene.start(SceneInfo.WORLDMAP.key);
        });
        this.battleController.registerOnVictory(()=>{
            //console.log("you are victory");
            GamePlayData.MonsterDefeatedId.push(GamePlayData.BattleMonsterID);
            this.calculateMonsterScore();
            this.updateMission();
            this.loadScene(SceneInfo.EXPLORE.key);
        });
    }

    calculateMonsterScore = ()=>{
        GamePlayData.DestroyMonster.push({monsterID: GamePlayData.BattleMonsterID, monsterType: GamePlayData.EnemyType});
            
        this.countMonster = new Array(MISSION_LIST.filter((m)=>m.type == "kill_monster").length).fill(0);
        GamePlayData.DestroyMonster.forEach(element => {
            this.countMonster[parseInt(element["monsterType"]) - 1] += 1;
            });
        GamePlayData.DestroyMonsterCount = this.countMonster;
    }

    updateMission = ()=>{
        MissionPubSub.publish(EventName.MISSIONUPDATE, MissionHelper.FindMonsterMission(GamePlayData.EnemyType));

        let healthPrecentage = (GamePlayData.Hp / GamePlayData.MaxHp);
        if(healthPrecentage >= 0.5){
            MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.HP_50.key);
        }
        if(healthPrecentage >= 0.75){
            MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.HP_75.key);
        }
        if(healthPrecentage >= 1){
            MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.HP_100.key);
        }

        if(GamePlayData.UsedHealCommand){
            MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.HEAL.key);
        }

        if(GamePlayData.SkillUseCount > 0){
            MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.SPECIAL_ATTACK.key);
        }

        if(!GamePlayData.HasTakenDamage){
            MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.NO_HIT.key);
        }

        GamePlayData.result.statusMonster = true;
        GamePlayData.result.bonusCombo.count = GamePlayData.MaxCombo;
    }

    /**
    * 
    * @param {string} key 
    */
    loadScene = (key)=>{
        this.scene.stop();
        this.scene.wake(key);
    }

    preload = ()=>
    {
        //play sound here
    }

    create = ()=>
    {
        
    }

    update = ()=>
    {

    }
}