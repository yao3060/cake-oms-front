import { createApp } from 'vue'

import NutUI from "@nutui/nutui"
import "@nutui/nutui/dist/styles/themes/default.scss"

import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'

import "../mock"

createApp(App)
  .use(store)
  .use(router)
  .use(NutUI)
  .use(VueLoading)
  .mount('#app')
