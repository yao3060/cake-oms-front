import { App, DirectiveBinding } from "vue"
// const roles = []

function checkPermission(el: HTMLElement, binding: DirectiveBinding): any {
  const { value } = binding
  const roles: Array<string> = ['administer', 'editor']

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  install: (app: App): any => {
    app.directive("permission", {
      beforeMount: (el: HTMLElement, binding: DirectiveBinding) => {
        checkPermission(el, binding)
      },
      updated: (el: HTMLElement, binding: DirectiveBinding) => {
        checkPermission(el, binding)
      }
    })
  },
}
