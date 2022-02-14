## Changelog

### What's different from previous Deshima version ?

1. Add More JsDoc
2. Simplify flow in char setting controller , tutorial, and worlmap controller
3. Npc and monster has own asset library found in `assetLibrary/object/`
4. Tilemap and tile image asset become one folder structure in `assets/areas/`
5. Mission data put in separate files named `mission_data.js`
6. Tilemap's tileset using 1 margin and 2 spacing for avioding tilemap bleeding
7. Edit mission csv data more simple
8. Integrating pubsub for improve mission system, in `module/pubsub/`.
9. `mission_progress_HUD` now become `menu_controller` for separating mission view and logic checking.
10. `mission_scene_controller` now become `worldmap_scene_controller` for avoid confuse naming.
11. `player_controller` now become `character_controller` because movement handled by physics now.
12. `explorer_state_saver` now become  `explore_state_saver` for the sake for simplicity name & logic
12. In Explore tilemap interaction now handled with collider.
13. Minigame assets loaded if scene loaded.
14. Player position spawn handled by tilemap
15. Add global variable for config and litte edit on webpack.
16. Add cheat configuration in `base config`.
17. Add new layer named **Above** in tilemap, making layer rendered above the player.


