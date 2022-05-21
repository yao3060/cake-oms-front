import { createApp, version } from 'vue'

import {
  Button,
  Cell,
  Icon,
  Tabbar,
  Toast,
  ShortPassword,
  Price,
  Layout,
  Rate,
  Popup,
  Calendar,
  Video,
  NoticeBar,
  NumberKeyboard,
  CountDown,
  Tag,
  Badge,
  SearchBar,
  Avatar,
  Menu,
  MenuItem,
  Popover,
  Pagination,
  Form, FormItem,
  Uploader,
  Navbar,
  CellGroup,
  Divider,
  TextArea,
  Col,
  Row,
  TabbarItem,
  Steps,
  Step,
  DatePicker,
  Progress,
  ActionSheet,
  Dialog,
  Tabs,
  TabPane,
  Empty,
  ImagePreview,
  Skeleton,
} from "@nutui/nutui"
import "@nutui/nutui/dist/style.css"

import 'loaders.css'
import '@/styles/index.scss'

import CssLoading from '@/components/CssLoading.vue'

import Permission from '@/directives/permission'

import App from './App.vue'
import router from './router'
import store, { key } from './store'

// import "../mock"
console.log('Vue.version', version)

const app = createApp(App)
app.use(store, key)
app.use(router)

const nutuiComponents = [
  Button,
  Uploader,
  Cell,
  Form, FormItem,
  Icon,
  Tabbar,
  Toast,
  ShortPassword,
  Price,
  Layout,
  Rate,
  Popup,
  Calendar,
  Video,
  NoticeBar,
  NumberKeyboard,
  CountDown,
  Tag,
  Badge,
  SearchBar,
  Avatar,
  Menu,
  MenuItem,
  Popover,
  Pagination,
  Navbar,
  CellGroup,
  Divider,
  TextArea,
  Col,
  Row,
  TabbarItem,
  Steps,
  Step,
  DatePicker,
  Progress,
  ActionSheet,
  Dialog,
  Tabs,
  TabPane,
  Empty,
  ImagePreview,
  Skeleton,
]
nutuiComponents.forEach(item => {
  app.use(item);
})

app.use(Permission)
app.component('CssLoading', CssLoading)
app.mount('#app')
