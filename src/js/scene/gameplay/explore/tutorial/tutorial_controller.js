import TutorialView from './tutorial_view';

export default class TutorialController{

    /**@type {string[]} */
    imageAssetKeys = [];

    /**@type {number} */
    tutorialIdx = 0;

    /**@type {function} */
    onCompleteObservable;

    constructor(scene){
        this.scene = scene;
        
        
    }

    create = () =>{
        this.view = new TutorialView(this.scene);
        this.view.create(this.mainClickEvent);
    }

    mainClickEvent = ()=>{
        const complete = ()=>{
            this.view.setVisible(false);

            if(this.onCompleteObservable)
                this.onCompleteObservable();
        }

        if(this.imageAssetKeys.length > 0){
            if(this.tutorialIdx < this.imageAssetKeys.length - 1){
                this.tutorialIdx += 1;
                this.view.setTutorialImage(this.imageAssetKeys[this.tutorialIdx]);
            }else{
                complete();
            }
        }else{
            complete();
        }
    }

    registerTutorialButtonEvent = (isFocusEventTrue = null, isFocusEventFalse = null) =>{
        isFocusEventTrue();
        this.view.registerTutorialButtonEvent(() => {
            if (this.view.tutorialSpriteArr[this.tutorialViewedIndex] != null || this.view.tutorialSpriteArr[this.tutorialViewedIndex] != undefined){
                this.view.tutorialSpriteArr[this.tutorialViewedIndex].setVisible(true);
                this.tutorialViewedIndex += 1;
            }else{
                this.view.disableTutorial();
                this.view.bg.gameobject.setVisible(false);
                isFocusEventFalse();
            }
        });
    }

    /**
     * 
     * @param {string[]} imageAssetKeys 
     */
    setImageAssetKeys = (imageAssetKeys)=>{
        this.imageAssetKeys = imageAssetKeys;
    }
    
    /**
     * 
     * @param {string[]} imageAssetKeys 
     * @param {function} onComplete 
     */
    activeTutorialView = (imageAssetKeys = [], onComplete = ()=>{}) =>{
        if(imageAssetKeys.length > 0){
            this.reset();
            this.setImageAssetKeys(imageAssetKeys)
            this.onCompleteObservable = onComplete;

            this.view.setTutorialImage(imageAssetKeys[this.tutorialIdx]);
            this.view.setVisible(true);
        }else{
            onComplete();
        }
    }

    reset = ()=>{
        this.tutorialIdx = 0;
    }
}
