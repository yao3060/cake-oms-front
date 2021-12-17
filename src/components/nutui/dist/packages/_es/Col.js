/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { inject, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("col");
const _sfc_main = create({
  props: {
    span: {
      type: [String, Number],
      default: "24"
    },
    offset: {
      type: [String, Number],
      default: "0"
    }
  },
  setup(props) {
    const prefixCls = componentName;
    const gutter = inject("gutter");
    const classes = computed(() => {
      return {
        [prefixCls]: true,
        [prefixCls + "-gutter"]: gutter,
        ["nut-col-" + props.span]: true,
        ["nut-col-offset-" + props.offset]: true
      };
    });
    const style = computed(() => {
      return {
        paddingLeft: gutter / 2 + "px",
        paddingRight: gutter / 2 + "px"
      };
    });
    return {
      classes,
      style
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
