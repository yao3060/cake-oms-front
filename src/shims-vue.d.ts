/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

//这是自己添加的
declare module 'address-smart-parse' {
  import smart from 'address-smart-parse'
  export default smart
}
