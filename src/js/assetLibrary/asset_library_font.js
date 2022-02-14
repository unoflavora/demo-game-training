import { AssetInfo } from "../info";

/**
 * Asset type definition
 * @typedef {import("../def/custom").Agate.Asset.AssetInfo} AssetInfo
 */
const FontAsset = {
	cabin_bold:
    {
        key: 'cabin_bold',
        type: AssetInfo.type.FONT,
        path: '/fonts/Cabin-Bold.ttf'
    },
    cabin_bold_italic:
    {
        key: 'cabin_bold_italic',
        type: AssetInfo.type.FONT,
        path: '/fonts/Cabin-BoldItalic.ttf'
    },
    cabin_italic:
    {
        key: 'cabin_italic',
        type: AssetInfo.type.FONT,
        path: '/fonts/Cabin-Italic.ttf'
    },
    cabin_medium:
    {
        key: 'cabin_medium',
        type: AssetInfo.type.FONT,
        path: '/fonts/Cabin-Medium.ttf'
    },
    cabin_medium_italic:
    {
        key: 'cabin_medium_italic',
        type: AssetInfo.type.FONT,
        path: '/fonts/Cabin-MediumItalic.ttf'
    },
    cabin_regular:
    {
        key: 'cabin_regular',
        type: AssetInfo.type.FONT,
        path: '/fonts/Cabin-Regular.ttf'
    },
    cabin_semi_bold:
    {
        key: 'cabin_semi_bold',
        type: AssetInfo.type.FONT,
        path: '/fonts/Cabin-SemiBold.ttf'
    },
    cabin_semi_bold_italic:
    {
        key: 'cabin_semi_bold_italic',
        type: AssetInfo.type.FONT,
        path: '/fonts/Cabin-SemiBoldItalic.ttf'
    }

}

export {FontAsset}