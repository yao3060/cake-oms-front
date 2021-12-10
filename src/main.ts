import { createApp } from 'vue'

import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/styles/themes/default.scss";

import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
.use(store)
.use(router)
.use(NutUI)
  .mount('#app')
