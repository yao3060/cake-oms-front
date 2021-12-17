/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { reactive, computed, openBlock, createElementBlock, createElementVNode, renderSlot, withDirectives, toDisplayString, normalizeClass, normalizeStyle, vShow } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("badge");
const _sfc_main = create({
  props: {
    value: {
      type: [String, Number]
    },
    max: {
      type: Number,
      default: 1e4
    },
    dot: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: "0"
    },
    right: {
      type: String,
      default: "0"
    },
    zIndex: {
      type: Number,
      default: 9
    },
    color: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const state = reactive({});
    const stl = computed(() => {
      return {
        top: `${props.top}px`,
        right: `${props.right}px`,
        zIndex: props.zIndex,
        background: props.color
      };
    });
    const content = computed(() => {
      if (props.dot)
        return;
      const value = props.value;
      const max = props.max;
      if (typeof value === "number" && typeof max === "number") {
        return max < value ? `${max}+` : value;
      }
      return value;
    });
    return {
      state,
      stl,
      content
    };
  }
});
const _hoisted_1 = { class: "nut-badge" };
const _hoisted_2 = { class: "slot-icons" };
const _hoisted_3 = ["textContent"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", _hoisted_1, [
    createElementVNode("view", _hoisted_2, [
      renderSlot(_ctx.$slots, "icons")
    ]),
    renderSlot(_ctx.$slots, "default"),
    withDirectives(createElementVNode("view", {
      textContent: toDisplayString(_ctx.content),
      class: normalizeClass(["nut-badge__content sup", { "is-dot": _ctx.dot }]),
      style: normalizeStyle(_ctx.stl)
    }, null, 14, _hoisted_3), [
      [vShow, !_ctx.hidden && (_ctx.content || _ctx.dot)]
    ])
  ]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
