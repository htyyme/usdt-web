'use strict'

module.exports = {
    title: 'shuadan',
    // baseCdnUrl: '//cdn.staticfile.org',
    baseCdnUrl: '//cdnjs.cloudflare.com/ajax/libs/',
    cdns: [
        /**
         * 如果设置path属性, { name: 'vue', scope: 'Vue', path: '/vue/2.6.9/vue.min.js' } 即编译出来以[baseCdnUrl][path]
         * 否则自动拼写 [baseCdnUrl]/[name]/[version]/[name].min.js
         * */
        {name: 'vue', scope: 'Vue'},
        {name: 'vue-router', scope: 'VueRouter'},
        {name: 'vuex', scope: 'Vuex'},
        {name: 'axios', scope: 'axios'},
        // {name: 'vant', scope: 'vant'},
        {name: 'dayjs', scope: 'dayjs', path: '/dayjs/1.4.1/dayjs.min.js'},
        {name: 'nanoid', scope: 'nanoid', path: '/nanoid/3.1.0/async/index.min.js'},
        {name: 'vue-clipboard2', scope: 'VueClipboard', path: '/vue-clipboard2/0.0.6/vue-clipboard.min.js'},
        {name: 'vue-i18n', scope: 'Vue18n', path: '/vue-i18n/0.1.2/vue-i18n.min.js'},
        {
            name: 'vuex-persistedstate',
            scope: 'createPersistedState',
            path: '/vuex-persistedstate/2.5.0/vuex-persistedstate.min.js'
        },
        {name: 'crypto-js', scope: 'CryptoJS'}

    ]
};