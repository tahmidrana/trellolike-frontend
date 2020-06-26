import Vue from 'vue'
import Vuex from 'vuex'
import board from './board'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 
  },
  getters: {
    // 
  },
  mutations: {
    // 
  },
  actions: {
    //
  },
  modules: {
    board,
    auth
  }
})
