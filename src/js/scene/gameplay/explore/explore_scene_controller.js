import GameplayData from '../gameplay_data';
import ExploreSceneView from "./explore_scene_view";
import TutorialController from './tutorial/tutorial_controller';
import ResultController from './result/result_controller'
import AudioController from "../../../module/audio/audio_controller";
import { AudioAsset } from "../../../assetLibrary";
import MenuController from './menu/menu_controller';
import CharacterController from './instance/character/character_controller';
import ParserRoleplayController from "../../../module/parsejson/roleplay_parser";
import DialogueController from "../dialogue/dialogue_controller";
import { MissionPubSub, EventName } from '../../../module/pubsub';
import MissionController from "./mission/mission_controller";
import BattleQuizParser from '../../../module/parsejson/battle_quiz_parser';
import { TileInfo, SceneInfo } from '../../../info';
import ExploreStateSaver from './explore_state_saver';
import { MissionHelper } from '../../../helper';
import { PreloadTilemapAsset } from '../../../module/loader';
import { Monster, Teleporter, Chest, Npc} from '../../../module/gameobjects/tileobjects'
import { MISSION_DATA, MISSION_LIST } from './mission/mission_data';
import { BaseSceneController } from '../../../core';
import { roleplayTutorialKeys } from './tutorial/tutorial_data';
import AlertController from '../../alert/alert_controller';

/**
 * @typedef {import('../../../def/custom').Agate.Gameplay.ExploreData} ExploreData
 * @typedef {import('../../../def/custom').Agate.Gameplay.SaveData} SaveData
 */

/**
 * Scene class where player can explore map
 * @class
 */
export default class ExploreSceneController extends BaseSceneController {

    /**
     * @param {Phaser.Scene} scene 
     */
    constructor() {
        super({
            key: SceneInfo.EXPLORE.key
        });

    }

    init = (data)=>{
        /**@type {boolean} */
        this.isFocus = true;
        /**@type {boolean} */
        this.missionComplete = false;
        /**@type {boolean} */
        this.isDialogActive = false;
        /**@type {boolean} */
        this.sceneReady = false;
        /**@type {ExploreData} */
        this.currentExploreData = null;
        /**@type {DialogueController} */
        this.dialogueController = null;
        /**@type {boolean} */
        this.iframeInitiated = false;

        GameplayData.scene = SceneInfo.EXPLORE.key;

        this.currentExploreData = data.exploreData != undefined ? data.exploreData : null;

        /**@type {Number []} */
        this.talkedNpc = []

        this.audioController = AudioController.getInstance();
        this.exploreStateSaver = ExploreStateSaver.getInstance();
        this.view = new ExploreSceneView(this);
        this.menu = new MenuController(this);
        this.character = new CharacterController(this);
        this.missionController = new MissionController();
        this.endingPopup = new TutorialController(this);
        this.introPopup = new TutorialController(this);
        this.resultController = new ResultController(this);
        this.parserRoleplayController = new ParserRoleplayController(this);
        this.battleQuizParser = new BattleQuizParser(this);
        this.preloadTilemap = new PreloadTilemapAsset(this);
        this.alertController = new AlertController(this.scene.scene)
        

        this.view.init(this.currentExploreData.map_name);
        this.missionController.init();
        this.resultController.init();

    }

    preload = ()=>{
        this.createInput();
        this.view.sandclockPanel.shown();
        this.preloadTilemap.loadTilemap(this.currentExploreData.map_name)
            .then(()=>{
                this.load.removeAllListeners();
                this.view.sandclockPanel.setVisible(false);
                this.sceneReady = true;
                this.playAudio();
                this.createExplore();
            });
    }

    createInput = ()=>{
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            w: "w",
            a: "a",
            s: "s",
            d: "d"
        });
    }

    createExplore = ()=>{
        const { mission_target, mission_current } = this.currentExploreData;
        this.missionController.setMission(mission_target, mission_current);
        this.view.createTileMap();
        this.view.setLayerDepth(TileInfo.tilelayer.ABOVE);
        this.view.createChests();
        this.view.createEnemies();
        this.view.createNpc();
        this.view.createTeleporter();
        this.character.create();
        this.menu.create(mission_target);
        this.menu.updateMissionText(this.missionController.mainMissionTarget, this.missionController.currentMainMision, this.missionController.bonusMissionTarget, this.missionController.currentBonusMission);
        this.endingPopup.create();
        this.introPopup.create();

        this.createCollider();
        const {x, y, direction } = this.view.getPlayerPosition();

        this.character.setIdle(direction);
        this.character.setPosPlayer(x, y);

        let setCameraFollow = ()=>{
            const { widthInPixels, heightInPixels } = this.view.tileMap.map;
            this.cameras.main.setBounds(0, 0, widthInPixels, heightInPixels);
            this.cameraGridControl = new Phaser.Geom.Point(this.character.getPlayerPos().x, this.character.getPlayerPos().y + 200);
            this.cameras.main.startFollow(this.cameraGridControl);
        }

        let ignoreCameraFollow = ()=>{
            this.cameras.main.stopFollow();
        }

        this.view.create();

        this.menu.onShowPanel = ()=>{
            this.onLostFocus();
        }

        this.menu.onHidePanel = ()=>{
            this.onGainedFoucs();
        }

        this.missionController.onMissionComplete = ()=>{
            this.missionComplete = true;
            //unlock next mission
            if(GameplayData.currentTopic[GameplayData.currentTopicId + 1]) {
                GameplayData.currentTopic[GameplayData.currentTopicId + 1].is_unlocked = true
            }
            this.onLostFocus();
                this.resultController.create();
                this.cameras.main.ignore(this.resultController.view.hudContainer);
            ignoreCameraFollow();
        }

        MissionPubSub.subscribe(EventName.MISSIONUPDATE, (missionType)=>{
            this.missionController.updateMission(missionType);
            this.menu.updateMissionText(this.missionController.mainMissionTarget, this.missionController.currentMainMision, this.missionController.bonusMissionTarget, this.missionController.currentBonusMission);
        });

       if(!GameplayData.HasShowIntroExplore){
        this.onLostFocus();
        this.introPopup.activeTutorialView(roleplayTutorialKeys,()=>{
                GameplayData.HasShowIntroExplore = true;
                this.onGainedFoucs();
        });
       }
    
        /**@description  Bug in Phaser version, must reset keys when scene sleep or pause*/
        this.events.on('sleep',()=>{
            this.input.keyboard.resetKeys();
            this.onLostFocus();
        })

        this.events.on('wake',()=>{
            GameplayData.scene = SceneInfo.EXPLORE.key;
            this.view.transition.hide();
            this.view.uiContainer.setVisible(true);
            if(!this.missionComplete){
                this.checkObjectSpawn();
                this.onGainedFoucs();
            }           
            this.audioController.playBGM(GameplayData.EXPLORE_BGM);
        });

        this.view.uiContainer.add([this.menu.view.menuPanel,this.menu.view.menuButton.gameobject,this.introPopup.view.container,this.endingPopup.view.container]);
        this.cameraSetup();
        setCameraFollow();

        if(this.exploreStateSaver.loadState(GameplayData.NextMap.mission_id, this.currentExploreData.map_name)){
            this.loadExploreData(this.exploreStateSaver.loadState(GameplayData.NextMap.mission_id, this.currentExploreData.map_name));
        }

        this.checkObjectSpawn();

        this.registerOnceShutdown(()=>{
            MissionPubSub.removeAllSubsribers();
        });

        console.log(this.cameras.main)
    }

    onLostFocus = ()=>{
        this.isFocus = false;
        this.view.buttonAnalog.setVisible(false);
        this.menu.showMenuIcon(false);
    }

    onGainedFoucs = ()=>{
        this.isFocus = true;
        this.view.buttonAnalog.setVisible(true);
        this.menu.showMenuIcon(true);
    }

    playAudio = ()=>{
        this.audioController.setBGMVolume(0.7);
        GameplayData.EXPLORE_BGM = (GameplayData.IS_WINTER) ? AudioAsset.bgm_adventure_winter.key : AudioAsset.bgm_adventure_fall.key;
        this.audioController.playBGM(GameplayData.EXPLORE_BGM);
    }

    cameraSetup = ()=>{
        console.log('setting up camera')
        const { widthInPixels, heightInPixels } = this.view.tileMap.map;
        this.cameras.main.ignore(this.view.uiContainer);
              
        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)) {
                this.cameras.main.setZoom(2);
            } else {
                this.cameras.main.setZoom(1);
            }

        this.secondCamera = this.cameras.add(0, 0, widthInPixels, heightInPixels);
        this.secondCamera.setZoom(1);
        this.secondCamera.setSize(this.view.screenUtility.width, this.view.screenUtility.height);
        this.secondCamera.ignore(this.view.layer);
        this.secondCamera.ignore(this.character.getCharacter());
        this.secondCamera.ignore(this.view.chestGroup);
        this.secondCamera.ignore(this.view.enemyGroup);
        this.secondCamera.ignore(this.view.npcGroup);
        this.secondCamera.ignore(this.view.teleporterGrourp);
        this.secondCamera.ignore(this.view.tileMap.layerGroup);
    }

    /**
     * Generate collision for player with tile layer and objects
     */
    createCollider = ()=> {
        let createTileCollider = ()=>{
            let collisionLayer = this.view.tileMap.layerGroup.find(layer => layer.name === TileInfo.tilelayer.COLLISION);
            collisionLayer.setCollisionByProperty({ collides: true });
            collisionLayer.setVisible(false);
            this.physics.add.collider(this.character.getCharacter(), collisionLayer );
        }

        let createMonsterCollider = ()=>{
            this.physics.add.collider(this.character.getCharacter(), this.view.enemyGroup, (player,enemyTarget)=>{
                const enemy = this.view.enemyList.find(s => s.gameobject === enemyTarget);
                this.view.enemyGroup.remove(enemyTarget, true, true);
                this.isFocus = false;              
                this.onCollideWithMonster(enemy);
            });
        }

        let createChestCollider = ()=>{
            this.physics.add.collider(this.character.getCharacter(), this.view.chestGroup, (player,chestTarget)=>{
                let key = chestTarget.data.values.minigame;
                const chest = this.view.chestList.find(c => c.gameobject === chestTarget);
                this.isFocus = false;
                this.onChestLoadMinigame(chest, key);
            });
        }

        let createNpcCollider = ()=>{
            this.physics.add.collider(this.character.getCharacter(), this.view.npcGroup, (player,npcTarget)=>{
                const npc = this.view.npcList.find(c => c.gameobject === npcTarget);

                if(!npc.hasTalked && !npc.deact){
                    if(npc.name == "Book" || npc.name == "Sales")
                    {
                        this.onTalkWithNpc(npc);
                    }else if(this.character.direction == "u"){
                        this.onTalkWithNpc(npc);
                    }
                }
            });
        }

        let createTeleporterCollider = ()=>{
            this.physics.add.collider(this.character.getCharacter(), this.view.teleporterGrourp, (player,teleTarget)=>{
                const teleporter = this.view.teleporterList.find(t => t.gameobject === teleTarget);
                this.isFocus = false;
                this.onTeleport(teleporter);
            });
        }

        createTileCollider();
        createMonsterCollider();
        createChestCollider();
        createNpcCollider();
        createTeleporterCollider();
    }

    checkObjectSpawn = ()=>{
        this.view.npcList.forEach((npc)=>{
            if(npc.type == "npc_part"){
                if(npc.hasTalked){
                    npc.setActive(false);
                    this.view.findObjectById(npc.nextEvent, true);
                    return;
                }
                
                this.view.findObjectById(npc.nextEvent, false);

            }
        });

        this.view.chestList.forEach((chest)=>{
            if(chest.type == "peti_part"){               
                if(chest.hasOpened){
                    chest.setActive(false);
                    this.view.findObjectById(chest.nextEvent, true);
                    return;
                }
                this.view.findObjectById(chest.nextEvent, false);
            }
        });

        this.view.teleporterList.forEach((tele)=>{
            if(tele.type == "go_to_part"){
                this.view.findObjectById(tele.nextEvent, false);
            }
        })
    }

    /**
     * 
     * @param {Chest} chest 
     * @param {string} key
     */
    onChestLoadMinigame = (chest, key)=>{
        chest.gameobject.disableBody();
        chest.open();

        GameplayData.OpenChest.lastChestOpenID = chest.id;
        GameplayData.OpenChest.data.push({
            id: chest.id,
            type: "minigame",
            status: "unknowed",
            score: 0
        });
        
        this.view.transition.show(()=>{
            this.launchScene(key);
        });
    }

    /**
     * 
     * @param {Monster} monster 
     */
     onCollideWithMonster = (monster) => {
        GameplayData.BattleMonsterID = monster.id;
        GameplayData.EnemyType = monster.level;
        GameplayData.BattleQuizData = this.battleQuizParser.ConvertToBattleQuiz(this.currentExploreData.category);
        this.view.uiContainer.setVisible(false);
        this.audioController.play(AudioAsset.sfx_player_engage_monster.key);        
        this.view.transition.show(()=>{
            this.launchScene(SceneInfo.BATTLE.key);
        });      
    }

    /**@param {Npc} npc*/
    onTalkWithNpc = (npc)=>{
        this.onLostFocus();
        npc.hasTalked = true;
        let key = npc.dialogData;
        let dialogText = this.cache.text.get(key);
        console.log(key)
        let dialogContent = this.parserRoleplayController.ConvertRoleplayCsvToJson(dialogText);
        this.dialogueController = new DialogueController(this, dialogContent);
        
        let emotePos ={ x: npc.gameobject.x + npc.transform.displayWidth * 0.1, y: npc.gameobject.y - npc.transform.displayHeight * 0.1};

        this.dialogueController.setEmotePostion(emotePos.x, emotePos.y);
        this.isDialogActive = true;
        this.tweens.add({
            targets: this.cameraGridControl,
            y: Math.floor(this.character.getPlayerPos().y + (this.character.view.character.transform.displayHeight * 1.3)),
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut,
            onComplete: () => {}
        });
        
        this.dialogueController.registerDialogEndSuccess((satisfactionCount)=>{
            this.talkedNpc.push(npc.id);

            console.log('level satisifikasi', satisfactionCount)

            console.log('mission done 1')
            this.isDialogActive = false;
            this.onGainedFoucs();

            MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.SOLVE_NPC_ISSUE.key);

            if(satisfactionCount > 3){
                console.log('mission done 2')

                MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.MAKE_NPC_SUPER_HAPPY.key);
            }
            else if(satisfactionCount > 1){
                console.log('mission done 3')
                MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.MAKE_NPC_HAPPY.key);
            }

            console.log('mission done 4')
            MissionPubSub.publish(EventName.MISSIONUPDATE, MissionHelper.FindNpcMission(npc.name));

            if(npc.type == "npc_part"){
                console.log('reload')
                this.reload();
            }
        }); 
    }

    reload = ()=>{
        this.onLostFocus();
        this.view.transition.show(()=>{
            this.checkObjectSpawn();
            this.view.transition.hide();
            this.onGainedFoucs();
        });
    }

    /**@param {Teleporter} teleporter*/
    onTeleport = (teleporter)=>{
        this.saveExploreData();
        let targetMap = teleporter.targetMap;

        let loadData = this.exploreStateSaver.loadState(GameplayData.NextMap.mission_id, targetMap);

        if(!loadData){
            /**@type {SaveData} */
            const saveData = {
                mapName: targetMap,
                dir: teleporter.direction,
                playerPos: teleporter.nextTile
            }
            this.exploreStateSaver.saveState(GameplayData.NextMap.mission_id, saveData);
        }else{
            loadData.dir = teleporter.direction;
            loadData.playerPos = teleporter.nextTile;
            this.exploreStateSaver.updateState(GameplayData.NextMap.mission_id, targetMap, loadData);
        }

        /**@type {ExploreData} */
        let exploreData = {
            category: this.currentExploreData.category, 
            map_name: targetMap, 
            mission_target: this.currentExploreData.mission_target,
            mission_current: {
                main_missions: this.missionController.currentMainMision,
                bonus_missions: this.missionController.currentBonusMission,
            }
        } 
        this.view.uiContainer.setVisible(false);      
        this.view.transition.show(()=>{
            this.scene.restart({exploreData: exploreData});
        });       
    }

    playerMove(time, delta) {
        const left = this.keys.left.isDown || this.keys.a.isDown;
        const right = this.keys.right.isDown || this.keys.d.isDown;
        const up = this.keys.up.isDown || this.keys.w.isDown;
        const down = this.keys.down.isDown || this.keys.s.isDown;

        if(!this.isFocus){
            this.character.setIdle();
            this.character.getCharacter().body.setVelocity(0);
            return;
        }
      
        // Stop any previous movement from the last frame
        this.character.getCharacter().body.setVelocity(0);
      
        // Horizontal movement
        if (left || this.view.buttonAnalog.left.isDown) {
            this.character.moveHorizontal(-1)
        } else if (right || this.view.buttonAnalog.right.isDown) {
            this.character.moveHorizontal(1)
        }
      
        // Vertical movement
        if (up || this.view.buttonAnalog.up.isDown) {
            this.character.moveVertical(-1);
        } else if (down || this.view.buttonAnalog.down.isDown) {
            this.character.moveVertical(1);
        }
      
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.character.normalizeSpeed();
      
        // Update the animation last and give left/right animations precedence over up/down animations
        if (left || this.view.buttonAnalog.left.isDown) {
            this.character.direction = 'l';
            this.character.setWalk();
        } else if (right || this.view.buttonAnalog.right.isDown) {
            this.character.direction = 'r';
            this.character.setWalk();
        } else if (up || this.view.buttonAnalog.up.isDown) {
            this.character.direction = 'u';
            this.character.setWalk();
        } else if (down || this.view.buttonAnalog.down.isDown) {
            this.character.direction = 'd';
            this.character.setWalk();
        } else {
            // If we were moving, pick last direction frame to use
            this.character.setIdle();
        
        }
      }

    update = (time, delta)=>{
        if(this.sceneReady){
            if(this.isDialogActive){
                this.cameras.main.ignore(this.dialogueController.view.container);
            }
            else{
                if (this.character != undefined) {
                    this.cameraGridControl.x = Math.floor(this.character.getPlayerPos().x);
                    this.cameraGridControl.y = Math.floor(this.character.getPlayerPos().y);
                }
            }
            this.playerMove(time,delta);
        }
    }

    saveExploreData = ()=>{
        /**@type {SaveData} */
        const saveData = {
            mapName: this.currentExploreData.map_name, 
            dir: this.character.direction, 
            playerPos: this.character.direction, 
            talkedNpc: this.talkedNpc
        }
        this.exploreStateSaver.saveState(GameplayData.NextMap.mission_id, saveData);
    }

    /**
     * 
     * @param {SaveData} data 
     */
    loadExploreData = (data)=>{
        this.character.setIdle(data.dir);
        this.character.setPosPlayer(data.playerPos.x, data.playerPos.y);

        GameplayData.MonsterDefeatedId.forEach((id)=>{
            const enemy = this.view.enemyList.find((e) => e.id == id);
            if(enemy){
                this.view.enemyGroup.remove(enemy.gameobject, true, true);
            }
        });

        if(data.talkedNpc){
            this.talkedNpc = data.talkedNpc;
            this.talkedNpc?.forEach((id)=>{
                const npc = this.view.npcList.find((e) => e.id == id);
                if(npc){
                    npc.hasTalked = true;
                }
            });
        }
        

        GameplayData.OpenChest.data.forEach((el)=>{
            if(el.status == "win"){
                const chest = this.view.chestList.find((c) => c.id == el.id);
                chest.open();
            }
        });
    }

    launchScene = (key)=>{
        this.scene.sleep();
        this.scene.launch(key);
    }

}