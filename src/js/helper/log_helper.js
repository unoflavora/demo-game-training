class LogHelper {

    /**
     * 
     * @param {string} title 
     * @param {string} message 
     */
    static log = (title,message)=>{
        let msgTitle = `[DESHIMA: ${title}]`;
        console.log(msgTitle, message);
    }
}

export {LogHelper}