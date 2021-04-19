import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate"

import system from "./module/system"
import user from "./module/user"

export default new Vuex.Store({
  modules: {
    system,
    user
  },

  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
})
