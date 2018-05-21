import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    selectedNav: '/'
  },
  getter: {},
  mutations: {
    changeNav (state, arg) {
      state.selectedNav = arg
    }
  },
  actions: {
    changeNav ({commit}, arg) {
      commit('changeNav', arg)
    }
  }
})

export default store
