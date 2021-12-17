/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, createBlock, createCommentVNode, Fragment, withDirectives, toDisplayString, vShow } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("switch");
const _sfc_main = create({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ""
    },
    inactiveColor: {
      type: String,
      default: ""
    },
    activeText: {
      type: String,
      default: ""
    },
    inactiveText: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: "loading1"
    },
    size: {
      type: [String, Number],
      default: "12px"
    },
    color: {
      type: String,
      default: ""
    }
  },
  emits: ["change", "update:modelValue"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [props.modelValue ? "switch-open" : "switch-close"]: true,
        [`${prefixCls}-disable`]: props.disable,
        [`${prefixCls}-base`]: true
      };
    });
    const style = computed(() => {
      return {
        backgroundColor: props.modelValue ? props.activeColor : props.inactiveColor
      };
    });
    const onClick = (event) => {
      if (props.disable || props.loading)
        return;
      emit("update:modelValue", !props.modelValue);
      emit("update:loading");
      emit("change", !props.modelValue, event);
    };
    return {
      classes,
      style,
      onClick
    };
  }
});
const _hoisted_1 = { class: "switch-button" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
    style: normalizeStyle(_ctx.style)
  }, [
    createElementVNode("view", _hoisted_1, [
      _ctx.loading ? (openBlock(), createBlock(_component_nut_icon, {
        key: 0,
        name: _ctx.name,
        size: _ctx.size,
        color: _ctx.color
      }, null, 8, ["name", "size", "color"])) : createCommentVNode("", true),
      _ctx.activeText ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        withDirectives(createElementVNode("view", { class: "nut-switch-label open" }, toDisplayString(_ctx.activeText), 513), [
          [vShow, _ctx.modelValue]
        ]),
        withDirectives(createElementVNode("view", { class: "nut-switch-label close" }, toDisplayString(_ctx.inactiveText), 513), [
          [vShow, !_ctx.modelValue]
        ])
      ], 64)) : createCommentVNode("", true)
    ])
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
