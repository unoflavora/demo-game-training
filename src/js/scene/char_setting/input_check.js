const symbolRegex = new RegExp('^(?=.*[!@#$%^&*"\\[\\]\\{\\}<>/\\(\\)=\\\\\\-_´+`~\\:;,\\.€\\|])',);
const numberRegex = /^\d+$/;

const MAX_CHAR = 12;

const CheckInput = {
    /**
     * @param {string} text
     * @returns {string | null}
     */
    isValidName: (text)=>{
        let errorMsg = "";
        if(text == null || text == ""){
            errorMsg = "Nama tidak boleh kosong";
            return errorMsg;
        }else if (text.length > MAX_CHAR){
            errorMsg = "Nama terlalu panjang";
            alert(errorMsg);
            return errorMsg;
        }else if (symbolRegex.test(text)){
            errorMsg = "Invalid character";
            alert(errorMsg);
            return errorMsg;
        }else{
            return null;
        }
    },
    /**@param {string} text*/
    isValidNIP: (text)=>{
        // text.replace(/\D/g, '');
        let errorMsg = "";
        if(text == null || text == ""){
            errorMsg = "NIP tidak boleh kosong";
            return errorMsg;
        }else if (!numberRegex.test(text) || symbolRegex.test(text)){
            errorMsg = "Format NIP salah";
            alert(errorMsg);
            return errorMsg;
        }else{
            return null;
        }
    }
}

export { CheckInput }
