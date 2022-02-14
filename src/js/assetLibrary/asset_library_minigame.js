import { AssetInfo } from "../info";

/**
 * Asset type definition
 * @typedef {import("../def/custom").Agate.Asset.AssetInfo} AssetInfo
 */
const MinigameAsset = {
	
	//mini game fruit - for now just 2 patterns 2 colors each
	mg_juice_bg:{
		key: 'mg_juice_bg',
		path: '/img/mini_games/fruit/MGJuice_BG.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_bar:{
		key: 'mg_juice_bar',
		path: '/img/mini_games/fruit/MGJuice_PointBar.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 664/2,
		height: 29
	},

	mg_juice_tut_1:{
		key: 'mg_juice_tut_1',
		path: '/img/mini_games/fruit/MGJuice_Tutorial1konten.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_tut_2:{
		key: 'mg_juice_tut_2',
		path: '/img/mini_games/fruit/MGJuice_Tutorial2konten.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_tut_3:{
		key: 'mg_juice_tut_3',
		path: '/img/mini_games/fruit/MGJuice_Tutorial3konten.png',
		type: AssetInfo.type.STATIC
	},
	
	mg_juice_rock_horz:{
		key: 'mg_juice_rock_horz',
		path: '/img/mini_games/fruit/batu/MGJuice_BatuLubangHorizontal.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert:{
		key: 'mg_juice_rock_vert',
		path: '/img/mini_games/fruit/batu/MGJuice_BatuLubangVertikal.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_wrong:{
		key: 'mg_juice_rock_horz_wrong',
		path: '/img/mini_games/fruit/batu/MGJuice_BatuLubangHorizontal_Wrong.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_wrong:{
		key: 'mg_juice_rock_vert_wrong',
		path: '/img/mini_games/fruit/batu/MGJuice_BatuLubangVertikal_Wrong.png',
		type: AssetInfo.type.STATIC
	},
	//square
	mg_juice_rock_horz_square_green:{
		key: 'mg_juice_rock_horz_square_green',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuHijauHorizontal_Kotak1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_square_green_2:{
		key: 'mg_juice_rock_horz_square_green_2',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuHijauHorizontal_Kotak2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_square_green:{
		key: 'mg_juice_rock_vert_square_green',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuHijauVertikal_Kotak1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_square_green_2:{
		key: 'mg_juice_rock_vert_square_green_2',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuHijauVertikal_Kotak2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_square_yellow:{
		key: 'mg_juice_rock_horz_square_yellow',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuKuningHorizontal_Kotak1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_square_yellow_2:{
		key: 'mg_juice_rock_horz_square_yellow_2',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuKuningHorizontal_Kotak2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_square_yellow:{
		key: 'mg_juice_rock_vert_square_yellow',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuKuningVertikal_Kotak1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_square_yellow_2:{
		key: 'mg_juice_rock_vert_square_yellow_2',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuKuningVertikal_Kotak2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_square_red:{
		key: 'mg_juice_rock_horz_square_red',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuMerahHorizontal_Kotak1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_square_red_2:{
		key: 'mg_juice_rock_horz_square_red_2',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuMerahHorizontal_Kotak2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_square_red:{
		key: 'mg_juice_rock_vert_square_red',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuMerahVertikal_Kotak1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_square_red_2:{
		key: 'mg_juice_rock_vert_square_red_2',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuMerahVertikal_Kotak2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_square_purple:{
		key: 'mg_juice_rock_horz_square_purple',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuUnguHorizontal_Kotak1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_square_purple_2:{
		key: 'mg_juice_rock_horz_square_purple_2',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuUnguHorizontal_Kotak2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_square_purple:{
		key: 'mg_juice_rock_vert_square_purple',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuUnguVertikal_Kotak1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_square_purple_2:{
		key: 'mg_juice_rock_vert_square_purple_2',
		path: '/img/mini_games/fruit/batu/kotak/MGJuice_BatuUnguVertikal_Kotak2.png',
		type: AssetInfo.type.STATIC
	},
	//circle
	mg_juice_rock_horz_circle_green:{
		key: 'mg_juice_rock_horz_circle_green',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuHijauHorizontal_Lingkaran1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_circle_green_2:{
		key: 'mg_juice_rock_horz_circle_green_2',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuHijauHorizontal_Lingkaran2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_circle_green:{
		key: 'mg_juice_rock_vert_circle_green',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuHijauVertikal_Lingkaran1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_circle_green_2:{
		key: 'mg_juice_rock_vert_circle_green_2',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuHijauVertikal_Lingkaran2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_circle_yellow:{
		key: 'mg_juice_rock_horz_circle_yellow',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuKuningHorizontal_Lingkaran1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_circle_yellow_2:{
		key: 'mg_juice_rock_horz_circle_yellow_2',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuKuningHorizontal_Lingkaran2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_circle_yellow:{
		key: 'mg_juice_rock_vert_circle_yellow',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuKuningVertikal_Lingkaran1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_circle_yellow_2:{
		key: 'mg_juice_rock_vert_circle_yellow_2',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuKuningVertikal_Lingkaran2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_circle_red:{
		key: 'mg_juice_rock_horz_circle_red',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuMerahHorizontal_Lingkaran1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_circle_red_2:{
		key: 'mg_juice_rock_horz_circle_red_2',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuMerahHorizontal_Lingkaran2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_circle_red:{
		key: 'mg_juice_rock_vert_circle_red',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuMerahVertikal_Lingkaran1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_circle_red_2:{
		key: 'mg_juice_rock_vert_circle_red_2',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuMerahVertikal_Lingkaran2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_circle_purple:{
		key: 'mg_juice_rock_horz_circle_purple',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuUnguHorizontal_Lingkaran1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_horz_circle_purple_2:{
		key: 'mg_juice_rock_horz_circle_purple_2',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuUnguHorizontal_Lingkaran2.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_circle_purple:{
		key: 'mg_juice_rock_vert_circle_purple',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuUnguVertikal_Lingkaran1.png',
		type: AssetInfo.type.STATIC
	},
	mg_juice_rock_vert_circle_purple_2:{
		key: 'mg_juice_rock_vert_circle_purple_2',
		path: '/img/mini_games/fruit/batu/lingkaran/MGJuice_BatuUnguVertikal_Lingkaran2.png',
		type: AssetInfo.type.STATIC
	},
//triangle
mg_juice_rock_horz_triangle_green:{
	key: 'mg_juice_rock_horz_triangle_green',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuHijauHorizontal_Segitiga1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_triangle_green_2:{
	key: 'mg_juice_rock_horz_triangle_green_2',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuHijauHorizontal_Segitiga2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_triangle_green:{
	key: 'mg_juice_rock_vert_triangle_green',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuHijauVertikal_Segitiga1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_triangle_green_2:{
	key: 'mg_juice_rock_vert_triangle_green_2',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuHijauVertikal_Segitiga2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_triangle_yellow:{
	key: 'mg_juice_rock_horz_triangle_yellow',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuKuningHorizontal_Segitiga1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_triangle_yellow_2:{
	key: 'mg_juice_rock_horz_triangle_yellow_2',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuKuningHorizontal_Segitiga2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_triangle_yellow:{
	key: 'mg_juice_rock_vert_triangle_yellow',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuKuningVertikal_Segitiga1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_triangle_yellow_2:{
	key: 'mg_juice_rock_vert_triangle_yellow_2',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuKuningVertikal_Segitiga2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_triangle_red:{
	key: 'mg_juice_rock_horz_triangle_red',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuMerahHorizontal_Segitiga1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_triangle_red_2:{
	key: 'mg_juice_rock_horz_triangle_red_2',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuMerahHorizontal_Segitiga2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_triangle_red:{
	key: 'mg_juice_rock_vert_triangle_red',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuMerahVertikal_Segitiga1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_triangle_red_2:{
	key: 'mg_juice_rock_vert_triangle_red_2',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuMerahVertikal_Segitiga2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_triangle_purple:{
	key: 'mg_juice_rock_horz_triangle_purple',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuUnguHorizontal_Segitiga1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_triangle_purple_2:{
	key: 'mg_juice_rock_horz_triangle_purple_2',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuUnguHorizontal_Segitiga2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_triangle_purple:{
	key: 'mg_juice_rock_vert_triangle_purple',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuUnguVertikal_Segitiga1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_triangle_purple_2:{
	key: 'mg_juice_rock_vert_triangle_purple_2',
	path: '/img/mini_games/fruit/batu/segitiga/MGJuice_BatuUnguVertikal_Segitiga2.png',
	type: AssetInfo.type.STATIC
},
//cross
mg_juice_rock_horz_cross_green:{
	key: 'mg_juice_rock_horz_cross_green',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuHijauHorizontal_Silang1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_cross_green_2:{
	key: 'mg_juice_rock_horz_cross_green_2',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuHijauHorizontal_Silang2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_cross_green:{
	key: 'mg_juice_rock_vert_cross_green',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuHijauVertikal_Silang1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_cross_green_2:{
	key: 'mg_juice_rock_vert_cross_green_2',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuHijauVertikal_Silang2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_cross_yellow:{
	key: 'mg_juice_rock_horz_cross_yellow',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuKuningHorizontal_Silang1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_cross_yellow_2:{
	key: 'mg_juice_rock_horz_cross_yellow_2',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuKuningHorizontal_Silang2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_cross_yellow:{
	key: 'mg_juice_rock_vert_cross_yellow',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuKuningVertikal_Silang1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_cross_yellow_2:{
	key: 'mg_juice_rock_vert_cross_yellow_2',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuKuningVertikal_Silang2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_cross_red:{
	key: 'mg_juice_rock_horz_cross_red',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuMerahHorizontal_Silang1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_cross_red_2:{
	key: 'mg_juice_rock_horz_cross_red_2',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuMerahHorizontal_Silang2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_cross_red:{
	key: 'mg_juice_rock_vert_cross_red',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuMerahVertikal_Silang1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_cross_red_2:{
	key: 'mg_juice_rock_vert_cross_red_2',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuMerahVertikal_Silang2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_cross_purple:{
	key: 'mg_juice_rock_horz_cross_purple',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuUnguHorizontal_Silang1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_horz_cross_purple_2:{
	key: 'mg_juice_rock_horz_cross_purple_2',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuUnguHorizontal_Silang2.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_cross_purple:{
	key: 'mg_juice_rock_vert_cross_purple',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuUnguVertikal_Silang1.png',
	type: AssetInfo.type.STATIC
},
mg_juice_rock_vert_cross_purple_2:{
	key: 'mg_juice_rock_vert_cross_purple_2',
	path: '/img/mini_games/fruit/batu/silang/MGJuice_BatuUnguVertikal_Silang2.png',
	type: AssetInfo.type.STATIC
},
	//mini game balloon assets

	mg_balloon_bg:{
		key: 'mg_balloon_bg',
		path: '/img/mini_games/balloon/MGBalon_BGSky.png',
		type: AssetInfo.type.STATIC
	},
	mg_balloon_clouds:{
		key: 'mg_balloon_clouds',
		path: '/img/mini_games/balloon/MGBalon_BGCloud.png',
		type: AssetInfo.type.STATIC
	},
	mg_balloon_poof:{
		key: 'mg_balloon_poof',
		path: '/img/mini_games/balloon/MGBalon_Boof.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 1135/5,
		height: 219
	},
	mg_balloon_button:{
		key: 'mg_balloon_button',
		path: '/img/mini_games/balloon/MGBalon_Button.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 330/3,
		height: 94
	},
	mg_balloon_buttonbox:{
		key: 'mg_balloon_buttonbox',
		path: '/img/mini_games/balloon/MGBalon_ButtonBox.png',
		type: AssetInfo.type.STATIC
	},
	mg_balloon_answerbox:{
		key: 'mg_balloon_answerbox',
		path: '/img/mini_games/balloon/MGBalon_AnswerBox.png',
		type: AssetInfo.type.STATIC
	},
	mg_balloon_heart:{ // unused
		key: 'mg_balloon_heart',
		path: '/img/mini_games/balloon/MGBalon_Heart.png',
		type: AssetInfo.type.STATIC
	},
	mg_balloon_tut_1:{
		key: 'mg_balloon_tut_1',
		path: '/img/mini_games/balloon/MGBalon_Tutorial1Konten.png',
		type: AssetInfo.type.STATIC
	},
	mg_balloon_tut_2:{
		key: 'mg_balloon_tut_2',
		path: '/img/mini_games/balloon/MGBalon_Tutorial2Konten.png',
		type: AssetInfo.type.STATIC
	},

	mg_balloon_monster_1:{
		key: 'mg_balloon_monster_1',
		path: '/img/mini_games/balloon/MGBalon_Monster1.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 636/4,
		height: 142
	},
	mg_balloon_monster_2:{
		key: 'mg_balloon_monster_2',
		path: '/img/mini_games/balloon/MGBalon_Monster2.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 636/4,
		height: 164
	},
	mg_balloon_monster_3:{
		key: 'mg_balloon_monster_3',
		path: '/img/mini_games/balloon/MGBalon_Monster3.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 636/4,
		height: 146
	},
	mg_balloon_monster_4:{
		key: 'mg_balloon_monster_4',
		path: '/img/mini_games/balloon/MGBalon_Monster4.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 636/4,
		height: 151
	},
	mg_balloon_monster_5:{
		key: 'mg_balloon_monster_5',
		path: '/img/mini_games/balloon/MGBalon_Monster5.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 636/4,
		height: 151
	},

	//mini game
	item_chest_health:{
		key: 'item_chest_health',
		path: '/img/mini_games/Popup_Darah.png',
		type: AssetInfo.type.STATIC
	},
	item_chest_health_50:{
		key: 'item_chest_health',
		path: '/img/mini_games/Popup_Darah - Copy.png',
		type: AssetInfo.type.STATIC
	},
	item_chest_mana:{
		key: 'item_chest_mana',
		path: '/img/mini_games/Popup_Mana.png',
		type: AssetInfo.type.STATIC
	},
	item_chest_mana_100:{
		key: 'item_chest_mana',
		path: '/img/mini_games/Popup_Mana - Copy.png',
		type: AssetInfo.type.STATIC
	},
	win_game_notif:{
		key: 'win_game_notif',
		path: '/img/mini_games/fruit/MGJuice_Peti.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 1197/3,
		height: 362
	},

}

export {MinigameAsset}
