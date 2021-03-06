import CryptoJS from 'crypto-js'
import store from "@/store";
import appConfig from "@/config";
import messages from "@/assets/lang/messages";
import request from "@/utils/request";

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
    window.open(url)


    // if (!url.startsWith('http')) {
    //     router.push(url)
    //     return
    // }
    //
    // const open_in_broswer = store.getters['system/config'].open_in_broswer
    // const isApp = appConfig.isApp
    // if (!isApp) {
    //     window.location.href = url
    //     return
    // }
    //
    // if (open_in_broswer == '1') { //使用浏览器打开
    //     window.android.openUrl(url)
    // } else {
    //     //在APP内部打开
    //     window.location.href = url
    // }

}

export function encryptBy3DES(message, key = appConfig.encryptKey) {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

export function decryptBy3DES(ciphertext, key = appConfig.encryptKey) {
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

export function getAvatar(url) {
    if (!url) return require('@/assets/icon/default_avatar.png')
    return getImage(url)
}

//切换全局的货币类型
export function toggleGlobalCoinType() {
    let gcointype = store.getters['system/gcointype']
    if (gcointype === 'coin') {
        store.commit('system/setGcointype', 'usdt')
    } else {
        store.commit('system/setGcointype', 'coin')
    }
}

//根据文字生成颜色
export function getColorByText(text) {
    //获取第一个字符
    let firstName = text.substring(1, 0);

    //根据名字生成背景色
    let tmp = ''
    for (let i = 0; i < text.length; i++) {
        tmp += parseInt(text[i].charCodeAt(0), 10).toString(16);
    }
    const color = '#' + tmp.slice(1, 4)
    return color
}


/**
 * 生成文字头像
 * @param cvs  canvas dom对象
 * @param name 名字
 * @param width 画布宽度
 * @param height 画布高度
 */
export function createFontAvatar(cvs, name, width, height) {
    //获取名字的第一个字符
    let firstName = name.substring(1, 0);

    //根据名字生成背景色
    let tmp = ''
    for (let i = 0; i < name.length; i++) {
        tmp += parseInt(name[i].charCodeAt(0), 10).toString(16);
    }
    const bgColor = '#' + tmp.slice(1, 4)


    cvs.setAttribute('width', width);
    cvs.setAttribute('height', height);

    let ctx = cvs.getContext("2d");

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.font = width * 0.6 + "px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(firstName, width / 2, height / 2);

    return cvs.toDataURL('image/jpeg', 1);
}


export function getLvIcon(lv) {
    switch (lv) {
        case 1:
            return require('@/assets/img/vip1.png')
        case 2:
            return require('@/assets/img/vip2.png')
        case 3:
            return require('@/assets/img/vip3.png')
        case 4:
            return require('@/assets/img/vip4.png')
        case 5:
            return require('@/assets/img/vip5.png')
        default:
            return require('@/assets/img/vip1.png')
    }
}

export function getLvBgimage(lv) {
    switch (lv) {
        case 1:
            return require('@/assets/img/vip1-bg.png')
        case 2:
            return require('@/assets/img/vip2-bg.png')
        case 3:
            return require('@/assets/img/vip3-bg.png')
        case 4:
            return require('@/assets/img/vip4-bg.png')
        case 5:
            return require('@/assets/img/vip5-bg.png')
        default:
            return require('@/assets/img/vip1-bg.png')
    }
}


export function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, "");  //正则去掉所有的html标记
}

/*
* 判断设备类型
* */
export function getDeviceType() {
    const u = navigator.userAgent
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isiOS) {
        return "ios"
    } else {
        return "android"
    }
}

//下载app
export function downloadApp() {
    let appurl = ''
    let {protocol, host} = location
    let device = getDeviceType()
    if (device === 'ios') {
        appurl = protocol + "//" + host + '/app.mobileconfig'
    } else {
        appurl = protocol + "//" + host + '/app.apk'
    }
    openUrl(appurl)
}

//生成唯一id
export function nanoid(t = 21) {
    let e = "", r = crypto.getRandomValues(new Uint8Array(t));
    for (; t--;) {
        let n = 63 & r[t];
        e += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? "_" : "-"
    }
    return e
}