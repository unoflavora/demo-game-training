import { EventEmitter } from "events";
import { BaseView } from "../../../core";
var element;
export default class IframeView extends BaseView{
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene, bslLink) {
        super(scene)
        this.bslLink = bslLink;
        this.isClosed = false;

        /**
         * @public
         * @readonly
         * @type {EventEmitter}
         */
        this.event = new EventEmitter();

        /**
         * @public
         * @readonly
         * `onEnded` args = (right : Boolean)
         */
        this.eventname = {
            onEnded: "onEnded",
            onFinished: "onFinished"
        }
    }

    /**
     * Create the instance
     * @public
     */
    create = () => {
        this.SetView();
    }

    /**
     * Create the view
     * @private
     */
    SetView = () => {
        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        element = this.scene.add.dom(this.screenUtility.width / 2, this.screenUtility.height / 2).createFromCache('bslcontent');        
        document.getElementById('bsl-content').src = this.bslLink;
        document.getElementById('bsl-content').src += '';

        $('#close-bsl').on('click', function (e) {
            e.preventDefault();
        })
        element.setScale(this.screenUtility.screenPercentage);
        element.setOrigin(0.5);
        element.setPerspective(800);
        element.setVisible(true);
        element.addListener('click');
        element.on('click', function (event) {
            if (event.target.name == "closeButton") {
                element.removeListener('click');
                //element.setVisible(false);
                element.destroy();
                this.isClosed = true;
                this.event.emit(this.eventname.onEnded);
            }
        }, this);
        window.addEventListener("message", (event) => {
            element.removeListener('click');
            //element.setVisible(false);
            element.destroy();
            this.isClosed = true;
            this.event.emit(this.eventname.onFinished);
      });
    }

    /**
     * @param {import('../../../def/custom').Agate.Gameplay.Dialogue.ContentLineData} dialogueData
     * @param {Function} onNextPressed
     * @public
     */
    displayIframe = () => {
        element.setVisible(true);
    }


}