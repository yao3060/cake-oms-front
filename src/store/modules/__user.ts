import { getToken } from '@/utils/auth'
import { login, me } from '@/api/users'
import LoginInfo from '@/types/LoginInfo'

export default {
  namespaced: true,
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }),
  mutations: {
    SET_TOKEN:(state, token) => {
      state.token = token
    }
  },
  actions: {
    login({ commit }, LoginInfo: LoginInfo): any {
      return new Promise((resolve, reject) => {
        login(LoginInfo).them(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getProfile({ commit, state }) {
      return new Promise((resolve, reject) => {
        me().then(response => {
          const { data } = response
          if (!data) {
            return reject('Verification failed, please login again')
          }
          const { id, user_email, user_nicename, user_display_name, roles } = data
          commit('SET_USER_ID', id)
          commit('SET_USER_EMAIL', user_email)
          commit('SET_USER_NICENAME', user_nicename)
          commit('SET_USER_DISPLAY_NAME', user_display_name)
          commit('SET_USER_ROLES', roles)
          resolve(data)
        }).catch(error => reject(error))
      })
    }
  },
  getters: {

  }
}
