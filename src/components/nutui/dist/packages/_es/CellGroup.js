/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, openBlock, createElementBlock, normalizeClass, renderSlot, toDisplayString, createCommentVNode, createElementVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("cell-group");
const _sfc_main = create({
  props: {
    title: { type: String, default: "" },
    desc: { type: String, default: "" }
  },
  setup() {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    return {
      classes
    };
  }
});
const _hoisted_1 = {
  key: 1,
  class: "nut-cell-group__title"
};
const _hoisted_2 = {
  key: 3,
  class: "nut-cell-group__desc"
};
const _hoisted_3 = { class: "nut-cell-group__warp" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }) : _ctx.title ? (openBlock(), createElementBlock("view", _hoisted_1, toDisplayString(_ctx.title), 1)) : createCommentVNode("", true),
    _ctx.$slots.desc ? renderSlot(_ctx.$slots, "desc", { key: 2 }) : _ctx.desc ? (openBlock(), createElementBlock("view", _hoisted_2, toDisplayString(_ctx.desc), 1)) : createCommentVNode("", true),
    createElementVNode("view", _hoisted_3, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
