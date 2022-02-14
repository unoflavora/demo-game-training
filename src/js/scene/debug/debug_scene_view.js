import {BaseView} from '../../core'
import Text from '../../module/gameobjects/text';

/**
 * @typedef DebugInfo
 * @property {String} key
 * @property {String} text
 */
export default class DebugSceneView extends BaseView
{    
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene){
        super(scene);

        /**
         * @type {Array<DebugInfo>}
         */
        this.infoList = [];

        /**
         * @type {Array<string>}
         */
        this.logs = [];

    }

    create = () => {
        this.infoText = new Text(this.scene, 0,0, "", {fill: '#ffffff'})
        this.infoText.gameobject.setOrigin(0, 1);        

        this.logText = new Text(this.scene, 0,0, "", {fill: '#ffffff', align: "center", strokeThickness: 3, stroke:"#000000"})
        this.logText.gameobject.setOrigin(0.5, 0); 

        this.screenUtility.registerOnOrientationChange((orientation)=>{
            this.refresh();
        })
        this.refresh();
    }

    refresh = () =>{
        this.infoText.gameobject.setPosition(this.screenUtility.width * 0.02, this.screenUtility.height * 0.98);
        this.infoText.transform.setFontSize(35);

        this.logText.gameobject.setPosition(this.screenUtility.centerX, this.screenUtility.height * 0.1);
        this.logText.gameobject.setWordWrapWidth(this.screenUtility.width * 0.8);
        this.logText.transform.setFontSize(35);
    }

    /**
     * @param {string} key
     * @param {string} text
     */
    addInfo = (key, text) =>{
        /**
         * @type {DebugInfo}
         */
        let info = this.infoList.find((Element) => Element.key == key);

        if(info == undefined){
            info = {
                key: key,
                text: text
            }
            this.infoList.push(info);
        }else{
            info.text = text;
        }

        let newText = "";
        this.infoList.forEach(element => {
            newText += `\n\n${element.text}`;
        });
        this.infoText.gameobject.setText(newText);
    }

    /**
     * @param {string} log
     * @param {boolean} clearPrevious
     */
    debug = (log, clearPrevious = true) =>{
        if(clearPrevious){
            this.logs = [];
        }
        this.logs.push(log);

        let newText = "";
        this.logs.forEach(element => {
            newText += `\n${element}`;
        });

        this.logText.gameobject.setText(newText);
    }
}