import { GameplayAsset } from "../asset_library_gameplay";

const Animations = {
	//player
    male_idle:
    {
        key: 'char_male',
        type: 'ANIMATION',
        spritesheet: 'char_male',
        start: 32,
        end: 38,
        frameSpeed: 10,
        loop: true
    },
    female_idle:
    {
        key: 'char_female',
        type: 'ANIMATION',
        spritesheet: 'char_female',
        start: 32,
        end: 38,
        frameSpeed: 10,
        loop: true
    },

    //minigame - balloon
    baloon_1:
    {
        key: 'mg_balloon_monster_1',
        type: 'ANIMATION',
        spritesheet: 'mg_balloon_monster_1',
        start: 0,
        end: 3,
        frameSpeed: 10,
        loop: true
    },
    baloon_2:
    {
        key: 'mg_balloon_monster_2',
        type: 'ANIMATION',
        spritesheet: 'mg_balloon_monster_2',
        start: 0,
        end: 3,
        frameSpeed: 10,
        loop: true
    },
    baloon_3:
    {
        key: 'mg_balloon_monster_3',
        type: 'ANIMATION',
        spritesheet: 'mg_balloon_monster_3',
        start: 0,
        end: 3,
        frameSpeed: 10,
        loop: true
    },
    baloon_4:
    {
        key: 'mg_balloon_monster_4',
        type: 'ANIMATION',
        spritesheet: 'mg_balloon_monster_4',
        start: 0,
        end: 3,
        frameSpeed: 10,
        loop: true
    },
    baloon_5:
    {
        key: 'mg_balloon_monster_5',
        type: 'ANIMATION',
        spritesheet: 'mg_balloon_monster_5',
        start: 0,
        end: 3,
        frameSpeed: 10,
        loop: true
    },
    // //Monster
    // monster_lvl_1 : {
    //     key: GameplayAsset.monster_1.key,
    //     type: 'ANIMATION',
    //     spritesheet: GameplayAsset.monster_1.key,
    //     start: 0,
    //     end: 7,
    //     frameSpeed: 15,
    //     loop: true
    // }
}

export {Animations}