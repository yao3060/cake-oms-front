<template>
  <div v-if="me.hasOwnProperty('id')" class="profile">
    <UserProfileHeader :user="me" />
    <Stores :stores="me.stores" />
    <nut-button block type="default" shape="square" @click="logout">登出</nut-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import UserProfileHeader from './components/UserProfileHeader.vue'
import Stores from './components/Stores.vue'
import User from '@/types/User'
import { me } from '@/api/users'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Me',
  components: {
    UserProfileHeader, Stores
  },
  setup() {
    const store = useStore()

    const state = reactive({
      me: {} as User,
      logout: () => {
        store.dispatch('userModule/resetToken').then(() => location.reload())
      }
    })

    const getMyProfile = async () => {
      const response = await me()
      console.log('getMyProfile', response)
      state.me = response
    }

    onMounted(() => {
      getMyProfile()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>
.profile {
  padding: 15px;
}
</style>
