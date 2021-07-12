//是否为APP
const IS_APP = true

export default {
    env: 'prod',//dev/prod
    isApp: IS_APP,
    apkVersion: '1.0.3', //版本
    appName: 'vicaro',//网站标题
    host: 'https://www.vicaro.in/',//网站域名
    encryptKey: '4n3I6Hni50YsyUgTix0CL01Z',
    locale: 'en',//默认语言
    // timezone: 'Asia/Bangkok', //时区 泰国
    timezone: 'Asia/Kolkata', //时区 印度
    //接口地址
    baseApiUrl: IS_APP ? 'https://app.vicaro.in/' : '/'
}


// 正式版上线需要修改 usdt-web/src/store/module/system.js  将 config.three_service_address = '1'  加上就是正式版