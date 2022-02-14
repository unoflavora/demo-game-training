import './css/index.css'
import {SceneInfo} from './js/info/scene_info';
import packageData from "../package.json";

console.log(`GAME VERSION : ${packageData.version}`);

const isFirefox = /Firefox/i.test(navigator.userAgent)

function smallResolution()
{return window.innerWidth < 480}

function toEven(number)
{
    let result = Math.round(number);
    return result + result % 2
}


// Create method to calculate Screen Profile
function calculateScreen(){
	const dprModifier = (smallResolution() ? window.devicePixelRatio : 1);
    return {
        width: toEven(window.innerWidth * dprModifier),
        height: toEven(window.innerHeight * dprModifier),
        zoom: 1 / dprModifier
    }
}

// // Prevent zooming in iPhone/iPad/iPod
// if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
// 	var meta = document.createElement('meta');
// 	meta.name = "viewport";
// 	meta.content = `
// 	minimum-scale=1.00, 
// 	maximum-scale=1.00, 
// 	user-scalable= no`;
// 	document.head.appendChild(meta);
// }

function portraitConversion(config)
{
    let width = config.width;
    let height = config.height
    let isLandscape = width > height;

    width = !isLandscape ? width : height * (3 / 4);

    return {
        width: toEven(width),
        height: toEven(height),
        zoom: config.zoom
    }
}


// Set to WebGL in Firefox, using Canvas in Firefox somehow create performance / lagging issues
const renderType = isFirefox ? Phaser.WEBGL : Phaser.CANVAS;

var screenProfile = portraitConversion(calculateScreen());

let el = document.getElementById('game');
if (!el) {
	el = document.createElement('div')
	el.id = 'game';

	document.body.appendChild(el);
}

const phaserconfig = {
	type: Phaser.WEBGL,
	parent: 'game',
	scale: {
		mode: Phaser.Scale.NONE,
		autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
		width: screenProfile.width,
		height: screenProfile.height,
		zoom: screenProfile.zoom
	},
	scene: Object.values(SceneInfo).map((v) => v.module),
	dom: {
		createContainer: true
	},
	physics: {
		default: "arcade",
		arcade: {
		  gravity: { y: 0 }
		}
	},
	render: {
		antiAlias: false,
		pixelArt: false,
		roundPixels: false
	},
	autoRound: false
};

const game = new Phaser.Game(phaserconfig);

// Bind Resize Event
if (CONFIG.AUTO_CANVAS_RESIZE) {
	window.addEventListener('resize', () => {
		const screenProfile = portraitConversion(calculateScreen());
		game.scale.resize(screenProfile.width, screenProfile.height);
		game.scale.setZoom(screenProfile.zoom);
	});
}