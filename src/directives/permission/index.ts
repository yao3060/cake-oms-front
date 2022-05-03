import {App, DirectiveBinding, VNode} from "vue"
import store from '@/store'

function checkPermission(el: HTMLElement, binding: DirectiveBinding, hook: string): any {

  if (!binding.value) {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }

  const { value } = binding
  const roles: Array<string> = store.getters['userModule/roles']
  console.log('store.getters.roles', store.getters['userModule/roles'])

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        console.log('role', role)
        return permissionRoles.includes(role)
      })

      // console.log('hasPermission', hasPermission, hook, el, el.parentElement)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles!! Like v-permission="['admin','editor']"`)
  }
}

export default {
  install: (app: App): any => {
    app.directive("permission", {
      mounted: (el: HTMLElement, binding: DirectiveBinding, vnode:VNode) => {
        checkPermission(el, binding, 'mounted')
      },
      updated: (el: HTMLElement, binding: DirectiveBinding,vnode:VNode) => {
        checkPermission(el, binding, 'updated')
      }
    })
  },
}
