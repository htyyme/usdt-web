import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from "@/config";
Vue.config.productionTip = false

// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

import '@/plugin'

import "amfe-flexible"
import '@/assets/css/base.css'
import '@/assets/css/common.scss'
import '@/utils/vant'
import '@/utils/commonCpns'
import service from "@/utils/request"
import * as tools from '@/utils/tools'
import * as filters from '@/utils/filters'
import messages from "@/assets/lang/messages"

//复制文字
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

//国际化
import Vue18n from 'vue-i18n'
Vue.use(Vue18n)
const i18n = new Vue18n({
  locale:store.state.system.locale || config.locale,
  messages:messages
})
Vue.prototype._i18n = i18n

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$bus = new Vue()
Vue.prototype.$config = config
Vue.prototype.$tools = tools
Vue.prototype.$http = service
import {payNotify} from "@/utils/pay";
window.payNotify = payNotify

//插件
import jconfirm from "@/components/jconfirm/jconfirm";
Vue.prototype.$jconfirm = jconfirm.install

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
