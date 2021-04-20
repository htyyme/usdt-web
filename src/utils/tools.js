import CryptoJS from 'crypto-js'
import store from "@/store";
import appConfig from "@/config";
import messages from "@/assets/lang/messages";

/**
 * 获取语言包里的某个值
 * @param key
 */
export function getLangField(key) {
    let locale = store.state.system.locale || appConfig.locale
    let lang = messages[locale]
    return lang[key]
}

/*
* 生成一个随机数
* */
export function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//验证手机号格式
export function checkMobile(mobile) {
    return /^[0-9]{9,12}$/.test(mobile)
}

//验证邮箱格式
export function checkEmail(email) {
    let extArr = [
        '@gmail.com',
        '@yahoo.com',
        '@msn.com',
        '@hotmail.com',
        '@aol.com',
        '@ask.com',
        '@live.com',
        '@0355.net',
        '@yeah.net',
        '@googlemail.com',
        '@126.com',
        '@sina.com',
        '@sohu.com'
    ]
    let valid = false
    for (let i = 0; i < extArr.length; i++) {
        let index = email.indexOf(extArr[i])
        if (index !== -1) {
            valid = true
            break
        }
    }
    return valid
}

//验证银行卡格式
export function checkBankcardNo(cardNo) {
    return /^[0-9]{10,25}$/.test(cardNo)
}

//打开一个链接
export function openUrl(url) {
    if (!url) return
    console.log('url', url)
    /*
    * TODO
    * */

}

export function encryptBy3DES(message, key = config.encryptKey) {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

export function decryptBy3DES(ciphertext, key = config.encryptKey) {
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

//获取后台上传的图片
export function getImage(url) {
    if (!url) return ''
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) return url
    return store.getters['system/config']['pic_service_address'] + '/' + url
}