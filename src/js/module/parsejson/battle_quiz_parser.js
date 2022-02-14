import QuizParser from './quiz_parser';
import { QuestionHelper } from '../../helper';
import GameplayData from '../../scene/gameplay/gameplay_data';

/**
 * @typedef {import('../../def/custom').Agate.Gameplay.QuizData} QuizData
 */

/**
 * @typedef {Object} Data
 * @property {QuizData} data
 * @property {string} type
 */

export default class BattleQuizParser {
    constructor(scene) {
        this.scene = scene;
        this.quizParser = new QuizParser(this.scene);
    }

    /**
     * Function to Parse Data from Quiz to Json into specific of object
     * @public
     * @param {string} text fill with data from csv that was loaded as string
     * @return {object} object = {question,answers,answervalues,type,grade}
     */
    ConvertToBattleQuiz = (categoryMission) => {
        console.log(categoryMission)
        /**
         * @type {Array<Data>} data
         */
        let data = [];

        QuestionHelper.GetQuestionText(this.scene, GameplayData.NextMap.cluster).forEach(element =>{
            console.log(element)
            data.push({
                data: this.quizParser.ConvertQuizToJson(element.data),
                type: element.choice
            });
        });

        let tempData = [];
        data.forEach(content_quiz => {
            content_quiz.data.content_quiz.contents.forEach((contents, index) => {
                if(contents.category === categoryMission && (content_quiz.type.trim().toLowerCase() != "multiple_picture")){
                    contents.grade_questions.forEach(grade_questions => {
                        grade_questions.questions.forEach(question => {
                            let tempArrAns = [];
                            question.answers.forEach((answers, index) => {
                                let tempAns = "";
                                if(content_quiz.type.trim().toLowerCase() === 'multiple'){
                                    tempAns = answers
                                    var str = String.fromCharCode(65 + index);
                                    tempAns = str + ". " + answers;
                                    tempArrAns.push(tempAns);
                                }else{
                                    tempArrAns.push(answers);
                                }
                                tempData.push({
                                    question: question.question,
                                    answers: tempArrAns,
                                    answervalues: question.values,
                                    type: content_quiz.type,
                                    grade: grade_questions.grade
                                });
                            })
                        })
                    });
                }
            });
        });

        console.log('questions...')
        console.log(tempData)
        return tempData;
    }
}