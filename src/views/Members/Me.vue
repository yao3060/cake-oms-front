<template>
  <UserProfileHeader :user="me" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import UserProfileHeader from './components/UserProfileHeader.vue'
import User from '@/types/User'
import { me } from '@/api/users'

export default defineComponent({
  name: 'Me',
  components: {
    UserProfileHeader
  },
  setup() {
    const state = reactive({
      me: {} as User
    })

    const getMyProfile = async () => {
      const response = await me()
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
</style>
