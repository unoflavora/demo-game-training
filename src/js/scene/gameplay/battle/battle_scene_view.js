import {BaseView} from '../../../core'
import Image from '../../../module/gameobjects/image.js';
import Text from '../../../module/gameobjects/text.js';
import { FontAsset, GameplayAsset } from '../../../assetLibrary';
import GamePlayData from '../gameplay_data';

export default class BattleSceneView extends BaseView
{
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene)
    {
        super(scene);
        // console.log("Battle Scene View Created");

        this.maxHpPlayer = 0;
        this.maxHpMonster = 0;
        this.maxMpPlayer = 0;
        this.maxMpMonster = 0;
    }

    /**
     * Function to create view
     * @public
     */
    create = () =>
    {
        this.setView();
        return this;
    }

    //the anchoring is still a mess.
    /**
     * Draw stuff here.
     * @private
     */
    setView = ()=>
    {
        //create bg
        if(GamePlayData.IS_WINTER)
        {
            this.background = new Image(this.scene,0,0, GameplayAsset.battle_background_2.key);
        }
        else
        {
            this.background = new Image(this.scene,0,0, GameplayAsset.battle_background.key);
        }
        this.background.transform.setDisplayHeightAsScreenHeight(true);
        this.background.transform.setDisplayWidthToAspectRatio();
        this.background.gameobject.setOrigin(0,0);

        //create hp display for each battler
        //panels
        this.playerHpPanel = new Image(this.scene, 0, 0, GameplayAsset.player_health_panel.key);
        this.playerHpPanel.gameobject.setScale(this.screenUtility.screenPercentage * 2.2);
        this.playerHpPanel.gameobject.setOrigin(1,0.5);

        this.heartIconPlayer = new Image(this.scene, 0,0, GameplayAsset.heart_panel_icon.key);
        this.heartIconPlayer.gameobject.setScale(this.screenUtility.screenPercentage * 2);
        
        this.enemyHpPanel = new Image(this.scene, 0,0, GameplayAsset.monster_health_panel.key);
        this.enemyHpPanel.gameobject.setScale(this.screenUtility.screenPercentage * 2.2);
        this.enemyHpPanel.gameobject.setOrigin(0,0.5);

        this.heartIconMonster = new Image(this.scene, 0,0, GameplayAsset.heart_panel_icon.key);
        this.heartIconMonster.gameobject.setScale(this.screenUtility.screenPercentage * 2);

        //bars (empty)
        this.hpBarPlayerEmpty = new Image(this.scene, 0,0, GameplayAsset.health_empty_bar.key);
        this.hpBarPlayerEmpty.gameobject.setScale(this.screenUtility.screenPercentage * 2.2);

        this.hpBarMonsterEmpty = new Image(this.scene,0,0, GameplayAsset.health_empty_bar.key);
        this.hpBarMonsterEmpty.gameobject.setScale(this.screenUtility.screenPercentage * 2.2);
       
        this.mpBarPlayerEmpty = new Image(this.scene, 0,0, GameplayAsset.mana_empty_bar.key);
        this.mpBarPlayerEmpty.gameobject.setScale(this.screenUtility.screenPercentage * 2.2);

        this.mpBarMonsterEmpty = new Image(this.scene, 0,0, GameplayAsset.mana_empty_bar.key);
        this.mpBarMonsterEmpty.gameobject.setScale(this.screenUtility.screenPercentage * 2.2);

        //bars (fill)
        this.hpBarPlayer = new Image(this.scene, 0,0, GameplayAsset.health_bar.key);
        this.hpBarPlayer.gameobject.setScale(this.screenUtility.screenPercentage * 2.15,
             this.screenUtility.screenPercentage * 1.5);

        this.mpBarPlayer = new Image(this.scene,0,0, GameplayAsset.mana_bar.key);
        this.mpBarPlayer.gameobject.setScale(this.screenUtility.screenPercentage * 2.2);

        this.hpBarMonster = new Image(this.scene, 0,0, GameplayAsset.health_bar.key);
        this.hpBarMonster.gameobject.setScale(this.screenUtility.screenPercentage * 2.15, 
            this.screenUtility.screenPercentage * 1.5);

        this.mpBarMonster = new Image(this.scene, 0,0, GameplayAsset.mana_bar.key);
        this.mpBarMonster.gameobject.setScale(this.screenUtility.screenPercentage * 2.2);

        this.playerNameTxt = new Text(this.scene, this.screenUtility.width * 0.85,
            this.screenUtility.height * 0.07, 'Player', {fontFamily: FontAsset.cabin_bold.key, fontSize:"25px"});
        this.playerNameTxt.gameobject.setOrigin(1,0.5);
        
        this.monsterNameTxt = new Text(this.scene, this.screenUtility.width * 0.14, 
            this.screenUtility.height * 0.07, 'Slime', {fontFamily: FontAsset.cabin_bold.key, fontSize:"25px"});
        this.monsterNameTxt.gameobject.setOrigin(0,0.5);

        this.monsterHpTxt = new Text(this.scene, 0,0, '10/10',{fontFamily: FontAsset.cabin_bold.key, fontSize:"25px"});
        this.monsterHpTxt.gameobject.setOrigin(1,0.5);

        this.playerHpTxt = new Text(this.scene, 0,0, '999/999', {fontFamily: FontAsset.cabin_bold.key, fontSize:"25px"});
        this.playerHpTxt.gameobject.setOrigin(0,0.5);

        this.comboTxt = new Text(this.scene, 0,0, 'Combo', {fontFamily: FontAsset.cabin_bold.key, fontSize:"30px", color: 'black'});

        this.refreshPosition();
    }

    /**
     * Updates the life and energy gauge
     * @param {import('../../../def/custom').Agate.Gameplay.Battle.BattlerData} playerBattlerData
     * @param {import('../../../def/custom').Agate.Gameplay.Battle.BattlerData} enemyBattlerData
     */
    updateHpDisplay = (playerBattlerData, enemyBattlerData) =>
    {
        this.playerNameTxt.gameobject.setText(playerBattlerData.name);
        this.monsterNameTxt.gameobject.setText(enemyBattlerData.name);
        if(GamePlayData.Combo > 0)
        {
            this.comboTxt.gameobject.setVisible(true);
            this.comboTxt.gameobject.setText('Combo: ' + GamePlayData.Combo);
        }
        else
        {
            this.comboTxt.gameobject.setVisible(false);
        }
        this.playerHpTxt.gameobject.setText(`(${playerBattlerData.hp}/${playerBattlerData.maxhp})`);
        this.monsterHpTxt.gameobject.setText(`(${enemyBattlerData.restoreLevel}/${enemyBattlerData.hp})`);
        this.playerNameTxt.gameobject.setScale(
            this.screenUtility.screenPercentage,
            this.screenUtility.screenPercentage
        );
        this.playerHpTxt.gameobject.setScale(
            this.screenUtility.screenPercentage,
            this.screenUtility.screenPercentage
        );
        this.monsterHpTxt.gameobject.setScale(
            this.screenUtility.screenPercentage,
            this.screenUtility.screenPercentage
        );
        this.monsterNameTxt.gameobject.setScale(
            this.screenUtility.screenPercentage,
            this.screenUtility.screenPercentage
        );
        this.comboTxt.gameobject.setScale(
            this.screenUtility.screenPercentage,
            this.screenUtility.screenPercentage
        );
        this.refreshBarPosition();

            this.scene.tweens.add({
                targets: this.hpBarPlayer.gameobject,
                scaleX: this.screenUtility.screenPercentage * 2.15 * playerBattlerData.hp/playerBattlerData.maxhp,
                x: this.hpBarPlayerEmpty.gameobject.x + this.hpBarPlayerEmpty.gameobject.displayWidth/2.05,
                duration:750,
                ease: Phaser.Math.Easing.Sine.Out,
            });
            this.scene.tweens.add({
                targets: this.mpBarPlayer.gameobject,
                scaleX: this.screenUtility.screenPercentage * 2.15 * playerBattlerData.mp/playerBattlerData.maxmp,
                x: this.mpBarPlayerEmpty.gameobject.x + this.mpBarPlayerEmpty.gameobject.displayWidth/2.05,
                duration:750,
                ease: Phaser.Math.Easing.Sine.Out,
            });

            this.scene.tweens.add({
                targets: this.hpBarMonster.gameobject,
                scaleX: this.screenUtility.screenPercentage * 2.15 * enemyBattlerData.restoreLevel/enemyBattlerData.hp,
                x: this.mpBarMonsterEmpty.gameobject.x - this.mpBarMonsterEmpty.gameobject.displayWidth/2.05,
                duration:750,
                ease: Phaser.Math.Easing.Sine.Out,
            });

            this.scene.tweens.add({
                targets: this.mpBarMonster.gameobject,
                scaleX: this.screenUtility.screenPercentage * 2.15 * enemyBattlerData.mp/enemyBattlerData.maxmp,
                x: this.mpBarMonsterEmpty.gameobject.x - this.mpBarMonsterEmpty.gameobject.displayWidth/2.05,
                duration:750,
                ease: Phaser.Math.Easing.Sine.Out,
            });

        this.refreshTextPosition();
    }

    refreshPosition = () =>
    {
        this.playerHpPanel.gameobject.setPosition(
            this.screenUtility.width * 1 - this.playerHpPanel.gameobject.displayWidth / 10,
            this.screenUtility.height * 0.1)
        this.heartIconPlayer.gameobject.setPosition(
            this.playerHpPanel.gameobject.x - this.playerHpPanel.gameobject.displayWidth * 0.125,
            this.playerHpPanel.gameobject.y + this.heartIconPlayer.transform.displayHeight/2
        );
        this.enemyHpPanel.gameobject.setPosition(
            this.screenUtility.width * 0 + this.enemyHpPanel.gameobject.displayWidth / 10,
            this.screenUtility.height * 0.1);
        this.heartIconMonster.gameobject.setPosition(
            this.enemyHpPanel.gameobject.x + this.enemyHpPanel.gameobject.displayWidth * 0.125,
            this.enemyHpPanel.gameobject.y + this.heartIconMonster.transform.displayHeight/2
        );
        this.hpBarPlayerEmpty.gameobject.setPosition(
            this.playerHpPanel.gameobject.x - this.playerHpPanel.transform.displayWidth * 0.5 - this.playerHpPanel.transform.displayWidth * 0.1,
             this.playerHpPanel.gameobject.y + this.hpBarPlayerEmpty.transform.displayHeight * 0.9
        );
        this.hpBarMonsterEmpty.gameobject.setPosition(
            this.enemyHpPanel.gameobject.x + this.enemyHpPanel.transform.displayWidth * 0.5 + this.enemyHpPanel.transform.displayWidth * 0.1,
            this.enemyHpPanel.gameobject.y + this.hpBarMonsterEmpty.transform.displayHeight * 0.9
        );
        this.mpBarPlayerEmpty.gameobject.setPosition(
            this.playerHpPanel.gameobject.x - this.playerHpPanel.transform.displayWidth * 0.5 - this.playerHpPanel.transform.displayWidth * 0.1,
            this.playerHpPanel.gameobject.y + this.mpBarPlayerEmpty.transform.displayHeight * 2
        );
        this.mpBarMonsterEmpty.gameobject.setPosition(
            this.enemyHpPanel.gameobject.x + this.enemyHpPanel.transform.displayWidth * 0.5 + this.enemyHpPanel.transform.displayWidth * 0.1,
            this.enemyHpPanel.gameobject.y + this.mpBarMonsterEmpty.transform.displayHeight * 2
        );
        this.refreshTextPosition();
        this.refreshBarPosition();
    }

    refreshTextPosition = () =>
    {
        this.playerNameTxt.gameobject.setPosition(
            this.playerHpPanel.gameobject.x - this.playerHpPanel.gameobject.displayWidth * 0.05,
            this.playerHpPanel.gameobject.y - this.playerHpPanel.transform.displayHeight * 0.4 + this.playerNameTxt.gameobject.displayHeight/2
        );
        this.monsterNameTxt.gameobject.setPosition(
            this.enemyHpPanel.gameobject.x + this.enemyHpPanel.gameobject.displayWidth * 0.05,
            this.enemyHpPanel.gameobject.y - this.enemyHpPanel.transform.displayHeight * 0.4 + this.monsterNameTxt.gameobject.displayHeight/2
        );
        this.monsterHpTxt.gameobject.setPosition(
            this.enemyHpPanel.gameobject.x + this.enemyHpPanel.gameobject.displayWidth - this.enemyHpPanel.gameobject.displayWidth * 0.05,
            this.enemyHpPanel.gameobject.y - this.enemyHpPanel.transform.displayHeight * 0.1
        );
        this.playerHpTxt.gameobject.setPosition(
            this.playerHpPanel.gameobject.x - this.playerHpPanel.gameobject.displayWidth + this.playerHpPanel.gameobject.displayWidth * 0.05,
            this.playerHpPanel.gameobject.y - this.playerHpPanel.transform.displayHeight * 0.1
        );
        this.comboTxt.gameobject.setPosition(
            this.playerHpPanel.gameobject.x - this.comboTxt.gameobject.displayWidth - this.playerHpPanel.gameobject.displayWidth * 0.05,
            this.playerHpPanel.gameobject.y + this.playerHpPanel.transform.displayHeight * 0.5 + this.comboTxt.gameobject.displayHeight/2
        );
    }

    refreshBarPosition = () =>
    {
        this.hpBarPlayer.gameobject.setPosition(
            this.hpBarPlayerEmpty.gameobject.x + this.hpBarPlayerEmpty.gameobject.displayWidth/2.05,
            this.playerHpPanel.gameobject.y + this.hpBarPlayer.transform.displayHeight * 1.25
        ).setOrigin(1,0.5);
        this.mpBarPlayer.gameobject.setPosition(
            this.mpBarPlayerEmpty.gameobject.x + this.mpBarPlayerEmpty.gameobject.displayWidth/2.05,
            this.playerHpPanel.gameobject.y + this.mpBarPlayer.transform.displayHeight * 3
        ).setOrigin(1,0.5);
        this.hpBarMonster.gameobject.setPosition(
            this.mpBarMonsterEmpty.gameobject.x - this.mpBarMonsterEmpty.gameobject.displayWidth/2.05,
            this.enemyHpPanel.gameobject.y + this.hpBarMonster.transform.displayHeight * 1.25
        ).setOrigin(0,0.5);
        this.mpBarMonster.gameobject.setPosition(
            this.mpBarMonsterEmpty.gameobject.x - this.mpBarMonsterEmpty.gameobject.displayWidth/2.05,
            this.enemyHpPanel.gameobject.y + this.mpBarMonster.transform.displayHeight * 3
        ).setOrigin(0,0.5);
    }
}