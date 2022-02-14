import TitleSceneView from "./title_scene_view";
import { SceneInfo } from "../../info";
import AudioController from "../../module/audio/audio_controller";
import { AudioAsset } from "../../assetLibrary";
import { BaseSceneController } from "../../core";
import pipwerks from 'pipwerks-scorm-api-wrapper'

export default class TitleSceneController extends BaseSceneController {
    constructor() {
        super({
            key: SceneInfo.TITLE.key
        });

        this.SCORM = pipwerks.SCORM
    }

    init = () => {
        this.audioController = AudioController.getInstance();
        this.SCORM.version = '2004'
        this.SCORM.init()
        var name = this.SCORM.get('cmi.core.student_name');

        this.view = new TitleSceneView(this);
        this.view.create();

        this.audioController.playBGM(AudioAsset.bgm_main_menu.key);       
    }

    create = () => {
        this.view.on(this.view.eventName.onPlayClick, ()=>{
            this.audioController.stopBGM();
            this.scene.start(SceneInfo.CHARCREATION.key)
        });
    }
}