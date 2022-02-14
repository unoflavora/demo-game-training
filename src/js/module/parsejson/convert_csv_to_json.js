export default class ConvertCsvToJson {
    constructor(scene){
        this.scene = scene;
    }

    /**
     * Function to Parse Data from Mission Content to Json into specific of object
     * @public
     * @param {string} text fill with data from csv that was loaded as string
     * @return {object} data has been turned into object
     */
    ConvertMissionContentToJson = (text) =>{
        var output = {};
        
        var contentMissions = [];
        output["content_missions"] = contentMissions;
        var contentMission;

        var lineContent;
        
        var textContentArray = text.split(/\r?\n/);
        
        var number;
        var cluster;
        var topicID;
        var topic;
        var topics;
        var topicContent;
        
        var category;
        var categories;
        var content;
        
        var material;
        
        var missionName;
        
        var fileJson; // 17
        var theme; // 18
        var faceDirection; // 19
        var xTile; // 20
        var yTile; // 21
        
        var categoryContent;
        
        var missionRange = {typeStart:6,delta:5,targetStart:10}
        
        var missions;
        var missionID;
        
        var typeMission;
        var typeMissions;
        
        var mainMissions;
        var bonusMissions;
        
        var missionName;
        var bslLink;
        var bslId;
        
        var mission;
        var target;
        
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

            if (textContentArray[i] == "")
            {
                continue;
            }
                    
            lineContent = textContentArray[i].split(regEx);
            
            number = lineContent[0];
            cluster = lineContent[1].replace(/\"/g,'');
            topic = lineContent[2].replace(/\"/g,'');
            //topicID = lineContent[43];
            category = lineContent[3].replace(/\"/g,'');
            material = lineContent[4];
                    
            //console.log(lineContent);
            
            fileJson = lineContent[36];
            theme = lineContent[37];
            //faceDirection = lineContent[38];
            //xTile = lineContent[39];
            //yTile = lineContent[40];
            
            // missions
            
            mainMissions = [];
            bonusMissions = [];
            
            missionName = lineContent[4];
            missionID = lineContent[5];
            //bslLink = lineContent[44];
            //bslId = lineContent[45];
            
            // mission
            for (let i=0;i<3;i++)
            {
                mission = lineContent[missionRange.typeStart + missionRange.delta * i];
                target = lineContent[missionRange.targetStart + missionRange.delta * i];
                
                if (mission != "" && mission != "-" && target != "" && target != "-")
                {
                    mainMissions.push({mission:mission,target:parseInt(target)});
                }
            }
            
            // bonus
            for (let i=3;i<6;i++)
            {
                mission = lineContent[missionRange.typeStart + missionRange.delta * i];
                target = lineContent[missionRange.targetStart + missionRange.delta * i];
                    
                if (mission != "" && mission != "-" && target != "" && target != "-")
                {
                    bonusMissions.push({mission:mission,target:parseInt(target)});
                }
                
            }		
            
            //
            
            if (number != "")
            {
                topics = [];
                contentMission = {};
                contentMissions.push(contentMission);
                            
                contentMission["cluster"] = cluster;
                contentMission["topic_contents"] = topics;
            }
            
            if (topic != "")
            {
                categories = [];	
                topicContent = {};
                
                topicContent["topic"] = topic;		
                //topicContent["topic_id"] = topicID;	
                topicContent["x"] = parseInt(lineContent[38]);
                topicContent["y"] = parseInt(lineContent[39]);

                topicContent["is_unlocked"] = true;
                
                topics.push(topicContent);
            }
            
            categoryContent = {};
            topicContent["category_content"] = categories;
            
            if (category != "")
            {
                missions = [];
                
                categories.push(categoryContent);
                categoryContent["missions"] = missions;
                
                categoryContent["category"] = category;
                
                //lock mission if not the first one
                if(i > 3) {
                    categoryContent["is_unlocked"] = false;
                } else {
                    categoryContent["is_unlocked"] = true;
                }
                    
            }
            
            mission = {};
            
            mission["next_map"] = fileJson;
            //mission["next_position_tile"] = {xTile:xTile,yTile:yTile};
            //mission["next_face_direction"] = faceDirection;
            mission["next_map_theme"] = theme;
            // mission["quiz_file_name"] = "quiz.json";
            //mission["bsl_content"] = bslLink;	
            //mission["bsl_id"] = bslId;	
            mission["mission_name"] =  missionName;
            mission["mission_id"] = missionID;
            
            typeMission = {};
            typeMission["main_missions"] = mainMissions;
            typeMission["bonus_missions"] = bonusMissions;			
            
            mission["mission_types"] = typeMission;		
            
            missions.push(mission);
        }
        return output["content_missions"];
    }
}