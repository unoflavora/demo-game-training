import ChoiceBaseView from '../choice_base_view.js';
import Image from '../../../../../module/gameobjects/image.js';
import Sprite from '../../../../../module/gameobjects/sprite.js';
import Text from '../../../../../module/gameobjects/text.js';
import Button from '../../../../../module/gameobjects/button.js';
import { FontAsset, GameplayAsset } from '../../../../../assetLibrary';

export default class ChoiceArrangeView extends ChoiceBaseView 
{
    /**
     * @param {Phaser.Scene} scene 
     * @param {import("../../../../../def/custom").Agate.Gameplay.Battle.QuestionData} questionData
     * @param {Function} onButtonPressed Action when 'submit' button is pressed.
     */
    constructor(scene, questionData = null, onButtonPressed = null)
    {
        super(scene, questionData);

        this.container = this.scene.add.container(0,0);

        this.onButtonPressed = onButtonPressed;

        this.style = {
            fontSize: 20,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: 600, useAdvancedWrap: true },
            color: '#42210B',
        }

        this.styleWhite = {
            fontSize: 26 * this.screenUtility.screenPercentage,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: 600, useAdvancedWrap: true },
        }

        /**
         * @type {Phaser.Math.Vector2[]}
         */
        this.buttonPositions = [];

        /**
         * @type {Phaser.Math.Vector2[]}
         */
        this.buttonTxtPositions = [];

        /**
         * @type {Sprite[]}
         */
        this.buttons = [];

        /**
         * @type {Text[]}
         */
        this.buttonTxts = [];

        this.answerValues = questionData.answervalues;

        /**
         * @type {number[]}
         */
        this.cardOrder = []

        /**
         * @type {number[]}
         */
        this.answerValuesOrder = []
    }

    /**
     * Create the instance
     * @public
     */
    create = () =>
    {
        this.SetView();
        return this;
    }

    /**
     * Create the view
     * @private
     */
    SetView = ()=>
    {
        this.panel = new Sprite(this.scene, 0, 0, GameplayAsset.checklist_arrange_panel.key);
        this.container.add(this.panel.gameobject);
        this.container.sendToBack(this.panel.gameobject);
        this.panel.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.3,
            this.screenUtility.screenPercentage * 1.55
        );
        this.panel.gameobject.setPosition(this.screenUtility.width/2, this.screenUtility.height * 0.7);
        console.log('panel', this.panel.gameobject)
        if(this.questionData.answers.length == 5)
        {
            this.panel.gameobject.setScale(
                this.screenUtility.screenPercentage * 2.3,
                this.screenUtility.screenPercentage * 1.75
            );
        }

        this.questionBox = new Image(this.scene, 0, 0, GameplayAsset.ui_quiz_checklist_arrange_slider_question_box2.key);
        this.container.add(this.questionBox.gameobject);
        this.questionBox.gameobject.setPosition(
            this.panel.gameobject.x, 
            this.panel.gameobject.y - this.panel.gameobject.displayHeight * 0.34);
        this.questionBox.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.2,
            this.screenUtility.screenPercentage * 2.2
        );

        this.questionText = new Text(this.scene, 0,0, this.questionData.question, this.styleWhite);
        this.questionText.gameobject.setWordWrapWidth(this.questionBox.gameobject.displayWidth * 0.9)
        this.container.add(this.questionText.gameobject);
        this.questionText.transform.setFontSize(30);
        this.questionText.gameobject.setPosition(
            this.questionBox.gameobject.x,
            this.questionBox.gameobject.y
        );
       
        let allowRescale = false;
        var tempTextArr = [];
        let tempFontSize = 20;
        let tempPos;

        for(let i = 0; i < this.questionData.answers.length; i++)
        {
            this.answerValuesOrder.push(this.questionData.answervalues[i]);
            var tempButton = new Sprite(this.scene,0,0,GameplayAsset.button_choice.key,0);
            tempButton.gameobject.arrayPosition = i
            tempButton.gameobject.setScale(this.screenUtility.screenPercentage * 2, this.screenUtility.screenPercentage * 2);
            tempButton.gameobject.setPosition(
                this.panel.gameobject.x,
                this.questionBox.gameobject.y + tempButton.gameobject.displayHeight * (1.2 + i * 1)
            );
            if(this.questionData.answers.length == 5)
            {
                tempButton.gameobject.setPosition(
                    this.panel.gameobject.x,
                    this.questionBox.gameobject.y + tempButton.gameobject.displayHeight * (1.2 + i * 0.9)
                );
            }
            
            
            this.buttonPositions.push(new Phaser.Math.Vector2(tempButton.gameobject.x, tempButton.gameobject.y));
            var dummyText = new Text(this.scene, 0,0, "testing",this.styleWhite);
            dummyText.gameobject.setVisible(false);            
            var tempText = new Text(this.scene, 0,0, this.questionData.answers[i], 
                {...this.styleWhite, align:"center", wordWrap:{ width: this.panel.transform.displayWidth * 0.8, useAdvancedWrap: true }}
            );
            tempText.gameobject.setPosition(this.buttonPositions[i].x, this.buttonPositions[i].y);
            tempTextArr.push(tempText);
            if (tempText.transform.displayHeight > dummyText.transform.displayHeight){
                allowRescale = true;
                tempFontSize = 22 * this.screenUtility.screenPercentage;
                tempPos = {x:tempText.gameobject.x, y: tempText.gameobject.y + tempText.transform.displayHeight * 0.5};
            }
            this.container.add(tempButton.gameobject);
            this.container.add(tempText.gameobject);
            this.buttons.push(tempButton);
            this.buttonTxts.push(tempText);
            this.buttonTxtPositions.push(new Phaser.Math.Vector2(tempText.gameobject.x, tempText.gameobject.y));
            this.cardOrder.push(i);
        }

        if (allowRescale){
            tempTextArr.forEach((element, index) => {
                element.gameobject.setFontSize(tempFontSize);
            });
        }

        //indirect ondrag for texts
        for(let i = 0; i < this.buttons.length; i++)
        {
            let idx = i;
            var x = this.buttons[idx];
            x.gameobject.setInteractive();
            this.scene.physics.world.enable(x.gameobject)
            this.scene.input.setDraggable(x.gameobject);
            x.gameobject.body.setBoundsRectangle(
                new Phaser.Geom.Rectangle(this.panel.gameobject.x, this.panel.gameobject.y, this.panel.gameobject.width, this.panel.gameobject.height)
            )

            this.buttons[idx].gameobject.on('pointerdown', () => 
            { 
                this.container.bringToTop(this.buttons[idx].gameobject);
                this.container.bringToTop(this.buttonTxts[idx].gameobject);
                this.iswapping = true;
            });

            this.buttons[idx].gameobject.on('pointermove', () => 
            { 
                this.buttonTxts[idx].gameobject.setPosition(
                    this.buttons[idx].gameobject.x,
                    this.buttons[idx].gameobject.y
                );

                for(let j = 0; j < this.buttons.length; j++)
                {
                    if(j != idx)
                    {
                        if (this.checkVerticalOverlap(this.buttons[idx], this.buttons[j]))
                        {
                            this.swapCardPosition(idx,j);
                            return;
                        }
                    }
                }
            });

            this.scene.input.on('pointerup', () => 
            { 
                if(this.iswapping)
                {
                this.iswapping = false;
                this.resetCardPosition();
                }
            });
        }

        //drag for answer
        this.scene.input.on('drag', function (pointer, gameobject, dragX, dragY) {
            let minY = this.panel.gameobject.y - this.panel.gameobject._displayOriginY
            let idx = gameobject.arrayPosition

            if(dragY > minY && dragY < minY + this.panel.gameobject.height) {
                gameobject.y = dragY;
                this.buttonTxts[idx].gameobject.setPosition(
                    gameobject.x,
                    gameobject.y
                );

                 for(let j = 0; j < this.buttons.length; j++)
                {
                    if(j != idx)
                    {
                        if (this.checkVerticalOverlap(this.buttons[idx], this.buttons[j]))
                        {
                            this.swapCardPosition(idx,j);
                            return;
                        }
                    }
                }

            }
        }, this);

        this.submitButton = new Button(this.scene,0,0, GameplayAsset.submit_button.key);
        this.submitButton.addTexture({texture: GameplayAsset.submit_button.key, frame: 2});
        this.submitButton.gameobject.setScale(
            this.screenUtility.screenPercentage * 3,
            this.screenUtility.screenPercentage * 2
        );

        this.submitButton.gameobject.setPosition(
            this.screenUtility.width/2,
            this.panel.gameobject.y + this.panel.gameobject.displayHeight/2 + this.questionBox.gameobject.displayHeight * 0.5);

        this.submitButton.gameobject.on('pointerdown', () => { 
            this.scene.time.delayedCall(10, this.onButtonPressed,[this.answerValuesOrder] , this);
            this.container.setVisible(false);
            this.destroy();
        });

        this.submitTxt = new Text(this.scene, 0,0, 'Kirim', this.style);
        this.submitTxt.gameobject.setFontSize(30);
        this.submitTxt.gameobject.setScale(this.screenUtility.screenPercentage * 1.5);
            this.submitTxt.gameobject.setPosition
        (
            this.submitButton.gameobject.x,
            this.submitButton.gameobject.y
        )
        this.container.add(this.submitButton.gameobject);
        this.container.add(this.submitTxt.gameobject);
    }

    /**
     * @param {Sprite} spriteA
     * @param {Sprite} spriteB
     * @param {number} offset
     * @private
     */
    checkVerticalOverlap = (spriteA, spriteB, offset = 30) =>
    {
        if(spriteA.gameobject.y > spriteB.gameobject.y - offset &&
            spriteA.gameobject.y < spriteB.gameobject.y + offset)
            {
                return true;
            }
        return false;
    }

    /**
     * @param {number} from
     * @param {number} to
     * @private
     */
    swapCardPosition = (from, to) =>
    {
        var fromIndex = this.cardOrder.indexOf(from);
        var toIndex = this.cardOrder.indexOf(to);
        var fromValue = this.answerValuesOrder[fromIndex];
        var toValue = this.answerValuesOrder[toIndex];
        this.cardOrder[fromIndex] = to;
        this.cardOrder[toIndex] = from;
        this.answerValuesOrder[fromIndex] = toValue;
        this.answerValuesOrder[toIndex] = fromValue;
        this.resetCardPosition();
    }

    /**
     * Reset every answer to its respective position based on the shuffled order
     * @private
     */
    resetCardPosition = () =>
    {
        for(let j = 0; j < this.buttons.length; j++)
        {
            this.buttons[this.cardOrder[j]].gameobject.setPosition(this.buttonPositions[j].x, this.buttonPositions[j].y);
            this.buttonTxts[this.cardOrder[j]].gameobject.setPosition(
                this.buttons[this.cardOrder[j]].gameobject.x,
                this.buttons[this.cardOrder[j]].gameobject.y);
        }
    }
}