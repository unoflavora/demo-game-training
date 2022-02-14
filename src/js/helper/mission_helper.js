import { MISSION_LIST } from "../scene/gameplay/explore/mission/mission_data";
import { LogHelper } from "./log_helper";

class MissionHelper
{    

    /**
     * 
     * @param {string} text 
     * @param {number} amount 
     * @returns 
     */
    static RephraseMissionDescription = (text,amount)=>{
        return text.replace(/{amount}/gi,amount);
    }

    static FindAndRephraseMissionDescription = (key,amount)=>{
        let mission = MISSION_LIST.find(el => el.key == key);
        if(mission){
            return MissionHelper.RephraseMissionDescription(mission.text,amount);
        }else{
            LogHelper.log("Mission","Fail to rephrase mission text (undefined)");
            return "undefined";
        }
    }

    /**
     * 
     * @param {Number} type 
     * @returns {String}
     */
    static FindMonsterMission = (type)=>{
        let monster = MISSION_LIST.filter(m => m.type == "kill_monster");
        let mission = monster.find(m => m.key.includes(type.toString()));
        if(mission){
            return mission.key;
        }else{
            LogHelper.log("Mission","Fail to find mission monster");
            return "undefined";
        }
    }

    /**
     * 
     * @param {string} name 
     */
    static FindNpcMission = (name)=>{
        let npc = MISSION_LIST.filter(m => m.type == "dialogue");
        let mission = npc.find(m => m.target == name);
        if(mission){
            return mission.key;
        }else{
            LogHelper.log("Mission","Fail to find dialogue npc");
            return "undefined";
        }
    }
}

export {MissionHelper}