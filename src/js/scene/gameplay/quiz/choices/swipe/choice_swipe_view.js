import ChoiceBaseView from '../choice_base_view.js';
import Sprite from '../../../../../module/gameobjects/sprite.js';
import Text from '../../../../../module/gameobjects/text.js';
import { FontAsset, GameplayAsset } from '../../../../../assetLibrary';
import gameplay_data from '../../../gameplay_data.js';
import { SceneInfo } from '../../../../../info';

/**
 * @callback onAnswerBool
 * @param {boolean} answer
 */

/**
 * @callback OnAnswerNumber
 * @param {number} answer
 */

export default class ChoiceSwipeView extends ChoiceBaseView
{
    /**
     * @param {Phaser.Scene} scene 
     * @param {import("../../../../../def/custom").Agate.Gameplay.Battle.QuestionData} questionData
     * @param {Function} onButtonPressed
     */
    constructor(scene, questionData = null, onButtonPressed = null)
    {
        super(scene, questionData);

        this.container = this.scene.add.container(0,0);

        this.onButtonPressed = onButtonPressed;

        this.style = {
            fontSize: 26 * this.screenUtility.screenPercentage,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.75, useAdvancedWrap: true },
            color: '#42210B',
        }

        this.styleWhite = {
            fontSize: 31 * this.screenUtility.screenPercentage,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.75, useAdvancedWrap: true },
        }

        /**
         * @type {Phaser.Math.Vector2}
         */
        this.initialPosition;
        this.isswiping = false;
        this.answered = false;
    }

    /**
     * Create the instance
     * @param {number[]} answerValues Default `[0,1]`
     * @param {boolean} hideQuestion Default `false`
     * @param {onAnswerBool} onPressedAnswer Default `null`
     * @public
     */
    create = (answerValues = [0,1], hideQuestion = false, onPressedAnswer = null) =>
    {
        this.answerValues = answerValues;
        this.SetView(hideQuestion, onPressedAnswer);
        return this;
    }

    /**
     * Create the view
     * @param {boolean} hideQuestion
     * @param {OnAnswerNumber} onPressedAnswer
     * @private
     */
    SetView = (hideQuestion, onPressedAnswer)=>
    {
        this.questionBox = new Sprite(this.scene, 0, 0, GameplayAsset.question_box_swipe.key);
        this.container.add(this.questionBox.gameobject);
        this.questionBox.gameobject.setPosition(
            this.screenUtility.width/2, 
            this.screenUtility.height * 0.75
        );
        this.questionBox.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.2,
            this.screenUtility.screenPercentage * 2.2
        );

        this.questionText = new Text(this.scene, 0,0, this.questionData.question, this.style);
        this.questionText.gameobject.setPosition(
            this.questionBox.gameobject.x,
            this.questionBox.gameobject.y
        );
        
        this.initialPosition = new Phaser.Math.Vector2(this.questionBox.gameobject.x, this.questionBox.gameobject.y);

        this.leftAnswerArrow = new Sprite(this.scene, 0,0, GameplayAsset.ui_quiz_swipe_answer_box_left.key, 1);
        this.leftAnswerArrow.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 1.5,
            this.screenUtility.screenPercentage * 1.5
        );
        this.leftAnswerArrow.gameobject.setPosition
        (
            this.screenUtility.width * 0.2,
            this.questionBox.gameobject.y - this.leftAnswerArrow.gameobject.displayHeight * 1.6
        );

        this.rightAnswerArrow = new Sprite(this.scene, 0,0, GameplayAsset.ui_quiz_swipe_answer_box_right.key, 1);
        this.rightAnswerArrow.gameobject.setScale
        (
            this.screenUtility.screenPercentage * 1.5,
            this.screenUtility.screenPercentage * 1.5
        );
        this.rightAnswerArrow.gameobject.setPosition
        (
            this.screenUtility.width * 0.8,
            this.questionBox.gameobject.y - this.leftAnswerArrow.gameobject.displayHeight * 1.6
        );

        this.leftAnswerTxt = new Text(this.scene, 0,0, this.questionData.answers[0], {...this.style, wordWrap:{ width: this.rightAnswerArrow.transform.displayWidth * 0.75, useAdvancedWrap: true }});

        this.leftAnswerTxt.gameobject.setOrigin(0.5,0.5);
            this.leftAnswerTxt.gameobject.setPosition
            (
                this.leftAnswerArrow.gameobject.x + this.leftAnswerArrow.gameobject.displayWidth * 0.4 - this.leftAnswerTxt.gameobject.displayWidth/2,
                this.leftAnswerArrow.gameobject.y
            );

        this.rightAnswerTxt = new Text(this.scene, 0,0, this.questionData.answers[1], {...this.style, wordWrap:{ width: this.rightAnswerArrow.transform.displayWidth * 0.75, useAdvancedWrap: true }});

        this.rightAnswerTxt.gameobject.setOrigin(0.5,0.5);
        this.rightAnswerTxt.gameobject.setPosition
        (
            this.rightAnswerArrow.gameobject.x - this.rightAnswerArrow.gameobject.displayWidth * 0.4 + this.rightAnswerTxt.gameobject.displayWidth * 0.5,
            this.rightAnswerArrow.gameobject.y
        );;

        if(hideQuestion)
        {
            this.questionText.gameobject.setText("");
            this.questionText.gameobject.setPosition(
                this.questionBox.gameobject.x ,
                this.questionBox.gameobject.y
            );
            this.leftAnswerArrow.gameobject.setPosition
            (
                this.questionBox.gameobject.x - this.questionBox.gameobject.displayWidth * 0.4 + this.leftAnswerArrow.gameobject.displayWidth * 0.5,
                this.questionBox.gameobject.y
            );
            this.leftAnswerTxt.gameobject.setOrigin(0.5,0.5);
            this.leftAnswerTxt.gameobject.setPosition
            (
                this.leftAnswerArrow.gameobject.x + this.leftAnswerArrow.gameobject.displayWidth * 0.4 - this.leftAnswerTxt.gameobject.displayWidth/2,
                this.leftAnswerArrow.gameobject.y
            );
            this.rightAnswerArrow.gameobject.setPosition
            (
                this.questionBox.gameobject.x + this.questionBox.gameobject.displayWidth * 0.4 - this.rightAnswerArrow.gameobject.displayWidth * 0.5,
                this.questionBox.gameobject.y
            );
            this.rightAnswerTxt.gameobject.setOrigin(0.5,0.5);
            this.rightAnswerTxt.gameobject.setPosition
            (
                this.rightAnswerArrow.gameobject.x - this.rightAnswerArrow.gameobject.displayWidth * 0.4 + this.rightAnswerTxt.gameobject.displayWidth * 0.5,
                this.rightAnswerArrow.gameobject.y
            );
        }

        this.questionBox.gameobject.setInteractive();
        this.scene.input.setDraggable(this.questionBox.gameobject);

        this.questionBox.gameobject.on('pointerdown', () => 
        {
            this.isswiping = true;
        });

        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = gameObject.y;
        });

        this.scene.input.on('pointermove', () => 
        {
            if(this.isswiping && !this.answered)
            {
                if(hideQuestion)
                {
                    this.leftAnswerArrow.gameobject.setPosition
                    (
                        this.questionBox.gameobject.x - this.questionBox.gameobject.displayWidth * 0.4 + this.leftAnswerArrow.gameobject.displayWidth * 0.5,
                        this.questionBox.gameobject.y
                    );
                    this.leftAnswerTxt.gameobject.setOrigin(0.5,0.5);
                    this.leftAnswerTxt.gameobject.setPosition
                    (
                        this.leftAnswerArrow.gameobject.x + this.leftAnswerArrow.gameobject.displayWidth * 0.4 - this.leftAnswerTxt.gameobject.displayWidth/2,
                        this.leftAnswerArrow.gameobject.y
                    );
                    this.rightAnswerArrow.gameobject.setPosition
                    (
                        this.questionBox.gameobject.x + this.questionBox.gameobject.displayWidth * 0.4 - this.rightAnswerArrow.gameobject.displayWidth * 0.5,
                        this.questionBox.gameobject.y
                    );
                    this.rightAnswerTxt.gameobject.setOrigin(0.5,0.5);
                    this.rightAnswerTxt.gameobject.setPosition
                    (
                        this.rightAnswerArrow.gameobject.x - this.rightAnswerArrow.gameobject.displayWidth * 0.4 + this.rightAnswerTxt.gameobject.displayWidth * 0.5,
                        this.rightAnswerArrow.gameobject.y
                    );
                }

                this.questionText.gameobject.setPosition(
                    this.questionBox.gameobject.x,
                    this.questionBox.gameobject.y
                );
                if(this.questionBox.gameobject.x < this.screenUtility.width * 0.1)
                {
                    // console.log('reached left edge');
                    if(hideQuestion)
                    {
                        onPressedAnswer(0);
                    }
                    this.answered = true;
                    this.onButtonPressed(this.answerValues[0]);
                    this.container.setVisible(false);
                    this.destroy();
                }
                else if (this.questionBox.gameobject.x > this.screenUtility.width * 0.9)
                {
                    // console.log('reached right edge');
                    if(hideQuestion)
                    {
                        onPressedAnswer(1);
                    }
                    this.answered = true;
                    this.onButtonPressed(this.answerValues[1]);
                    this.container.setVisible(false);
                    this.destroy();
                }
            }
        });

        this.scene.input.on('pointerup', () => 
        {
            if(this.isswiping)
            {
                //check distance from the edge of the screen
                if(!this.answered)
                {
                    this.resetPosition();
                    if(hideQuestion)
                    {
                        this.leftAnswerArrow.gameobject.setPosition
                        (
                            this.questionBox.gameobject.x - this.questionBox.gameobject.displayWidth * 0.4 + this.leftAnswerArrow.gameobject.displayWidth * 0.5,
                            this.questionBox.gameobject.y
                        );
                        this.leftAnswerTxt.gameobject.setOrigin(0.5,0.5);
                        this.leftAnswerTxt.gameobject.setPosition
                        (
                            this.leftAnswerArrow.gameobject.x + this.leftAnswerArrow.gameobject.displayWidth * 0.4 - this.leftAnswerTxt.gameobject.displayWidth/2,
                            this.leftAnswerArrow.gameobject.y
                        );
                        this.rightAnswerArrow.gameobject.setPosition
                        (
                            this.questionBox.gameobject.x + this.questionBox.gameobject.displayWidth * 0.4 - this.rightAnswerArrow.gameobject.displayWidth * 0.5,
                            this.questionBox.gameobject.y
                        );
                        this.rightAnswerTxt.gameobject.setOrigin(0.5,0.5);
                        this.rightAnswerTxt.gameobject.setPosition
                        (
                            this.rightAnswerArrow.gameobject.x - this.rightAnswerArrow.gameobject.displayWidth * 0.4 + this.rightAnswerTxt.gameobject.displayWidth * 0.5,
                            this.rightAnswerArrow.gameobject.y
                        );
                    }
                }
                this.isswiping = false;
            }
        });

        this.questionBox.gameobject.setScrollFactor(this.scene.cameras.main.x,this.scene.cameras.main.y);
        this.questionText.gameobject.setScrollFactor(this.scene.cameras.main.x,this.scene.cameras.main.y);
        this.leftAnswerArrow.gameobject.setScrollFactor(this.scene.cameras.main.x,this.scene.cameras.main.y);
        this.leftAnswerTxt.gameobject.setScrollFactor(this.scene.cameras.main.x,this.scene.cameras.main.y);
        this.rightAnswerArrow.gameobject.setScrollFactor(this.scene.cameras.main.x,this.scene.cameras.main.y);
        this.rightAnswerTxt.gameobject.setScrollFactor(this.scene.cameras.main.x,this.scene.cameras.main.y);
        this.container.add(this.questionBox.gameobject);
        this.container.add(this.questionText.gameobject);
        this.container.add(this.leftAnswerArrow.gameobject);
        this.container.add(this.leftAnswerTxt.gameobject);
        this.container.add(this.rightAnswerArrow.gameobject);
        this.container.add(this.rightAnswerTxt.gameobject);
        if (gameplay_data.scene === SceneInfo.EXPLORE.key){
            this.scene.cameras.main.ignore(this.container);
        }
    }

    /**
     * Resets the question box to its original position
     * @private
     */
    resetPosition = () =>
    {
        this.questionBox.gameobject.setPosition(
            this.initialPosition.x ,
            this.initialPosition.y
        );
        this.questionText.gameobject.setPosition(
            this.questionBox.gameobject.x,
            this.questionBox.gameobject.y
        );
    }
}