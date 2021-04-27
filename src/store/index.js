import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate"

import system from "./module/system"
import user from "./module/user"
import msg from "./module/msg"
import usdt from "./module/usdt";

export default new Vuex.Store({
  modules: {
    system,
    user,
    msg,
    usdt
  },

  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
})
