import { AudioAsset, FontAsset, GameplayAsset } from "../../../assetLibrary"
import Button from "../button";
import Text from "../text";

class GreenButton extends Button {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Number} x 
     * @param {Number} y 
     * @param {string} text 
     */
    constructor(scene, x, y, text){
        super(scene, x, y, GameplayAsset.submit_button.key, 0, AudioAsset.sfx_button_main_menu.key);

        this.text = new Text(scene, this.gameobject.x, this.gameobject.y, text, {
			align: "center", fontFamily: FontAsset.cabin_bold.key, fontSize: "35px", color: '#42210B' });
        this.text.gameobject.setOrigin(0.5);
		this.text.transform.setMaxPreferredDisplaySize(this.transform.displayWidth * 0.5, this.transform.displayHeight * 0.7);
        this.text.gameobject.setScrollFactor(0);
        this.container.add(this.text.gameobject);

        this.gameobject.setScrollFactor(0);

        this.setPressedTexture(GameplayAsset.submit_button.key, 2);
    }

}

export {GreenButton}