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

declare module 'in_array' {
  import in_array from 'in_array'
  export default in_array
}

