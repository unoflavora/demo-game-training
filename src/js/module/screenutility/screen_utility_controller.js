import Phaser, {
    GameObjects
} from 'phaser'
import {
    LayerInfo
} from './layer_info'
import {
    EventEmitter
} from 'events'
import Device from 'phaser/src/device';

/**
 * @class
 * This class is a module to manage Screen Utility
 */
export default class ScreenUtilityController {
    constructor() {

        /**
         * @type {Phaser.Scene}
         * @private
         */
        this.scene;

        /**
         * @type {number}
         * @readonly
         * @default 1080
         */
        this.defaultWidth = 1080;

        /**
         * @type {number}
         * @readonly
         * @default 1920
         */
        this.defaultHeight = 1920;

        /**
         * @readonly
         */
        this.layer = LayerInfo;

        this.event = new EventEmitter();

        this.eventName = {
            onOrientationChange: 'onOrientationChange',

        }
        this.setDefaultScreenSize(1080, 1920);
        this.setScreenSize(window.innerWidth, window.innerHeight);
    }

    /** @type {ScreenUtilityController} */
    static instance;

    /** @returns {ScreenUtilityController} */
    static getInstance = () => {
        if (!ScreenUtilityController.instance) {
            ScreenUtilityController.instance = new ScreenUtilityController();
        }

        return ScreenUtilityController.instance;
    };

    /**
     * @param {Number} screenWidth 
     * @param {Number} screenHeight 
     * @return {ScreenUtility}
     */
    setScreenSize = (screenWidth, screenHeight) => {
        this.Width = screenWidth;
        this.Height = screenHeight;

        this.CenterX = this.Width * 0.5;
        this.CenterY = this.Height * 0.5;

        this.ScalePercentage = 1;
    }
    /**
     * Function to Initialize Screen Utility
     * @param {Phaser.Scene} scene 
     * @param {number} defaultWidth 
     * @param {number} defaultHeight 
     * @return {Promise}
     */
    init = (scene, defaultWidth = 1080, defaultHeight = 1920) => {
        return new Promise((resolve) => {
            this.scene = scene;
            this.setDefaultScreenSize(defaultWidth, defaultHeight);
            
            window.addEventListener("resize", ()=> {
                this.event.emit(this.eventName.onOrientationChange, this.orientation)
            }, false);



            resolve();

        });
    }

    /**
     * @public
     * @readonly
     * @return {number}
     */
    get width() {
        return this.scene.cameras.main.width;
    }

    /**
     * @public
     * @readonly
     * @return {number}
     */
    get height() {
        return this.scene.cameras.main.height;
    }

    /**
     * @public
     * @readonly
     * @return {number}
     */
    get ratio() {
        return this.width / this.height
    }


    /**
     * @public
     * @readonly
     * @return {number}
     */
    get centerX() {
        return this.width * 0.5
    }

    /**
     * @public
     * @readonly
     * @return {number}
     */
    get centerY() {
        return this.height * 0.5
    }

    /**
     * @public
     * @readonly
     * @return {number}
     */
    get left() {
        return this.scene.cameras.main.scrollX
    }

    /**
     * @public
     * @readonly
     * @return {number}
     */
    get right() {
        return this.width + this.scene.cameras.main.scrollX
    }

    /**
     * @public
     * @readonly
     * @return {boolean}
     */
    get isLandscape() {
        return window.innerWidth > window.innerHeight
    }

    /**
     * @public
     * @readonly
     * @return {Phaser.ScaleModes}
     */
    get orientation() {
        return this.isLandscape ? Phaser.Scale.LANDSCAPE : Phaser.Scale.PORTRAIT
    }

    /**
     * Screen Percentage is a value of actual screen display divided by default asset size
     * Actual screen display is taken from phaser camera width display
     * Default asset size is taken from init parameter, default to 1080
     * @public
     * @readonly
     * @return {number}
     */
    get screenPercentage() {
        return this.width / this.defaultWidth
    }

    /**
     * Function to set default reference for screen width and height
     * @param {number} defWidth 
     * @param {number} defHeight 
     */
    setDefaultScreenSize = (defWidth, defHeight) => {
        this.defaultWidth = defWidth;
        this.defaultHeight = defHeight;
    }

    /**
     * @param {Phaser.GameObjects.Graphics | Phaser.GameObjects.Text | Phaser.GameObjects.Sprite | Phaser.GameObjects.Image} gameobject
     * @param {String} layer
     * @param {Number} depth 
     */
    setLayerDepth = (gameobject, layer, depth = 0) => {
        let index = LayerInfo.Layers.findIndex(el => el == layer);
        if (index == undefined || index == -1) {
            console.log(`Unspecified layer = ${layer}`)
            return;
        }

        gameobject.setDepth((index * 10) + depth);

        if (layer == LayerInfo.UI) {
            gameobject.setScrollFactor(0);
        }
    }

    /**
     * @param {Function} events
     */
    waitUntilPotrait = (events) => {
        return new Promise((resolve, reject) => {
            if (this.orientation == Phaser.Scale.LANDSCAPE) {
                this.event.once(this.eventName.onOrientationChange, (orientation) => {
                    if (orientation == Phaser.Scale.PORTRAIT) {
                        this.saveCurrentSizeAsBestSize();
                        setTimeout(() => {

                            resolve();
                        }, (100));
                    }
                })
            } else {
                resolve();
            }
        }).then(() => events());
    }

    /**
     * @param {Function} events
     */
    registerOnOrientationChange = (events) => {
        this.event.on(this.eventName.onOrientationChange, events);
    }

    /**
     * @param {Function} events
     */
    removeOnOrientationChange = (events) => {
        this.event.removeListener(this.eventName.onOrientationChange, events);
    }

    ResetGameScreen = () => {
        window.focus();
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i) || Device.os.iOS || Device.os.iPhone)
        // if (!/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent))
        {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }
    }
}