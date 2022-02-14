import { AssetInfo } from "../info";

/**
 * Asset type definition
 * @typedef {import("../def/custom").Agate.Asset.AssetInfo} AssetInfo
 */
const UIAsset = {
    /**
     * @type {AssetInfo}
     */
	  Cover_black:{
		  key: 'cover_black',
        path: '/img/ui/cover_black.png',
        type: AssetInfo.type.STATIC
    },
}

export {UIAsset}