import DebugSceneView from './debug_scene_view';
import packageData from '../../../../package.json'
import { SceneInfo } from '../../info';
import { BaseSceneController } from '../../core';

export default class DebugSceneController extends BaseSceneController
{    
    constructor(){
        super(
        {
            key: SceneInfo.DEBUG.key
        });

        DebugSceneController.instance = this;
    }

        
    /** @type {DebugSceneController} */
    static instance;

    /** @returns {DebugSceneController} */
    static getInstance = () => {
        return DebugSceneController.instance;
    };

    init = () => {  
        this.view = new DebugSceneView(this);
        this.view.create(packageData.version);

        this.view.addInfo('game_name', `${packageData.name}`)
        this.view.addInfo('version', `version: ${packageData.version}`)
        this.view.addInfo('backendDisabled', `backend_disabled: ${CONFIG.DEVELOPMENT_BUILD}`)
    }

    /**
     * @param {string} message
     * @param {boolean} clearPreviousMessage
     */
    debug = (message, clearPreviousMessage = true) =>{
        this.view.debug(message, clearPreviousMessage);
    }

}