import ChoiceBaseView from '../choice_base_view.js';
import Image from '../../../../../module/gameobjects/image.js';
import Sprite from '../../../../../module/gameobjects/sprite.js';
import Text from '../../../../../module/gameobjects/text.js';
import Button from '../../../../../module/gameobjects/button.js';
import { FontAsset, GameplayAsset } from '../../../../../assetLibrary';

export default class ChoiceSliderView extends ChoiceBaseView
{
    /**
     * Choice view where the the player must arrange the answers before pressing submit buton
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
            wordWrap: { width: this.screenUtility.width * 0.8, useAdvancedWrap: true },
            color: '#42210B',
        }

        this.styleWhite = {
            fontSize: 20,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: { width: this.screenUtility.width * 0.8, useAdvancedWrap: true },
        }

        this.nodeObjects = [];
        /**
         * @type {Phaser.Math.Vector2[]}
         */
        this.nodeLocations = [];
        /**
         * @type {Phaser.Math.Vector2}
         */
        this.centerNodeLocation;

        /**
         * This offset is distance tolerance from any particular node for the cursor to be counted as pointing to that node.
         * @type {number}
         */
        this.slideOffset = 50;

        this.isswiping = false;

        this.currentCursorIndex = -1;
    }

    create = () =>
    {
        this.SetView();
        return this;
    }

    /**
     * Creates the view
     * @private
     */
    SetView = ()=>
    {
        this.panel = new Sprite(this.scene, 0, 0, GameplayAsset.checklist_arrange_panel.key);
        this.container.add(this.panel.gameobject);
        this.container.sendToBack(this.panel.gameobject);
        this.panel.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.3,
            this.screenUtility.screenPercentage * 1.4
        );
        this.panel.gameobject.setPosition(this.screenUtility.width/2, this.screenUtility.height * 0.65);

        this.questionBox = new Image(this.scene, 0, 0, GameplayAsset.ui_quiz_checklist_arrange_slider_question_box2.key);
        this.container.add(this.questionBox.gameobject);
        this.questionBox.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.2,
            this.screenUtility.screenPercentage * 2.2
        );
        this.questionBox.gameobject.setPosition(
            this.panel.gameobject.x, 
            this.panel.gameobject.y - this.panel.gameobject.displayHeight * 0.3);

        this.questionText = new Text(this.scene, 0,0, this.questionData.question, 
            {...this.style, fontSize: 26 * this.screenUtility.screenPercentage, wordWrap:{ width: this.panel.transform.displayWidth * 0.8, useAdvancedWrap: true }}
            );
        this.container.add(this.questionText.gameobject);
        this.questionText.gameobject.setPosition(
            this.questionBox.gameobject.x,
            this.questionBox.gameobject.y
        );

        this.answerBox = new Image(this.scene, 0, 0, GameplayAsset.slider_answer_box.key);
        this.container.add(this.questionBox.gameobject);
        this.answerBox.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.2,
            this.screenUtility.screenPercentage * 2.2
        );
        this.answerBox.gameobject.setPosition(
            this.panel.gameobject.x, 
            this.panel.gameobject.y - this.answerBox.gameobject.displayHeight * 0.2);

        this.answerText = new Text(this.scene, 0,0, '---', this.style);
        this.container.add(this.questionText.gameobject);
        this.answerText.gameobject.setScale(this.screenUtility.screenPercentage * 1.5);
        this.answerText.gameobject.setPosition(
            this.answerBox.gameobject.x,
            this.answerBox.gameobject.y
        );

        this.sliderBar = new Sprite(this.scene, 0,0,GameplayAsset.slider_bar.key);
        this.sliderBar.gameobject.setScale(
            this.screenUtility.screenPercentage * 2,
            this.screenUtility.screenPercentage * 3
        );
        this.sliderBar.gameobject.setPosition
        (
            this.panel.gameobject.x,
            this.panel.gameobject.y + this.answerBox.gameobject.displayHeight * 0.7
        )

        for (let i = 0; i < 5; i++)
        {
            var tempNode = new Sprite(this.scene,0,0,GameplayAsset.slider_node.key);
            tempNode.gameobject.setScale(
                this.screenUtility.screenPercentage * 2,
                this.screenUtility.screenPercentage * 2
            );
            tempNode.gameobject.setPosition(
                this.sliderBar.gameobject.x - this.sliderBar.gameobject.displayWidth + this.sliderBar.gameobject.displayWidth * ((2+i) * 0.25),
                this.sliderBar.gameobject.y
            )
            if(i == 2)
            {
                this.centerNodeLocation = new Phaser.Math.Vector2(
                    tempNode.gameobject.x,
                    tempNode.gameobject.y
                );
            }
            else
            {
                this.nodeLocations.push( new Phaser.Math.Vector2(
                    tempNode.gameobject.x,
                    tempNode.gameobject.y
                ));
            }
            this.nodeObjects.push(tempNode);
        }

        this.cursor = new Sprite(this.scene,0,0, GameplayAsset.slider_cursor.key);
        this.cursor.gameobject.setScale(
            this.screenUtility.screenPercentage * 2,
            this.screenUtility.screenPercentage * 2
        );
        this.cursor.gameobject.setPosition(
            this.centerNodeLocation.x,
            this.centerNodeLocation.y + this.cursor.gameobject.displayHeight * 0.5
        );

        //slider functions
        this.cursor.gameobject.setInteractive();
        this.scene.input.setDraggable(this.cursor.gameobject);
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
        });

        this.cursor.gameobject.on('pointerdown', () => 
        {
            this.isswiping = true;
        });
        this.scene.input.on('pointermove', () => 
        {
            if(this.isswiping)
            {
                if(this.cursor.gameobject.x < this.centerNodeLocation.x + this.slideOffset 
                    && this.cursor.gameobject.x > this.centerNodeLocation.x - this.slideOffset)
                {
                    this.updateSelection(-1);
                }
                //this may be a bad idea, but any working solution will do for now
                for (let i = 0; i < this.nodeLocations.length; i++)
                {
                    if(this.cursor.gameobject.x < this.nodeLocations[i].x + this.slideOffset 
                        && this.cursor.gameobject.x > this.nodeLocations[i].x - this.slideOffset)
                    {
                        this.updateSelection(i);
                    }
                }
                this.dragClamp = Phaser.Math.Clamp(this.cursor.gameobject.x, this.nodeLocations[0].x, this.nodeLocations[3].x);
                this.cursor.gameobject.setX(this.dragClamp);
            }
        });

        this.scene.input.on('pointerup', () => 
        {
            if(this.isswiping)
            {
                //check distance from the edge of the screen
                if(this.currentCursorIndex > -1)
                {
                    this.snapCursorToNode(this.currentCursorIndex);
                }
                else
                {
                    this.resetCursorPosition();
                }
                this.isswiping = false;
            }
            
        });

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
            if(this.currentCursorIndex < 0)
            {
                return;
            }
            this.scene.time.delayedCall(10, this.onButtonPressed,[this.questionData.answervalues[this.currentCursorIndex]] , this);
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

        this.container.add(this.panel.gameobject);
        this.container.add(this.questionBox.gameobject);
        this.container.add(this.questionText.gameobject);
        this.container.add(this.answerBox.gameobject);
        this.container.add(this.answerText.gameobject);
        this.container.add(this.sliderBar.gameobject);
        for (let i = 0; i < this.nodeObjects.length; i++)
        {
            this.container.add(this.nodeObjects[i].gameobject);
        }
        this.container.add(this.cursor.gameobject);
        this.container.add(this.submitButton.gameobject);
        this.container.add(this.submitTxt.gameobject);
    }

    /**
     * Updates the answer text every time the cursor reaches a node
     * @param {number} index
     * @private
     */
    updateSelection = (index) =>
    {
        this.currentCursorIndex = index;
        if(index > -1)
        {
            this.answerText.gameobject.setText(this.questionData.answers[index]);
        }
        else
        {
            this.answerText.gameobject.setText('---');
        }
        this.answerText.gameobject.setPosition(
            this.answerBox.gameobject.x,
            this.answerBox.gameobject.y
        );
    }

    /**
     * Snaps the cursor to nearest node.
     * @param {number} index
     * @private
     */
    snapCursorToNode = (index) =>
    {
        this.cursor.gameobject.setPosition(
            this.nodeLocations[index].x,
            this.nodeLocations[index].y + this.cursor.gameobject.displayHeight * 0.5
        );
    }

    /**
     * Resets the cursor position to center
     * @private
     */
    resetCursorPosition = () =>
    {
        this.cursor.gameobject.setPosition(
            this.centerNodeLocation.x,
            this.centerNodeLocation.y + this.cursor.gameobject.displayHeight * 0.5
        );
    }
}