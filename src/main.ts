import { createApp } from 'vue'

// 自己打包的 nutui，因为 grid 组建
// import NutUI from "@/components/nutui"
// import "@/components/nutui/dist/styles/themes/default.scss"

// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui"
import "@nutui/nutui/dist/style.css"

import Loading from '@/components/Loading.vue'
import '@/styles/index.scss'

// import Notifications from '@kyvg/vue3-notification'

import Permission from '@/directives/permission'

import App from './App.vue'
import router from './router'
import store, { key } from './store'

// import "../mock"

const app = createApp(App)

app.use(store, key)
app.use(router)
app.use(NutUI)
// app.use(Notifications)
app.component("Loading", Loading)
app.use(Permission)
app.mount('#app')
