import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNavShown: false
  },
  mutations: {
    toggleNav(state) {
      state.isNavShown = !state.isNavShown
    }
  },
  actions: {},
  modules: {}
})
