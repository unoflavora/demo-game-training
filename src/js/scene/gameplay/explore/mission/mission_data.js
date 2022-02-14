/**
 * @typedef {"kill_monster" | "bonus" | "dialogue" | "special"| "hp" | "chest"} MissionTypes
 */

/**
 * @typedef {Object} MissionData
 * @property {string} key
 * @property {MissionTypes} type
 * @property {string} text
 * @property {string | undefined} target
 */

const MISSION_DATA = {
    //Monster Mission
    KILL_MONSTER_1: {
        key: "Kill Monster 1", 
        type: "kill_monster",
        text: "Perbaiki {amount} mesin",
    },
    KILL_MONSTER_2: {
        key: "Kill Monster 2", 
        type: "kill_monster",
        text: `Kalahkan {amount} Monster Ungu`
    },
    KILL_MONSTER_3: {
        key: "Kill Monster 3", 
        type: "kill_monster",
        text: `Kalahkan {amount} Boss`
    },
    KILL_MONSTER_4: {
        key: "Kill Monster 4", 
        type: "kill_monster",
        text: `Kalahkan {amount} Monster Biru`
    },
    KILL_MONSTER_5: {
        key: "Kill Monster 5",
        type: "kill_monster",
        text: `Kalahkan {amount} Monster Biru`
    },
    KILL_MONSTER_6: {
        key: "Kill Monster 6",
        type: "kill_monster",
        text: "Kalahkan orang misterius"
    },
    //Special Mission
    NO_HIT: {
        key: "No Hit",
        type: "special",
        text: "Tuntas tanpa kena serangan monster"
    },
    SPECIAL_ATTACK: {
        key: "Special Attack",
        type: "special",
        text: "Gunakan aksi Kemampuan"
    },
    HEAL: {
        key: "Heal",
        type: "special",
        text: "Gunakan aksi Sembuhkan"
    },
    //HP Mission
    HP_50: {
        key: "50 HP",
        type: "hp",
        text: "Tuntas dengan stamina >50%"
    },
    HP_75: {
        key: "75 HP",
        type: "hp",
        text: "Tuntas dengan stamina >75%"
    },
    HP_100: {
        key: "100 HP",
        type: "hp",
        text: "Tuntas dengan stamina 100%"
    },
    //NPC MISSION
    TALK_TO_NPC: {
        key: "Talk to Villagers",
        type: "dialogue",
        text: `Berbicara dengan {amount} penduduk`,
        target: "Villager"
    },
    TALK_TO_ELDER: {
        key: "Talk to Mentor",
        type: "dialogue",
        text: `Berbicara dengan {amount} mentor`,
        target: "Elder"
    },
    TALK_TO_SALES: {
        key: "Talk to sales",
        type: "dialogue",
        text: `Melakukan Sales Call dan Cross Selling`,
        target: "Sales"
    },
    TALK_TO_BM: {
        key: "Talk to BM",
        type: "dialogue",
        text: `Berbicara dengan BM`,
        target: "BM"
    },
    TALK_TO_BSM: {
        key: "Talk to BSM",
        type: "dialogue",
        text: `Mendapatkan info dari BSM`,
        target: "BSM"
    },
    INTERACT_WITH_BOOK: {
        key: "Interact with book",
        type: "dialogue",
        text: `Mendapatkan info dari Buku`,
        target: "Book"
    },
    INTERACT_WITH_SNOWMAN: {
        key: "Interact with snowman",
        type: "dialogue",
        text: `Interaksi dengan boneka salju`,
        target: "Snowman"
    },
    //BONUS Mission
    MAKE_NPC_HAPPY: {
        key: "Make Them Happy",
        type: "bonus",
        text: "Buat penduduk merasa bahagia"
    },
    MAKE_NPC_SUPER_HAPPY: {
        key: "Make Them Super Happy",
        type: "bonus",
        text: "Buat penduduk merasa sangat bahagia"
    },
    SOLVE_NPC_ISSUE: {
        key: "Solve Villagers' Issues",
        type: "bonus",
        text: "Selesaikan masalah penduduk"
    },
    //Chest Mission
    OPEN_CHEST: {
        key: "Open Chest",
        type: "chest",
        text: `Buka {amount} peti`
    },
    //Fullscreen VN
    WATCH_VN: {
        key: "Watch VN",
        type: "vn",
        text: "Selesaikan {amount} materi"
    }
}

/**@type {MissionData[]} */
const MISSION_LIST = Object.values(MISSION_DATA);

export {MISSION_DATA, MISSION_LIST}