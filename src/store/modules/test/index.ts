import { Module } from 'vuex'
import RootStateTypes from '@/store/interface'
import TestModuleTypes from '@/store/modules/test/interface'

const testModule: Module<TestModuleTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    name: 'testModule',
    count: 0,
  },
  mutations: {
    ADD_COUNT(state) {
      state.count++
    }
  },
  actions: {
    increment({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('ADD_COUNT')
          resolve(1)
        }, 1000)
      })
    }
  }
}

export default testModule
