/**
 * @typedef {import("../../def/custom").Agate.Gameplay.QuestionData} QuestionData
 * @typedef {import("../../def/custom").Agate.Gameplay.Mission} Mission
 */

/**
 * @typedef {Object} missionList
 * @property {string} categoryName
 * @property {Mission} mission
 */

/**
 * @typedef {Object} ChestData
 * @property {number} id 
 * @property {string} type 
 * @property {"win" | "lose" | "unknowed"} status 
 * @property {number} score 
 */

export default
{    
    //game id
    isConnected : false,
    //player identity
    uuid : 0,
    Gender : 0,
    PlayerName : 'DefaultPlayer',
    LastName : 'DefaultPlayer',
    PlayerUID : 0,
    //progression
    CurrentStage: 0,
    Score: 0,
    LastMap : null, //maybe store current loaded map data object here for convenience.
    LastX : 0,
    LastY: 0,
    baseScore: 0,
    MonsterScore: 0,
    ComboScore: 0,
    bonusScore:0,
    //battle, because player stats is carried over, may move player battle data somewhere else...
    Level: 1,
    Hp: 300,
    MaxHp: 300,
    Mp: 0,
    MaxMp: 4,
    Atk: 40,
    Combo: 0, //always reset to 0
    MaxCombo: 0,
    SkillUseCount: 0,
    HasTakenDamage: false,
    UsedHealCommand: false,
    /**
     * Starts from 1.
     */
    EnemyType: 1,
    // next_map: "gugur_1-8",
    kluster: 0,
    /**@type {missionList[]} */
    missionList: [],
    currentMonsterLevel: 1,
    monsterType: null,
    xTile: 0,
    yTile: 0,
    scaleX: 0,
    faceDirection: 0,
    /**
     * @type {Array<QuestionData>} BattleQuizData
     */
    BattleQuizData:[],
    DestroyMonster:[],//dummy {map:"gugur_1-6", monsterID:66}
    // DestroyMonster:[{map:"gugur_1-6", monsterID:66}],
    DestroyMonsterCount:null,
    OpenChest:{
        lastChestOpenID : 0,
        status: "lose",
        /**@type {ChestData[]} */
        data : []
    },
    DialogSuccess:[],
    tutorialStatus: true,
    BattleMonsterID:0,
    currentTopicId:0,
    currentBSLTopicID : 'BSL1',
    NextMap: {
        nextMapName : "gugur_1-10",//Kluster 2_2-1b gugur_1-10
        nextPosition : {x:5,y:5},
        nextTheme : "1",
        nextMission : "sample",
        faceDirection : "d",
        cluster: "Pembukaan Rekening",
        categoryMission : "Alur Pembukaan Rekening",
        mission_name:"Misi 3-1",
        mission_id : "MS000",
        bslLink : '',
        bslId : '',
        dataMap: {
            next_map: "gugur_1-10",
            next_position_tile:{
                xTile: "22,",
                yTile: "2"},
            next_face_direction: "l",
            next_map_theme: "1",
            quiz_file_name: "quiz.json",
            mission_name: "Misi 3-3",
            mission_types: {
                main_missions:[{
                    mission: "Solve Villagers' Issues",
                    target: 2
                }],
                bonus_missions:[{
                    mission: "Make Them Super Happy",
                    target: 1
                },{
                    mission: "Open Chest",
                    target: 1
                }]
            }
        }
    },
    //Explorer state saver
    exploreStateSaver : {
        playerTileSave : {xTile:-1,yTile:-1,facing:-1},
        playerPos : {xTile:0,yTile:0},
		stateTileInfoSave : [],
		battleTileInfo : null,
		lastMapName : ""
    },
    IS_DEBUG: false,
    //Result Data
    result : {
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
    },
    IS_WINTER: false,
    //object data all
    npcPartDataSpawn: [],
    npcDataSpawn: [],
    chestPartDataSpawn: [],
    gotoPartDataSpawn: [],
    /**
     * @type {Phaser.Sound.BaseSound}
     */
    EXPLORE_BGM: null,
    game : null,
    delayLoading : 1500,
    scene : "explore",
    CHEAT: false,
    /**Tutorial flags */
    HasShowBattleTutorial: false,
    HasShowIntroExplore: false,
    /** */
    MonsterDefeatedId: [],
    CurrentBattledMonster: 0,
    CurrentTalkedNpc: 0,
};