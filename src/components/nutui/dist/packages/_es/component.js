/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { defineComponent } from "vue";
function createComponent(name) {
  const componentName = "nut-" + name;
  return {
    componentName,
    create: function(_component) {
      _component.baseName = name;
      _component.name = componentName;
      _component.install = (vue) => {
        vue.component(_component.name, _component);
      };
      return defineComponent(_component);
    },
    createDemo: function(_component) {
      _component.baseName = name;
      _component.name = "demo-" + name;
      return defineComponent(_component);
    }
  };
}
export { createComponent as c };
