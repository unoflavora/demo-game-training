import { QuestionsAsset } from "../assetLibrary";

class QuestionHelper{
    constructor() { }

    /**
     * Get Qustion text based on current cluster and conver to to object
     * @param {Phaser.Scene} scene 
     * @param {string} klusterName 
     * @returns {Array<{string,string}>}
     */
    static GetQuestionText = (scene,klusterName) => {

        let CSVArray = [];

        for (let key in QuestionsAsset) {
            let asset = QuestionsAsset[key];
            console.log(klusterName)
            if(asset.kluster === klusterName)
            {
                CSVArray.push({
                    data: scene.cache.text.get(asset.key),
                    choice: asset.choice,
                });
            }
        }
        // console.log(CSVArray);
        return CSVArray;
    }
}

export { QuestionHelper }