export default class ConvertCsvToJson {
    constructor(scene){
        this.scene = scene;
    }

    /**
     * Function to Parse Data Quiz to Json
     * @public
     * @param {string} text fill with data from csv that was loaded as string
     * @returns {object} data has been turned into object
     */
    ConvertQuizToJson = (text) =>{
        var output = {"content_quiz":{}};
        output["content_quiz"]["contents"] = [];
        
        var textContent;
        var lineContent;
        
        var nQuestion = -1;
        var questions;
        var questionDict;
        var contentDict;
        
        var gradeQuestions;
        var gradeQuestion = null;
        
        var answers;
        var values;
        
        var textContentArray = text.split(/\r?\n/);
        
        var regEx;
        
        if (textContentArray[1][0] == ",")
        {
            regEx = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        }
        else if (textContentArray[1][0] == ";")
        {
            regEx = /;(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        }
        
        for (let i=3;i<textContentArray.length;i++)
        {
            lineContent = textContentArray[i].split(regEx);
            
            if (lineContent == "")
            {
                continue;
            }
            if (lineContent[1] != "") // checks whether number index not null
            {
                
                if (lineContent[1] == "1") // checks whether number index equals 1, also contains grade info
                {
                    if (lineContent[2] != "") // checks if contains cluster info, which also contains topic and category info
                    {
                        if (output["content_quiz"]["cluster"] == null)
                        {
                            output["content_quiz"]["cluster"] = lineContent[2];
                        }
                    }
                    
                    if (lineContent[3] != "") // checks whether contains topic and category info
                    {
                        if (contentDict != null)
                        {
                            output["content_quiz"]["contents"].push(contentDict);
                        }
                        
                        if (gradeQuestions != null)
                        {
                            contentDict["grade_questions"] = gradeQuestions;
                        }
                    
                        contentDict = {};

                        contentDict["topic"] = lineContent[3];
                        contentDict["category"] = lineContent[4];
                        
                        contentDict["grade_questions"] = [];
                    }
                                    
                    gradeQuestion = {};
                    gradeQuestion["grade"] = parseInt(lineContent[5]);
                    questions = [];
                    gradeQuestion["questions"] = questions;
                    contentDict["grade_questions"].push(gradeQuestion);
                    
                    
                }
                
                answers = [];
                values = [];			
                questionDict = {};
                
                if (lineContent[7] != undefined)
                {
                    questionDict["question"] = lineContent[7].replace(/\"/g,'');
                }
                
                questionDict["answers"] = answers;
                questionDict["values"] = values;
                
                questions.push(questionDict);
                        
            }
            
            if (lineContent[8] != undefined)
            {	
                answers.push(lineContent[8].replace(/\"/g,''));	
            }
            values.push(parseInt(lineContent[9]));	
        }

        if (contentDict != null)
        {
            output["content_quiz"]["contents"].push(contentDict);
        }

        if (gradeQuestions != null)
        {
            contentDict["grade_questions"] = gradeQuestions;
        }
        
        return output;
    }
}
