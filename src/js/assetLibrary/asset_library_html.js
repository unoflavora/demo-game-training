import { AssetInfo } from "../info";

/**
 * Asset type definition
 * @typedef {import("../def/custom").Agate.Asset.AssetInfo} Assetinfo
 */
const HTMLAsset = {
    /**
     * @type {Assetinfo}
     */
	 bsl_content:{
		key: 'bslcontent',
		path: '/html/bslcontent.html',
		type: AssetInfo.type.HTML
	},
	close_button: {
		key: 'closebutton',
		path: '/html/closebutton.html',
		type: AssetInfo.type.HTML
	}
}

export {HTMLAsset}