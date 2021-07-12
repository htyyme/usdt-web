'use strict'

module.exports = {
    title: 'vicaro',
    baseCdnUrl: 'https://cdn.staticfile.org',
    // baseCdnUrl: '//cdnjs.cloudflare.com/ajax/libs/',
    cdns: [
        /**
         * 如果设置path属性, { name: 'vue', scope: 'Vue', path: '/vue/2.6.9/vue.min.js' } 即编译出来以[baseCdnUrl][path]
         * 否则自动拼写 [baseCdnUrl]/[name]/[version]/[name].min.js
         * */
        {name: 'vue', scope: 'Vue',path:'/vue/2.6.11/vue.min.js'},
        {name: 'vue-router', scope: 'VueRouter',path:'/vue-router/3.2.0/vue-router.min.js'},
        {name: 'vuex', scope: 'Vuex' ,path:'/vuex/3.6.2/vuex.min.js'},
        {name: 'axios', scope: 'axios',path: '/axios/0.21.1/axios.min.js'},
        {name: 'vant', scope: 'vant',path:'/vant/2.12.13/vant.min.js'},
        {name: 'dayjs', scope: 'dayjs', path: '/dayjs/1.10.4/dayjs.min.js'},
        {name: 'vue-clipboard2', scope: 'VueClipboard', path: '/vue-clipboard2/0.3.1/vue-clipboard.min.js'},
        {name: 'vue-i18n', scope: 'VueI18n', path: '/vue-i18n/8.24.3/vue-i18n.min.js'},
        {name: 'crypto-js', scope: 'CryptoJS',path:'/crypto-js/4.0.0/crypto-js.min.js'},
        { name: 'element-ui', scope: 'ELEMENT',  path: '/element-ui/2.12.0/index.js'},

    ]
};

//hs ./index --proxy http://192.168.2.49:8087