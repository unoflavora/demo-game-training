
/**
 *@typedef {import('../../../def/custom').Agate.Gameplay.SaveData} SaveData 
 */

class ExploreStateSaver {
    constructor() {
        this.saveData = [];
    }

    /** @type {ExploreStateSaver} */
    static instance;

    /** @returns {ExploreStateSaver} */
    static getInstance = () => {
        if (!ExploreStateSaver.instance) {
            ExploreStateSaver.instance = new ExploreStateSaver();
        }

        return ExploreStateSaver.instance;
    };

    /**
     * 
     * @param {string} missionId 
     * @param {SaveData} saveData 
     */
    saveState = (missionId = "", saveData)=>{
        if(!this.saveData[missionId]){
            this.saveData[missionId] = [];
        }
        this.saveData[missionId].push({
            mapName: saveData?.mapName,
            dir: saveData?.dir,
            playerPos: saveData?.playerPos,
            talkedNpc: saveData?.talkedNpc
        })
    }

    /**@param {string} currentMap*/
    deleteState = (currentMap)=>{
        this.saveData[currentMap] = null;
    }

    deleteAllState = ()=>{
        this.saveData = [];
    }

    /**
     * 
     * @param {string} missionId 
     * @param {string} currentMap 
     * @returns {SaveData}
     */
    loadState = (missionId, currentMap)=>{
        if(missionId in this.saveData){
            return this.saveData[missionId].find((v)=>v.mapName == currentMap);
        }
        //console.log("DATA NOT FOUND")
        return null;
    }

    /**
     * 
     * @param {string} missionId 
     * @param {string} mapName 
     * @param {saveData} saveData 
     */
    updateState = (missionId,mapName,saveData)=>{
        if(this.saveData[missionId]){
            const index = this.saveData[missionId].findIndex((v)=>v.mapName == mapName);
            this.saveData[missionId][index] = saveData;
            return "Data updated";
        }
        //console.log("DATA NOT FOUND");
        return null;
    }
}

export default ExploreStateSaver;