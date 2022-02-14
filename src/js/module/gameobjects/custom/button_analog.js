import { GameplayAsset } from "../../../assetLibrary";
import Button from "../button";

class ButtonAnalog {
    /**@param {Phaser.Scene} scene*/
    constructor(scene){
        this.scene = scene;
        this.left = {
            isDown: false
        }
        this.right = {
            isDown: false
        }
        this.up = {
            isDown: false
        }
        this.down = {
            isDown: false
        }
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     */
    createAnalog = (x = 0,y = 0, width = 0, height = 0)=>{
        this.container  = this.scene.add.container(0,0);
        this.downBtn = new Button(this.scene, x, y, GameplayAsset.down_direction_button.key);
        this.downBtn.gameobject.setOrigin(0.5);
        this.downBtn.gameobject.setScrollFactor(0);
        this.downBtn.transform.setMaxPreferredDisplaySize(width * 0.125, height * 0.125);
        this.downBtn.gameobject.on('pointerdown',()=>{
            this.down.isDown = true;
        });
        this.downBtn.gameobject.on('pointerup',()=>{
            this.down.isDown = false;
        })
        this.downBtn.gameobject.on('pointerout',()=>{
            this.down.isDown = false;
        })

        this.upBtn = new Button(this.scene, this.downBtn.gameobject.x, this.downBtn.gameobject.y - this.downBtn.transform.displayHeight * 1.75, GameplayAsset.up_direction_button.key);
        this.upBtn.gameobject.setOrigin(0.5);
        this.upBtn.gameobject.setScrollFactor(0);
        this.upBtn.transform.setMaxPreferredDisplaySize(width * 0.125, height * 0.125);
        this.upBtn.gameobject.on('pointerdown',()=>{
            this.up.isDown = true;
        });
        this.upBtn.gameobject.on('pointerup',()=>{
            this.up.isDown = false;
        })
        this.upBtn.gameobject.on('pointerout',()=>{
            this.up.isDown = false;
        })

        this.rightBtn = new Button(this.scene, this.downBtn.gameobject.x + this.downBtn.transform.displayWidth * 1.25, this.downBtn.gameobject.y - this.downBtn.transform.displayHeight * 0.925, GameplayAsset.right_direction_button.key);
        this.rightBtn.gameobject.setOrigin(0.5);
        this.rightBtn.gameobject.setScrollFactor(0);
        this.rightBtn.transform.setMaxPreferredDisplaySize(width * 0.135, height * 0.135);
        this.rightBtn.gameobject.on('pointerdown',()=>{
            this.right.isDown = true;
        });
        this.rightBtn.gameobject.on('pointerup',()=>{
            this.right.isDown = false;
        })
        this.rightBtn.gameobject.on('pointerout',()=>{
            this.right.isDown = false;
        })

        this.leftBtn = new Button(this.scene, this.downBtn.gameobject.x - this.downBtn.transform.displayWidth * 1.25, this.downBtn.gameobject.y - this.downBtn.transform.displayHeight * 0.925, GameplayAsset.left_direction_button.key);
        this.leftBtn.gameobject.setOrigin(0.5);
        this.leftBtn.gameobject.setScrollFactor(0);
        this.leftBtn.transform.setMaxPreferredDisplaySize(width * 0.135, height * 0.135);
        this.leftBtn.gameobject.on('pointerdown',()=>{
            this.left.isDown = true;
        });
        this.leftBtn.gameobject.on('pointerup',()=>{
            this.left.isDown = false;
        });
        this.leftBtn.gameobject.on('pointerout',()=>{
            this.left.isDown = false;
        });

        this.container.add([this.upBtn.gameobject, this.downBtn.gameobject, this.leftBtn.gameobject, this.rightBtn.gameobject]);
    }

    setVisible = (visible)=>{
        this.container.setVisible(visible);
        if(!visible){
            this.left.isDown = false;
            this.right.isDown = false;
            this.up.isDown = false;
            this.down.isDown = false;
        }
    }
}

export {ButtonAnalog}