import GameplaySceneView from './gameplay_scene_view';
import { SceneInfo } from '../../info';
import { BaseSceneController } from '../../core';

export default class GameplaySceneController extends BaseSceneController
{    
    constructor(){
        super(
        {
            key: SceneInfo.GAMEPLAY.key
        });

    }

    init = () => {
        this.view = new GameplaySceneView(this);
        this.view.create();
    }

}