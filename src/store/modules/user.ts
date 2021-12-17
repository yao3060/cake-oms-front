import { getToken } from '@/utils/auth'

type state = Object

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations: {
  increment(state) {
    state.count++
  }
}
