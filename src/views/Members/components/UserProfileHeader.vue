<template>
  <div class="user-profile">
    <nut-avatar icon="my" size="large" />
    <div class="info">
      <h1>{{ user.nickname }}</h1>
      <div class="tags">
        <nut-tag v-for="(role, index) in user.roles" :key="index">{{ role }}</nut-tag>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import User from '@/types/User'

export default defineComponent({
  name: "UserProfileHeader",
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  }
})
</script>
<style lang="scss" scoped>
.user-profile {
  text-align: center;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
</style>
