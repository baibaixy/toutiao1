import { getToken, setToken } from '@/utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {}
  },
  getters: {},
  mutations: {
    SetUser (state, payload) {
      state.user = payload
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
