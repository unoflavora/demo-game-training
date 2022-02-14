import { DummySCORMData  } from "./dummy_scorm_data";

/**
 * Dummy SCORM controller that return dummy value
 * @class
 */
export default class DummySCORMController{
    constructor()
    {
        this.isConnected = false;
    }

    /**
     * Get dummy value
     * @param {string} element 
     * @returns {Promise<string>}
     */
     getValue = (element) =>{
        return new Promise((resolve, reject)=>{
            let value = DummySCORMData[element]
            resolve(value);  
        });
    }

    /**
     * @todo set dummy value to save
     * Set Dummy value
     * @param {string} element 
     * @param {string} value 
     */
    setValue = (element, value) => {
        return new Promise((resolve, reject)=>{
            if(DummySCORMData[element] != undefined)
            {
                DummySCORMData[element] = value;
            }else{
                DummySCORMData = {...DummySCORMData,element:value};
            }
            resolve();  
        });
    }
}