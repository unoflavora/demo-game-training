import ScormController from "./scorm/scorm_controller";
import DummySCORMController from "./scorm/dummy/dummy_scorm_controller";
import { CMI } from "./scorm/cmi_element";

/**
 * A request Handle clas
 * @class
 */
export default class RequestController{
    constructor()
    {
        /**@type {ScormController|DummySCORMController} */
        this.client;

        /**@type {ScormController} */
        this.scormController = new ScormController();
        /**@type {DummySCORMController} */
        this.dummyScormController = new DummySCORMController();
    }
    /**
     * @type {RequestController}
     */
    static instance;

    /**
     * 
     * @returns {RequestController}
     */
    static getInstance = () => {
        if(!RequestController.instance)
        {
            RequestController.instance = new RequestController();
        }

        return RequestController.instance;
    }

    /**
     * Function to determine which will be the client
     * @returns {Promise}
     */
    init = () => {
        return new Promise((resolve, reject) => {
            if(CONFIG.OFFLINE_MODE){
                this.client = this.dummyScormController;
                console.log(`Use Dummy Data`);
            }else{
                this.scormController.init()
                this.client = this.scormController;
                console.log(`Use SCORM Data`);
            }
            resolve();
        });
    }

    /**
     * 
     * @returns {Promise<string>}
     */
    getStudentName = () =>{
        return new Promise((resolve, reject)=>{
            this.client.getValue(CMI.core.student_name)
            .then((response)=>{
                resolve(response);
            }); 
        });
    }

    /**
     * 
     * @returns {Promise<string>}
     */
    getStudentId = () =>{
        return new Promise((resolve, reject)=>{
            this.client.getValue(CMI.core.student_id)
            .then((response)=>{
                resolve(response);
            }); 
        });
    }

    /**
     * 
     * @param {string} index 
     * @returns {Promise<string>}
     */
    getObjectivestatus = (index) => {
        return new Promise((resolve, reject)=>{
            this.client.getValue(CMI.objectives.score_raw(index))
            .then((response)=>{
                resolve(response);
            });
        });
    }
    
    /**@returns {boolean} */
    getConnection = () => {
        return this.client.isConnected;
    }
}