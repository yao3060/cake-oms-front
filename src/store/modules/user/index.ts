import { Module } from 'vuex'
import RootStateTypes from '@/store/interface'
import UserModuleTypes from './interface'
import { login, me } from '@/api/users'
import LoginInfo from '@/types/LoginInfo'
import { getToken, setToken, removeToken } from '@/utils/auth'

const userModule: Module<UserModuleTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    id: 0,
    email: '',
    nicename: '',
    display_name: '',
    token: '',
    roles: [],
    subordinates: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_ID: (state, payload) => state.id = payload,
    SET_EMAIL: (state, payload) => state.email = payload,
    SET_NICENAME: (state, payload) => state.nicename = payload,
    SET_DISPLAY_NAME: (state, payload) => state.display_name = payload,
    SET_ROLES: (state, payload) => state.roles = payload,
    SET_SUBORDINATES: (state, payload) => state.subordinates = payload,
  },
  actions: {
    login2({ commit }, data: LoginInfo) {
      return new Promise((resolve, reject) => {
        login({
          username: data.username,
          password: data.password
        }).then((response: any) => {
          console.log('login2', response)
          commit('SET_TOKEN', response.token)
          commit('SET_ID', response.id)
          commit('SET_EMAIL', response.user_email)
          commit('SET_NICENAME', response.user_nicename)
          commit('SET_DISPLAY_NAME', response.user_display_name)
          commit('SET_ROLES', response.roles)
          commit('SET_SUBORDINATES', response.subordinates) //subordinates
          setToken(response.token)
          resolve(response)
        }).catch((error: any) => reject(error))
      })
    },
    me({ commit }, data) {
      console.log('userModele/me', data)
      commit('SET_TOKEN', data.token)
      return new Promise((resolve, reject) => {
        me().then((response: any) => {
          console.log('current user profile', response)
          commit('SET_ID', response.id)
          commit('SET_EMAIL', response.email)
          commit('SET_NICENAME', response.nickname)
          commit('SET_DISPLAY_NAME', response.nickname)
          commit('SET_ROLES', response.roles)
          commit('SET_SUBORDINATES', response.subordinates) //subordinates
          resolve(response)
        }).catch((error: any) => reject(error))
      })
    },
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve('')
      })
    },

  },
  getters: {
    token: (state) => {
      return state.token
    },
    nicename: (state) => {
      return state.nicename
    },
    roles: (state) => {
      return state.roles
    }
  }
}

export default userModule
