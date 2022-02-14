import pipwerks from "./SCORM_API_wrapper";

export default class ScormController{
    constructor()
    {
        /**
         * SCORM version which target LMS support
         * @type {string}
         */
        this.version = "1.2"

        /**
         * Check is SCORM connection is still active
         * @type {boolean}
         */
        this.isConnected;
    }

    /**
     * Function to initialize SCORM connection
     * @returns {Promise<boolean>}
     */
    init = () => {
        return new Promise((resolve,reject)=>{
            pipwerks.SCORM.version = this.version;
            pipwerks.SCORM.init();
            this.isConnected = pipwerks.SCORM.connection.isActive;
            resolve();
        });
    }
    
    /**
     * Get LMS value
     * @param {string} element 
     * @returns {Promise<string>}
     */
    getValue = (element) =>{
        return new Promise((resolve, reject)=>{
            /**@type {string} */
            let value; 
            value = pipwerks.SCORM.get(element);
            resolve(value);  
        });
    }

    /**
     * Set LMS value
     * @param {string} element 
     * @param {string} value 
     */
    setValue = (element, value) => {
        return new Promise((resolve, reject)=>{
            pipwerks.SCORM.set(element, value);
            resolve();  
        });
    }

}