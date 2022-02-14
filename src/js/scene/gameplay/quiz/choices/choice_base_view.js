import { BaseView } from "../../../../core";

export default class ChoiceBaseView extends BaseView
{
    /**
     * @param {Phaser.Scene} scene 
     * @param {import("../../../../def/custom").Agate.Gameplay.Battle.QuestionData} questionData
     */
    constructor(scene, questionData = null)
    {
        super(scene);
        
        this.questionData = questionData;
    }

    create = () =>
    {
        this.SetView();
        return this;
    }

    SetView = ()=>
    {

    }
}