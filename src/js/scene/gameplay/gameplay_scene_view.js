import { BaseView } from '../../core';
import Image from '../../module/gameobjects/image';

export default class GameplaySceneView extends BaseView
{    
    constructor(scene){
        super(scene);

    }

    create = () => {
        this.setLayerDepth(this, this.layer.UI, 0);
        
    }

}