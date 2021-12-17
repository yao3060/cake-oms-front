/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { reactive, provide, watch, openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("tabbar");
const _sfc_main = create({
  props: {
    visible: {
      type: [Number, String],
      default: 0
    },
    bottom: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "base"
    },
    size: {
      type: String,
      default: "20px"
    },
    unactiveColor: {
      type: String,
      default: "#000000"
    },
    activeColor: {
      type: String,
      default: ""
    }
  },
  emits: ["tab-switch", "update:visible"],
  setup(props, { emit, slots }) {
    const mdValue = reactive({
      val: props.visible,
      children: []
    });
    function changeIndex(active) {
      emit("update:visible", active);
      parentData.modelValue = active;
      emit("tab-switch", parentData.children[active], active);
    }
    let parentData = reactive({
      children: mdValue.children,
      size: props.size,
      modelValue: mdValue.val,
      unactiveColor: props.unactiveColor,
      activeColor: props.activeColor,
      changeIndex
    });
    provide("parent", parentData);
    watch(() => props.visible, (value) => {
      parentData.modelValue = value;
    });
    return {
      changeIndex
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(["nut-tabbar", { "nut-tabbar-bottom": _ctx.bottom }])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
