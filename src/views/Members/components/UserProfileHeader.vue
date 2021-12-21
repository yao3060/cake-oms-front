<template>
  <div class="user-profile">
    <nut-avatar
      icon="my"
      shape="square"
      size="large"
    />
    <div class="info">
      <h1>{{ user.display_name }}</h1>
      <div class="tags">
        <nut-tag plain>
          {{ user.title }}
        </nut-tag>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType} from 'vue'
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
  text-align:center;
  .info {
  }
}
</style>
