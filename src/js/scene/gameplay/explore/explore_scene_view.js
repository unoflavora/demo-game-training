import {BaseView} from '../../../core'
import GameplayData from '../gameplay_data';
import Tilemap from '../../../module/gameobjects/tilemap';
import { ObjectFactory } from '../../../module/factory'
import { ButtonAnalog } from "../../../module/gameobjects/custom";
import { TileInfo } from '../../../info';
import { FadeIn, SandClockPanel} from "../../../module/gameobjects/transition"
import { Chest, Monster, Npc, Teleporter, TeleporterButton } from "../../../module/gameobjects/tileobjects"


export default class ExploreSceneView extends BaseView{

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super(scene);

        /**@type {boolean} */
        this.isRefresh;

        /**@type {Chest[]} */
        this.chestList = [];
        /**@type {Monster[]} */
        this.enemyList = [];
        /**@type {Npc[]} */
        this.npcList = [];
        /**@type {Teleporter[]} */
        this.teleporterList = [];
        /**@type {TeleporterButton[]} */
        this.teleporterButtonList = [];

        /**@type {Phaser.GameObjects.Group} */
        this.chestGroup = this.scene.add.group();
        /**@type {Phaser.GameObjects.Group} */
        this.enemyGroup = this.scene.add.group();
        /**@type {Phaser.GameObjects.Group} */
        this.npcGroup = this.scene.add.group();
        /**@type {Phaser.GameObjects.Group} */
        this.teleporterGrourp = this.scene.add.group();
        
    }

    /**
     * Init map name to generate tilemap
     * @param {string} mapName 
     */
    init = (mapName)=>{
     
        this.tileMap = new Tilemap(this.scene, mapName);
        this.buttonAnalog = new ButtonAnalog(this.scene);
        this.transition = new FadeIn(this.scene);
        this.sandclockPanel = new SandClockPanel(this.scene, this.screenUtility.centerX, this.screenUtility.centerY);
    }

    createTileMap = ()=>{
        console.log('creating tilemap')
        this.tileMap.createTilemap();
        
    }

    /**@param {string} layerName*/
    setLayerDepth = (layerName)=>{
        const layer = this.tileMap.layerGroup.find(layer => layer.name == layerName);
        if(layer != undefined)
            layer.setDepth(5);
    }

    createChests = ()=>{
        let chests = this.tileMap.getObjectLayerData(TileInfo.objectgroup.OBJECTS).filter((t)=> (t.type == "peti") || (t.type == "peti_part"));

        chests.forEach(chest=>{
            let props = {scene: this.scene, object: chest }

            /**@type {Chest} */
            let ch = ObjectFactory('Chest', props);
            this.chestList.push(ch);
            this.chestGroup.add(ch.gameobject);
            if(ch.type == "peti_part"){
                this.chestGroup.add(ch.chestPartEffect.gameobject);
            }
        });
    }

    createEnemies = ()=>{
        let enemies = this.tileMap.getObjectLayerData(TileInfo.objectgroup.MONSTER);
        enemies.forEach(enemy => {
            let props = {scene: this.scene, object: enemy }

            /**@type {Monster} */
            let en = ObjectFactory('Monster', props);
            en.playIdleAnimation();

            this.enemyList.push(en);
            this.enemyGroup.add(en.gameobject);
        });
    }

    createTeleporter = ()=>{
        let teleporters = this.tileMap.getObjectLayerData(TileInfo.objectgroup.OBJECTS).filter((obj)=> obj.type == "go_to");
        teleporters.forEach(teleporter => {
            let props = {scene: this.scene, object: teleporter }

            /**@type {Teleporter} */
            let tele = ObjectFactory('Teleporter', props);

            this.teleporterList.push(tele);
            this.teleporterGrourp.add(tele.gameobject);
        });
    }


    createTeleporterButton = ()=>{
        let teleportersBtn = this.tileMap.getObjectLayerData(TileInfo.objectgroup.OBJECTS).filter((obj)=> obj.type == "go_to_button");
        teleportersBtn.forEach(teleporter => {
            let props = {scene: this.scene, object: teleporter }

            /**@type {TeleporterButton} */
            let tele = ObjectFactory('TeleporterButton', props);

            this.teleporterButtonList.push(tele);
        });
    }

    getPlayerPosition = ()=>{
        let objectLayer = this.tileMap.getObjectLayerData(TileInfo.objectgroup.PLAYER);
        //Only get the first element because player only one
        let objectData = (objectLayer[0] == undefined)?{x:0, y:0} : objectLayer[0];
        let direction = (objectLayer[0] == undefined)? "u": objectLayer[0].properties.find((v) => v.name == 'direction').value;
        return {x: objectData.x, y: objectData.y, direction: direction }
    }

    createNpc = ()=>{
        let npcs = this.tileMap.getObjectLayerData(TileInfo.objectgroup.NPCS);
        npcs.forEach(npc => {          
            let props = {scene: this.scene, object: npc }

            /**@type {Npc} */
            let np = ObjectFactory('Npc', props);
            np.playIdleAnimation();
            
            this.npcList.push(np);
            this.npcGroup.add(np.gameobject);
        });
    }

    create =  ()=>{
        const { centerX, width, centerY, height} = this.screenUtility;
        this.buttonAnalog.createAnalog(centerX + width * 0.25, height - height * 0.1, width, height);
        this.uiContainer = this.scene.add.container().add(this.buttonAnalog.container);
    }

    /**
     * 
     * @param {Number} id 
     * @param {boolean} activate 
     */
    findObjectById = (id,activate = true)=>{
        const npc_part = this.npcList.find((el)=>el.id == id);
        npc_part?.setActive(activate);

        const chest_part = this.chestList.find((el)=>el.id == id);
        chest_part?.setActive(activate);

        const teleport_part = this.teleporterList.find((el)=>el.id == id);
        teleport_part?.setActive(activate);
    }

}