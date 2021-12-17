/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { provide, openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("row");
const _sfc_main = create({
  props: {
    type: {
      type: String,
      default: ""
    },
    gutter: {
      type: [String, Number],
      default: ""
    },
    justify: {
      type: String,
      default: "start"
    },
    align: {
      type: String,
      default: "flex-start"
    },
    wrap: {
      type: String,
      default: "nowrap"
    }
  },
  setup(props) {
    const prefixCls = componentName;
    provide("gutter", props.gutter);
    const getClass = (prefix, type) => {
      return prefix ? type ? `nut-row-${prefix}-${type}` : "" : `nut-row-${type}`;
    };
    const getClasses = () => {
      return `
              ${getClass("", props.type)}
              ${getClass("justify", props.justify)}
              ${getClass("align", props.align)}
              ${getClass("flex", props.wrap)}
              ${prefixCls}
              `;
    };
    return {
      getClasses
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.getClasses())
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
