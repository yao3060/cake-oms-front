/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("divider");
const _sfc_main = create({
  props: {
    contentPosition: {
      type: String,
      default: "center"
    },
    dashed: {
      type: Boolean,
      default: false
    },
    hairline: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  setup(props, context) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}-center`]: context.slots.default,
        [`${prefixCls}-left`]: props.contentPosition === "left",
        [`${prefixCls}-right`]: props.contentPosition === "right",
        [`${prefixCls}-dashed`]: props.dashed,
        [`${prefixCls}-hairline`]: props.hairline
      };
    });
    return { classes };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
