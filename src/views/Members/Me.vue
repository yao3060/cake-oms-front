<template>
  <div>
    <UserProfileHeader
      :user="user"
      :auth-user="authUser"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserProfileHeader from './components/UserProfileHeader.vue'
import User from '@/types/User'

export default defineComponent({
  name: 'Me',
  components: {
    UserProfileHeader
  },
  setup () {
    const user = ref<User>({
      display_name: "我是谁",
      title: '店长'
    })
    const authUser = ref({})

            return {
                user ,
                authUser
            }
  }
})
</script>

<style scoped>

</style>
