//是否为APP
const IS_APP = false
const IS_GOOGLE = false

export default {
    env: 'prod',//dev/prod
    isApp: IS_APP,
    isGoogle: IS_GOOGLE,
    apkVersion: '1.0.0', //版本
    appName: 'XXM',//网站标题
    host: 'https://www.usdtatm.net/',//网站域名
    locale: 'Poland',//默认语言  Spanish 西班牙语
    // timezone: 'Asia/Bangkok', //时区 泰国
    // timezone: 'Asia/Kolkata', //时区 印度
    timezone: 'America/New_York', //时区 美东时间 -5 时区
    //接口地址
    baseApiUrl: IS_APP ? 'https://www.usdtatm.net/' : '/',
    //是否开启交易所
    openExchange:false
}


// 正式版上线需要修改 usdt-web/src/store/module/system.js  将 config.three_service_address = '1'  加上就是正式版



