import { BaseSceneController } from "../../../core";
import { SceneInfo } from "../../../info";
import VisualNovelSceneView from "./vn_view";
import GameplayData from "../gameplay_data";
import ResultController from "../explore/result/result_controller";
import AudioController from "../../../module/audio/audio_controller";
import { AudioAsset } from "../../../assetLibrary";

export default class VisualNovelSceneController extends BaseSceneController 
{
    constructor() {
        super({
            key: SceneInfo.VISUALNOVEL.key
        })
    }

    init = () => {
        console.log('vn created')
        this.view = new VisualNovelSceneView(this)
        this.audioController = AudioController.getInstance() 
        this.audioController.playBGM(AudioAsset.bgm_mission_complete.key)
    }

    preload = () => {
        this.view.create()

        window.addEventListener('message', ({data}) => {
            if(data === 'VN_FINISH') {
                GameplayData.baseScore = 100
                GameplayData.Score = 100
                this.view.onFinish()

                //create result
                this.resultController = new ResultController(this)
                this.resultController.init()
                this.resultController.create()
                
                //unlock next mission
                if(GameplayData.currentTopic[GameplayData.currentTopicId + 1]) {
                    GameplayData.currentTopic[GameplayData.currentTopicId + 1].is_unlocked = true
                }
            } else if(data === 'VN_CLOSE') {
                this.scene.start(SceneInfo.WORLDMAP.key, {
                    refresh: true
                });
            }

        }, {once: true})

    }

}