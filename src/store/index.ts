import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import RootStateTypes, { AllStateTypes } from './interface'
import testModule from './modules/test'
import userModule from './modules/user'

export default createStore<RootStateTypes>({
  state: {
    test: 'RootStateTest',
    ordersTab: 'pending',
  },
  modules: {
    testModule,
    userModule
  }
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export function useStore<T = AllStateTypes>(): Store<T> {
  return baseUseStore<T>(key)
}

