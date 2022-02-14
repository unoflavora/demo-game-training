import { BaseView } from "../../../core";

export default class VisualNovelSceneView extends BaseView 
{
    constructor(scene) {
        super(scene);
    }

    create = () => {
        const { centerX, centerY, width, height} = this.screenUtility
        this.element = this.scene.add.dom(centerX, centerY).createFromCache('bslcontent')
        
        // this.element.setOrigin(0,0)        
        this.element.displayHeight = height
        this.element.displayWidth = width
        console.log(height, width)
        console.log(this.scene.scale)
        
        this.element.setScale(this.scene.scale.displayScale.x, this.scene.scale.displayScale.y)    
    }

    onFinish = () => {
        this.element.destroy()
        // this.cameras.main.ignore(this.resultController.view.hudContainer);

    }
    
}