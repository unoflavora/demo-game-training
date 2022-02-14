import Sprite from '../../module/gameobjects/sprite';
import Text from '../../module/gameobjects/text';
import Button from '../../module/gameobjects/button';
import { MissionButton, MissionTask, TopicButton } from '../../module/gameobjects/custom';
import { FadeIn, FadeOut, SandClockPanel } from "../../module/gameobjects/transition"
import { GameplayAsset, FontAsset, AudioAsset, BackgroundLibrary } from "../../assetLibrary"
import { BaseView } from '../../core';
import gameplay_data from '../gameplay/gameplay_data';

/**
 * @typedef {import('../../def/custom').Agate.Gameplay.MissionContent} MapMissionContent
 * @typedef {import('../../def/custom').Agate.Gameplay.CategoryContent} CategoryContent
 * @typedef {import('../../def/custom').Agate.Gameplay.MissionData} MissionData
 * @typedef {import('../../def/custom').Agate.Gameplay.Mission} Mission
 */
export default class WorldmapSceneView extends BaseView {
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super(scene);

        this.mainFontAssettyleCenter = {
            color: "#42210B",
            fontSize: "25px",
            fontFamily: FontAsset.cabin_bold.key,
            align: "center"
        }
        this.textStyleWhite = {
            fontFamily: FontAsset.cabin_bold.key,
            fontSize: "25px",
            align: "center"
        }
        
        this.style = {
            fontSize: 60 * this.screenUtility.screenPercentage,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: 600,
                useAdvancedWrap: true
            },
            color: '#42210B',
        }
        this.styleWhite = {
            fontSize: 60,
            fontFamily: FontAsset.cabin_bold.key,
            align: "center",
            wordWrap: {
                width: 600,
                useAdvancedWrap: true
            },
        }
    }

    /**
     * 
     * @param {Function} onFullfilled 
     */
    preload = (onFullfilled = ()=>{})=>{
        this.sandClockPanel = new SandClockPanel(this.scene, this.screenUtility.centerX, this.screenUtility.centerY);
        this.sandClockPanel.onShow()
            .then(onFullfilled);
    }

    /**
     * @param {number} chosenIndex
     */
    create = (chosenIndex) => {
        console.log('creating mission', chosenIndex)

        this.background = new Sprite(this.scene, this.screenUtility.width / 2, this.screenUtility.height / 2, BackgroundLibrary[chosenIndex]);
        this.background.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height);
        this.background.transform.setDisplayHeightToAspectRatio();

        this.container = this.scene.add.container(0, 0);
        this.fadein = new FadeIn(this.scene);
        this.fadeout = new FadeOut(this.scene);
    }

    /**@param {boolean} isActive*/
    createSoundButton(isActive){

        this.soundButton = new Button(this.scene, this.screenUtility.width * 0.975, this.screenUtility.height * 0.025, GameplayAsset.ui_sound_on_button.key, 0);
        this.setSoundButtonTexture(isActive);

        this.soundButton.gameobject.setOrigin(1, 0);
        this.soundButton.gameobject.setScale(this.screenUtility.screenPercentage * 1.4)
        this.container.add(this.soundButton.gameobject)

        /**@param {Function} onClick*/
        this.registerOnSoundButtonClicked = (onClick)=>{
            this.soundButton.click.on(onClick);
        }

    }

    /**@param {boolean} isActive*/
    setSoundButtonTexture = (isActive)=>{
        const buttonOn = {texture: GameplayAsset.ui_sound_on_button.key, frame: 0}
        const buttonOff = {texture: GameplayAsset.ui_sound_off_button.key, frame: 0}

        if (isActive) {
            this.soundButton.setNormalTexture(buttonOn.texture, buttonOn.frame);
            this.soundButton.addTexture(buttonOn, buttonOn);
        } else {
            this.soundButton.setNormalTexture(buttonOff.texture, buttonOff.frame);
            this.soundButton.addTexture(buttonOff, buttonOff);
        }
    }

    /**
     * 
     * @param {MapMissionContent} mapMissionContent 
     */
    createTopicButton = (mapMissionContent)=>{
        let topics = mapMissionContent.topic_contents;
        console.log(topics)
        console.log(gameplay_data.currentTopic)

        let topicButton;

        topics.forEach((topic,index)=>{
            console.log(topic)
            let tempPosButton = topics[index].y;
            topicButton = new TopicButton(this.scene, 0,0, topic.topic ,this.screenUtility.screenPercentage,this.mainFontAssettyleCenter);
            topicButton.button.container.setPosition(
                this.screenUtility.width * topic.x / 640,
                this.screenUtility.height * topic.y / 1475
            );
            topicButton.button.click.on(()=>{
                this.emit('SHOWMISSION', topic.topic, topic.category_content );
            });

            if(!topic.is_unlocked){
                topicButton.setUnlocked();
            }

            this.container.add(topicButton.button.container);
        });

        this.fadeout.show();
    }

    /**
     * 
     * @param {Number} clusterIndex 
     * @param {Number} maxCluster 
     */
    createButtonNextPrevCluster = (clusterIndex = 0,maxCluster = 0) => {
        this.prevCluster = new Button(this.scene, 0, 0, GameplayAsset.ui_result_back_button.key, 0, AudioAsset.sfx_button_main_menu.key);
        this.prevCluster.setPressedTexture(GameplayAsset.ui_result_back_button.key, 2);
        this.prevCluster.gameobject.setOrigin(0.5).setScale(this.screenUtility.screenPercentage * 1.5);
        this.prevCluster.gameobject.setPosition(0 + this.prevCluster.transform.displayWidth / 2, this.screenUtility.height - this.prevCluster.transform.displayHeight / 2);

        this.nextCluster = new Button(this.scene, 0, 0, GameplayAsset.ui_result_back_button.key, 0, AudioAsset.sfx_button_main_menu.key);
        this.nextCluster.setPressedTexture(GameplayAsset.ui_result_back_button.key, 2);
        this.nextCluster.gameobject.setOrigin(0.5).setScale(this.screenUtility.screenPercentage * 1.5);
        this.nextCluster.gameobject.setAngle(180);
        this.nextCluster.gameobject.setPosition(this.screenUtility.width - this.nextCluster.transform.displayWidth / 2, this.screenUtility.height - this.nextCluster.transform.displayHeight / 2);

        if (clusterIndex === 0) {
            this.prevCluster.gameobject.setVisible(false);
        } else if (clusterIndex === maxCluster) {
            this.nextCluster.gameobject.setVisible(false);
        }
    }

    /**
     * 
     * @param {Button} nextCluster 
     * @param {Button} prevCluster 
     */
    registerButtonNextPrevCluster = (nextCluster, prevCluster) => {
        this.nextCluster.click.on(() => {
            nextCluster();
        });

        this.prevCluster.click.on(() => {
            prevCluster();
        });
    }

    /**
     * 
     * @param {Sprite} sprite 
     * @param {number} ratio 
     * @returns 
     */
    prefreredHeightRatio = (sprite, ratio) => {
        return ((this.screenUtility.width * ratio) / sprite.transform.displayWidth);
    };

    /**
     * 
     * @param {string} clusterName 
     */
    createRibbonPanel = (clusterName) => {
        this.ribbonPanel = new Sprite(this.scene, this.screenUtility.centerX, this.screenUtility.height * 0.05, GameplayAsset.ui_menu_title.key);
        this.ribbonPanel.gameobject.setOrigin(0.5);
        this.ribbonPanel.transform.setMinPreferredDisplaySize(this.screenUtility.width * 0.65);

        this.ribbonPanelText = new Text(this.scene, this.ribbonPanel.gameobject.x, this.ribbonPanel.gameobject.y * 0.9, clusterName, {
            color: "#42210B",
            fontFamily: FontAsset.cabin_bold.key,
            fontSize: "23px",
            align: "center"
        });
        this.ribbonPanelText.gameobject.setWordWrapWidth(this.ribbonPanel.gameobject.displayWidth * 0.95, true);
        this.ribbonPanelText.gameobject.setOrigin(0.5, 0.55);
        this.ribbonPanelText.transform.setFontSize(30);
    }

    createSelectedMissionHUD = () => {
        this.panelContainer = this.scene.add.container(0,0);

        this.missionTopicOverlayPanel = new Button(this.scene, this.screenUtility.centerX, this.screenUtility.height, GameplayAsset.ui_mission_topic_overlay.key)
        this.missionTopicOverlayPanel.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height * 0.8);
        this.missionTopicOverlayPanel.gameobject.setOrigin(0.5, 1);

        this.missionTopicTitlePanel = new Sprite(this.scene, 0, 0, GameplayAsset.ui_mission_topic_title_panel.key)
        this.missionTopicTitlePanel.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.missionTopicTitlePanel.gameobject.height * 0.5);
        this.missionTopicTitlePanel.gameobject.setOrigin(0.5);
        //ref
        this.positionRef = {
            x: this.missionTopicOverlayPanel.gameobject.x,
            y: this.missionTopicOverlayPanel.gameobject.y - this.missionTopicOverlayPanel.gameobject.displayHeight + this.missionTopicTitlePanel.gameobject.height
        }
        this.missionTopicTitlePanel.gameobject.setPosition(this.positionRef.x, this.positionRef.y);

        this.missionTopicLabelText = new Text(this.scene, 0, 0, "Topik", this.mainFontAssettyleCenter);
        this.missionTopicLabelText.transform.setFontSize(40);
        this.missionTopicLabelText.gameobject.setOrigin(0.5).setAlign("center").setWordWrapWidth(0, true);
        this.missionTopicLabelText.gameobject.setPosition(this.missionTopicTitlePanel.gameobject.x, this.missionTopicTitlePanel.gameobject.y);

        this.missionTopicTitleText = new Text(this.scene, 0, 0, "Judul Topik", this.mainFontAssettyleCenter);
        this.missionTopicTitleText.transform.setFontSize(40);
        this.missionTopicTitleText.gameobject.setOrigin(0.5).setAlign("center").setVisible(false);
        this.missionTopicTitleText.gameobject.setPosition(this.missionTopicTitlePanel.gameobject.x, this.missionTopicTitlePanel.gameobject.y);
       
        this.panelContainer.add([this.missionTopicOverlayPanel.gameobject, this.missionTopicTitlePanel.gameobject, this.missionTopicLabelText.gameobject]);

        this.panelContainer.setVisible(false);
    }

    /**
     * Create a pool of mission button, deact and activate when needed, other than recreating buttons, if you need more/less buttons, edit the pool size
     */
    createMission = ()=>{
        this.missionButtonContainer = this.scene.add.container(0,0);
        const poolSize = 7;
        /**@type {MissionButton[]} */
        this.missionButtonPool = []

        for (let index = 0; index < poolSize; index++) {
            const button = new MissionButton(this.scene,0,0,0,'Name', 'Category Name',this.mainFontAssettyleCenter, this.screenUtility.screenPercentage);
            button.container.setVisible(false);
            this.missionButtonPool.push(button);
            this.missionButtonContainer.add(button.container);
        }
        this.missionButtonContainer.setVisible(false);

        this.returnButton = new Button(this.scene, 0, 0, GameplayAsset.ui_result_back_button.key, 0, AudioAsset.sfx_button_main_menu.key);
        this.returnButton.gameobject.setScale(this.screenUtility.screenPercentage * 2)
        this.returnButton.gameobject.setOrigin(0, 0.5);
        this.returnButton.setPressedTexture(GameplayAsset.ui_result_back_button.key, 2);
        this.returnButton.click.on(()=>{
            this.emit('HIDEMISSION');
        })
        this.missionButtonContainer.add(this.returnButton.gameobject);
    }

    createMissionDetail = ()=>{

        this.missionDetailContainer = this.scene.add.container(0,0);

        this.missionTaskUtama = new MissionTask(this.scene, this.positionRef.x, this.positionRef.y + (this.missionTopicTitlePanel.transform.displayHeight * 2.5), "Misi Utama");
        this.missionTaskUtama.transform.setMinPreferredDisplaySize(this.screenUtility.width * 0.6, this.missionTopicTitlePanel.gameobject.height * 0.5);

        this.missionTaskBonus = new MissionTask(this.scene, this.missionTaskUtama.container.x, this.missionTaskUtama.container.y + (this.missionTaskUtama.transform.displayHeight * 1.2),"Bonus Misi");
        this.missionTaskBonus.transform.setMinPreferredDisplaySize(this.screenUtility.width * 0.6, this.missionTopicTitlePanel.gameobject.height * 0.5);
        console.log('create next button')
        this.startMissionButton = new Button(this.scene, 0, 0, GameplayAsset.start_mission_button.key, 0, AudioAsset.sfx_button_start_mission.key);
        this.startMissionButton.setPressedTexture(GameplayAsset.start_mission_button.key, 2);
        this.startMissionButton.gameobject.setScale(this.screenUtility.screenPercentage * 2.25)
        this.startMissionButton.gameobject.setOrigin(0.5);
        this.startMissionButton.transform.setMaxPreferredDisplaySize(this.missionTaskBonus.transform.displayWidth * 0.45);
        let startMissionButtonText = new Text(this.scene, 0, 0, "MULAI MISI", this.mainFontAssettyleCenter);
        startMissionButtonText.transform.setFontSize(25);
        startMissionButtonText.gameobject.setOrigin(0.5);
        this.startMissionButton.add(startMissionButtonText.gameobject);
        this.startMissionButton.gameobject.setPosition(this.missionTaskBonus.container.x + this.missionTaskBonus.transform.displayWidth * 0.5 - this.startMissionButton.gameobject.displayWidth * 0.5, this.missionTaskBonus.container.y + this.missionTaskBonus.transform.displayHeight * 0.75).setDepth(1);

        this.returnDetailBtn = new Button(this.scene, 0, 0, GameplayAsset.ui_result_back_button.key, 0, AudioAsset.sfx_button_main_menu.key);
        this.returnDetailBtn.gameobject.setOrigin(0, 0.5);
        
        let originalSize = this.returnDetailBtn.transform.displayWidth;
        this.returnDetailBtn.gameobject.setSize(this.screenUtility.width * 0.1, this.returnDetailBtn.gameobject.height * (this.returnDetailBtn.transform.displayWidth / originalSize));
        this.returnDetailBtn.gameobject.setScale(this.screenUtility.screenPercentage * 2);
        this.returnDetailBtn.gameobject.setPosition(this.missionTaskBonus.container.x - this.missionTaskBonus.gameobject.displayWidth * 0.5, this.missionTaskBonus.container.y + this.missionTaskBonus.transform.displayHeight * 0.75);
        this.returnDetailBtn.setPressedTexture(GameplayAsset.ui_result_back_button.key, 2);
        this.returnDetailBtn.click.on(()=>{
            this.emit('HIDEMISSIONDETAL');
        })

        startMissionButtonText.gameobject.setPosition(this.startMissionButton.gameobject.x, this.startMissionButton.gameobject.y).setDepth(1);

        this.missionDetailContainer.add([this.missionTaskUtama.container, this.missionTaskBonus.container, this.startMissionButton.container, this.returnDetailBtn.container]);
        this.missionDetailContainer.setVisible(false);
    }

    /**
     * @param {string} missionTitle 
     * @param {CategoryContent[]} categoryList 
     */
    showMissionList = (missionTitle = 'Title',categoryList)=>{
        this.missionTopicLabelText.gameobject.setText(missionTitle);

        this.panelContainer.setVisible(true);
        this.missionButtonContainer.setVisible(true);

        let countMission = 0;
        console.log('topic is clicked')
        categoryList.forEach((category)=>{
            
            category.missions.forEach((mission)=>{
                let button = this.missionButtonPool[countMission];
                button.container.setVisible(true);
                button.setText(mission.mission_name, category.category);
                button.setPosition(this.positionRef.x, this.missionTopicTitlePanel.gameobject.y + this.missionTopicTitlePanel.transform.displayHeight * 1.5 + button.transform.displayHeight * (countMission * 0.9));
                countMission += 1;

                //Disable mission if locked
                if(category.is_unlocked) {
                    button.click.on(()=>{
                        this.emit('SHOWMISSIONDETAL', category.category, mission);
                    });
                } else {
                    button.gameobject.tint = 0.4 * 0xffffff
                }
               
            })
        });

        let lastIdx = countMission-1; 

        this.returnButton.gameobject.setPosition(this.missionButtonPool[lastIdx].container.x - this.missionButtonPool[lastIdx].gameobject.displayWidth * 0.5, 
            this.missionButtonPool[lastIdx].container.y + this.missionButtonPool[lastIdx].gameobject.displayHeight);
    }

    
    hideMissionList = ()=>{
        this.missionButtonPool.forEach((obj)=>{
            obj.removeAllListener();
            obj.container.setVisible(false);
        })
        this.missionButtonContainer.setVisible(false);
        this.panelContainer.setVisible(false);
    }

    /**
     * 
     * @param {string} categoryName 
     * @param {Mission} mission 
     */
    showMissionDetail = (categoryName, mission)=>{

        const { main_missions, bonus_missions } = mission.mission_types


        if (bonus_missions.length == 0) {
            this.missionTaskBonus.disable();
        }
        
        this.missionDetailContainer.setVisible(true);
        this.missionButtonContainer.setVisible(false);

        this.missionTaskUtama.setMissionText(main_missions);
        this.missionTaskBonus.setMissionText(bonus_missions);

        this.startMissionButton.click.on(()=>{
            console.log('start mission clicked')
            this.startMissionButton.setInteractive(false);
            this.emit('LOADEXPLORE',categoryName,mission);
        })
    }

    hideMissionDetail = ()=>{
        this.missionTaskUtama.reset();
        this.missionTaskBonus.reset();
        this.missionDetailContainer.setVisible(false);
        this.missionButtonContainer.setVisible(true);
        this.startMissionButton.removeAllListener();
    }
}