<template>
  <div class="app-wrapper">
    <Header class="app-header" />
    <div class="main-container">
      <AppMain />
    </div>
    <Footer class="app-footer" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import  { AppMain, Header, Footer } from './components'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    AppMain,
    Footer
  }
})
</script>
