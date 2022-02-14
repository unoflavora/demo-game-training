import Button from '../../../../module/gameobjects/button.js';
import Sprite from '../../../../module/gameobjects/sprite';
import Image from '../../../../module/gameobjects/image.js';
import Text from '../../../../module/gameobjects/text.js';
import { SandClockPanel } from '../../../../module/gameobjects/transition';
import { MinigameAsset, FontAsset, GameplayAsset } from '../../../../assetLibrary';
import { BaseView } from '../../../../core/base_view.js';

export default class MinigameFruitSceneView extends BaseView
{
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene)
    {
        super(scene);

        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData[]}
         */
        this.currentFruitDatas = [];

        /**
         * @type {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData}
         */
        this.currentPuzzlePiece = null;

        /**
         * @type {Button[]}
         */
        this.renderedFruits = [];

        this.container = this.scene.add.container();


        this.style = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.8, useAdvancedWrap: true },
            color: '#444400',
        }

        /**
         * @type {Sprite}
         */
        this.tutorialPage = null;
        /**
         * @type {Button}
         */
        this.tutorialButton = null;
        this.sandClockPanel = new SandClockPanel(this.scene, this.screenUtility.centerX, this.screenUtility.centerY);
    }

    /**
     * @param {Function} onFruitPressed
     */
    create = (onFruitPressed = null) =>
    {
        this.SetView();
        if(onFruitPressed != null)
        {
            this.onButtonPressed = onFruitPressed;
        }
        return this;
    }

    SetView = ()=>
    {
        this.background = new Image(this.scene,0,0,MinigameAsset.mg_juice_bg.key);
        this.background.gameobject.setOrigin(0.5,0.5);
        this.background.transform.setDisplayHeightAsScreenHeight();
        this.background.transform.setDisplayWidthToAspectRatio();
        //second check if it leaves black image
        if(this.background.gameobject.displayWidth < this.screenUtility.width)
        {
            this.background.transform.setDisplayWidthAsScreenWidth();
            this.background.transform.setDisplayHeightToAspectRatio();
        }
        this.background.gameobject.setPosition(
            this.screenUtility.width/2,
            this.screenUtility.height/2
            )

        this.timerText = new Text(this.scene, 0,0, 'Time: 30', this.style);
        this.timerText.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 2, 
            this.screenUtility.screenPercentage * 2 
        )
        this.timerText.gameobject.setPosition(
            this.screenUtility.width * 0.5,
            this.screenUtility.height * 0.01 + this.timerText.gameobject.displayHeight/2
        )

        this.emptyBar = new Sprite(this.scene, 0,0, MinigameAsset.mg_juice_bar.key, 0);
        this.emptyBar.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 2.75, 
            this.screenUtility.screenPercentage * 2 
        )
        this.emptyBar.gameobject.setPosition(
            this.screenUtility.width * 0.075 + this.emptyBar.gameobject.displayWidth/2,
            this.timerText.gameobject.y + this.timerText.gameobject.displayHeight
        )
        this.fillBar = new Sprite(this.scene, 0,0, MinigameAsset.mg_juice_bar.key, 1);
        this.fillBar.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 2.75, 
            this.screenUtility.screenPercentage * 2 
        ).setOrigin(0,0.5);
        this.fillBar.gameobject.setPosition(
            this.screenUtility.width * 0.1,
            this.emptyBar.gameobject.y
        )

        this.minichestleft = new Sprite(this.scene, 0,0, GameplayAsset.chest_mini_game.key, 0);
        this.minichestleft.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 2, 
            this.screenUtility.screenPercentage * 2 
        )
        this.minichestleft.gameobject.setPosition(
            this.emptyBar.gameobject.x - this.emptyBar.gameobject.displayWidth/2,
            this.emptyBar.gameobject.y
        )
        this.minichestright = new Sprite(this.scene, 0,0, GameplayAsset.chest_mini_game.key, 2);
        this.minichestright.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 2, 
            this.screenUtility.screenPercentage * 2 
        )
        this.minichestright.gameobject.setPosition(
            this.emptyBar.gameobject.x + this.emptyBar.gameobject.displayWidth/2,
            this.emptyBar.gameobject.y
        )

        this.chestLarge = new Sprite(this.scene, 0,0, GameplayAsset.chest_mini_game.key, 0);
        this.chestLarge.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 3, 
            this.screenUtility.screenPercentage * 3 
        )
        this.chestLarge.gameobject.setPosition(
            this.screenUtility.width/2,
            this.screenUtility.height * 0.425
        )

        this.updateProgressBar(0);
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
        this.victoryEffect.gameobject.setAlpha(0);
        this.victoryPopup = new Sprite (this.scene, 0,0, MinigameAsset.item_chest_health.key);
        this.victoryPopup.gameobject.setScale(0,0);
        this.victoryPopup.gameobject.setPosition(
            this.screenUtility.width/2,
            this.screenUtility.height/2
        )
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

    /**
     * @param {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData[]} fruitData
     * @param {import('../../../../def/custom').Agate.Minigame.Fruit.FruitData} puzzlePiece
     */
    drawFruits = (fruitData, puzzlePiece = null) =>
    {
        this.currentFruitDatas = fruitData;
        this.currentPuzzlePiece = puzzlePiece;

        if(this.currentPuzzlePiece != null)
        {
            this.puzzleSprite = new Sprite(this.scene, 0,0, 'mg_juice_rock_' + this.currentPuzzlePiece.direction 
            + '_' + this.currentPuzzlePiece.symbol
            + '_' + this.currentPuzzlePiece.color);
            this.puzzleSprite.gameobject.setScale(
                this.screenUtility.screenPercentage * 2,
                this.screenUtility.screenPercentage * 2
            )
            this.puzzleSprite.gameobject.setPosition(
                this.screenUtility.width * 0.25 ,
                this.screenUtility.height * 0.75);
        }

        for(let i = 0; i < this.currentFruitDatas.length; i++)
        {
            var btn;
            if(this.currentFruitDatas[i].isOn)
            {
                btn = new Button(this.scene, 0,0, 'mg_juice_rock_' + this.currentFruitDatas[i].direction 
                + '_' + this.currentFruitDatas[i].symbol
                + '_' + this.currentFruitDatas[i].color
                + '_2'
                );
                this.renderedFruits.push(btn)
            }
            else
            {
                let idx = i;
                btn = new Button(this.scene, 0,0, 'mg_juice_rock_' + this.currentFruitDatas[idx].direction 
                );
                btn.addTexture({texture: 'mg_juice_rock_' + this.currentFruitDatas[idx].direction + '_wrong', frame: 0});
                this.renderedFruits.push(btn);
                btn.gameobject.on('pointerdown', () => { 
                    this.scene.time.delayedCall(10, this.onButtonPressed, [idx], this);
                });
            }
            
            btn.gameobject.setScale(
                this.screenUtility.screenPercentage * 1.5,
                this.screenUtility.screenPercentage * 1.5
            )
            var maxXy;
            if(btn.gameobject.displayWidth >= btn.gameobject.displayHeight)
            {
                maxXy = btn.gameobject.displayWidth * 0.7;
            }
            else
            {
                maxXy = btn.gameobject.displayHeight * 0.7;
            }
            if(i == 0)
            {
                btn.gameobject.setPosition(
                    this.screenUtility.width * 0.6 ,
                    this.screenUtility.height * 0.75);
            }
            else
            {
                btn.gameobject.setPosition(
                    this.renderedFruits[0].gameobject.x + maxXy * this.currentFruitDatas[i].x,
                    this.renderedFruits[0].gameobject.y - maxXy * this.currentFruitDatas[i].y);
            }
        }
    }

    markIncorrect = (index) =>
    {
        //hack. modifying the template will take too long for the deadline.
        var oldFruit = this.renderedFruits[index];

        oldFruit.gameobject.setVisible(false);
        oldFruit.gameobject.disableInteractive();
        var temp = new Button (this.scene, 0,0, 'mg_juice_rock_' + this.currentFruitDatas[index].direction + '_wrong')
        temp.gameobject.setScale(oldFruit.gameobject.scaleX, oldFruit.gameobject.scaleY);
        temp.gameobject.setPosition(oldFruit.gameobject.x, oldFruit.gameobject.y);
        
        this.renderedFruits[index] = temp;
        oldFruit.gameobject.destroy();

        // the actual ideal solution which doesnt work
        // this.renderedFruits[index].gameobject.setTexture(
        //     'mg_juice_rock_' + this.currentFruitDatas[index].direction + '_wrong'
        // );
        // this.renderedFruits[index].addTexture(
        //     {texture: 'mg_juice_rock_' + this.currentFruitDatas[index].direction + '_wrong', frame: 0},
        //     {texture: 'mg_juice_rock_' + this.currentFruitDatas[index].direction + '_wrong', frame: 0}
        // )
    }

    markCorrect = (index) =>
    {
        var oldFruit = this.renderedFruits[index];

        oldFruit.gameobject.setVisible(false);
        oldFruit.gameobject.disableInteractive();
        var temp = new Button (this.scene, 0,0, 'mg_juice_rock_' + this.currentFruitDatas[index].direction 
        + '_' + this.currentFruitDatas[index].symbol
        + '_' + this.currentFruitDatas[index].color
        + '_2')
        temp.gameobject.setScale(oldFruit.gameobject.scaleX, oldFruit.gameobject.scaleY);
        temp.gameobject.setPosition(oldFruit.gameobject.x, oldFruit.gameobject.y);
        
        this.renderedFruits[index] = temp;
        oldFruit.gameobject.destroy();

        for(let i = 0; i < this.renderedFruits.length; i++)
        {
            this.renderedFruits[i].gameobject.disableInteractive();
        }
        //also destroy the puzzle piece here
        if(this.puzzleSprite != null)
        {
            this.puzzleSprite.gameobject.setVisible(false);
            this.puzzleSprite.gameobject.destroy();
        }
    }
    
    //callback
    onButtonPressed = (index) =>
    {

    }

    destroyFruits = (onFinish = null) =>
    {
        for(let i = 0; i < this.renderedFruits.length; i++)
        {
            this.scene.tweens.add({
                targets: this.renderedFruits[i].gameobject,
                alpha: 0,
                duration:750,
                ease: Phaser.Math.Easing.Sine.Out,
                onComplete: () =>
                {
                    this.renderedFruits[i].gameobject.setVisible(false);
                    this.renderedFruits[i].gameobject.destroy();
                }
            });
        }
        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.container.removeAll();
                this.currentFruitDatas = [];
                this.renderedFruits = [];
                if(onFinish != null)
                {
                    onFinish();
                }
            }
        });
    }

    updateTimerText = (value) =>
    {
        // console.log(value);
        this.timerText.gameobject.setText('Time: ' + value);
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