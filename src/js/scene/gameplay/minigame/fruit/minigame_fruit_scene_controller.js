import MinigameFruitSceneView from './minigame_fruit_scene_view';
import {MinigameData} from '../minigame_data';
import GamePlayData from '../../gameplay_data';
import { SceneInfo } from '../../../../info';
import AudioController from '../../../../module/audio/audio_controller';
import { MinigameAsset, AudioAsset } from '../../../../assetLibrary';
import { LoaderHelper } from '../../../../helper';
import { EventName, MissionPubSub } from '../../../../module/pubsub';
import { MISSION_DATA } from '../../explore/mission/mission_data';
import { BaseSceneController } from '../../../../core';
import TutorialController from '../../explore/tutorial/tutorial_controller';
import { minigameFruitTutorialKeys } from '../../explore/tutorial/tutorial_data';

export default class MinigameFruitSceneController extends BaseSceneController
{
    constructor()
    {
        super({key: SceneInfo.MINIGAMEFRUIT.key});
    }

    init = () =>
    {
        this.fruitsymbols = [
            'square',
            'circle',
            'triangle',
            'cross'
        ];

        this.fruitcolors = [
            'green',
            'yellow',
            'red',
            'purple'
        ];

        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData[]}
         */
        this.fruits = [];

        //temp
        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitLayoutArray[]}
         */
        this.layouts = [
        {
            index: 0,
            fruitlayouts: [
                {
                    x: 0,
                    y: 0,
                    isOn : true
                },
                {
                    x: 1,
                    y: 0,
                    isOn : true
                },
                {
                    x: 0,
                    y: 1
                },
                {
                    x: 1,
                    y: 1
                },
            ]
        },
        {
            index: 1,
            fruitlayouts: [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 1,
                    y: 0,
                    isOn : true
                },
                {
                    x: 0,
                    y: 1,
                    isOn : false
                },
                {
                    x: 1,
                    y: 1,
                    isOn : true
                },
                {
                    x: 2,
                    y: 0,
                    isOn : true,
                    isWrongAnswer : true
                },
                {
                    x: 0,
                    y: -1,
                    isOn : false,
                    isWrongAnswer : true
                },
            ]
        },
        ]
        
        this.originDir = 'horz';

        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData[]}
         */
        this.guideFruits = [];
        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData[]}
         */
        this.answerFruits = [];
        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData[]}
         */
        this.forbiddenFruits = [];
        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData}
         */
        this.puzzlePiece = null;

        this.correctAnswer = -1;
        this.additionalCorrectAnswers = [];

        this.timeLeft = 31;
        this.requiredPoints = 10;
        this.currentPoints = 0;
        this.score = 150;

        this.gameOver = false;

        this.tutorialPageKeys = [
            'mg_juice_tut_1',
            'mg_juice_tut_2',
            'mg_juice_tut_3'
        ]
        this.currentTutorialPageIndex = 0;

        this.audioController = AudioController.getInstance();

        this.view = new MinigameFruitSceneView(this);
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
        this.audioController.playBGM(AudioAsset.bgm_gempuzzle.key);
        this.view.create(this.checkAnswer);
        this.generateFruits();
        
        let onStart = ()=>{
            var puzzle = this.generatePuzzle();
            this.view.drawFruits(puzzle,this.puzzlePiece);
            this.startTimer(this.timeLeft);
        }

        if(!MinigameData.FRUIT_TUTORIAL_READ)
        {         
            this.tutorialController.create();
            this.tutorialController.activeTutorialView(minigameFruitTutorialKeys,()=>{
                MinigameData.FRUIT_TUTORIAL_READ = true;
                onStart();
            });
        }
        else
        {
            onStart();
        }
    }

    loadMinigameResources = ()=>{
        return new Promise((resolve)=>{
            LoaderHelper.LoadAssets(this, MinigameAsset);

            this.load.on('complete', resolve);
            this.load.start();
        })
    }

    generateFruits = () =>
    {
        for (let i = 0; i < this.fruitcolors.length; i++)
        {
            let iidx = i;
            for (let j = 0; j < this.fruitsymbols.length; j++)
            {
                let jidx = j;
                this.fruits.push({
                    color: this.fruitcolors[iidx],
                    symbol: this.fruitsymbols[jidx]
                });
            }
        }
    }

    generatePuzzle = () =>
    {
        this.guideFruits = [];
        this.answerFruits = [];
        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData[]}
         */
        var puzzle = [];
        var layout = this.generateLayout();

        for (let i = 0; i < layout.length; i++)
        {
            if(i == 0)
            {
                let idx = Phaser.Math.Between(0,this.fruits.length-1);
                layout[0].color = this.fruits[idx].color;
                layout[0].symbol = this.fruits[idx].symbol;
                layout[0].idx = 0;
                puzzle.push(layout[0]);
            }
            else
            {
                let idx = Phaser.Math.Between(0,this.fruits.length-1);
                layout[i].idx = i;
                layout[i].color = this.fruits[idx].color; //should be random
                layout[i].symbol = this.fruits[idx].symbol; // should be random
                puzzle.push(layout[i]); //test
            }
            if(layout[i].isWrongAnswer)
            {
                this.forbiddenFruits.push(layout[i]);
            }
            else
            {
                if(layout[i].isOn)
                {
                    this.guideFruits.push(layout[i]);
                }
                else
                {
                    this.answerFruits.push(layout[i]);
                }
            }
        }

        //pick a guide
        var correctGuide = this.guideFruits[Phaser.Math.Between(0, this.guideFruits.length-1)];
        //loop: pick a random answer candidate and compare its distance
        var answerSelected = false;
        var loop = 0;
        while(loop < 5 && !answerSelected ) //stop after 5 attempts
        {
            this.puzzlePiece = this.answerFruits[Phaser.Math.Between(0, this.answerFruits.length-1)];
            if(!this.puzzlePiece.isWrongAnswer)
            {
                if(Math.abs(this.puzzlePiece.x - correctGuide.x) == 1 || Math.abs(this.puzzlePiece.y - correctGuide.y) == 1)
                {
                    if(
                        Math.abs(this.puzzlePiece.x - correctGuide.x) - 
                        Math.abs(this.puzzlePiece.y - correctGuide.y)
                        != 0
                    )
                    {
                        this.correctAnswer = this.puzzlePiece.idx;
                        loop = 5;
                        answerSelected = true;
                        break;
                    }
                }
            }
            loop++;
        }

        if(answerSelected == false)
        {
            // console.log('TODO: fallback: forced answer 0, needs to be fixed.')
            this.puzzlePiece = this.answerFruits[0];
            this.correctAnswer = this.puzzlePiece.idx;
            for (let i = 0; i < this.guideFruits.length; i++)
            {
                correctGuide = this.guideFruits[i];
                if(Math.abs(this.puzzlePiece.x - correctGuide.x) == 1 || Math.abs(this.puzzlePiece.y - correctGuide.y) == 1)
                if(
                    Math.abs(this.puzzlePiece.x - correctGuide.x) - 
                    Math.abs(this.puzzlePiece.y - correctGuide.y)
                    != 0
                )
                break;
            }
        }

        //reminder: horz with symbol, vert with color
        if(this.puzzlePiece.direction == 'horz')
        {
            this.puzzlePiece.symbol = correctGuide.symbol;
            this.puzzlePiece.color = this.fruitcolors[Phaser.Math.Between(0, this.fruitcolors.length-1)];
        }
        else
        {
            this.puzzlePiece.color = correctGuide.color;
            this.puzzlePiece.symbol = this.fruitsymbols[Phaser.Math.Between(0, this.fruitsymbols.length-1)];
        }

        //TODO: swipe again for any possible answers other than the primary one. this time also checks direction


        return puzzle;
    }

    generateLayout = () =>
    {
        var layout = this.layouts[Phaser.Math.Between(0, this.layouts.length-1)];
        var fruitLayout = [];

        for(let i = 0; i < layout.fruitlayouts.length; i++)
        {
            /**
             * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData}
             */
            var tempFruitLoc;
            if(i == 0)
            {
                //pick direction randomly
                var tempDir;
                if(Phaser.Math.Between(0,1) == 0)
                {
                    tempDir = 'vert';
                }
                else
                {
                    tempDir = 'horz';
                }
                tempFruitLoc = {
                    x: layout.fruitlayouts[0].x,                    
                    y: layout.fruitlayouts[0].y,
                    direction: tempDir,
                    isOn: layout.fruitlayouts[0].isOn,
                    isWrongAnswer: layout.fruitlayouts[0].isWrongAnswer
                }
                this.originDir = tempDir;
                fruitLayout.push(tempFruitLoc);
            }
            if(i > 0)
            {
                tempFruitLoc = {
                    x: layout.fruitlayouts[i].x,                    
                    y: layout.fruitlayouts[i].y,
                    direction: this.determineDirection(layout.fruitlayouts[i].x,layout.fruitlayouts[i].y),
                    isOn: layout.fruitlayouts[i].isOn,
                    isWrongAnswer: layout.fruitlayouts[i].isWrongAnswer
                }
                fruitLayout.push(tempFruitLoc);
            }
        }
        return fruitLayout;
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    determineDirection = (x,y) =>
    {
        var oppositeDir;
        if(this.originDir == 'horz')
            oppositeDir = 'vert';
        else
            oppositeDir = 'horz';

        if(((x % 2) + (y % 2)) % 2 == 0)
        {
            return this.originDir;
        }
        else
        {
            return oppositeDir;
        }
    }

    //reminder: horz with symbol, vert with color
    checkAnswer = (idx) =>
    {
        if(this.gameOver)
            return;
        if(idx != this.correctAnswer)
        {
            if (this.timeLeft > 0)
                this.timeLeft --;
            this.audioController.play(AudioAsset.sfx_gempuzzle_putin.key);
            this.view.markIncorrect(idx);
            this.view.updateTimerText(this.timeLeft);
            this.checkCondition();
        }
        else
        {
            this.currentPoints++;
            this.view.markCorrect(idx);
            this.view.updateProgressBar(this.currentPoints/this.requiredPoints);

            this.audioController.play(AudioAsset.sfx_gempuzzle_correct.key);

            this.view.destroyFruits(()=>{
                if(!this.checkCondition())
                {
                    var puzzle = this.generatePuzzle();
                    this.view.drawFruits(puzzle,this.puzzlePiece);
                }
            });
        }
    }

    checkCondition = () =>
    {
        if(!this.gameOver)
        {
            if(this.currentPoints >= this.requiredPoints)
            {
                this.gameOver = true;

                this.audioController.play(AudioAsset.bgm_mission_complete.key);
                this.showVictoryPopup();
                //this.onVictory();
            }
            if(this.timeLeft <= 0)
            {

                this.audioController.play(AudioAsset.sfx_gempuzzle_timesup.key);
                this.gameOver = true;
                this.onDefeat();
            }
        }
        return this.gameOver;
    }

    showVictoryPopup = () =>
    {
        this.view.drawVictoryPopup(()=>{
            GamePlayData.Hp = GamePlayData.MaxHp; //restore hp
            this.onVictory();
        })
    }

    onVictory = () =>
    {
        this.score = 150;
        let idChest = GamePlayData.OpenChest.lastChestOpenID;
        GamePlayData.OpenChest.data.forEach(element => {
			if ((element.id === idChest && element.status === "unknowed")){
				element.status = "win";
                element.score += this.score;
			}
        });

        this.audioController.stopBGM(true);
        MissionPubSub.publish(EventName.MISSIONUPDATE, MISSION_DATA.OPEN_CHEST.key);
        this.loadScene(SceneInfo.EXPLORE.key);
        // console.log('Victory');
        //then do something with the score.
    }

    onDefeat = () =>
    {
        this.score = 150 * this.currentPoints/this.requiredPoints;
        let idChest = GamePlayData.OpenChest.lastChestOpenID;
        GamePlayData.OpenChest.data.forEach(element => {
			if ((element.id === idChest && element.status === "unknowed")){
                element.status = "lose";
                element.score += this.score;
			}
        });

        this.audioController.stopBGM(true);
        this.loadScene(SceneInfo.EXPLORE.key);
        // console.log('Defeat');
        //then do something with the score.
    }

    /**
     * 
     * @param {string} key 
     */
    loadScene = (key)=>{
        this.scene.stop();
        this.scene.wake(key);
    }

    startTimer = (time) =>
    {
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.timeLeft--;
                this.view.updateTimerText(this.timeLeft);
                if(this.checkCondition())
                {
                    this.timer.paused = true;
                }
            },
            loop : true
        });
    }
}