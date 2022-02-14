import { BaseController } from '../../../../core';
import GameplayData from '../../gameplay_data';
import ExploreStateSaver from '../explore_state_saver';


/**
 * @typedef {import('../../../../def/custom').Agate.Gameplay.MissionData} MissionData
 * @typedef {import('../../../../def/custom').Agate.Gameplay.MissionType} MissionType
 */
export default class MissionController extends BaseController{
    constructor(scene){
        super(scene)
        this.onMissionComplete;

        /**@type {MissionType} */
        this.currentMission = {main_missions: null, bonus_missions: null};
        /**@type {Array<MissionData>} */
        this.currentMainMision = [];
        /**@type {Array<MissionData>} */
        this.currentBonusMission = [];
        /**@type {MissionData[]} */
        this.mainMissionTarget;
        /**@type {MissionData[]} */
        this.bonusMissionTarget;

        this.exploreStateSaver = ExploreStateSaver.getInstance();
    }

    /**
     * Function to init static variable, it depend your data
     * @public
     */
    init = ()=>{

    }

    /**
     * 
     * @param {MissionType} missionTarget 
     * @param {MissionType} missionCurrent 
     */
    setMission = (missionTarget, missionCurrent)=>{
        this.mainMissionTarget = missionTarget.main_missions;
        this.bonusMissionTarget = missionTarget.bonus_missions;
        this.currentMainMision = missionCurrent.main_missions;
        this.currentBonusMission = missionCurrent.bonus_missions;
    }

    /**
     * Update main mission and bonus mission target
     * @param {string} missionType 
     */
    updateMission = (missionType)=>{
        let mainMission = this.currentMainMision.find(mission => mission.mission === missionType);
        let bonusMission = this.currentBonusMission.find(mission => mission.mission === missionType);
        let mainTarget = this.mainMissionTarget.find(mission => mission.mission === missionType);
        let bonusTarget = this.bonusMissionTarget.find(mission => mission.mission === missionType);
        if(mainMission && mainMission.target < mainTarget.target){
            mainMission.target += 1;
        } 
        if(bonusMission && bonusMission.target < bonusTarget.target){
            bonusMission.target += 1;
        }
        this.checkProgress();
    }

    /**
     * Check main mission progress, if all current target equals main mission target
     */
    checkProgress = ()=>{
        let undoneMission = this.currentMainMision.filter((mission,index) => mission.target != this.mainMissionTarget[index].target );
        console.log('misi yang belum selesai', undoneMission.length)
        if(undoneMission.length === 0){
            this.calculateScore();
            this.onMissionComplete();
        }
    }

    calculateScore = ()=>{
        let currentScore = 0;
        const completedBonusMission = this._calculateBonusMission();
        const statusMonster = GameplayData.result.statusMonster;

        let chestScore = 0;
        GameplayData.OpenChest.data.forEach(element => {
            if (element.status === "win") {
                chestScore += element.score;
            }
        });

        GameplayData.result.bonusChest.count = chestScore;

        if(GameplayData.result.bonusChest.count==0 && completedBonusMission && GameplayData.DestroyMonsterCount ==0){
            currentScore += 100;
            GameplayData.baseScore = 100;
        }
        else{
            currentScore +=500;
            GameplayData.baseScore = 500;
        }
        GameplayData.bonusScore = GameplayData.result.bonusChest.count + completedBonusMission * 3
        
        let monsterScore = 0;
        if (GameplayData.DestroyMonsterCount != null) {            
            GameplayData.DestroyMonsterCount.forEach((element, index) => {
                if (index === 0)
                    monsterScore += element * 2;
                else if (index === 1)
                    monsterScore += element * 4;
                else if (index === 2)
                    monsterScore += element * 6;
                else if (index === 3)
                    monsterScore += element * 8;
                else if (index === 4)
                    monsterScore += element * 10;
            });
        }
        GameplayData.MonsterScore = monsterScore;
        
        GameplayData.ComboScore = GameplayData.result.bonusCombo.count * 20;

        if (statusMonster) {
            currentScore += GameplayData.MonsterScore;         
            currentScore += GameplayData.ComboScore;
        }
        GameplayData.Score = currentScore + GameplayData.bonusScore;
    }

    _calculateBonusMission = ()=>{
        const completed = this.currentBonusMission.filter((mission,index) => mission.target == this.bonusMissionTarget[index].target );
        return completed.length;
    }

    /**
     * Function to reset data from gameplay_data to be default again 
     * @public
     * @param {string} key
     */
    createDefaultGameplayData = (key = "MissionScene") =>{

        this.exploreStateSaver.deleteAllState();

        GameplayData.OpenChest = {
            lastChestOpenID : 0,
            status: "lose",
            data : []
        };
        GameplayData.DestroyMonster = [];
        GameplayData.DialogSuccess = [];
        GameplayData.MonsterScore = 0;
        GameplayData.ComboScore = 0;
        GameplayData.result = {
            statusMonster : false,
            mainMission : {
                mission : "Misi Utama",
                count : 0
            },
            bonusMission : {
                mission : "Misi Bonus",
                count : 0
            },
            bonusMonster : {
                mission : "Bonus Monster",
                count : 0
            },
            bonusCombo : {
                mission : "Bonus Combo",
                count : 0
            },
            bonusChest : {
                mission : "Bonus Chest",
                count : 0
            }
        }
        GameplayData.npcDataSpawn = [];
        GameplayData.npcPartDataSpawn = [];
        GameplayData.chestPartDataSpawn = [];        
        GameplayData.gotoPartDataSpawn = [];        
        GameplayData.SkillUseCount = 0;
        GameplayData.HasTakenDamage = false;
        GameplayData.UsedHealCommand = false;
        GameplayData.tutorialStatus = true;
        GameplayData.Hp = 300;
        GameplayData.Mp = 0;
        if (key === "MissionScene")
            GameplayData.missionList = [];
    }
}