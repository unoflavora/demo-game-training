import { AssetInfo , ChoiceInfo } from "../info";

const QuestionsAsset = {
	demo_question_checklist: {
		key: 'demo_question_checklist',
		type: AssetInfo.type.TEXT,
		choice: ChoiceInfo.type.CHECKLIST,
		path: '/jsons/mission/questions/Morioh Island/Demo Question/Demo Question-checklist.csv',
		kluster: "Trakindo Demo"
	},
	demo_question_multiple: {
		key: 'demo_question_multiple',
		type: AssetInfo.type.TEXT,
		choice: ChoiceInfo.type.MULTIPLE,
		path: '/jsons/mission/questions/Morioh Island/Demo Question/Demo Question-multiple.csv',
		kluster: "Trakindo Demo"
	},
	demo_question_swipe: {
		key: 'demo_question_swipe',
		type: AssetInfo.type.TEXT,
		choice: ChoiceInfo.type.SWIPE,
		path: '/jsons/mission/questions/Morioh Island/Demo Question/Demo Question-swipe.csv',
		kluster: "Trakindo Demo"
	},
	demo_question_arrange: {
		key: 'demo_question_arrange',
		type: AssetInfo.type.TEXT,
		choice: ChoiceInfo.type.ARRANGE,
		path: '/jsons/mission/questions/Morioh Island/Demo Question/Demo Question-arrange.csv',
		kluster: "Trakindo Demo"
	}
}

export {QuestionsAsset}