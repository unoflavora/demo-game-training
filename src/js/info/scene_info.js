import BootSceneController from "../scene/boot/boot_scene_controller"
import LoadingSceneController from "../scene/loading/loading_scene_controller"
import TitleSceneController from "../scene/title/title_scene_controller"
import GameplaySceneController from "../scene/gameplay/gameplay_scene_controller"
import DebugSceneController from "../scene/debug/debug_scene_controller"
import CharSettingSceneController from "../scene/char_setting/char_setting_scene_controller"
import WorldmapSceneController from "../scene/worldmap/worldmap_scene_controller"
import ExploreSceneController from "../scene/gameplay/explore/explore_scene_controller"
import BattleSceneController from "../scene/gameplay/battle/battle_scene_controller"
import MinigameFruitSceneController from "../scene/gameplay/minigame/fruit/minigame_fruit_scene_controller"
import MinigameBalloonSceneController from "../scene/gameplay/minigame/balloon/minigame_balloon_scene_controller"
import VisualNovelSceneController from "../scene/gameplay/visual_novel/vn_controller"

const SceneInfo = {
    BOOT: {
        key: "BootScene",
        module: BootSceneController
    },
    LOADING: {
        key: "LoadingScene",
        module: LoadingSceneController
    },
    TITLE: {
        key: "TitleScene",
        module: TitleSceneController
    },
    GAMEPLAY: {
        key: "GameplayScene",
        module: GameplaySceneController
    },
    DEBUG: {
        key: "DebugScene",
        module: DebugSceneController
    },
    CHARCREATION: {
        key: "CharCreation",
        module: CharSettingSceneController
    },
    WORLDMAP: {
        key: 'WorldmapScene',
        module: WorldmapSceneController
    },
    EXPLORE: {
        key: 'ExploreScene',
        module: ExploreSceneController
    },
    BATTLE: {
        key: 'BattleScene',
        module: BattleSceneController
    },
    MINIGAMEFRUIT: {
        key: 'MinigameFruitScene',
        module: MinigameFruitSceneController
    },
    MINIGAMEBALOON: {
        key: 'MinigameBalloonScene',
        module: MinigameBalloonSceneController
    },
    VISUALNOVEL: {
        key: 'VisualNovelScene',
        module: VisualNovelSceneController
    }
}

export {SceneInfo}