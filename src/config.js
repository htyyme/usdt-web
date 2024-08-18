//是否为APP 这个是支付接口 要传是否为web
const IS_APP = false
const IS_GOOGLE = false


export default {
    env: 'prod',//dev/prod
    isApp: IS_APP,
    isGoogle: IS_GOOGLE,
    apkVersion: '1.0.0', //版本
    appName: 'VIyour',//网站标题
    // host: 'https://www.cloudcelular.com/',//网站域名
    host: 'https://www.VIyour.com',//网站域名
    locale: 'French',//默认语言  Spanish 西班牙语  Turkey 土耳其语
    //时区查询https://jp.cybozu.help/general/zh/admin/list_systemadmin/list_localization/timezone.html
    // timezone: 'Asia/Bangkok', //时区 泰国
    // timezone: 'Asia/Kolkata', //时区 印度
    // timezone: 'America/New_York', //时区 美东时间 -5 时区
    // timezone: 'Europe/Minsk', //时区 +3 时区
    // timezone: 'America/Halifax', //时区 美东时间 -4 时区 智利
    // timezone: 'America/Caracas', //时区 美东时间 (UTC-04:30) 加拉加斯	 委内瑞拉
    // timezone: 'America/Sao_Paulo', //时区 (UTC-03:00) 巴西利亚
    timezone: 'Europe/Paris', //(UTC+01:00) 布鲁塞尔,哥本哈根,马德里,巴黎
    //接口地址
    baseApiUrl: IS_APP ? 'https://www.VIyour.com' : '/',
    //是否开启交易所
    openExchange:false
}

// 正式版上线需要修改 usdt-web/src/store/module/system.js  将 config.three_service_address = '1'  加上就是正式版



