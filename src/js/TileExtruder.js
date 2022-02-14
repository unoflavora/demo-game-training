const { extrudeTilesetToImage } = require("tile-extruder");

const BASE_TILE_ASSET_PATH = "../assets/areas";

const TILEASSETS = [
    {
        src: "/tiles/Trakindo/tileset trakindo.png",
        output: "/tiles/Trakindo/tileset trakindo_extruded.png"
    }
]

async function main() {
    TILEASSETS.forEach(async (e, idx) =>{
        await extrudeTilesetToImage(64, 64, BASE_TILE_ASSET_PATH + e.src, BASE_TILE_ASSET_PATH + e.output);
    })
}

main();