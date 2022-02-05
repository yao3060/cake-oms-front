import { createApp, version } from 'vue'
console.log('Vue.version', version)

// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui"
import "@nutui/nutui/dist/style.css"

import 'loaders.css'
import '@/styles/index.scss'

import CssLoading from '@/components/CssLoading.vue'

import Permission from '@/directives/permission'

import App from './App.vue'
import router from './router'
import store, { key } from './store'

// import "../mock"

const app = createApp(App)

app.use(store, key)
app.use(router)
app.use(NutUI)
app.use(Permission)
app.component('CssLoading', CssLoading)
app.mount('#app')
