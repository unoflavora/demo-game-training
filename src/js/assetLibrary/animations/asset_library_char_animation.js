import { GameplayAsset } from "../asset_library_gameplay";

const CharAnimations = {
    //Male idle
    male_idle_down : 
    {
        key: 'male_idle_down',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_male.key,
        start: 32,
        end: 39,
        frameSpeed: 10,
        loop: true
    },
    male_idle_up : 
    {
        key: 'male_idle_up',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_male.key,
        start: 40,
        end: 47,
        frameSpeed: 10,
        loop: true
    },
    male_idle_left : 
    {
        key: 'male_idle_left',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_male.key,
        start: 48,
        end: 55,
        frameSpeed: 10,
        loop: true
    },
    male_idle_right : 
    {
        key: 'male_idle_right',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_male.key,
        start: 56,
        end: 63,
        frameSpeed: 10,
        loop: true
    },
    //Male walk
    male_walk_up : 
    {
        key: 'male_walk_up',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_male.key,
        start: 8,
        end: 15,
        frameSpeed: 10,
        loop: true
    },
    male_walk_down: 
    {
        key: 'male_walk_down',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_male.key,
        start: 0,
        end: 7,
        frameSpeed: 10,
        loop: true
    },
    male_walk_left: 
    {
        key: 'male_walk_left',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_male.key,
        start: 16,
        end: 23,
        frameSpeed: 10,
        loop: true
    },
    male_walk_right: 
    {
        key: 'male_walk_right',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_male.key,
        start: 24,
        end: 31,
        frameSpeed: 10,
        loop: true
    },
    //Female idle
    female_idle_down : 
    {
        key: 'female_idle_down',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_female.key,
        start: 32,
        end: 39,
        frameSpeed: 10,
        loop: true
    },
    female_idle_up : 
    {
        key: 'female_idle_up',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_female.key,
        start: 40,
        end: 47,
        frameSpeed: 10,
        loop: true
    },
    female_idle_left : 
    {
        key: 'female_idle_left',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_female.key,
        start: 48,
        end: 55,
        frameSpeed: 10,
        loop: true
    },
    female_idle_right : 
    {
        key: 'female_idle_right',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_female.key,
        start: 56,
        end: 63,
        frameSpeed: 10,
        loop: true
    },
    //Female walk
    female_walk_up : 
    {
        key: 'female_walk_up',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_female.key,
        start: 8,
        end: 15,
        frameSpeed: 10,
        loop: true
    },
    female_walk_down: 
    {
        key: 'female_walk_down',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_female.key,
        start: 0,
        end: 7,
        frameSpeed: 10,
        loop: true
    },
    female_walk_left: 
    {
        key: 'female_walk_left',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_female.key,
        start: 16,
        end: 23,
        frameSpeed: 10,
        loop: true
    },
    female_walk_right: 
    {
        key: 'female_walk_right',
        type: 'ANIMATION',
        spritesheet: GameplayAsset.char_female.key,
        start: 24,
        end: 31,
        frameSpeed: 10,
        loop: true
    }
}
export {CharAnimations}