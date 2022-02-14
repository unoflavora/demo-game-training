import { SceneInfo } from "../../info";
import ScreenUtilityController from "../../module/screenutility/screen_utility_controller";
import ScheduleController from "../../module/schedule/schedule_controller";
import AudioController from "../../module/audio/audio_controller";
import { FontAsset} from "../../assetLibrary";
import { LoaderHelper } from "../../helper";
import RequestController from "../../module/request/request_controller";
import { BaseSceneController } from "../../core";

export default class BootSceneController extends BaseSceneController
{    
    constructor() {
        super(
        {
            key: SceneInfo.BOOT.key
        });
        ScreenUtilityController.getInstance().init(this)
    }

    create = () => {    
        if(CONFIG.DEBUG_VIEW){
            this.scene.launch(SceneInfo.DEBUG);
        }

        Promise.all
        ([
            
            ScheduleController.getInstance().init(this),
            AudioController.getInstance().init(this, CONFIG.AUDIO_ACTIVE),
            RequestController.getInstance().init(),
            LoaderHelper.loadFonts(FontAsset),
        ])
        .then(() =>
        {
            this.scene.launch('LoadingScene');
        })
        .catch((err) =>
        {
            
        });
    }

    update = () => {
        ScheduleController.getInstance().update();
    }
}