import Button from '../../../../module/gameobjects/button.js';
import Sprite from '../../../../module/gameobjects/sprite';
import Image from '../../../../module/gameobjects/image.js';
import Text from '../../../../module/gameobjects/text.js';
import { MinigameAsset, FontAsset, GameplayAsset } from '../../../../assetLibrary';
import { SandClockPanel } from '../../../../module/gameobjects/transition';
import { BaseView } from '../../../../core/base_view.js';

export default class MinigameBalloonSceneView extends BaseView
{
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene)
    {
        super(scene);

        /**
         * @type {Button[]}
         */
        this.buttons = []

        this.style = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.8, useAdvancedWrap: true },
            color: '#444400',
        }

        this.styleWhite = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.8, useAdvancedWrap: true },
        }

        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Balloon.BalloonPack[][]}
         */
        this.balloons = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ];

        /**
         * @type {string[][]}
         */
        this.balloonTexts = [
            [
                '2 - 2',
                '1 x 0'
            ],
            [
                '2 - 1',
                '1 x 1'
            ],
            [
                '1 + 1',
                '6 / 3'
            ],
            [
                '2 + 1',
                '5 - 2'
            ],
            [
                '10 - 6',
                '2 x 2'
            ],
            [
                '5 x 1',
                '10 / 2'
            ],
            [
                '3 x 2',
                '8 - 2'
            ],
            [
                '14 / 2',
                '3 + 4'
            ],
            [
                '2 x 4',
                '9 - 1'
            ],
            [
                '3 x 3',
                '7 + 2'
            ]
        ]
        this.tutorialPage = null;

        this.buttonContainer = this.scene.add.container(0,0);
        const { centerX, centerY} = this.screenUtility;
        this.sandClockPanel = new SandClockPanel(this.scene, centerX, centerY);
    }

    create = (onButtonPressed = null, onDeath = null) =>
    {
        if(onButtonPressed != null)
        {
            this.onButtonPressed = onButtonPressed;
        }
        if(onDeath != null)
        {
            this.onDeath = onDeath;
        }
        this.createAnims();
        this.SetView();
        this.updateProgressBar(0);
        return this;
    }

    SetView = ()=>
    {
        this.background = new Image(this.scene,0,0,MinigameAsset.mg_balloon_bg.key);
        this.background.transform.setDisplayHeightAsScreenHeight();
        this.background.transform.setDisplayWidthToAspectRatio();
        this.background.gameobject.setOrigin(0.5,0.5);
        this.background.gameobject.setPosition(
            this.screenUtility.width/2,
            this.screenUtility.height/2
            )
        //second check if it leaves black image
        if(this.background.gameobject.displayWidth < this.screenUtility.width)
        {
            this.background.transform.setDisplayWidthAsScreenWidth();
            this.background.transform.setDisplayHeightToAspectRatio();
        }
        this.clouds = new Image(this.scene,0,0,MinigameAsset.mg_balloon_clouds.key);
        this.clouds.transform.setDisplayHeightAsScreenHeight();
        this.clouds.transform.setDisplayWidthToAspectRatio();
        this.clouds.gameobject.setOrigin(0.5,0.5);
        this.clouds.gameobject.setPosition(
            this.screenUtility.width/2,
            this.screenUtility.height/2
            )
        this.buttonbox = new Sprite(this.scene, 0,0,MinigameAsset.mg_balloon_buttonbox.key);
        this.buttonbox.gameobject.setScale(
            this.screenUtility.screenPercentage * 1.4,
            this.screenUtility.screenPercentage * 2
        )
        this.buttonbox.gameobject.setPosition(
            this.screenUtility.width/2,
            this.screenUtility.height * 0.9
        )
        this.buttonbox.gameobject.setDepth(100);

        this.emptyBar = new Sprite(this.scene, 0,0, MinigameAsset.mg_juice_bar.key, 0);
        this.emptyBar.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 2.75, 
            this.screenUtility.screenPercentage * 2 
        );
        this.emptyBar.gameobject.setPosition(
            this.screenUtility.width * 0.075 + this.emptyBar.gameobject.displayWidth/2,
            this.screenUtility.height * 0.03 + this.emptyBar.gameobject.displayHeight/2
        )
        this.emptyBar.gameobject.setDepth(100);

        this.fillBar = new Sprite(this.scene, 0,0, MinigameAsset.mg_juice_bar.key, 1);
        this.fillBar.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 2.75, 
            this.screenUtility.screenPercentage * 2 
        ).setOrigin(0,0.5);
        this.fillBar.gameobject.setPosition(
            this.screenUtility.width * 0.1,
            this.screenUtility.height * 0.03 + this.fillBar.gameobject.displayHeight/2
        )
        this.fillBar.gameobject.setDepth(100);

        this.minichestleft = new Sprite(this.scene, 0,0, GameplayAsset.chest_mini_game.key, 0);
        this.minichestleft.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 2, 
            this.screenUtility.screenPercentage * 2 
        )
        this.minichestleft.gameobject.setPosition(
            this.emptyBar.gameobject.x - this.emptyBar.gameobject.displayWidth/2,
            this.screenUtility.height * 0.01 + this.minichestleft.gameobject.displayHeight/2
        )
        this.minichestleft.gameobject.setDepth(100);

        this.minichestright = new Sprite(this.scene, 0,0, GameplayAsset.chest_mini_game.key, 2);
        this.minichestright.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 2, 
            this.screenUtility.screenPercentage * 2 
        )
        this.minichestright.gameobject.setPosition(
            this.emptyBar.gameobject.x + this.emptyBar.gameobject.displayWidth/2,
            this.screenUtility.height * 0.01 + this.minichestright.gameobject.displayHeight/2
        )
        this.minichestright.gameobject.setDepth(100);

        this.answerBox = new Sprite (this.scene, 0,0, MinigameAsset.mg_balloon_answerbox.key);
        this.answerBox.gameobject.setScale(
            this.screenUtility.screenPercentage * 1.4,
            this.screenUtility.screenPercentage * 1.65
        )
        this.answerBox.gameobject.setPosition(
            this.screenUtility.width/2,
            this.buttonbox.gameobject.y - this.answerBox.gameobject.displayHeight/2 - this.answerBox.gameobject.displayHeight * 1.5
        )
        this.answerBox.gameobject.setDepth(100);

        this.answerTxt = new Text(this.scene,0,0, '---', this.style)
        this.answerTxt.gameobject.setScale
        {
            this.screenUtility.screenPercentage * 1.5,
            this.screenUtility.screenPercentage * 1.5
        }
        this.answerTxt.gameobject.setPosition(
            this.answerBox.gameobject.x,
            this.answerBox.gameobject.y
        );
        this.answerTxt.gameobject.setDepth(101);

        for (let i = 0; i < 2; i++)
        {
            var row = i;
            for (let j = 0; j < 5; j++)
            {
                var col = 1 + j + 5 * row;
                if(col == 10)
                    col = 0;
                let idx = col;
                var tempButton = new Button (this.scene, 0,0, MinigameAsset.mg_balloon_button.key, 0);
                tempButton.addTexture(
                    {
                        texture: MinigameAsset.mg_balloon_button.key,
                        frame: 1
                    },
                    {
                        texture: MinigameAsset.mg_balloon_button.key,
                        frame: 2
                    }
                )
                tempButton.gameobject.setScale(
                    this.screenUtility.screenPercentage * 1.5,
                    this.screenUtility.screenPercentage * 1.5
                )
                tempButton.gameobject.setPosition(
                    this.screenUtility.width * 0.2 + tempButton.gameobject.displayWidth * j,
                    this.buttonbox.gameobject.y - this.buttonbox.gameobject.displayHeight * 0.5 + this.buttonbox.gameobject.displayHeight * 0.15 + tempButton.gameobject.displayHeight * (0.2 + i)
                )
                var tempText = new Text (this.scene, 0,0, col, this.styleWhite);
                tempText.gameobject.setScale(
                    this.screenUtility.screenPercentage * 1.25,
                    this.screenUtility.screenPercentage * 1.25
                )
                tempText.gameobject.setPosition(
                    tempButton.gameobject.x,
                    tempButton.gameobject.y
                )
                tempButton.gameobject.on('pointerdown', () => { 
                    
                        this.answerTxt.gameobject.setText(idx);
                        this.answerTxt.gameobject.setPosition(
                            this.answerBox.gameobject.x,
                            this.answerBox.gameobject.y
                        );
                        this.scene.time.delayedCall(10, this.onButtonPressed, [idx], this);
                });
                tempButton.gameobject.setDepth(101);
                tempText.gameobject.setDepth(102);
                this.buttonContainer.add(tempButton.gameobject);
                this.buttonContainer.add(tempText.gameobject);
                this.buttonContainer.setDepth(105);
            }
        }
    }

    createAnims = () =>
    {
        for(let i = 1; i < 6; i++)
        {
            this.scene.anims.create({
                key: "balloon-" + i,
                frames: this.scene.anims.generateFrameNumbers('mg_balloon_monster_' + i,{ start: 0, end: 3, first: 0 }),
                frameRate:10,
                repeat:-1
            });
        }

        this.scene.anims.create({
            key: "balloon-pop",
            frames: this.scene.anims.generateFrameNumbers('mg_balloon_poof',{ start: 0, end: 5, first: 0 }),
            frameRate:10
        });
    }

    onButtonPressed = (number) =>
    {
        // console.log('pressed' + number);
    }

    onDeath = () =>
    {
        // console.log('DEAD');
    }

   //maybe move this to base class later
   drawVictoryPopup = (onFinish = null) =>
   {
       this.victoryEffect = new Sprite (this.scene, 0,0 , GameplayAsset.ui_result_light.key);
       this.victoryEffect.gameobject.setScale(this.screenUtility.screenPercentage * 3);
       this.victoryEffect.gameobject.setPosition(
           this.screenUtility.width/2,
           this.screenUtility.height/2
       )
       this.victoryEffect.gameobject.setDepth(140);
       this.victoryEffect.gameobject.setAlpha(0);
       this.victoryPopup = new Sprite (this.scene, 0,0, MinigameAsset.item_chest_health.key);
       this.victoryPopup.gameobject.setScale(0,0);
       this.victoryPopup.gameobject.setPosition(
           this.screenUtility.width/2,
           this.screenUtility.height/2
       )
       this.victoryPopup.gameobject.setDepth(141);
       this.scene.tweens.add({
           targets: this.victoryEffect.gameobject,
           alpha: 1,
           duration:250,
           ease: Phaser.Math.Easing.Sine.Out
       });
       this.scene.tweens.add({
           targets: this.victoryEffect.gameobject,
           angle: 360,
           duration:3000,
           ease: Phaser.Math.Easing.Linear,
           loop: -1
       });
       this.scene.tweens.add({
           targets: this.victoryPopup.gameobject,
           scale: this.screenUtility.screenPercentage,
           duration:750,
           ease: Phaser.Math.Easing.Sine.Out,
           onComplete: () =>
           {
               this.victoryPopup.gameobject.setInteractive();
                this.victoryPopup.gameobject.off('pointerdown');
                this.victoryPopup.gameobject.on('pointerdown', () => { 
                   this.victoryPopup.gameobject.disableInteractive();
                   this.victoryPopup.gameobject.setScale(0,0);
                   this.victoryPopup.gameobject.setVisible(false);
                   this.victoryPopup.gameobject.destroy();
                   this.fadeToBlack(onFinish);
               });
           }
       });
   }

   //maybe move this to base class later
   fadeToBlack = (onFinish = null) =>
   {
       this.transitionSprite = new Sprite(this.scene, 0,0, GameplayAsset.screen_transition.key);
       this.transitionSprite.gameobject.setScale(0);
       this.transitionSprite.gameobject.setAlpha(0);
       this.transitionSprite.gameobject.setPosition(
           this.screenUtility.width/2,
           this.screenUtility.height/2
       )
       this.transitionSprite.gameobject.setDepth(150);
        this.scene.tweens.add({
           targets: this.transitionSprite.gameobject,
           alpha:1,
           duration:250,
           ease: Phaser.Math.Easing.Sine.Out
       });
       this.scene.tweens.add({
           targets: this.transitionSprite.gameobject,
           scale: this.screenUtility.screenPercentage * 50,
           duration:1000,
           ease: Phaser.Math.Easing.Sine.Out,
           onComplete: () =>
           {
               onFinish();
           }
       });
   }

    spawnBalloon = (value) =>
    {
        var random = Phaser.Math.Between(1,5);
        
        var tempBalloon = new Sprite(this.scene, 0,0, 'mg_balloon_monster_' + random, 0);
        tempBalloon.gameobject.setDepth(50);
        tempBalloon.gameobject.setScale(
            this.screenUtility.screenPercentage * 2,
            this.screenUtility.screenPercentage * 2
        )
        tempBalloon.gameobject.setPosition(
            this.screenUtility.width * 0.1 * Phaser.Math.Between(1,9),
            this.screenUtility.height
        );
        tempBalloon.gameobject.play('balloon-' + random);

        var balloonTxt = new Text(this.scene, 0,0, this.balloonTexts[value][Phaser.Math.Between(0,1)], this.styleWhite);
        balloonTxt.gameobject.setDepth(51);
        balloonTxt.gameobject.setScale(
            this.screenUtility.screenPercentage * 2,
            this.screenUtility.screenPercentage * 2
        )
        balloonTxt.gameobject.setPosition(
            tempBalloon.gameobject.x,
            tempBalloon.gameobject.y
        );
        var idx = value;
        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Balloon.BalloonPack}
         */
        var balloonPack = {
            balloon: tempBalloon,
            text: balloonTxt,
            isAnswered : false,
            value: idx
        };

        this.balloons[value].push(balloonPack);

        this.scene.tweens.add({
            targets: tempBalloon.gameobject,
            y: 0 - tempBalloon.gameobject.displayHeight/2,
            duration:10000 * Phaser.Math.FloatBetween(0.8, 1.3),
            ease: Phaser.Math.Easing.Sine.In,
            onUpdate: ()=>{
                balloonTxt.gameobject.setPosition(
                    tempBalloon.gameobject.x,
                    tempBalloon.gameobject.y + tempBalloon.gameobject.displayHeight*0.35
                );
            },
            onComplete: () =>
            {
                if(!balloonPack.isAnswered)
                    this.onDeath();
                else
                {
                    // console.log('this balloon already popped. disabling.');
                }
            }
        });
        this.scene.tweens.add({
            targets: tempBalloon.gameobject,
            x: this.screenUtility.width * (0.1 + (0.8 * Phaser.Math.FloatBetween(0,1))),
            duration:10000,
            ease: Phaser.Math.Easing.Sine.In,
        });
    }

    popBalloons(index)
    {
        var point = 0
        for(let i = 0; i < this.balloons[index].length; i++)
        {
            if(this.balloons[index][i].balloon.gameobject.y < this.screenUtility.height * 0.85)
            {
                if(!this.balloons[index][i].isAnswered)
                    point++;
                this.balloons[index][i].isAnswered = true;
                //play pop animation
                this.balloons[index][i].text.gameobject.setVisible(false);
                this.balloons[index][i].balloon.gameobject.play('balloon-pop');
                this.scene.time.addEvent({
                    delay: 500,
                    callback: ()=>{
                        this.balloons[index][i].balloon.gameobject.setVisible(false);
                    }
                });
            }
        }
        return point;
    }

    updateProgressBar = (value, onFinish = null) =>
    {
        var dur = 0
        if(value != 0)
        dur = 500
        this.scene.tweens.add({
            targets: this.fillBar.gameobject,
            scaleX: this.screenUtility.screenPercentage * 2.75 * value,
            x: this.screenUtility.width * 0.1,
            duration:dur,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () =>{
                if(onFinish != null)
                    onFinish();
            }
        });
    }
}