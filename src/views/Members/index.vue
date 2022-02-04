<template>
  <CssLoading :loading="loading" />
  <div class="members-container" v-if="members.length">
    <nut-cell
      v-for="(member, index) in members"
      :key="index"
      :title="member.display_name"
      :sub-title="member.roles.join(',')"
      :desc="member.mobile_phone"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { getMembers } from '@/api/users'
interface Member {
  id: number;
  display_name: string;
  user_email: string;
  mobile_phone: string;
  wechat: string;
  roles: Array<string>
}

export default defineComponent({
  name: 'Members',
  setup() {

    const state = reactive({
      loading: true,
      members: [] as Member[]
    })

    onMounted(async () => {
      state.loading = true
      const response = await getMembers({})
      console.log('get members', response)
      Object.assign(state.members, response)
      state.loading = false
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style  lang="scss" scoped>
.member {
  .name {
    line-height: 1.5em;
  }
  .name {
    padding: 5px 0;
  }
  .number {
    font-size: 12px;
    color: #666;
  }
}
</style>
