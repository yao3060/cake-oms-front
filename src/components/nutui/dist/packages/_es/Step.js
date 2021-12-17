var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { getCurrentInstance, inject, reactive, computed, toRefs, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, createBlock, Fragment, toDisplayString, createCommentVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create, componentName } = createComponent("step");
const _sfc_main = create({
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: null
    },
    iconColor: {
      type: String,
      default: ""
    },
    size: {
      type: [String, Number],
      default: "12px"
    }
  },
  setup(props, { emit, slots }) {
    const { proxy } = getCurrentInstance();
    const parent = inject("parent");
    parent["relation"](proxy);
    const state = reactive({
      dot: parent.props.progressDot
    });
    const index2 = computed(() => parent.state.children.indexOf(proxy) + 1);
    const getCurrentStatus = () => {
      const activeIndex = index2.value;
      if (activeIndex < +parent.props.current)
        return "finish";
      return activeIndex === +parent.props.current ? "process" : "wait";
    };
    const status = computed(() => {
      return getCurrentStatus();
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${status.value}`]: true
      };
    });
    return __spreadProps(__spreadValues({}, toRefs(state)), {
      index: index2,
      classes
    });
  }
});
const _hoisted_1 = { class: "nut-step-head" };
const _hoisted_2 = /* @__PURE__ */ createElementVNode("view", { class: "nut-step-line" }, null, -1);
const _hoisted_3 = {
  key: 2,
  class: "nut-step-inner"
};
const _hoisted_4 = { class: "nut-step-main" };
const _hoisted_5 = { class: "nut-step-title" };
const _hoisted_6 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("view", _hoisted_1, [
      _hoisted_2,
      createElementVNode("view", {
        class: normalizeClass(["nut-step-icon", [!_ctx.dot ? _ctx.icon ? "is-icon" : "is-text" : ""]])
      }, [
        _ctx.icon ? (openBlock(), createBlock(_component_nut_icon, {
          key: 0,
          class: "nut-step-icon-inner",
          color: _ctx.iconColor,
          name: _ctx.icon,
          size: _ctx.size
        }, null, 8, ["color", "name", "size"])) : _ctx.dot ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [], 64)) : (openBlock(), createElementBlock("view", _hoisted_3, toDisplayString(_ctx.index), 1))
      ], 2)
    ]),
    createElementVNode("view", _hoisted_4, [
      createElementVNode("view", _hoisted_5, toDisplayString(_ctx.title), 1),
      _ctx.content ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: "nut-step-content",
        innerHTML: _ctx.content
      }, null, 8, _hoisted_6)) : createCommentVNode("", true)
    ])
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
