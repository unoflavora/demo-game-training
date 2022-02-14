import BattleControllerView from './battle_controller_view.js';
import BattlerController from './battler/battler_controller.js';
import EnemyData from './enemy_data.js';
import GamePlayData from '../../gameplay/gameplay_data.js'; //no need for direct import? maybe change to battle data later
import GamePlayFlags from '../../gameplay/gameplay_flags'; //no need for direct import? maybe change to battle data later
import QuizController from '../quiz/quiz_controller.js';
import AudioController from "../../../module/audio/audio_controller";
import { GameplayAsset, AudioAsset } from '../../../assetLibrary';

export default class BattleController
{
    /**
     * @param {Phaser.Scene} scene
     * 
     */
    constructor(scene)
    {
        this.scene = scene;
    }

    /**
     * @param {Function} onInitFinish
     * @param {import('../../../def/custom').Agate.Gameplay.Battle.QuizData} quizData
     */
    init = (onInitFinish = null, quizData = null) =>
    {
        /**
         * @type {import('../../../def/custom').Agate.Gameplay.Battle.QuizData}
         */
        this.quizData = quizData;

        this.audioController = AudioController.getInstance();
        
        if(this.quizData.questions.length == 0)
        {
            this.quizData = null;
        }
        
        /**
         * @type {import('../../../def/custom').Agate.Gameplay.Battle.BattlerData}
         */
        this.playerBattlerData = {
            name : GamePlayData.PlayerName,
            level : GamePlayData.Level,
            hp : GamePlayData.Hp,
            maxhp : GamePlayData.MaxHp,
            mp : GamePlayData.Mp,
            maxmp : GamePlayData.MaxMp,
            atk : GamePlayData.Atk,
            isplayer : true
        };
        //needs something to tell which enemy to spawn
        /**
         * @type {import('../../../def/custom').Agate.Gameplay.Battle.BattlerData}
         */
        this.enemyBattlerData = {
            name : EnemyData.monsters[GamePlayData.EnemyType-1].name,
            level : EnemyData.monsters[GamePlayData.EnemyType-1].level,
            hp : EnemyData.monsters[GamePlayData.EnemyType-1].hp,
            maxhp : EnemyData.monsters[GamePlayData.EnemyType-1].hp,
            /**
             * tingkat perbaikan mesin
             */
            restoreLevel: 0,
            mp : 0,
            maxmp: EnemyData.monsters[GamePlayData.EnemyType-1].turnDelay,
            atk : EnemyData.monsters[GamePlayData.EnemyType-1].atk,
            isplayer : false
        };

        GamePlayData.Combo = 0;

        if(onInitFinish != null)
            onInitFinish(this.playerBattlerData, this.enemyBattlerData);

        /**
         * Determines whose actions will be performed on current turn. Player will go first at default.
         * @type {boolean}
         */
        this.isPlayerTurn = true;

        /**
         * @type {Function}
         */
        this.onNextTurn = null;

        /**
         * @type {Function}
         */
        this.onPlayerTurn = null;

        /**
         * Tracks how many turns has passed. 
         * @type {number}
         */
        this.turnCount = 0;

        this.quizController = new QuizController(this.scene, this.quizData);

        this.playerBattler = new BattlerController(this.scene, this.playerBattlerData);
        this.enemyBattler = new BattlerController(this.scene, this.enemyBattlerData);

        this.view = new BattleControllerView(this.scene).create();

        //data
        this.damage = 0;
        this.combo = 0;
        this.enemyHasAttacked = false;

        this.loadAudio();

        
    }

    loadAudio = () =>
    {
        // console.log('PRELOAD!!!');

        //bgm
        this.audioController.setBGMVolume(0.7);
        if(GamePlayData.IS_WINTER)
        {
            this.audioController.playBGM(AudioAsset.bgm_battle_winter.key);
        }
        else
        {
            this.audioController.playBGM(AudioAsset.bgm_battle_fall.key);
        }
    }

    configureViewButtons = () =>
    {
        this.view.registerOnAttackButtonPressed(()=>{
            this.audioController.play(AudioAsset.sfx_battle_button.key);
            this.view.hideCommands();
            this.quizController.pickRandomQuestion(
                (isCorrect)=>{
                    if(isCorrect)
                    {
                        this.audioController.play(AudioAsset.sfx_battle_answer_true.key);
                        this.scene.time.addEvent({
                            delay: 2000,
                            callback: ()=>{
                               this.audioController.play(AudioAsset.sfx_player_double_attack.key);
                            }
                        });
                        this.view.showIndicator(true, ()=>{
                            this.attack(()=>
                            {
                                this.updateGameData();
                                this.nextTurn();
                            });
                        })
                    }
                    else
                    {
                        this.audioController.play(AudioAsset.sfx_battle_answer_false.key);
                        this.view.showIndicator(false, ()=>{
                            GamePlayData.Combo = 0;
                            this.updateGameData();
                            this.nextTurn();
                        })
                    }
                }
            );
        });
        this.view.registerOnHealButtonPressed(()=>{
            this.audioController.play(AudioAsset.sfx_battle_button.key);
            this.view.hideCommands();
            GamePlayData.UsedHealCommand = true;
            this.quizController.pickRandomQuestion(
                (isCorrect)=>{
                    if(isCorrect)
                    {
                        this.audioController.play(AudioAsset.sfx_battle_answer_true.key);
                        this.scene.time.addEvent({
                            delay: 1500,
                            callback: ()=>{
                               this.audioController.play(AudioAsset.sfx_player_heal.key);
                            }
                        });
                        this.view.showIndicator(true, ()=>{
                            this.heal(()=>
                            {
                                this.updateGameData();
                                this.nextTurn();
                            });
                        })
                    }
                    else
                    {
                        this.audioController.play(AudioAsset.sfx_battle_answer_false.key);
                        this.view.showIndicator(false, ()=>{
                            GamePlayData.Combo = 0;
                            this.updateGameData();
                            this.nextTurn();
                        })
                    }
                }
            );
        });
        this.view.registerOnSpecialButtonPressed(()=>{
            this.audioController.play(AudioAsset.sfx_battle_button.key);
            this.view.hideCommands();
            this.audioController.play(AudioAsset.sfx_player_special_ability_man.key);
            this.scene.time.addEvent({
                delay: 1000,
                callback: ()=>{
                   this.audioController.play(AudioAsset.sfx_player_double_attack.key);
                }
            });
            this.special(()=>
            {
                GamePlayData.Combo = 0;
                this.updateGameData();
                this.nextTurn();
            });
        });

        this.view.toggleSpecial(this.playerBattlerData.mp == this.playerBattlerData.maxmp)
    }

    /**
     * Performs attack calculation and then triggers the attack animation on the battler.
     * @param {Function} onFinish Expected use is to update the hp display.
     */
    attack = (onFinish = null) =>
    {
        if(this.isPlayerTurn)
        {
            this.damage = this.playerBattlerData.atk + (GamePlayData.Combo * 10);
            this.playerBattler.attack(()=>
            {
                if(this.playerBattlerData.mp < this.playerBattlerData.maxmp)
                {
                    this.playerBattlerData.mp++;
                }
                if(this.playerBattlerData.mp == this.playerBattlerData.maxmp)
                {
                    this.audioController.play(AudioAsset.sfx_player_fullmana.key);
                }
                this.enemyBattlerData.restoreLevel += this.damage;
                this.enemyBattlerData.restoreLevel = Phaser.Math.Clamp(this.enemyBattlerData.restoreLevel, 0, this.enemyBattlerData.maxhp);
                GamePlayData.Combo++;
                if(GamePlayData.Combo > GamePlayData.MaxCombo)
                {
                    GamePlayData.MaxCombo++;
                }
                this.updateGameData();
                onFinish();
            });
        }
        else
        {
            this.audioController.play(AudioAsset.sfx_monster_attack.key);
            this.damage = this.enemyBattlerData.atk;
            this.enemyBattler.attack(()=>
            {
                if(this.enemyBattlerData.mp > 0)
                {
                    this.enemyBattlerData.mp = 0;
                }
                this.playerBattlerData.hp -= this.damage;
                GamePlayData.HasTakenDamage = true;
                this.playerBattlerData.hp = Phaser.Math.Clamp(this.playerBattlerData.hp, 0, this.playerBattlerData.maxhp);
                if(this.playerBattlerData.hp < 0)
                    this.playerBattlerData.hp = 0;
                this.updateGameData();
                this.enemyHasAttacked = true;
                onFinish();
            });
        }
    }
    
    heal = (onFinish) =>
    {
        let heal = this.playerBattlerData.atk;

        this.playerBattler.heal(()=>{
            this.playerBattlerData.hp += heal;
            this.playerBattlerData.hp = Phaser.Math.Clamp(this.playerBattlerData.hp, 0, this.playerBattlerData.maxhp);
            if(this.playerBattlerData.mp < this.playerBattlerData.maxmp)
            {
                this.playerBattlerData.mp++;
            }
            if(this.playerBattlerData.mp == this.playerBattlerData.maxmp)
            {
                this.audioController.play(AudioAsset.sfx_player_fullmana.key);
            }
            this.updateGameData();
            onFinish();
        });
        
    }

    special = (onFinish)=>
    {
        GamePlayData.SkillUseCount++;
        if(this.playerBattlerData.mp == this.playerBattlerData.maxmp){
            this.damage = this.playerBattlerData.atk;
            this.playerBattler.attack(()=>
            {
                this.playerBattlerData.mp = 0;
                this.enemyBattlerData.restoreLevel += this.damage;
                this.enemyBattlerData.mp -= 2;
                this.enemyBattlerData.mp = Phaser.Math.Clamp(this.enemyBattlerData.mp, 0, this.enemyBattlerData.maxmp);
                this.enemyBattlerData.restoreLevel = Phaser.Math.Clamp(this.enemyBattlerData.restoreLevel, 0, this.enemyBattlerData.maxhp);
                this.updateGameData();
                onFinish();
            })
        }
        else
        {
            if(this.playerBattlerData.mp < this.playerBattlerData.maxmp)
            {
                this.playerBattlerData.mp++;
            }
            if(this.playerBattlerData.mp == this.playerBattlerData.maxmp)
            {
                this.audioController.play(AudioAsset.sfx_player_fullmana.key);
            }
            this.updateGameData();
            onFinish();
        }
        
    }

    enemyTurn = () =>
    {
        if(this.enemyBattlerData.restoreLevel >= this.enemyBattlerData.hp)
        {
            // console.log('enemy death');
            this.view.hideCommands();
            this.enemyBattler.die(()=>{
                //show end result, inject from battle scene controller
                this.onVictory();
            });
            return;
        }

        if(this.enemyBattlerData.mp == this.enemyBattlerData.maxmp)
        {
            this.attack(()=>
            {
                this.onEnemyTurnEnd();
                this.nextTurn();
                this.enemyBattlerData.mp = 0;
            });
        }
        else
        {
            // console.log("not enough energy.");
            this.enemyBattlerData.mp++;
            if(this.enemyBattlerData.mp == this.enemyBattlerData.maxmp)
            {
                this.onNextTurn();
                this.scene.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        this.audioController.play(AudioAsset.sfx_monster_roar.key);
                        this.attack(()=>
                        {
                            this.onEnemyTurnEnd();
                            this.nextTurn();
                            this.enemyBattlerData.mp = 0;
                        });
                    }
                });
            }
            else
            {
                this.audioController.play(AudioAsset.sfx_monster_getmana.key);
                this.onEnemyTurnEnd();
                this.nextTurn();
            }
        }
    }

    /**
     * Updates GamePlayData to store player status
     */
    updateGameData = () =>
    {
        GamePlayData.PlayerName = this.playerBattlerData.name;
        GamePlayData.Hp = this.playerBattlerData.hp;
        GamePlayData.Mp = this.playerBattlerData.mp;
    }

    /**
     * Advances one battle turn. Also triggers enemy attack logic on their turn.
     * @public
     */
    nextTurn = () =>
    {
        this.onNextTurn(); //temp.
        // console.log(this.playerBattlerData.hp);

        if(this.playerBattlerData.hp <= 0)
        {
            this.audioController.play(AudioAsset.sfx_player_lose.key);
            // console.log('player death');
            this.view.hideCommands();
            this.playerBattler.die(()=>{
                //show end result, inject from battle scene controller
                this.audioController.stopBGM();
                //actually, rather than returning to chara select, it should return to mission select
                //add fade effect later
                this.onDefeat();
            });
            return;
            
        }
        if(this.enemyBattlerData.restoreLevel >= this.enemyBattlerData.hp)
        {
            this.audioController.play(AudioAsset.bgm_battle_win.key);
            this.audioController.play(AudioAsset.sfx_monster_defeated.key);
            // console.log('enemy death');
            this.view.hideCommands();
            this.enemyBattler.die(()=>{
                this.audioController.stopBGM();
                //show end result, inject from battle scene controller
                this.onVictory();
            });
            return;
        }

        this.turnCount++;
        this.view.toggleSpecial(this.playerBattlerData.mp == this.playerBattlerData.maxmp)
        this.isPlayerTurn = !this.isPlayerTurn;

        if(this.isPlayerTurn)
        {
            //display player commands
            this.view.showCommands();
        }
        else
        {
            this.view.hideCommands();
            this.enemyTurn();
        }

        //update displays
        this.scene.view
    }

    /**
     * Registers what actions should be performed upon next turn (disabled)
     * @param {Function} onNextTurn
     * @public
     */
    registerOnPlayerTurn = (onNextTurn) =>
    {
        this.onPlayerTurn = onNextTurn;
    }

    /**
     * Registers what actions should be performed upon next turn (disabled)
     * @param {Function} callback
     * @public
     */
    registerOnNextTurn = (callback) =>
    {
        this.onNextTurn = callback;
        //console.log('Registered onNextTurn: ' + callback);
    }

    /**
     * Registers what actions should be performed upon next turn (disabled)
     * @param {Function} callback
     * @public
     */
    registerOnEnemyTurnEnd = (callback) =>
    {
        //this.onNextTurn = callback;

        this.onEnemyTurnEnd = callback;
    }

    /**
     * @private
     */
    onEnemyTurnEnd = ()=>
    {
        
    }

    registerOnDefeat = (onDefeat) =>
    {
        this.onDefeat = onDefeat;
    }

    registerOnVictory = (onVictory) =>
    {
        this.onVictory = onVictory;
    }
}