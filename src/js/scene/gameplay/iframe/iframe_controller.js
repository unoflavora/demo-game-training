import { BaseController } from '../../../core';
import IframeView from './iframe_view';

export default class IframeController {
    /**
     * Controls the flow of conversation with npc.
     * @param {Phaser.Scene} scene
     * @param {import('../../../def/custom').Agate.Gameplay.Dialogue.ContentLineData} conversationData
     */
    constructor(scene, bslLink = null) {
        this.scene = scene
        /**
         * @type {string}
         */
        this.bslLink = bslLink;
        this.isFinished = false;

        if (this.bslLink == null) {
            this.bslLink = "google.com";
        }
        this.init();
    }

    /**
     * @private
     */
    init = () => {
        this.view = new IframeView(this.scene, this.bslLink);
        this.view.create();
        this.view.event.on(this.view.eventname.onEnded,() =>{
            this.onLessonClose(100);
            this.isFinished = true;
        });
    }

    /**
     * Register onDialogSuccess callback
     * @param  {function (number)} onDialogSuccess
     * @public
     */
    registerOnLessonClose = (satisfactionCount) => {
        this.onLessonClose = satisfactionCount;
    }

    /**
     * Register onLessonFinished callback
     * @param  {function} onLessonFinished
     * @public
     */
    registerOnLessonFinished = (callback) => {
        this.view.event.on(this.view.eventname.onFinished, callback)
    }

    /**
     * Callback for dialog success
     * @param {bool} lessonState
     * @private
     */
    onLessonClose = (lessonState) => {
        return this.view.isClosed;
    };
}