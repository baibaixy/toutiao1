import { getToken, setToken } from '@/utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    str: getToken() || {}
  },
  getters: {},
  mutations: {
    SetUser (state, payload) {
      state.str = payload
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
