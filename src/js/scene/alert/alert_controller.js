import { BaseController } from "../../core";
import AlertView from "./alert_view";

export default class AlertController extends BaseController {
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super()
        this.scene = scene

    }

    init = () => {
        this.view = new AlertView(this.scene);
        this.view.init();
        this.create();

    }

    create = () => {

        this.view.create();
        this.view.registerButtonRetryEvent(() => {

        });
    }
    setAlertText=(text)=>{
        this.view.setAlertText(text);
    }
    setDefaultText = () =>{
        this.view.setDefaultText();
    }
    _toggleAlert = (show, onStart = null)=>{
        this.view.showAlert(show, onStart);
    }
    _hideAlert = () => {
        this.view.hideAlert();
    }
}