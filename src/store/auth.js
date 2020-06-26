import { API_URL } from '../../config'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },

  getters: {
    authenticated: (state) => state.token,
    user: (state) => state.user,
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    }
  },

  actions: {
    signIn ({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/auth/login', credentials).then(response => {
          commit('setToken', response.data.access_token)
          commit('setUser', response.data.user)
          resolve(response)
        }).catch(err => {
          commit('setToken', null)
          commit('setUser', null)
          reject(err)
        })
      })
    },
    async getUser ({ commit, state }, token) {
      if(token) {
        commit('setToken', token)
      }
      
      if(!state.token) {
        return
      }

      try {
        let response = await axios.get(API_URL + '/me')
        commit('setUser', response.data)
      } catch (e) {
        commit('setToken', null)
        commit('setUser', null)
        console.log(e)
      }
    },

    signUp ({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/auth/signup', data).then(response => {
          commit('setToken', null)
          commit('setUser', null)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },

    logOut({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/auth/logout').then(response => {
          commit('setToken', null)
          commit('setUser', null)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })      
    }
  }
}
