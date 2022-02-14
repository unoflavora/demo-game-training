import gameplay_data from "../../scene/gameplay/gameplay_data";

export default class ParserRoleplayController {
    constructor(scene){
        this.scene = scene;
    }

    /**
     * Function to Parse Data from Roleplay(Dialogue) to Json into specific of object
     * @public
     * @param {string} text fill with data from csv that was loaded as string
     * @return {object} data has been turned into object
     */
    ConvertRoleplayCsvToJson = (text) =>
    {
        var output = {"roleplay_content":{}};
        
        var contents = [];
            
        output["roleplay_content"]["contentList"] = contents;
            
        //console.log(text);
        
        var textContentArray = text.split(/\r?\n/);
            
        var id;
        var type;
        var talker;
        var messages;
        var emote;
        var questionType;
        var choices;
        var choiceValues;
        var choiceIdNexts;
        
        var content;
        
        var regEx;

	    var lineContent;
        
        if (textContentArray[0][textContentArray[0].length-1] == ",")
        {
            regEx = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        }
        else if (textContentArray[0][textContentArray[0].length-1] == ";")
        {
            regEx = /;(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        }	
        
        var headerInfo = textContentArray[0].split(regEx);
        
        output["roleplay_content"]["startId"] = headerInfo[1];
        output["roleplay_content"]["dialogueType"] = headerInfo[3];
        
        var headerInfo2 = textContentArray[1].split(regEx);
        output["roleplay_content"]["startEmote"] = parseInt(headerInfo2[1]);
        output["roleplay_content"]["afterSatisfiedId"] = parseInt(headerInfo2[3]);
        
        for (let i=3;i<textContentArray.length;i++)
        {
        
            if (textContentArray[i] == "")
            {
                continue;
            }
            
            lineContent = textContentArray[i].split(regEx);
                    
            id = lineContent[0];
            
            if (id == "")
            {
                continue;
            }
            
            type = lineContent[1];
            if (type === "")
                type = "message"
            
            talker = lineContent[2];
            
            messages = lineContent[3].split("|");
            if (messages[0] == "")
            {
                messages.pop();
            }

            let tempMessage;
            messages.forEach(element => {
                tempMessage = element.replace(/\"/g,'');
            });
            messages = tempMessage;
            messages = tempMessage.replace(/\[nama]/g, gameplay_data.PlayerName);

            emote = lineContent[4];
            
            questionType = lineContent[5].toLowerCase();

            
            if (questionType.toLowerCase() === "multiple choice")
                questionType = 'multiple';
            
            choices = lineContent[6].split("|");
            if (choices[0] == "")
            {
                choices.pop();
            }
            else
            {
                for (let i = 0;i<choices.length;i++)
                {
                    if (questionType === 'multiple'){
                        let temp = choices[i].replace(/\"/g,'');
                        var str = String.fromCharCode(65 + i);
                        if (temp.substr(0,1) != String.fromCharCode(32)){
                            choices[i] = str + ". " + temp;
                        }else{
                            choices[i] = str + "." + temp;
                        }
                        
                    }else{
                        choices[i] = choices[i].replace(/\"/g,'');
                    }
                }
            }
            
            choiceValues = lineContent[7].replace(/\s/g, '').split("|");

            if (choiceValues[0] == "")
            {
                choiceValues.pop();
            }
            
            choiceIdNexts = lineContent[8].replace(/\s/g, '').split("|");
            if (choiceIdNexts[0] == "")
            {
                choiceIdNexts.pop();
            }			
            
            content = {};
            content["id"] = id;
            content["type"] = type;
            content["talker"] = talker;
            content["messages"] = messages;
            content["emote"] = emote;
            content["questionType"] = questionType;
            content["choices"] = choices;
            content["choiceValues"] = choiceValues;
            content["choiceIdNexts"] = choiceIdNexts;
            
            contents.push(content);

        }
        //console.log(output["roleplay_content"]);
        
        return output["roleplay_content"];
    }
    
}