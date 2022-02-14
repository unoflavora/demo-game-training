import { GameplayAsset, FontAsset, AudioAsset } from "../../../../assetLibrary";
import { BaseView } from "../../../../core";
import { MissionHelper } from "../../../../helper";
import Button from "../../../../module/gameobjects/button";
import { GreenButton } from "../../../../module/gameobjects/custom";
import Image from "../../../../module/gameobjects/image";
import Text from "../../../../module/gameobjects/text";

/**
 * @typedef {import('../../../../def/custom').Agate.Gameplay.MissionType} missionType
 * @typedef {import('../../../../def/custom').Agate.Gameplay.MissionData} MissionData
 */

/**
 * @typedef {Object} MissonText
 * @property {Image} missionIcon
 * @property {Text} missionTitle
 * @property {Text} missionTarget
 */
export default class MenuView extends BaseView{
	event = {
		SHOWPANEL: 'SHOWPANEL',
		HIDEPANEL: 'HIDEPANEL',
		EXITCLICK: 'EXITCLICK',
		SHOWBONUSMISSION: 'SHOWBONUSMISSION',
		SHOWMAINMISSION: 'SHOWMAINMISSION'

	}

    /**@param {Phaser.Scene} scene*/
    constructor(scene){
        super(scene);

        this.textStyle = {
			align: "center",
			fontFamily: FontAsset.cabin_bold.key,
			fontSize: "35px"
		};
		this.textStyleBlack = {
			align: "center",
			fontFamily: FontAsset.cabin_bold.key,
			fontSize: "35px",
            color: '#42210B',
		};

		/**@type {MissonText[]} */
		this.missionTargetText= [];
		/**@type {MissonText[]} */
		this.bonusMissionList = [];
    }

    createIcon = ()=>{
        
        this.menuButton = new Button(this.scene, this.screenUtility.width * 0.95, this.screenUtility.height * 0.025, GameplayAsset.pause_mission_button.key, 0, AudioAsset.sfx_button_main_menu.key);
		this.menuButton.gameobject.setOrigin(1, 0);
		this.menuButton.gameobject.setScrollFactor(this.scene.cameras.main.x, this.scene.cameras.main.y);
		this.menuButton.gameobject.setScale(this.screenUtility.screenPercentage * 1.5);
        this.menuButton.click.on(()=>{
            this.emit(this.event.SHOWPANEL)
        });

		
    }

	createMenuPanel = ()=>{
		this.menuPanel = this.scene.add.container(0,0);

		this.panel = new Image(this.scene, this.screenUtility.centerX, this.screenUtility.centerY, GameplayAsset.ui_menu_box_1.key);
		this.panel.gameobject.setOrigin(0.5);
		this.panel.transform.setMaxPreferredDisplaySize(this.screenUtility.width * 0.9, this.screenUtility.height * 0.65);
		this.panel.transform.setDisplayWidth(this.screenUtility.width * 0.85);
		this.panel.gameobject.setScrollFactor(0);

		this.missionUtamaTextContainer = this.scene.add.container(0,0);
		this.missionBonusTextContainer = this.scene.add.container(0,0);

		this.missionUtamaTitle = new Text(this.scene, this.panel.gameobject.x, this.panel.gameobject.y - this.panel.transform.displayHeight * 0.425, "Misi Utama", this.textStyleBlack);
		this.missionUtamaTitle.gameobject.setOrigin(0.5);
		this.missionUtamaTitle.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.275, this.prefreredHeightRatio(this.missionUtamaTitle, 0.275));
		this.missionUtamaTitle.gameobject.setScrollFactor(0);

		this.bonusMissionTitle = new Text(this.scene, this.panel.gameobject.x, this.panel.gameobject.y - this.panel.transform.displayHeight * 0.425, "Misi Bonus", this.textStyleBlack);
		this.bonusMissionTitle.gameobject.setOrigin(0.5);
		this.bonusMissionTitle.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.275, this.prefreredHeightRatio(this.bonusMissionTitle, 0.275));
		this.bonusMissionTitle.gameobject.setScrollFactor(0);

		this.missionUtamaTextContainer.add([this.missionUtamaTitle.gameobject]);
		this.missionBonusTextContainer.add([this.bonusMissionTitle.gameobject]);
		this.missionBonusTextContainer.setVisible(false);
        this.menuPanel.add([this.panel.gameobject, this.missionUtamaTextContainer, this.missionBonusTextContainer]);
		
        this.menuPanel.setVisible(false);
	}

	createPanelButton = ()=>{
		this.continueButton = new GreenButton(this.scene, this.panel.gameobject.x + this.panel.transform.displayWidth * 0.3, this.panel.gameobject.y + this.panel.transform.displayHeight * this.panel.gameobject.originY - this.panel.transform.displayHeight * 0.1, 'Lanjut');
		this.continueButton.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.3, this.continueButton.transform.displayHeight * this.prefreredHeightRatio(this.continueButton, 0.3));
		this.continueButton.click.on(()=>{
			this.emit(this.event.HIDEPANEL);
		});

		this.exitButton = new GreenButton(this.scene, this.panel.gameobject.x - this.panel.transform.displayWidth * 0.3, this.panel.gameobject.y + this.panel.transform.displayHeight * this.panel.gameobject.originY - this.panel.transform.displayHeight * 0.1, 'Keluar');
		this.exitButton.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.3, this.exitButton.transform.displayHeight * this.prefreredHeightRatio(this.exitButton), 0.3);
		this.exitButton.click.on(()=>{
			this.emit(this.event.EXITCLICK);
		})

		this.bonusMissionButton = new GreenButton(this.scene, this.panel.gameobject.x, this.panel.gameobject.y + this.panel.gameobject.displayHeight * this.panel.gameobject.originY - this.panel.gameobject.displayHeight * 0.1, "Bonus");
		this.bonusMissionButton.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.3, this.bonusMissionButton.transform.displayHeight * this.prefreredHeightRatio(this.bonusMissionButton), 0.3);
		this.bonusMissionButton.click.on(()=>{
			this.emit(this.event.SHOWBONUSMISSION);
		});

		this.mainMissionButton = new GreenButton(this.scene, this.panel.gameobject.x, this.panel.gameobject.y + this.panel.gameobject.displayHeight * this.panel.gameobject.originY - this.panel.gameobject.displayHeight * 0.1, 'Utama');
		this.mainMissionButton.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.3, this.mainMissionButton.transform.displayHeight * this.prefreredHeightRatio(this.mainMissionButton), 0.3);
		this.mainMissionButton.click.on(()=>{
			this.emit(this.event.SHOWMAINMISSION);
		});

		this.mainMissionButton.container.setVisible(false);
		this.bonusMissionButton.container.setVisible(true);

		this.menuPanel.add([this.continueButton.container, this.mainMissionButton.container, this.bonusMissionButton.container, this.exitButton.container ]);

	}

	/**
	 * 
	 * @param {MissionData} mainMission
	 * @param {Number} index 
	 */
	createMainMissionText = (mainMission = undefined, index = 0)=>{
		const {mission, target} = mainMission;
		let missionUtamaTaskIcon = new Image(this.scene, this.panel.gameobject.x - this.panel.transform.displayWidth * 0.35, this.missionUtamaTitle.gameobject.y + (this.missionUtamaTitle.transform.displayHeight * 3 * (index + 1)), GameplayAsset.ui_menu_task_iconn.key);
		missionUtamaTaskIcon.gameobject.setOrigin(0.5);
		missionUtamaTaskIcon.gameobject.setScrollFactor(0);
		missionUtamaTaskIcon.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.05, this.prefreredHeightRatio(missionUtamaTaskIcon, 0.1) * missionUtamaTaskIcon.transform.displayHeight);

		let missionUtamaTaskText = new Text(this.scene, missionUtamaTaskIcon.gameobject.x + missionUtamaTaskIcon.transform.displayWidth, missionUtamaTaskIcon.gameobject.y - missionUtamaTaskIcon.transform.displayHeight * 0.5, MissionHelper.FindAndRephraseMissionDescription(mission, target), this.textStyleBlack);
		missionUtamaTaskText.gameobject.setOrigin(0);
		missionUtamaTaskText.gameobject.setScrollFactor(0);
		missionUtamaTaskText.transform.setMinPreferredDisplaySize(missionUtamaTaskIcon.transform.displayWidth * 0.3, missionUtamaTaskIcon.transform.displayHeight * 0.3);

		let missionUtamaTargetText = new Text(this.scene, missionUtamaTaskText.gameobject.x, missionUtamaTaskText.gameobject.y + missionUtamaTaskIcon.transform.displayHeight * 0.75, `0/${target}` , this.textStyleBlack);
		missionUtamaTargetText.gameobject.setOrigin(0, 0.5);
		missionUtamaTargetText.gameobject.setScrollFactor(0);
		missionUtamaTargetText.transform.setMinPreferredDisplaySize(missionUtamaTaskIcon.transform.displayWidth * 0.3, missionUtamaTaskIcon.transform.displayHeight * 0.3);
		this.missionTargetText.push({missionIcon: missionUtamaTaskIcon, missionTitle: missionUtamaTaskText, missionTarget: missionUtamaTargetText});
		this.missionUtamaTextContainer.add([missionUtamaTaskIcon.gameobject, missionUtamaTaskText.gameobject, missionUtamaTargetText.gameobject]);
	}

	/**
	 * 
	 * @param {MissionData} bonusMission 
	 * @param {Number} index 
	 */
	createBonusMissionText = (bonusMission = undefined, index = 0)=>{
		const {mission, target} = bonusMission;

		let missionBonusTaskIcon = new Image(this.scene, this.panel.gameobject.x - this.panel.transform.displayWidth * 0.35, (this.bonusMissionTitle.gameobject.y + this.bonusMissionTitle.transform.displayHeight * 3 * (index + 1)), GameplayAsset.ui_menu_task_iconn.key);
		missionBonusTaskIcon.gameobject.setOrigin(0.5);
		missionBonusTaskIcon.gameobject.setScrollFactor(0);
		missionBonusTaskIcon.transform.setMinPreferredDisplaySize(this.panel.transform.displayWidth * 0.05, this.prefreredHeightRatio(missionBonusTaskIcon, 0.1) * missionBonusTaskIcon.transform.displayHeight);

		let missionBonusTaskText = new Text(this.scene, missionBonusTaskIcon.gameobject.x + missionBonusTaskIcon.transform.displayWidth, missionBonusTaskIcon.gameobject.y - missionBonusTaskIcon.transform.displayHeight * 0.5, MissionHelper.FindAndRephraseMissionDescription(mission, target), this.textStyleBlack);
		missionBonusTaskText.gameobject.setOrigin(0);
		missionBonusTaskText.gameobject.setScrollFactor(0);
		missionBonusTaskText.transform.setMinPreferredDisplaySize(missionBonusTaskIcon.transform.displayWidth * 0.3, missionBonusTaskIcon.transform.displayHeight * 0.3);

		let missionBonusTargetText = new Text(this.scene, missionBonusTaskText.gameobject.x, missionBonusTaskText.gameobject.y + missionBonusTaskIcon.transform.displayHeight * 0.75,  `0/${target}` , this.textStyleBlack);
		missionBonusTargetText.gameobject.setOrigin(0, 0.5);
		missionBonusTargetText.gameobject.setScrollFactor(0);
		missionBonusTargetText.transform.setMinPreferredDisplaySize(missionBonusTaskIcon.transform.displayWidth * 0.3, missionBonusTaskIcon.transform.displayHeight * 0.3);
		this.bonusMissionList.push({missionIcon: missionBonusTaskIcon, missionTitle: missionBonusTaskText, missionTarget: missionBonusTargetText})
		this.missionBonusTextContainer.add([missionBonusTaskIcon.gameobject,  missionBonusTaskText.gameobject, missionBonusTargetText.gameobject]);
	}

	/**
	 * Show main mission text and hide main mission button
	 * @param {boolean} isShow 
	 */
	showMainMission = (isShow)=>{
		this.missionUtamaTextContainer.setVisible(isShow);
        this.mainMissionButton.container.setVisible(!isShow);
	}

	/**
	 * Show bonus mission text and hide bonus mission button
	 * @param {boolean} isShow 
	 */
	showBonusMission = (isShow)=>{
		this.missionBonusTextContainer.setVisible(isShow);
        this.bonusMissionButton.container.setVisible(!isShow);
	}

    /**
	 * 
	 * @param {Sprite} sprite 
	 * @param {Number} ratio 
	 * @returns {Number}
	 */
	prefreredHeightRatio = (sprite, ratio) => {
		return ((this.panel.transform.displayWidth * ratio) / sprite.transform.displayWidth);
	};
}