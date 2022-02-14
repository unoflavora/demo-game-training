import { AssetInfo } from "../info";

/**
 * Asset type definition
 * @typedef {import("../def/custom").Agate.Asset.AssetInfo} AssetInfo
 */
const GameplayAsset = {
	//static images
	char_setting_background:{
		key: 'char_setting_background',
		path: '/img/character_setting/background.jpg',
		type: AssetInfo.type.STATIC
	},
	dummy_image:{
		key: 'dummy_image',
		path: '/img/dummy.png',
		type: AssetInfo.type.STATIC
	},
	sand_clock:{
		key: 'sand_clock',
		path: '/img/title/sand_clock.png',
		type: AssetInfo.type.STATIC
	},
	//explore
	pause_mission_button:{
		key: 'pause_mission_button',
		path: '/img/explore/UIIngame_PauseMisiButton.png',
		type: AssetInfo.type.STATIC
	},
	camera_button:{
		key: 'camera_button',
		path: '/img/explore/camera.png',
		type: AssetInfo.type.STATIC
	},
	up_direction_button:{
		key: 'up_direction_button',
		path: '/img/explore/ButtonPlaceholder_Up.png',
		type: AssetInfo.type.STATIC
	},
	down_direction_button:{
		key: 'down_direction_button',
		path: '/img/explore/ButtonPlaceholder_Down.png',
		type: AssetInfo.type.STATIC
	},
	left_direction_button:{
		key: 'left_direction_button',
		path: '/img/explore/ButtonPlaceholder_Left.png',
		type: AssetInfo.type.STATIC
	},
	right_direction_button:{
		key: 'right_direction_button',
		path: '/img/explore/ButtonPlaceholder_Right.png',
		type: AssetInfo.type.STATIC
	},
	chest_mini_game:{
		key: 'chest_mini_game',
		path: '/img/explore/IngamePeti.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 171/3,
		height: 64
	},
	char_male:{
		key: 'char_male',
		path: '/img/explore/Spritesheet_CharacterMale.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 60,
		height: 94
	},
	char_female:{
		key: 'char_female',
		path: '/img/explore/Spritesheet_CharacterFemale.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 60,
		height: 94
	},
	

	//battle
	battle_background:{
		key: 'battle_background',
		path: '/img/battle/bg battle gugur.png',
		type: AssetInfo.type.STATIC
	},
	battle_background_2:{
		key: 'battle_background_2',
		path: '/img/battle/bg battle salju.png',
		type: AssetInfo.type.STATIC
	},
	player_health_panel:{
		key: 'player_health_panel',
		path: '/img/battle/UIIngame_HPPlayerBox.png',
		type: AssetInfo.type.STATIC
	},
	monster_health_panel:{
		key: 'monster_health_panel',
		path: '/img/battle/UIIngame_HPMonsterBox.png',
		type: AssetInfo.type.STATIC
	},
	health_bar:{
		key: 'health_bar',
		path: '/img/battle/UIIngame_HP3.png',
		type: AssetInfo.type.STATIC
	},
	health_empty_bar:{
		key: 'health_empty_bar',
		path: '/img/battle/UIIngame_HP2.png',
		type: AssetInfo.type.STATIC
	},
	mana_bar:{
		key: 'mana_bar',
		path: '/img/battle/UIIngame_Mana2.png',
		type: AssetInfo.type.STATIC
	},
	mana_empty_bar:{
		key: 'mana_empty_bar',
		path: '/img/battle/UIIngame_Mana1.png',
		type: AssetInfo.type.STATIC
	},
	heart_panel_icon:{
		key: 'heart_panel_icon',
		path: '/img/battle/UIIngame_HP1.png',
		type: AssetInfo.type.STATIC
	},
	correct_answer_notif:{
		key: 'correct_answer_notif',
		path: '/img/battle/correct_answer_notif.png',
		type: AssetInfo.type.STATIC
	},
	wrong_answer_notif:{
		key: 'wrong_answer_notif',
		path: '/img/battle/wrong_answer_notif.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_1:{
		key: 'tutorial_battle_1',
		path: '/img/battle/Tutorial_Battle1.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_2:{
		key: 'tutorial_battle_2',
		path: '/img/battle/Tutorial_Battle2.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_3:{
		key: 'tutorial_battle_3',
		path: '/img/battle/Tutorial_Battle3.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_4:{
		key: 'tutorial_battle_4',
		path: '/img/battle/Tutorial_Battle4.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_5:{
		key: 'tutorial_battle_5',
		path: '/img/battle/Tutorial_Battle5.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_6:{
		key: 'tutorial_battle_6',
		path: '/img/battle/TutorialBattle1.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_7:{
		key: 'tutorial_battle_7',
		path: '/img/battle/TutorialBattle2.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_8:{
		key: 'tutorial_battle_8',
		path: '/img/battle/TutorialBattle3.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_9:{
		key: 'tutorial_battle_9',
		path: '/img/battle/TutorialBattle4.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_10:{
		key: 'tutorial_battle_10',
		path: '/img/battle/TutorialBattle5.png',
		type: AssetInfo.type.STATIC
	},
	tutorial_battle_11:{
		key: 'tutorial_battle_11',
		path: '/img/battle/TutorialBattle6.png',
		type: AssetInfo.type.STATIC
	},
	lose_game_notif:{
		key: 'lose_game_notif',
		path: '/img/battle/wrong_answer_notif.png',
		type: AssetInfo.type.STATIC
	},
	screen_transition:{
		key: 'screen_transition',
		path: '/img/battle/transition.png',
		type: AssetInfo.type.STATIC
	},
	heal1_battle_fx:{
		key: 'heal1_battle_fx',
		path: '/img/battle/effect/heal1.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 500/5,
		height: 36
	},
	heal2_battle_fx:{
		key: 'heal2_battle_fx',
		path: '/img/battle/effect/heal2.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 500/5,
		height: 120
	},
	normal_battle_fx:{
		key: 'normal_battle_fx',
		path: '/img/battle/effect/Normal.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 1210/10,
		height: 130
	},
	normalZ_battle_fx:{
		key: 'normalZ_battle_fx',
		path: '/img/battle/effect/NormalZ.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 540/6,
		height: 80
	},
	paralyzed_battle_fx:{
		key: 'paralyzed_battle_fx',
		path: '/img/battle/effect/paralyzed.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 420/5,
		height: 28
	},
	setengah_normal_battle_fx:{
		key: 'setengah_normal_battle_fx',
		path: '/img/battle/effect/SetengahNormal.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 160/4,
		height: 84
	},
	setengah_normal_z_battle_fx:{
		key: 'setengah_normal_z_battle_fx',
		path: '/img/battle/effect/SetengahNormalZ.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 152/4,
		height: 28
	},
	special_battle_fx:{
		key: 'special_battle_fx',
		path: '/img/battle/effect/Spesial.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 2000/20,
		height: 70
	},
	special_z_battle_fx:{
		key: 'special_z_battle_fx',
		path: '/img/battle/effect/SpesialZ.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 1012/11,
		height: 90
	},
	//ui
	slider_node:{
		key: 'slider_node',
		path: '/img/ui/UIQuiz_Slider_TitikApaIni.png',
		type: AssetInfo.type.STATIC
	},
	slider_bar:{
		key: 'slider_bar',
		path: '/img/ui/UIQuiz_Checklist_PembatasJawaban.png',
		type: AssetInfo.type.STATIC
	},
	slider_cursor:{
		key: 'slider_cursor',
		path: '/img/ui/UIQuiz_Slider_Cursor.png',
		type: AssetInfo.type.STATIC
	},
	slider_answer_box:{
		key: 'slider_answer_box',
		path: '/img/ui/UIQuiz_Slider_BoxAnswer.png',
		type: AssetInfo.type.STATIC
	},
	background_nature:{
		key: 'background_nature',
		path: '/img/ui/d.jpg',
		type: AssetInfo.type.STATIC
	},
	ui_quiz_checklist_arrange_slider_question_box2:{
		key: 'ui_quiz_checklist_arrange_slider_question_box2',
		path: '/img/ui/UIQuiz_ChecklistArrangeSlider_QuestionBox2.png',
		type: AssetInfo.type.STATIC
	},
	button_choice:{
		key: 'button_choice',
		path: '/img/ui/UIQuiz_Arrange_BoxAnswer.png',
		type: AssetInfo.type.STATIC
	},
	question_box:{
		key: 'question_box',
		path: '/img/ui/UIQuiz_MultipleChoice_QuestionBox.png',
		type: AssetInfo.type.STATIC
	},
	question_box_info:{
		key: 'question_box_info',
		path: '/img/ui/UIIngame_VNBoxInfo.png',
		type: AssetInfo.type.STATIC
	},
	question_box_npc:{
		key: 'question_box_npc',
		path: '/img/ui/UIIngame_VNBoxNpc.png',
		type: AssetInfo.type.STATIC
	},
	question_box_player:{
		key: 'question_box_player',
		path: '/img/ui/UIIngame_VNBoxPlayer.png',
		type: AssetInfo.type.STATIC
	},
	question_box_swipe:{
		key: 'question_box_swipe',
		path: '/img/ui/UIQuiz_Swipe_QuestionBox.png',
		type: AssetInfo.type.STATIC
	},
	gradient_quiz:{
		key: 'gradient_quiz',
		path: '/img/ui/UI_GradientQuiz.png',
		type: AssetInfo.type.STATIC
	},
	checklist_arrange_panel:{
		key: 'checklist_arrange_panel',
		path: '/img/ui/UIQuiz_ChecklistArrangeSlider_Box2.png',
		type: AssetInfo.type.STATIC
	},
	checklist_arrange_slider:{
		key: 'checklist_arrange_panel',
		path: '/img/ui/UIQuiz_ChecklistArrangeSlider_Box1.png',
		type: AssetInfo.type.STATIC
	},
	ui_login_box_1:{
		key: 'ui_login_box_1',
		path: '/img/ui/UI_LoginBox1.png',
		type: AssetInfo.type.STATIC
	},
	ui_login_box_2:{
		key: 'ui_login_box_2',
		path: '/img/ui/UI_LoginBox2.png',
		type: AssetInfo.type.STATIC
	},
	gradient_trigger:{
		key: 'gradient_trigger',
		path: '/img/ui/UI_GradientTrigger.png',
		type: AssetInfo.type.STATIC
	},
	submit_button:{
		key: 'submit_button',
		path: '/img/ui/UIIngameQuiz_ButtonSubmit.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 363/3,
		height: 59
	},
	checklist_box:{
		key: 'checklist_box',
		path: '/img/ui/UIQuiz_Checklist_ChecklistBox.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 39,
		height: 37
	},
	swipe_choice_answer:{
		key: 'swipe_choice_answer',
		path: '/img/ui/UIQuiz_Swipe_AnswerBox.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 135,
		height: 54
	},
	multiple_choice_answer:{
		key: 'multiple_choice_answer',
		path: '/img/ui/UIQuiz_MultipleChoiceButton.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 442,
		height: 59
	},
	ui_result_back_button:{
		key: 'ui_result_back_button',
		path: '/img/ui/UI button icon/UIResult_ButtonBack.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_close_button:{
		key: 'ui_close_button',
		path: '/img/ui/UI button icon/UI_Button_Close.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_help_button:{
		key: 'ui_help_button',
		path: '/img/ui/UI button icon/UI_Button_Help.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_sound_on_button:{
		key: 'ui_sound_on_button',
		path: '/img/ui/UI button icon/UIResult_ButtonVolumeOn.png',
		type: AssetInfo.type.STATIC
	},
	ui_sound_off_button:{
		key: 'ui_sound_off_button',
		path: '/img/ui/UI button icon/UIResult_ButtonVolumeOff.png',
		type: AssetInfo.type.STATIC
	},
	ui_logout_button:{
		key: 'ui_logout_button',
		path: '/img/ui/UI button icon/UI_Button_Dots.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_result_menu_button:{
		key: 'ui_result_menu_button',
		path: '/img/ui/UI button icon/UIResult_ButtonMenu.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_result_next_button:{
		key: 'ui_result_next_button',
		path: '/img/ui/UI button icon/UIResult_ButtonNext.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_result_oke_button:{
		key: 'ui_result_oke_button',
		path: '/img/ui/UI button icon/UIResult_ButtonOke.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_result_play_button:{
		key: 'ui_result_play_button',
		path: '/img/ui/UI button icon/UIResult_ButtonPlay.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_result_replay_button:{
		key: 'ui_result_replay_button',
		path: '/img/ui/UI button icon/UIResult_ButtonReplay.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_result_screenshot_button:{
		key: 'ui_result_screenshot_button',
		path: '/img/ui/UI button icon/UIResult_ButtonSs.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 207/3,
		height: 59
	},
	ui_menu_box_1:{
		key: 'ui_menu_box_1',
		path: '/img/ui/mission/UIMenu_Box1.png',
		type: AssetInfo.type.STATIC
	},
	ui_menu_box_2:{
		key: 'ui_menu_box_2',
		path: '/img/ui/mission/UIMenu_Box2.png',
		type: AssetInfo.type.STATIC
	},
	ui_menu_box_3:{
		key: 'ui_menu_box_3',
		path: '/img/ui/mission/UIMenu_Box3.png',
		type: AssetInfo.type.STATIC
	},
	ui_menu_objektif_box:{
		key: 'ui_menu_objektif_box',
		path: '/img/ui/mission/UIMenu_ObjektifBox.png',
		type: AssetInfo.type.STATIC
	},
	
	ui_mission_topic_balloon:{
		key: 'ui_mission_topic_balloon',
		path: '/img/ui/mission/UIMenu_TopicBox.png',
		type: AssetInfo.type.STATIC
	},
	ui_mission_topic_overlay:{
		key: 'ui_mission_topic_overlay',
		path: '/img/ui/mission/UIMenu_Overlay.png',
		type: AssetInfo.type.STATIC
	},
	ui_mission_topic_title_panel:{
		key: 'ui_mission_topic_title_panel',
		path: '/img/ui/mission/UIMenu_JudulTopic.png',
		type: AssetInfo.type.STATIC
	},
	ui_menu_title:{
		key: 'ui_menu_title',
		path: '/img/ui/mission/UIMenu_Title.png',
		type: AssetInfo.type.STATIC
	},
	ui_menu_topic_button:{
		key: 'ui_menu_topic_button',
		path: '/img/ui/mission/UIMenu_TopicButton.png',
		type: AssetInfo.type.STATIC
	},
	ui_menu_topic_title:{
		key: 'ui_menu_topic_title',
		path: '/img/ui/mission/UIMenu_TopicTitle.png',
		type: AssetInfo.type.STATIC
	},
	ui_mission_overview_button:{
		key: 'ui_mission_overview_button',
		path: '/img/ui/mission/UIMenu_ButtonMisi.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 1350/3,
		height: 63
	},
	ui_menu_misi_button:{
		key: 'ui_menu_misi_button',
		path: '/img/ui/mission/UIMenu_MisiButton.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 376,
		height: 59
	},
	start_mission_button:{
		key: 'start_mission_button',
		path: '/img/ui/mission/UIIngameQuiz_ButtonMulaimisi.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 732/3,
		height: 69
	},
	ui_menu_task_iconn:{
		key: 'ui_menu_task_iconn',
		path: '/img/ui/mission/UIMenu_TaskIconn.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 120/2,
		height: 81
	},
	ui_mission_topic_button:{
		key: 'ui_mission_topic_button',
		path: '/img/ui/mission/UIMenu_BelumDikerjain.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 364 / 4,
		height: 72
	},
	ui_ribbon_1:{
		key: 'ui_ribbon_1',
		path: '/img/ui/UIRibbon1.png',
		type: AssetInfo.type.STATIC,
	},
	//quiz
	ui_quiz_swipe_answer_box_left:{
		key: 'ui_quiz_swipe_answer_box_left',
		path: '/img/ui/UIQuiz_Swipe_AnswerBoxLeft.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 334/2,
		height: 75
	},
	ui_quiz_swipe_answer_box_right:{
		key: 'ui_quiz_swipe_answer_box_right',
		path: '/img/ui/UIQuiz_Swipe_AnswerBoxRight.png',
		type: AssetInfo.type.SPRITESHEET,
		width: 334/2,
		height: 75
	},

	//result
	ui_result_box:{
		key: 'ui_result_box',
		path: '/img/result/UIResult_Box.png',
		type: AssetInfo.type.STATIC
	},
	ui_detil_skor_box:{
		key: 'ui_detil_skor_box',
		path: '/img/result/UIResult_DetilSkorBox.png',
		type: AssetInfo.type.STATIC
	},
	ui_result_light:{
		key: 'ui_result_light',
		path: '/img/result/UIResult_Light.png',
		type: AssetInfo.type.STATIC
	},
	ui_result_title_ribbon:{
		key: 'ui_result_title_ribbon',
		path: '/img/result/UIResult_TitleRibbon.png',
		type: AssetInfo.type.STATIC
	},
}

export { GameplayAsset }