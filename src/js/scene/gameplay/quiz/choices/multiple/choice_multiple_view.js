import ChoiceBaseView from '../choice_base_view.js';
import Image from '../../../../../module/gameobjects/image.js';
import Text from '../../../../../module/gameobjects/text.js';
import Button from '../../../../../module/gameobjects/button.js';
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

export default class ChoiceMultipleView extends ChoiceBaseView {
    /**
     * A traditional multiple choice kind of answer.
     * @param {Phaser.Scene} scene 
     * @param {import("../../../../../def/custom").Agate.Gameplay.Battle.QuestionData} questionData
     * @param {Function} onButtonPressed
     */
    constructor(scene, questionData = null, onButtonPressed = null) {
        super(scene, questionData);

        this.container = this.scene.add.container(0, 0);

        this.onButtonPressed = onButtonPressed;

        this.style = {
            fontSize: 20,
            fontFamily: FontAsset.cabin_bold.key,
            align: "left",
            wordWrap: {
                width: 600,
                useAdvancedWrap: true
            },
            color: '#42210B',
        }

        this.styleWhite = {
            fontSize: 20,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: 600,
                useAdvancedWrap: true
            },
        }
        //TODO: make it reusable for a session
    }

    /**
     * Create the question view
     * @param {boolean} hideQuestion Opts whether the question text should be hidden. Default `false`.
     * Consider setting this to `true` if it is used inside dialogue bacause the dialogue text window will act as the question box.
     * @param {onAnswerBool} onPressedAnswer
     * @public
     */
    create = (hideQuestion = false, onPressedAnswer = null) => {
        this.SetView(hideQuestion, onPressedAnswer);
        return this;
    }

    /**
     * Draw the question view
     * @param {boolean} hideQuestion Hides the question box. It is still being created but its visibility will be `false`
     * @param {OnAnswerNumber} onPressedAnswer
     * @private
     */
    SetView = (hideQuestion, onPressedAnswer) => {
        this.panel = new Image(this.scene, 0, 0, GameplayAsset.question_box.key);
        this.container.add(this.panel.gameobject);
        this.panel.gameobject.setPosition(this.screenUtility.width / 2, this.screenUtility.height * 0.6);
        this.panel.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.3,
            this.screenUtility.screenPercentage * 2.2
        );
        this.questionText = new Text(this.scene, 0, 0, this.questionData.question, this.style);
        this.container.add(this.questionText.gameobject);
        this.questionText.gameobject.setScale(this.screenUtility.screenPercentage * 1.5)
        this.questionText.gameobject.setPosition(
            this.panel.gameobject.x,
            this.panel.gameobject.y
        );
        if (hideQuestion) {
            this.panel.gameobject.setVisible(false);
            this.questionText.gameobject.setVisible(false);
        }

        for (let i = 0; i < this.questionData.answers.length; i++) {
            let idx = i;
            var tempButton = new Button(this.scene, 0, 0, GameplayAsset.multiple_choice_answer.key, 0);
            tempButton.gameobject.setScale(
                this.screenUtility.screenPercentage,
                this.screenUtility.screenPercentage
            );
            tempButton.transform.setDisplayWidth(this.screenUtility.width * 0.9);
            tempButton.transform.setDisplayHeight(tempButton.gameobject.displayHeight * 1.75);
            tempButton.gameobject.setPosition(
                this.panel.gameobject.x,
                this.panel.gameobject.y + tempButton.gameobject.displayHeight * (1.5 + i * 1)
            );
            tempButton.gameobject.on('pointerdown', () => {
                if (onPressedAnswer != null) {
                    onPressedAnswer(idx);
                }
                this.scene.time.delayedCall(10, this.onButtonPressed, [this.questionData.answervalues[idx]], this);
                this.container.setVisible(false);
                this.destroy();
            });
            var tempText = new Text(this.scene, 0, 0, this.questionData.answers[idx], {
                ...this.style,
                fontSize: 26 * this.screenUtility.screenPercentage,
                wordWrap: {
                    width: this.panel.transform.displayWidth * 0.9,
                    useAdvancedWrap: true
                }
            });
            tempText.gameobject.setPosition(
                tempButton.gameobject.x - tempButton.transform.displayWidth * 0.45,
                tempButton.gameobject.y
            );
            tempText.gameobject.setOrigin(0, 0.5);
            this.container.add(tempButton.gameobject);
            this.container.add(tempText.gameobject);
            tempButton.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
            tempText.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
        }
        if (gameplay_data.scene === SceneInfo.EXPLORE.key) {
            this.scene.cameras.main.ignore(this.container);
        }
    }
}