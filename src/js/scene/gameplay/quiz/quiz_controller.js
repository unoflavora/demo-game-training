import ChoiceMultipleView from './choices/multiple/choice_multiple_view.js';
import ChoiceArrangeView from './choices/arrange/choice_arrange_view.js';
import ChoiceChecklistView from './choices/checklist/choice_checklist_view.js';
import ChoiceSwipeView from './choices/swipe/choice_swipe_view.js';
import ChoiceSliderView from './choices/slider/choice_slider_view.js';
import { ChoiceInfo  } from "../../../info";

/**
 * @callback onAnswerBool
 * @param {boolean} answer
 */

/**
 * @callback OnAnswerNumber
 * @param {number} answer
 */
export default class QuizController
{
    /**
     * @param {Phaser.Scene} scene 
     * @param {import("../../../def/custom").Agate.Gameplay.Battle.QuizData} quizData 
     */
    constructor(scene, quizData = null)
    {
        this.scene = scene;

        /**
         * @type {import("../../../def/custom").Agate.Gameplay.Battle.QuizData}
         */
        this.quizData = quizData;

        /**
         * @type {import("../../../def/custom").Agate.Gameplay.Battle.QuestionData}
         */
        this.currentQuestion = null;

        /**
         * Callback upon answering a question, it passes the result whether the answer is correct or not.
         * @type {onAnswerBool}
         */
        this.onAnswer = null;

        this.isInsideDialogue = false;

        //Placeholder quiz data
        if(this.quizData == null)
        {
            this.quizData = {
                weight: 3,
                attack: 40,
                heal: 32,
                enemyAttack: 100,
                questions: [
                    {
                        question : 'Pick the correct answer.',
                        answers: ['This one is correct','This one is wrong','Pick answer one, thanks.','Don\'t bother to pick this answer'],
                        answervalues: [1,0,0,0],
                        type: ChoiceInfo.type.MULTIPLE
                    },
                    {
                        question : 'Every answer other than the first one is correct.',
                        answers: ['this answer is wrong','this one is correct, as the question states.','please do check this one as well, thanks','you\'ll regret it if you ignore this one. kind of.'],
                        answervalues: [0,1,1,1],
                        type: ChoiceInfo.type.CHECKLIST
                    },
                    {
                        question : 'please arrange these numbers ascending',
                        answers: ['1','0','2', '3'],
                        answervalues: [1,0,2,3],
                        type: ChoiceInfo.type.ARRANGE
                    },
                    {
                        question : 'The answer is 100.',
                        answers: ['50','100','150','200'],
                        answervalues: [0,1,0,0],
                        type: ChoiceInfo.type.SLIDER
                    },
                    {
                        question : 'Please swipe to the right.',
                        answers: ['Left','Right'],
                        answervalues: [0,1],
                        type: ChoiceInfo.type.SWIPE
                    }
                ]
            }
        }
    }

    /**
     * Create a question view using 'questionData', passed from outside of this class.
     * @param {import("../../../def/custom").Agate.Gameplay.Battle.QuestionData} questionData
     * If left `null`, question will be made using quiz data specified inside constructor (if any)
     * @param {onAnswerBool} onAnswer
     * @param {boolean} isInsideDialogue 
     * If `true`, changes how multiple choice and swipe question appearances. 
     * Multiple choice will not show a question box and text (will be shown inside the dialogue text), 
     * and swipe question layout will be changed to match dialogue layout. Default `false`.
     * @param {OnAnswerNumber} onPressedAnswer
     * @public
     */
    createQuestion = (questionData = null, onAnswer = null, isInsideDialogue = false, onPressedAnswer = null) =>
    {
        this.isInsideDialogue = isInsideDialogue;
        this.onPressedAnswer = onPressedAnswer;
        if(onAnswer != null)
        {
            this.onAnswer = onAnswer;
        }
        this.createQuestionView(questionData);
    }

    /**
     * Pick a random question from existing quiz data
     * @param {import("../../../def/custom").Agate.Gameplay.Battle.QuizResult} onAnswer
     * @public
     */
    pickRandomQuestion = (onAnswer = null) =>
    {
        if(onAnswer != null)
        {
            this.onAnswer = onAnswer;
        }
        let questionIndex = Phaser.Math.Between(0, this.quizData.questions.length-1);
        this.currentQuestion = this.quizData.questions[questionIndex];
        this.createQuestionView(this.currentQuestion);
    }

    //TODO: make the views reusable, at least for that battle/dialogue session
    /**
     * Create quiz view based on `type` inside `questionData`
     * @param {import("../../../def/custom").Agate.Gameplay.Battle.QuestionData} questionData
     * @private
     */
    createQuestionView = (questionData) =>
    {
        // console.log("required answer ", questionData.answervalues);
        
        if (questionData.type == ChoiceInfo.type.MULTIPLE)
        {
            this.view = new ChoiceMultipleView(this.scene, questionData, this.processAnswerBoolean).create(this.isInsideDialogue,this.onPressedAnswer);
        }
        if (questionData.type == ChoiceInfo.type.ARRANGE)
        {
            this.view = new ChoiceArrangeView(this.scene, questionData, this.processAnswerMultiValuesArrange).create();
        }
        if (questionData.type == ChoiceInfo.type.CHECKLIST)
        {
            this.view = new ChoiceChecklistView(this.scene, questionData, this.processAnswerMultiValues).create();
        }
        if (questionData.type == ChoiceInfo.type.SWIPE)
        {
            this.view = new ChoiceSwipeView(this.scene, questionData, this.processAnswerBoolean).create(questionData.answervalues, this.isInsideDialogue,this.onPressedAnswer);
        }
        if (questionData.type == ChoiceInfo.type.SLIDER)
        {
            this.view = new ChoiceSliderView(this.scene, questionData, this.processAnswerBoolean).create();
        }
    }

    /**
     * Answer checking for multiple, slider, and swipe
     * @param {number} answerValue values either `0` or `1`
     * @private
     */
    processAnswerBoolean = (answerValue) =>
    {
        this.onAnswer(answerValue == 1);
    }

    /**
     * Answer checking for checklist
     * @param {number[]} answerValues
     * @private
     */
    processAnswerMultiValues = (answerValues) =>
    {
        for(let i = 0; i < this.currentQuestion.answervalues.length; i++)
        {
            if(this.currentQuestion.answervalues[i] != answerValues[i])
            {
                this.onAnswer(false);
                return;
            }
        }
        this.onAnswer(true);
    }

    /**
     * Answer checking for arrange
     * @param {number[]} answerValues
     * @private
     */
    processAnswerMultiValuesArrange = (answerValues) =>
    {
        for(let i = 0; i < this.currentQuestion.answervalues.length; i++)
        {
            if(answerValues[i] != i)
            {
                this.onAnswer(false);
                return;
            }
        }
        this.onAnswer(true);
    }

    /**
     * Callback for dialogue version of the questions
     * @param {number[]} value
     * @private
     */
    onPressedAnswer = (value) =>
    {

    }
}