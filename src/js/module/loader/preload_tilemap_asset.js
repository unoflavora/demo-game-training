import { AssetInfo } from "../../info";
import { LoaderHelper } from "../../helper";
import GameplayData from "../../scene/gameplay/gameplay_data";

class PreloadTilemapAsset {
    /**@param {Phaser.Scene} scene*/
    constructor(scene){
        this.scene = scene;
    }

    /**
     * 
     * @param {String} mapName 
     * @returns {Promise}
     */
    loadTilemap = (mapName)=>{
        console.log(mapName)
        return new Promise((resolve)=>{
            let TilemapAsset = {};
            let mapJson = "";
		    if (this.scene.cache.tilemap.get(mapName)){
			    mapJson = JSON.stringify(this.scene.cache.tilemap.get(mapName));
		    }
            this.mapData = JSON.parse(mapJson);
        
            this.mapData.data.tilesets.forEach((tileset) => {
                if(tileset != null){
                    /**@type {string} */
                    let pathName = tileset.image.substring(tileset.image.lastIndexOf("./")+1);
                    if(!pathName.includes("/areas")){
                        pathName = "/areas" + pathName;
                    }
                    //Add pathname areas to asset path, if you move the tileset, dont forget change the path name
                    TilemapAsset[tileset.name] = {
                        key: tileset.name,
                        path:  pathName,
                        type: AssetInfo.type.STATIC
                    }
                }
            
		    });
            LoaderHelper.LoadAssets(this.scene, TilemapAsset);
            
            GameplayData.IS_WINTER = (mapJson.search('Salju') > -1);

            this.scene.load.once('complete', ()=>{
                resolve();
            });
            this.scene.load.start();
        })
    }
}

export { PreloadTilemapAsset }