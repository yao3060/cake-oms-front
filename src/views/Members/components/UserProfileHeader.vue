<template>
  <nut-skeleton width="250px" height="15px" title animated avatar row="3" :loading="!user.id">
    <div class="user-profile">
      <nut-avatar size="large">{{ user.nickname }}</nut-avatar>
      <div class="right-content">
        <div class="title">
          {{ user.nickname }}
          <nut-tag v-for="(role, index) in user.roles" :key="index">{{ role }}</nut-tag>
        </div>

        <div class="desc">{{ user.description || '用户描述' }}</div>
      </div>
    </div>
  </nut-skeleton>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import User from '@/types/User'

export default defineComponent({
  name: "UserProfileHeader",
  components: {
  },
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  .right-content {
    margin-left: 19px;
    font-family: PingFangSC;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    .title {
      font-size: 14px;
      color: #333;
    }
    .desc {
      margin-top: 10px;
      font-size: 13px;
      color: #9a9b9d;
    }
  }
}
</style>
