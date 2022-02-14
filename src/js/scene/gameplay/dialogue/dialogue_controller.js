import DialogueView from './dialogue_view';
import EmoteView from './emote_view';
import QuizController from '../quiz/quiz_controller';
import { AudioAsset } from '../../../assetLibrary';
import global_cache from '../../../global_cache';
import { SceneInfo } from '../../../info';
import { BaseController } from '../../../core';

export default class DialogueController extends BaseController
{
    /**
     * Controls the flow of conversation with npc.
     * @param {Phaser.Scene} scene
     * @param {import('../../../def/custom').Agate.Gameplay.Dialogue.ConversationData} conversationData
     */
    constructor(scene, conversationData = null)
    {
        super()
        this.scene = scene;
        /**
         * @type {import('../../../def/custom').Agate.Gameplay.Dialogue.ConversationData}
         */
        this.conversationData = conversationData;
        /**
         * @type {import('../../../def/custom').Agate.Gameplay.Dialogue.ContentLineData[]}
         */
        this.DialogueData;
        /**
         * @type {number}
         */
        this.startId;

        if(this.conversationData != null)
        {
            this.startId = this.conversationData.startId;
            this.DialogueData = this.conversationData.contentList; //use this one if data is ready
        }
        else
        {
            this.DialogueData = //demo, temp
            [
                {
                    id : 0,
                    type : 'question',
                    talker: 'player',
                    messages: 'Bapak bisa menikmati suku bunga . . . % untuk Danamon Lebih dan TabunganMU dengan minimum saldo Rp. 500 Ribu, dan suku bunga 0,5% untuk saldo minimal Rp. 50 Juta',
                    questionType: 'multiple',
                    choices: ['A. Silakan masukkan 5 digit angka pilihan Bapak, lalu tekan tombol hijau hijau hijau hijau hijau hijau.', 'B. Silakan masukkan 6 digit angka pilihan Bapak, lalu tekan tombol hijau.', 'C. Silakan masukkan 7 digit angka pilihan Bapak, lalu tekan tombol hijau.'],
                    choiceValues: [0,1,0],
                    choiceIdNexts: [0,1,1]
                },
                {
                    id : 1,
                    type : 'message',
                    talker: 'narrator',
                    messages: 'Ini text narator Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...',
                    choiceIdNexts: [1]
                },
                {
                    id : 2,
                    type : 'message',
                    talker: 'player',
                    messages: 'Ini text player.',
                    choiceIdNexts: [2]
                },
                {
                    id : 3,
                    type : 'question',
                    talker: 'Mysterious Voice',
                    messages: 'swipe to 5000',
                    questionType: 'swipe',
                    choices: ['1000', '5000'],
                    choiceValues: [0,1],
                    choiceIdNexts: [2,4]
                },
                {
                    id : 4,
                    type : 'message',
                    talker: 'Mysterious Voice',
                    messages: 'Ini text npc-end.',
                    emote: 'netral',
                    choiceIdNexts: [-1]
                },
            ];
        }
        
        /**
         * @type {import('../../../def/custom').Agate.Gameplay.Battle.QuestionData}
         */
        this.tempQuestionData = {
            question: '',
            answers: this.DialogueData[0].choices,
            answervalues: this.DialogueData[0].choiceValues,
            type: this.DialogueData[0].questionType
        };
        if(conversationData != null)
            this.init(conversationData.startEmote);
        else
            this.init();
    }

    /**
     * @private
     * @param {number} startingSatisfaction
     * @param {number} gameOverNode
     */
    init = (startingSatisfaction = 4, gameOverNode = -1) =>
    {
         /**
         * @type {number}
         */
        if(this.conversationData != null)
        {
            this.startId = this.conversationData.startId;
        }
        else
        {
            this.startId = 0;
        }
        this.currentNode = this.startId;
        /**
         * @type {number}
         */
        this.nextSelectedId = -1;
        
        this.gameOverNode = gameOverNode;
        this.QuizController = new QuizController(this.scene);
        this.emoteState = false;
        if(startingSatisfaction >= 0 ){
            this.emoteState = true;
            this.satisfaction = startingSatisfaction;
            this.emoteView = new EmoteView(this.scene).create(Math.floor(this.satisfaction / 2));        
        }
        console.log('dialog data', this.DialogueData)

        this.loadNextLine(this.startId);

        this.sfxCorrect = this.scene.scene.scene.sound.add(AudioAsset.sfx_jawaban_benar.key, {volume: 0.7, loop: false});
        this.sfxWrong = this.scene.scene.scene.sound.add(AudioAsset.sfx_jawaban_salah.key, {volume: 0.7, loop: false});

    }

    /**
     * Loads the next line from data with matching id.
     * @param {number} number The line id inside the data
     * @private
     */
    loadNextLine = (number) =>
    {
        this.currentNode = number;
        if(number > -1)
        {
            this.view  = new DialogueView(this.scene).create(); //probably not a good idea
            this.view.displayDialogue(this.DialogueData[number], this.loadNextLine);
            if(this.DialogueData[number].type.toLowerCase() == 'question')
            {
                /**
                 * @type {import('../../../def/custom').Agate.Gameplay.Battle.QuestionData}
                 */
                this.tempQuestionData = {
                    question: '',
                    answers: this.DialogueData[number].choices,
                    answervalues: this.DialogueData[number].choiceValues,
                    type: this.DialogueData[number].questionType
                };

                console.log('questiondata', this.tempQuestionData)

                this.QuizController.createQuestion(this.tempQuestionData, this.evaluateAnswer, true, this.saveReturnedNextId);
            }
        }
        else
        {
            // console.log('Dialogue ENDED.');
            if(this.satisfaction >= 100) //temp, should be 5 or something
            {
                // console.log('Bonus dialogue activated.');
                this.satisfaction = 0;
                this.loadNextLine(100); //temp, should be afterSatisfied
            }
            else
            {
                // console.log("end dialog here");
                if(this.emoteState){
                    this.emoteView.destroyEmoteView();
                }

                this.onDialogSuccess(this.satisfaction);
                this.satisfaction = 0;
                
            }
        }
    }

    /**
     * @param {Phaser.Math.Vector2} emotePos
     * @public
     */
    registerShowEmotePos = (emotePos) =>{
        this.emoteView.showEmote(emotePos.x, emotePos.y);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @public
     */
    setEmotePostion = (x, y) =>{
        if(this.emoteView){
            this.emoteView.setEmotePosition(x, y);
        }
    }

    /**
     * Register onDialogSuccess callback
     * @param  {function (number)} onDialogSuccess
     * @public
     */
    registerDialogEndSuccess = (onDialogSuccess) =>{
        this.onDialogSuccess = onDialogSuccess;
    }

    /**
     * Callback for dialog success
     * @param {number} satisfaction
     * @private
     */
    onDialogSuccess = (satisfaction)=>{

    };

    /**
     * Ends the dialogue.
     * @param {boolean} isAngry If `true`, player is booted back to mission scene. Default `false`
     * @public
     */
    endDialogue = (isAngry = false) =>{
        if(isAngry)
        {
            this.view.gameOver(()=>
            {
                this.timer = this.scene.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        if(global_cache.CURRENT_PLAYING_BGM != null)
                            global_cache.CURRENT_PLAYING_BGM.stop();
                        this.scene.scene.start(SceneInfo.WORLDMAP.key);
                    }
                });
            })
        }
        else
        {
            if(this.emoteState){
                this.emoteView.destroyEmoteView();
            }
            this.view.triggerNextButton(this.gameOverNode);
        }
    }

    /**
     * Evaluates the answer (boolean)
     * @param {boolean} result
     * @private
     */
    evaluateAnswer = (result) =>
    {
        console.log('evaluate answer', result)
        if(result)
        {
            this.sfxCorrect.play();
        }
        else
        {
            this.sfxWrong.play();
        }

        this.view.showIndicator(result, ()=>
        {
            if(result)
            {
                if (this.satisfaction < 8)
                {
                    this.satisfaction++;
                }
                // console.log('correct');
            }
            else
            {
                if (this.satisfaction > 0)
                {
                    this.satisfaction--;
                }
                // console.log('incorrect');
            }

            switch(this.satisfaction)
            {
                case 1:
                    this.emoteView.changeEmote(0);
                    break;
                case 2:
                    this.emoteView.changeEmote(0);
                    break;
                case 3:
                    this.emoteView.changeEmote(1);
                    break;
                case 4:
                    this.emoteView.changeEmote(2);
                    break;
                case 5:
                    this.emoteView.changeEmote(2);
                    break;
                case 6:
                    this.emoteView.changeEmote(3);
                    break;
                case 7:
                    this.emoteView.changeEmote(3);
                    break;
                case 8:
                    this.emoteView.changeEmote(4);
                    break;
                default:
                    this.emoteView.changeEmote(0);
                    break;
            }

            this.emoteView.showEmote();

            if(this.satisfaction == 0)
            {
                this.endDialogue(true);
            }
            else
            {
                this.view.triggerNextButton(this.nextSelectedId);
            }
        });
    }

    /**
     * @param {number} id
     * @private
     */
    saveReturnedNextId = (id) =>
    {
        // console.log('returned next line id index: ' + id)
        // console.log('next line id: ' + this.DialogueData[this.currentNode].choiceIdNexts[id])
        this.nextSelectedId = id;
    }
}