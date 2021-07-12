import CryptoJS from "crypto-js";

const encryptKey = '4n3I6Hni50YsyUgTix0CL01Z'

function encryptBy3DES(message, key = encryptKey) {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function decryptBy3DES(ciphertext, key = encryptKey) {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    // direct decrypt ciphertext
    const decrypted = CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}


//请求数据加密
function encryptReqData(data) {
    data = data ? data : {}
    let s = JSON.stringify(data)
    let en = encryptBy3DES(s)
    // console.log(en)
    return en
}

//响应数据解密
function decryptResData(data) {
    let de = decryptBy3DES(data)
    de = JSON.parse(de)
    return de
}



export {
    encryptBy3DES,
    decryptBy3DES,
    encryptReqData,
    decryptResData
}


















