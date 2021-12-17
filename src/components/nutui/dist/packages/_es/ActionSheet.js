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
import { c as createComponent } from "./component.js";
import { computed, resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withCtx, createElementVNode, toDisplayString, createCommentVNode, Fragment, renderList, normalizeStyle, createTextVNode } from "vue";
import { popupProps } from "./Popup.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./OverLay.js";
import "./Icon.js";
import "./pxCheck.js";
const { componentName, create } = createComponent("actionsheet");
const _sfc_main = create({
  props: __spreadProps(__spreadValues({}, popupProps), {
    cancelTxt: {
      type: String,
      default: ""
    },
    optionTag: {
      type: String,
      default: "name"
    },
    optionSubTag: {
      type: String,
      default: "subname"
    },
    chooseTagValue: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#ee0a24"
    },
    description: {
      type: String,
      default: ""
    },
    menuItems: {
      type: Array,
      default: () => []
    }
  }),
  emits: ["cancel", "choose", "update:visible"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const isHighlight = (item) => {
      return props.chooseTagValue && props.chooseTagValue === item[props.optionTag] ? props.color : "#1a1a1a";
    };
    const cancelActionSheet = () => {
      emit("cancel");
      emit("update:visible", false);
    };
    const chooseItem = (item, index2) => {
      if (!item.disable) {
        emit("choose", item, index2);
        emit("update:visible", false);
      }
    };
    const close = () => {
      emit("close");
      emit("update:visible", false);
    };
    return {
      isHighlight,
      cancelActionSheet,
      chooseItem,
      close,
      classes
    };
  }
});
const _hoisted_1 = { class: "nut-actionsheet-panel" };
const _hoisted_2 = {
  key: 0,
  class: "nut-actionsheet-title"
};
const _hoisted_3 = {
  key: 1,
  class: "nut-actionsheet-item desc"
};
const _hoisted_4 = {
  key: 2,
  class: "nut-actionsheet-menu"
};
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "subdesc" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_popup = resolveComponent("nut-popup");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createVNode(_component_nut_popup, {
      "pop-class": "popclass",
      visible: _ctx.visible,
      position: "bottom",
      round: "",
      onClickOverlay: _ctx.close
    }, {
      default: withCtx(() => [
        createElementVNode("view", _hoisted_1, [
          _ctx.title ? (openBlock(), createElementBlock("view", _hoisted_2, toDisplayString(_ctx.title), 1)) : createCommentVNode("", true),
          _ctx.description ? (openBlock(), createElementBlock("view", _hoisted_3, toDisplayString(_ctx.description), 1)) : createCommentVNode("", true),
          _ctx.menuItems.length ? (openBlock(), createElementBlock("view", _hoisted_4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.menuItems, (item, index2) => {
              return openBlock(), createElementBlock("view", {
                class: normalizeClass(["nut-actionsheet-item", { "nut-actionsheet-item-disabled": item.disable }]),
                style: normalizeStyle({ color: _ctx.isHighlight(item) }),
                key: index2,
                onClick: ($event) => _ctx.chooseItem(item, index2)
              }, [
                createTextVNode(toDisplayString(item[_ctx.optionTag]), 1),
                createElementVNode("view", _hoisted_6, toDisplayString(item[_ctx.optionSubTag]), 1)
              ], 14, _hoisted_5);
            }), 128))
          ])) : createCommentVNode("", true),
          _ctx.cancelTxt ? (openBlock(), createElementBlock("view", {
            key: 3,
            class: "nut-actionsheet-cancel",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.cancelActionSheet && _ctx.cancelActionSheet(...args))
          }, toDisplayString(_ctx.cancelTxt), 1)) : createCommentVNode("", true)
        ])
      ]),
      _: 1
    }, 8, ["visible", "onClickOverlay"])
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
