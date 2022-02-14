var aes = require("crypto-js/aes");
var utf8 = require("crypto-js/enc-utf8");
var sha = require("crypto-js/sha256");

export const generateChecksum = (body) => {
    let decrypt = (cipher, key) => aes.decrypt(cipher, key).toString(utf8);
    let getkey = (encryptedKey) => {
        let spltd = encryptedKey.split(":");
        let id = spltd[0];
        let p = decrypt(spltd[1], id);
        let pa = [];
        let l = 5;
        for (let index = 0; index < l; index++) {
            pa[index] = p[index];
        }
        let dcys = spltd.filter((v, i) =>
            [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(i)
        );
        let k = spltd[12];

        let result = k;
        for (let index = 0; index < l; index++) {
            result = decrypt(result, dcys[pa[index]]);
        }

        return result;
    };

    var checksum = sha(JSON.stringify(body) + getkey(CONFIG.ENCRYPTED_KEY));
    return checksum;
};


