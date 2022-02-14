import { AssetInfo } from "../info";

/**
 * Asset type definition
 * @typedef {import("../def/custom").Agate.Asset.AssetInfo} AssetInfo
 */
const LoadingAsset = {
	loading_bg:{
		key: 'title_background',
		path: '/img/title/background.png',
		type: AssetInfo.type.STATIC
	},

	loading_logo:{
		key: 'title_logo',
		path: '/img/title/UITitlescreen_Judul.png',
		type: AssetInfo.type.STATIC
	},

	title_loading_bar:
    {
        key: 'title_loading_bar',
        path: '/img/title/UITitlescreen_Loadingbar.png',
        type: AssetInfo.type.SPRITESHEET,
        width: 808/2,
		height: 26
    }
}

export {LoadingAsset}