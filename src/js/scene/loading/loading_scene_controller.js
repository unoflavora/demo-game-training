import LoadingSceneView from "./loading_scene_view";
import { LoaderHelper } from "../../helper";
import { SceneInfo } from "../../info";
import DomAssetLoadHelper from "../../module/assetLoader/dom_asset_load_helper";
import * as Asset from "../../assetLibrary"
import { BaseSceneController } from "../../core";


export default class LoadingSceneController extends BaseSceneController {
    constructor() {
        super({
            key: SceneInfo.LOADING.key
        });
    }

    init = () => {
        this.view = new LoadingSceneView(this);
    }

    preload = () => {
        Promise.resolve()
        .then(this.loadLoadingResources)
        .then(this.setupLoading)
        .then(this.loadMainResouces)
        .then(()=>{
            try{
                this.load.removeAllListeners();
                this.view.initLoading(1);
                this.scene.start(SceneInfo.TITLE.key);
            }catch{}
        })
        .catch((error)=>{
            console.log("ERROR"+error);
        });

    }

    /**
     * Load font
     * @public
     */
     LoadFonts = () => {
        return DomAssetLoadHelper.loadFonts(Object.values(Asset.FontAsset))
    }


    /**
     * Load Boot Resources
     * @public
     */
    loadLoadingResources = () => {
        return new Promise((resolve)=>{
            // LOAD HERE
            LoaderHelper.LoadAssets(this, Asset.LoadingAsset);

            this.load.once('complete', ()=>{
                resolve();
            });

            this.load.start();
        });
    }


     /**
     * Function after loadBootResource Complete
     * @public
     */
      setupLoading = () => {
        return new Promise((resolve)=>{
            this.view.create();
            this.load.on('progress', (value) => {
                this.view.initLoading(value);
            });

            resolve();
        })
    }

    /**
     * Load All Resources
     * @public
     */
    loadMainResouces = () => {
        return new Promise((resolve)=>{
            // LOAD HERE
            LoaderHelper.LoadAssets(this, Asset.GameplayAsset);
            LoaderHelper.LoadAssets(this, Asset.AudioAsset);
            LoaderHelper.LoadAssets(this, Asset.AreaAsset);
            /**@description Uncomment if you need bsl content */
            //LoaderHelper.LoadAssets(this, Asset.HTMLAsset);
            LoaderHelper.LoadAssets(this, Asset.MissionsAsset);
            LoaderHelper.LoadAssets(this, Asset.QuestionsAsset);
            LoaderHelper.LoadAssets(this, Asset.RoleplayAsset);
            LoaderHelper.LoadAssets(this, Asset.DialogAsset);
            LoaderHelper.LoadAssets(this, Asset.MonsterAsset);
            LoaderHelper.LoadAssets(this, Asset.NpcAsset);
            LoaderHelper.LoadAssets(this, Asset.BackgroundAsset);
            LoaderHelper.LoadAssets(this, Asset.HTMLAsset)
                    console.log(this.screenUtility)

            this.load.once('complete', resolve);
            this.load.start();
        });
    }

}