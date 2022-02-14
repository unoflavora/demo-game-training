import MinigameBalloonSceneView from './minigame_balloon_scene_view';
import GameplayData from '../../gameplay_data';
import { MinigameData } from '../minigame_data';
import { SceneInfo } from '../../../../info';
import AudioController from '../../../../module/audio/audio_controller';
import { LoaderHelper } from '../../../../helper';
import { MinigameAsset, AudioAsset } from '../../../../assetLibrary';
import { EventName, MissionPubSub } from '../../../../module/pubsub';
import { MISSION_DATA } from '../../explore/mission/mission_data';
import { BaseSceneController } from '../../../../core';
import TutorialController from '../../explore/tutorial/tutorial_controller';
import { minigameBaloonTutorialKeys } from '../../explore/tutorial/tutorial_data';

export default class MinigameBalloonSceneController extends BaseSceneController
{
    constructor()
    {
        super({key: SceneInfo.MINIGAMEBALOON.key});
    }

    init = () =>
    {
        this.requiredPoints = 10;
        this.currentPoints = 0;

        this.spawnInterval = [2,5];
        this.isGameOver = false;

        this.timer = null;

        this.score = 0;

        this.audioController = AudioController.getInstance();

        this.view = new MinigameBalloonSceneView(this);
        this.tutorialController = new TutorialController(this);
    }

    preload = () =>
    {
        this.view.sandClockPanel.shown();
        Promise.resolve()
        .then(this.loadMinigameResources)
        .then(()=>{
            try{ 
                this.load.removeAllListeners();
                this.view.sandClockPanel.setVisible(false);
                this.onLoadResourcesDone();
            }catch{}
        });
    }

    onLoadResourcesDone = ()=>{
        this.view.create(this.checkAnswer, this.onDeath);
        (!MinigameData.BALLOON_TUTORIAL_READ) ? this.showTutorialPages() : this.randomDelaySpawn(true) ;
        this.audioController.playBGM(AudioAsset.bgm_monstershoot.key);
    }

    loadMinigameResources = ()=>{
        return new Promise((resolve)=>{
            LoaderHelper.LoadAssets(this, MinigameAsset);

            this.load.on('complete', resolve);
            this.load.start();
        })
    }

    showTutorialPages = () =>
    {
        this.tutorialController.create();
        this.view.buttonContainer.setVisible(false);
        this.view.answerBox.gameobject.setVisible(false);
        this.view.answerTxt.gameobject.setVisible(false);
        this.view.buttonbox.gameobject.setVisible(false);

        this.tutorialController.activeTutorialView( minigameBaloonTutorialKeys ,()=>{
            this.view.buttonContainer.setVisible(true);
            this.view.answerBox.gameobject.setVisible(true);
            this.view.answerTxt.gameobject.setVisible(true);
            this.view.buttonbox.gameobject.setVisible(true);
            this.view.buttonContainer.setDepth(105);
            this.randomDelaySpawn(true);
        })
    }

    onDeath = () =>
    {
        if(this.isGameOver)
            return;
        // console.log('LOL UR DED');
        this.audioController.play(AudioAsset.sfx_monstershoot_lose.key);
        for (let i = 0; i < 10; i++)
        {
            this.view.popBalloons(i);
        }
        this.timer.paused = true;
        this.isGameOver = true;
        this.view.fadeToBlack(
            ()=>{
                this.onDefeat();
            }
        )
    }

    checkAnswer = (number) =>
    {
        if(this.isGameOver)
            return;
        var points = this.view.popBalloons(number);
        if(points > 0)
        {
            this.audioController.play(AudioAsset.sfx_monster_roar.key);
        }
        if(CONFIG.DEVELOPMENT_BUILD){
            if(GameplayData.CHEAT){
                this.currentPoints = this.requiredPoints;
            }
        }
        this.currentPoints += points;
        this.view.updateProgressBar(this.currentPoints/this.requiredPoints);
        if(this.currentPoints >= this.requiredPoints)
        {
            this.isGameOver = true;
            for (let i = 0; i < 10; i++)
            {
                this.audioController.play(AudioAsset.sfx_monster_roar.key);
                this.view.popBalloons(i);
            }
            this.audioController.play(AudioAsset.bgm_mission_complete.key);
            this.view.drawVictoryPopup(()=>
            {
                this.healPlayer();
                this.onVictory();
            })
        }
    }

    randomDelaySpawn = (instant = false) =>
    {
        if(this.isGameOver)
            return;
        if(instant)
        {
            if(!this.isGameOver)
            {
                this.view.spawnBalloon(Phaser.Math.Between(0,9));
                this.randomDelaySpawn();
            }
            return;
        }
        this.timer = this.time.addEvent({
            delay: 1000 * Phaser.Math.FloatBetween(this.spawnInterval[0], this.spawnInterval[1]),
            callback: ()=>{
                if(!this.isGameOver)
                {
                    this.view.spawnBalloon(Phaser.Math.Between(0,9));
                    this.randomDelaySpawn();
                }
            }
        });
    }

    /**Heal player based on item obtained */
    healPlayer = () => {
        GameplayData.Hp = GameplayData.MaxHp;
    }

    onVictory = () =>
    {
        this.score = 150;
        let idChest = GameplayData.OpenChest.lastChestOpenID;
        GameplayData.OpenChest.data.forEach(element => {
			if ((element.id === idChest && element.status === "unknowed")){
                element.status = "win";
                element.score += this.score;
			}
        });
        this.audioController.stopBGM(true);
        MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.OPEN_CHEST.key);
        this.loadScene(SceneInfo.EXPLORE.key)
        // console.log('Victory')
    }

    onDefeat = () =>
    {
        this.score = 150 * this.currentPoints/this.requiredPoints;
        let idChest = GameplayData.OpenChest.lastChestOpenID;
        GameplayData.OpenChest.data.forEach(element => {
			if ((element.id === idChest && element.status === "unknowed")){
				element.status = "lose";
                element.score += this.score;
			}
        });
        this.audioController.stopBGM(true);
        this.loadScene(SceneInfo.EXPLORE.key)
        // console.log('Defeat')
    }

    /**
     * 
     * @param {string} key 
     */
    loadScene = (key)=>{
        this.scene.stop();
        this.scene.wake(key);
    }
}