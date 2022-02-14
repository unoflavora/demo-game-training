import ChoiceBaseView from '../choice_base_view.js';
import Image from '../../../../../module/gameobjects/image.js';
import Sprite from '../../../../../module/gameobjects/sprite.js';
import Text from '../../../../../module/gameobjects/text.js';
import Button from '../../../../../module/gameobjects/button.js';
import { FontAsset, GameplayAsset } from '../../../../../assetLibrary';

export default class ChoiceChecklistView extends ChoiceBaseView
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
         * @type {number[]}
         */
        this.currentAnswers = [0,0,0,0];

        /**
         * @type {Button[]}
         */
        this.buttons = [];
        /**
         * @type {Sprite[]}
         */
        this.checklists = [];
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
        this.panel.gameobject.setPosition(this.screenUtility.width/2, this.screenUtility.height * 0.7);
        this.panel.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.3,
            this.screenUtility.screenPercentage * 1.55
        );

        this.questionBox = new Image(this.scene, 0, 0, GameplayAsset.ui_quiz_checklist_arrange_slider_question_box2.key);
        this.container.add(this.questionBox.gameobject);
        this.questionBox.gameobject.setPosition(
            this.panel.gameobject.x, 
            this.panel.gameobject.y - this.panel.gameobject.displayHeight * 0.34);
        this.questionBox.gameobject.setScale(
            this.screenUtility.screenPercentage * 2.2,
            this.screenUtility.screenPercentage * 2.2
        );

        this.questionText = new Text(
            this.scene, 0,0, this.questionData.question,
            {...this.style, wordWrap:{ width: this.panel.transform.displayWidth * 0.8, useAdvancedWrap: true }}
            );
        this.container.add(this.questionText.gameobject);
        this.questionText.gameobject.setPosition(
            this.questionBox.gameobject.x ,
            this.questionBox.gameobject.y
        );
        //used for rescale text to had some value of size
        let allowRescale = false;
        var tempTextArr = [];
        var tempButtonArr = [];
        let tempFontSize = 20;
        let tempScale = 1;
        let tempPos = null;
        let dummyWidth = 0;
        for(let i = 0; i < this.questionData.answers.length; i++)
        {
            let idx = i;
            var tempButton = new Button(this.scene,0,0,GameplayAsset.checklist_box.key,0);
            tempButton.gameobject.setScale(this.screenUtility.screenPercentage * 2,
                 this.screenUtility.screenPercentage * 2);
            tempButton.gameobject.setPosition(
                this.panel.gameobject.x - this.panel.gameobject.displayWidth * 0.4,
                this.questionBox.gameobject.y + tempButton.gameobject.displayHeight * (1.4 + i * 1.25)
            );
            tempButton.gameobject.on('pointerdown', () => { 
                this.changeButtonState(idx);
            });
            this.buttons.push(tempButton);

            var tempChk = new Sprite(this.scene, 0,0, GameplayAsset.checklist_box.key, 1);
            tempChk.gameobject.setScale(this.screenUtility.screenPercentage * 2,
                this.screenUtility.screenPercentage * 2);
            tempChk.gameobject.setPosition(
                tempButton.gameobject.x,
                tempButton.gameobject.y
            );
            tempChk.gameobject.setVisible(false);
            this.checklists.push(tempChk);
            
            var dummyText = new Text(this.scene, 0,0, "testing",this.style);
            dummyText.gameobject.setVisible(false);
            dummyWidth = dummyText.transform.displayWidth;
            
            var tempText = new Text(this.scene, 0,0, this.questionData.answers[idx],
                {...this.style, align:"left", wordWrap:{ width: this.panel.transform.displayWidth * 0.8, useAdvancedWrap: true }}
                );
            tempText.gameobject.setOrigin(0,0.5);
            tempText.gameobject.setPosition(
                tempButton.gameobject.x + tempButton.gameobject.displayWidth * 1.5, 
                tempButton.gameobject.y + tempText.gameobject.displayHeight * 0.5
                );
            tempTextArr.push(tempText);
            if (tempText.transform.displayHeight > dummyText.transform.displayHeight* 2){
                allowRescale = true;
                tempFontSize = 22 * this.screenUtility.screenPercentage;
                tempPos = {x:tempText.gameobject.x, y: tempText.gameobject.y + tempText.transform.displayHeight * 0.5};
            }
            
            this.container.add(tempButton.gameobject);
            this.container.add(tempText.gameobject);
            this.container.add(tempChk.gameobject);
            this.container.bringToTop(tempChk);

            if(i < this.questionData.answers.length -1)
            {
                var separator = new Sprite(this.scene, 0,0, GameplayAsset.slider_bar.key);
                separator.gameobject.setScale(this.screenUtility.screenPercentage * 2.25,
                    this.screenUtility.screenPercentage * 2);
                separator.gameobject.setPosition(
                    this.panel.gameobject.x,
                    tempButton.gameobject.y + tempButton.gameobject.displayHeight * 0.75
                );
                this.container.add(separator.gameobject);
            }
        }

        if (allowRescale){
            tempTextArr.forEach((element, index) => {
                element.gameobject.setFontSize(tempFontSize);
                element.gameobject.setPosition(this.buttons[index].gameobject.x + this.buttons[index].transform.displayWidth * 0.5, this.buttons[index].gameobject.y + element.transform.displayHeight * 0.1);
            });
        }else{
            tempTextArr.forEach((element, index) => {
                element.gameobject.setPosition(this.buttons[index].gameobject.x + this.buttons[index].transform.displayWidth * 0.5, this.buttons[index].gameobject.y + element.transform.displayHeight * 0.1);
            });
        }

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
            // console.log('submitting: ' + this.currentAnswers);
            this.scene.time.delayedCall(10, this.onButtonPressed,[this.currentAnswers] , this);
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
     * Change the state of an answer whether it is checked or not
     * @param {number} id
     * @private
     */
    changeButtonState = (id) =>
    {
        if(id < this.buttons.length)
        {
            if(this.currentAnswers[id] == 0)
            {
                this.currentAnswers[id] = 1;
                this.checklists[id].gameobject.setVisible(true);
            }
            else
            {
                this.currentAnswers[id] = 0;
                this.checklists[id].gameobject.setVisible(false);
            }
        }
    }
}