<template>
  <div class="members-container">
    <nut-cell
      v-for="i in 20"
      :key="i"
      :to="`/members/${i}`"
      title="Name"
      sub-title="店员"
      desc="No1024"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { getUsers } from '@/api/users'

export default defineComponent({
  name: 'Members',
  setup() {

    const state = reactive({
      loading: false,
      users: {}
    })

    onMounted(async () => {
      const response = await getUsers({
        'user-group': 'no003'
      })
      console.log('get users', response.data)
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
