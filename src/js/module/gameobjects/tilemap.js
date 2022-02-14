/**
 * @class
 * @typedef {import('../../def/custom').Agate.Tiled.Object} Object
 */

/**
 * @class Tilemap class gameobject
 */
export default class Tilemap {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {string} mapName 
     */
     constructor(scene, mapName) {
        
        /** @private @type {Phaser.Scene} */
        this.scene = scene;
        this.mapName = mapName;
        this.mapData = this.scene.cache.tilemap.get(mapName);

        this.map;
        /**@type {Phaser.Tilemaps.Tileset[]} */
        this.tilesetGroup = [];
        /**@type {Phaser.Tilemaps.StaticTilemapLayer[]} */
        this.layerGroup = [];
    }

    /**
     * creating tilemap based on tileset json data
     * @param {Number} tileWidth 
     * @param {Number} tileHeight 
     * @param {Number} tileMargin 
     * @param {Number} tileSpacing 
     */
    createTilemap = ()=>{
        console.log('mapname: ', this.mapName)
        this.map = this.scene.make.tilemap({ key: this.mapName });

        /**Create tileset/palette for creating layer */
        this.mapData.data.tilesets.forEach(tileset => {
            if (tileset != null) {
                this.tilesetGroup.push(this.map.addTilesetImage(tileset.name, tileset.name, tileset.tileWidth, tileset.tileHeight, tileset.margin, tileset.space));
            }
        });

        /**Generate only Tile Layer no object layer */
        this.mapData.data.layers.forEach(element => {
            if (element != null) {
                if (element["type"] == "tilelayer"){
                    let layer = this.map.createLayer(element.name, this.tilesetGroup);
                    layer.name = element.name;

                    this.layerGroup.push(layer);
                }
            }

        });
    }

    /**
     * Get object data on defined object layer with custom properties
     * @param {string} layerName
     * @returns {Object[]} 
     */
    getObjectLayerData = (layerName)=>{
        /**@type {Object[]} */
        let objectData = [];
        this.mapData.data.layers.forEach(layer=>{
            if(layer.name == layerName && layer.type == "objectgroup"){
                layer.objects.forEach(object =>{
                    objectData.push({name: object.name, id: object.id, width: object.width, height: object.height, type: object.type, x: object.x, y: object.y, properties: object.properties });
                })
            }
        })

        return objectData;
    }
}