//是否为APP
const IS_APP = false

export default {
    env: 'dev',//dev/prod
    isApp: IS_APP,
    apkVersion: '1.0.3', //版本
    appName: 'jdmoney',//网站标题
    host: 'http://localhost',//网站域名
    encryptKey: '4n3I6Hni50YsyUgTix0CL01Z',
    locale: 'en',//默认语言
    timezone: 'Asia/Bangkok', //时区
    //接口地址
    baseApiUrl: IS_APP ? 'http://localhost:8080' : '/'
}