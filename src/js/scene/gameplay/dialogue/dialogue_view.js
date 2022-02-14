import Button from '../../../module/gameobjects/button.js';
import Sprite from '../../../module/gameobjects/sprite';
import Text from '../../../module/gameobjects/text.js';
import { FontAsset, GameplayAsset } from '../../../assetLibrary';
import GamePlayData from '../gameplay_data';
import { BaseView } from '../../../core';

export default class DialogueView extends BaseView {
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super(scene);

        this.container = this.scene.add.container(0, 0);
        this.container.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);

        this.narratorSprite = GameplayAsset.question_box_info.key;
        this.dialogueSprite = GameplayAsset.question_box.key;

        this.style = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: this.screenUtility.width * 0.8,
                useAdvancedWrap: true
            },
            color: '#42210B',
        }

        this.styleLeft = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "left",
            wordWrap: {
                width: 915,
                useAdvancedWrap: true
            },
            color: '#42210B',
        }

        this.styleWhite = {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: this.screenUtility.width * 0.8,
                useAdvancedWrap: true
            },
        }
        /**
         * @type {import('../../../def/custom').Agate.Gameplay.Dialogue.ContentLineData}
         */
        this.dialogueData;
    }

    /**
     * Create the instance
     * @public
     */
    create = () => {
        this.SetView();
        this.createIndicators();
        return this;
    }

    /**
     * Create the view
     * @private
     */
    SetView = () => {
        this.narratorPanel = new Sprite(this.scene, 0, 0, GameplayAsset.question_box_info.key);
        this.narratorPanel.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.3,
            this.screenUtility.screenPercentage * 2.2
        );
        this.narratorPanel.gameobject.setPosition(this.screenUtility.width / 2,
            this.screenUtility.height * 0.57);
        this.narratorPanel.gameobject.setDepth(100);

        this.dialoguePanel = new Sprite(this.scene, 0, 0, GameplayAsset.question_box.key);
        this.dialoguePanel.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.3,
            this.screenUtility.screenPercentage * 2.2
        );
        this.dialoguePanel.gameobject.setPosition(this.screenUtility.width / 2,
            this.screenUtility.height * 0.57);
        this.dialoguePanel.gameobject.setVisible(false); //temp
        this.dialoguePanel.gameobject.setDepth(100);

        this.dialoguePanelPlayer = new Sprite(this.scene, 0, 0, GameplayAsset.question_box.key);
        this.dialoguePanelPlayer.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.3,
            this.screenUtility.screenPercentage * 2.2
        );
        this.dialoguePanelPlayer.gameobject.setPosition(this.screenUtility.width / 2,
            this.screenUtility.height * 0.57);
        this.dialoguePanelPlayer.gameobject.setVisible(false); //temp
        this.dialoguePanelPlayer.gameobject.setDepth(100);

        this.dialogueText = new Text(this.scene, 0, 0, 'Content Text Here', {
            fontSize: 30,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: 915,
                useAdvancedWrap: true
            },
            color: "#42210B"
        });
        this.dialogueText.gameobject.setScale(
            this.screenUtility.screenPercentage,
            this.screenUtility.screenPercentage
        );
        this.dialogueText.gameobject.setPosition(
            this.dialoguePanel.gameobject.x - this.dialoguePanel.gameobject.displayWidth * 0.45,
            this.dialoguePanel.gameobject.y - this.dialogueText.gameobject.displayHeight
        );
        this.dialogueText.gameobject.setDepth(100);

        this.namePanel = new Sprite(this.scene, 0, 0, GameplayAsset.ui_ribbon_1.key);
        this.namePanel.gameobject.setScale(
            this.screenUtility.screenPercentage * 1.5,
            this.screenUtility.screenPercentage * 2
        );
        this.namePanel.gameobject.setPosition(
            this.dialoguePanel.gameobject.x - this.dialoguePanel.gameobject.displayWidth * 0.35,
            this.dialoguePanel.gameobject.y - this.dialoguePanel.gameobject.displayHeight * 0.65
    );
        this.nameText = new Text(this.scene, 0, 0, 'Name', this.style);
        this.nameText.gameobject.setScale(
            this.screenUtility.screenPercentage,
            this.screenUtility.screenPercentage
        );
        this.nameText.gameobject.setPosition(
            this.namePanel.gameobject.x,
            this.namePanel.gameobject.y
        );
        this.nextButton = new Button(this.scene, 0, 0, GameplayAsset.submit_button.key);
        this.nextButton.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.4,
            this.screenUtility.screenPercentage * 1.5
        );
        this.nextButton.gameobject.setPosition(
            this.dialoguePanel.gameobject.x + this.dialoguePanel.gameobject.displayWidth / 2 - this.nextButton.gameobject.displayWidth / 2,
            this.dialoguePanel.gameobject.y + this.dialoguePanel.gameobject.displayHeight / 2 + this.nextButton.gameobject.displayHeight / 2);
        this.nextButton.addTexture({
            texture: GameplayAsset.submit_button.key,
            frame: 2
        });
        this.nextLabel = new Text(this.scene, 0, 0, 'Berikutnya', this.style);
        this.nextLabel.gameobject.setScale(
            this.screenUtility.screenPercentage,
            this.screenUtility.screenPercentage
        );
        this.nextLabel.gameobject.setPosition(
            this.nextButton.gameobject.x,
            this.nextButton.gameobject.y
        )

        this.container.add(this.dialoguePanel.gameobject);
        this.container.add(this.dialoguePanelPlayer.gameobject);
        this.container.add(this.narratorPanel.gameobject);
        this.container.add(this.dialogueText.gameobject);
        this.container.add(this.namePanel.gameobject);
        this.container.add(this.nameText.gameobject);
        this.container.add(this.nextButton.gameobject);
        this.container.add(this.nextLabel.gameobject);
        this.nextButton.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
    }

    /**
     * @param {import('../../../def/custom').Agate.Gameplay.Dialogue.ContentLineData} dialogueData
     * @param {Function} onNextPressed
     * @public
     */
    displayDialogue = (dialogueData, onNextPressed = null) => {
        this.dialogueData = dialogueData;
        this.nextButton.gameobject.setVisible(this.dialogueData.type == 'message');
        this.nextLabel.gameobject.setVisible(this.dialogueData.type == 'message');
        this.narratorPanel.gameobject.setVisible();
        if (this.dialogueData.talker.toLowerCase() == 'narrator' || this.dialogueData.talker.toLowerCase() == 'Info') {
            this.dialogueText.gameobject.setColor('#42210B')
            this.namePanel.gameobject.setVisible(false);
            this.nameText.gameobject.setVisible(false);
            this.narratorPanel.gameobject.setVisible(true);
            this.dialoguePanel.gameobject.setVisible(false);
            this.dialoguePanelPlayer.gameobject.setVisible(false);
        } else if (this.dialogueData.talker.toLowerCase() == 'player' || this.dialogueData.talker.toLowerCase() == 'pemain') {
            this.dialogueText.gameobject.setColor('#42210B')
            this.namePanel.gameobject.setVisible(true);
            this.nameText.gameobject.setVisible(true);
            this.nameText.gameobject.setText(GamePlayData.PlayerName);
            this.dialoguePanelPlayer.gameobject.setVisible(true);
            this.dialoguePanel.gameobject.setVisible(false);
            this.narratorPanel.gameobject.setVisible(false);
            this.namePanel.gameobject.setPosition(
                this.dialoguePanel.gameobject.x - this.dialoguePanel.gameobject.displayWidth * 0.35,
                this.dialoguePanel.gameobject.y - this.dialoguePanel.gameobject.displayHeight * 0.65
            );
        } else {
            this.namePanel.gameobject.setVisible(true);
            this.nameText.gameobject.setVisible(true);
            this.nameText.gameobject.setText(this.dialogueData.talker);
            this.dialoguePanel.gameobject.setVisible(true);
            this.dialoguePanelPlayer.gameobject.setVisible(false);
            this.narratorPanel.gameobject.setVisible(false);
            this.namePanel.gameobject.setPosition(
                this.dialoguePanel.gameobject.x - this.dialoguePanel.gameobject.displayWidth * 0.35,
                this.dialoguePanel.gameobject.y - this.dialoguePanel.gameobject.displayHeight * 0.65
            );
        }
        this.nameText.gameobject.setPosition(
            this.namePanel.gameobject.x,
            this.namePanel.gameobject.y - this.nameText.gameobject.displayHeight / 3
        );
        var str = this.dialogueData.messages;
        var processedString = str.replace("\[Pemain\]", GamePlayData.PlayerName);
        this.dialogueText.gameobject.setText(processedString);
        if (this.dialogueData.talker == 'narrator' || this.dialogueData.talker == 'Info') {
            this.dialogueText.gameobject.setPosition(
                this.dialoguePanel.gameobject.x,
                this.dialoguePanel.gameobject.y - this.dialogueText.gameobject.displayHeight * 0.3
            );
            this.dialogueText.gameobject.setOrigin(0.5, 0);
        } else {
            this.dialogueText.gameobject.setPosition(
                this.dialoguePanel.gameobject.x,
                this.dialoguePanel.gameobject.y - this.dialoguePanel.gameobject.displayHeight * 0.085
            );
            this.dialogueText.gameobject.setOrigin(0.5);

        }
        if (this.dialogueData.type == 'message') {
            if (onNextPressed != null) {
                this.onNextPressed = onNextPressed;
                this.nextButton.gameobject.on('pointerdown', () => {
                    this.scene.time.delayedCall(10, this.onNextPressed, [this.dialogueData.choiceIdNexts[0]], this);
                    this.container.setVisible(false);
                    this.destroy();
                });
            }
        } else if (this.dialogueData.type.toLowerCase() == 'question') {
            this.onNextPressed = onNextPressed;
        }
    }

    /**
     * Callback to be called on pressing `Next`
     * @param {number} number
     * @private
     */
    onNextPressed = (number) => {

    }

    /**
     * Simulates pressing next button.
     * @param {number} number what number should be passed using `onNextPressed`. default `-1`
     * @public
     */
    triggerNextButton = (number = -1) => {
        if (number > -1) {
            this.onNextPressed(this.dialogueData.choiceIdNexts[number]);
        }
        this.container.setVisible(false);
        this.destroy();
    }

    createIndicators = () => {
        //create the correct and wrong indicator
        this.correctIndicator = new Sprite(this.scene, 0, 0, GameplayAsset.correct_answer_notif.key);
        this.correctIndicator.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
        this.correctIndicator.gameobject.setScale(
            this.screenUtility.screenPercentage * 2 / this.scene.cameras.main.zoom,
            this.screenUtility.screenPercentage * 2 / this.scene.cameras.main.zoom
        );
        this.correctIndicator.gameobject.setPosition(
            this.screenUtility.width / 2,
            this.screenUtility.height * 0.35
        );
        this.wrongIndicator = new Sprite(this.scene, 0, 0, GameplayAsset.wrong_answer_notif.key);
        this.wrongIndicator.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
        this.wrongIndicator.gameobject.setScale(
            this.screenUtility.screenPercentage * 2 / this.scene.cameras.main.zoom,
            this.screenUtility.screenPercentage * 2 / this.scene.cameras.main.zoom
        );
        this.wrongIndicator.gameobject.setPosition(
            this.screenUtility.width / 2,
            this.screenUtility.height * 0.35
        );

        this.correctIndicator.gameobject.setVisible(false);
        this.wrongIndicator.gameobject.setVisible(false);
        
        this.correctIndicator.gameobject.setDepth(7);
        this.wrongIndicator.gameobject.setDepth(7);
        if (this.scene.secondCamera != undefined) {
            this.scene.secondCamera.ignore(this.correctIndicator.gameobject);
            this.scene.secondCamera.ignore(this.wrongIndicator.gameobject);
        }
    }

    /**
     * @param {boolean} isCorrect
     * @param {Function} onFinish
     */
    showIndicator = (isCorrect, onFinish = null) => {
        var indicator = this.wrongIndicator;
        if (isCorrect) {
            indicator = this.correctIndicator;
        }

        indicator.gameobject.setVisible(true);
        indicator.gameobject.setScale(0, 0);
        this.scene.tweens.add({
            targets: indicator.gameobject,
            scaleX: 1,
            scaleY: 1,
            duration: 250,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () => {
                this.timer = this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        indicator.gameobject.setVisible(false);
                        if (onFinish != null) {
                            onFinish();
                        }
                    }
                });
            }
        });
    }

    /**@param {Function} onFinish*/
    gameOver = (onFinish = null) => {
        this.fadeToBlack(onFinish);
    }
    /**@param {Function} onFinish*/
    fadeToBlack = (onFinish = null) => {
        this.transitionSprite = new Sprite(this.scene, 0, 0, GameplayAsset.screen_transition.key);
        this.transitionSprite.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
        this.transitionSprite.gameobject.setScale(0);
        this.transitionSprite.gameobject.setAlpha(0);
        this.transitionSprite.gameobject.setPosition(
            this.screenUtility.width / 2,
            this.screenUtility.height / 2
        )
        this.transitionSprite.gameobject.setDepth(150);
        this.scene.tweens.add({
            targets: this.transitionSprite.gameobject,
            alpha: 1,
            duration: 250,
            ease: Phaser.Math.Easing.Sine.Out
        });
        this.scene.tweens.add({
            targets: this.transitionSprite.gameobject,
            scale: this.screenUtility.screenPercentage * 50,
            duration: 1000,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () => {
                onFinish();
            }
        });
    }
}