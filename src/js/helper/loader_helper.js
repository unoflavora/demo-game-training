import { AssetInfo } from "../info";
import { LoaderController } from "../module/loader"

/**
 * @typedef {import("../def/custom").Agate.Asset.AssetInfo} Asset
 */
class LoaderHelper {
    /**
     * @param {Phaser.Scene} scene 
     * @param {import("../def/custom").Agate.Asset.AssetInfo} imageInfo 
     */
    static LoadImage(scene, imageInfo) {
        scene.load.image(imageInfo.key,
            CONFIG.BASE_ASSET_URL + imageInfo.path);
    }

    /**
     * @param {Phaser.Scene} scene 
     * @param {import("../def/custom").Agate.Asset.SpriteSheetInfo} spriteSheetInfo 
     */
    static LoadSpriteSheet(scene, spriteSheetInfo) {
        scene.load.spritesheet(
            spriteSheetInfo.key,
            CONFIG.BASE_ASSET_URL + spriteSheetInfo.path, {
                frameWidth: spriteSheetInfo.width,
                frameHeight: spriteSheetInfo.height
            }
        );
    }

    /**
     * @param {Phaser.Scene} scene 
     * @param {Asset} audioInfo 
     */
    static LoadAudio(scene, audioInfo) {
        scene.load.audio(
            audioInfo.key,
            CONFIG.BASE_ASSET_URL + audioInfo.path
        );
    }

    /**
     * @param {Phaser.Scene} scene 
     * @param {Asset} htmlInfo 
     */
    static LoadHtmlFile(scene, info) {
        scene.load.html(
            info.key,
            CONFIG.BASE_ASSET_URL + info.path
        );
    }

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Asset} info 
     */
    static LoadTextFile(scene, info){
        scene.load.text(
            info.key,
            CONFIG.BASE_ASSET_URL + info.path
        );
    }

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Asset} info 
     */
     static LoadTileMap(scene, info){
        scene.load.json(info.key, CONFIG.BASE_ASSET_URL + info.path);
        scene.load.tilemapTiledJSON(info.key, CONFIG.BASE_ASSET_URL + info.path);
    }

    /**
     * @param {Phaser.Scene} scene 
     * @param {import("../def/custom").Agate.Asset.MultiAtlasInfo} info 
     */
    static LoadMultiAtlas(scene, info) {
        scene.load.setPath(CONFIG.BASE_ASSET_URL + info.path);
        scene.load.multiatlas(info.key, info.json_file);
        scene.load.setPath('');
    }

    /**
     * @param {Phaser.Scene} scene 
     */
    static LoadAssets(scene, assets) {

        for (let key in assets) {
            /**
             * @type {Asset}
             */
            let asset = assets[key];

            if(scene.textures.exists(asset.key)) continue;

            if (asset.type == AssetInfo.type.STATIC) {
                //console.log(asset)
                this.LoadImage(scene, asset);
            } else if (asset.type == AssetInfo.type.SPRITESHEET) {
                this.LoadSpriteSheet(scene, asset);
            } else if (asset.type == AssetInfo.type.AUDIO) {
                this.LoadAudio(scene, asset);
            } else if (asset.type == AssetInfo.type.HTML) {
                this.LoadHtmlFile(scene, asset);
            } else if(asset.type == AssetInfo.type.TEXT) {
                this.LoadTextFile(scene, asset);
            } else if(asset.type == AssetInfo.type.MULTIATLAS){
                this.LoadMultiAtlas(scene, asset);
            } else if (asset.type == AssetInfo.type.TILEMAP) {
                this.LoadTileMap(scene, asset);
            } else {
                console.log(`FOUND UNKNOWN ASSET = ${asset.type}`)
            }
        }

    }
    static loadJSON = (assets) => {

        let JSONArray = [];

        for (let key in assets) {
            let asset = assets[key];
            JSONArray.push({
                key: asset.key,
                path: CONFIG.BASE_ASSET_URL+asset.path
            });
        }
        // console.log(JSONArray);
        return JSONArray;
    }

    static loadCSV = (assets) => {

        let CSVArray = [];

        for (let key in assets) {
            let asset = assets[key];
            CSVArray.push({
                key: asset.key,
                path: CONFIG.BASE_ASSET_URL+asset.path,
                kluster: asset.kluster,
                type: asset.type
            });
        }
        // console.log(CSVArray);
        return CSVArray;
    }

    static loadFonts = (assets) => {

        let assetFontArray = [];

        for (let key in assets) {
            let asset = assets[key];
            assetFontArray.push({
                key: asset.key,
                path: CONFIG.BASE_ASSET_URL + asset.path,
            });
        }
        // console.log(assetFontArray);
        Promise.all(
            [
                LoaderController.getInstance().init(),
                LoaderController.getInstance().loadFonts(assetFontArray)
            ]);
    }
}

export {LoaderHelper}