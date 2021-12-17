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
import { reactive, computed, toRefs, resolveComponent, openBlock, createElementBlock, normalizeStyle, renderSlot, createCommentVNode, createElementVNode, withModifiers, withDirectives, createVNode, vShow } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("searchbar");
const _sfc_main = create({
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputType: {
      type: String,
      default: "text"
    },
    maxLength: {
      type: [String, Number],
      default: "9999"
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: ""
    },
    inputBackground: {
      type: String,
      default: ""
    }
  },
  emits: ["change", "update:modelValue", "blur", "focus", "clear", "search"],
  setup(props, { emit }) {
    const state = reactive({
      active: false
    });
    const searchbarStyle = computed(() => {
      return {
        background: props.background
      };
    });
    const inputSearchbarStyle = computed(() => {
      return {
        background: props.inputBackground
      };
    });
    const valueChange = (event) => {
      const input = event.target;
      let val = input.value;
      if (props.maxLength && val.length > Number(props.maxLength)) {
        val = val.slice(0, Number(props.maxLength));
      }
      emit("update:modelValue", val, event);
      emit("change", val, event);
    };
    const valueFocus = (event) => {
      const input = event.target;
      let value = input.value;
      state.active = true;
      emit("focus", value, event);
    };
    const valueBlur = (event) => {
      setTimeout(() => {
        state.active = false;
      }, 0);
      const input = event.target;
      let value = input.value;
      if (props.maxLength && value.length > Number(props.maxLength)) {
        value = value.slice(0, Number(props.maxLength));
      }
      emit("blur", value, event);
    };
    const handleClear = (event) => {
      emit("update:modelValue", "", event);
      emit("change", "", event);
      emit("clear", "");
    };
    const handleSubmit = () => {
      emit("search", props.modelValue);
    };
    return __spreadProps(__spreadValues({}, toRefs(state)), {
      valueChange,
      valueFocus,
      valueBlur,
      handleClear,
      handleSubmit,
      searchbarStyle,
      inputSearchbarStyle
    });
  }
});
const _hoisted_1 = {
  key: 0,
  class: "nut-searchbar__search-icon nut-searchbar__left-search-icon"
};
const _hoisted_2 = {
  key: 0,
  class: "nut-searchbar__search-icon nut-searchbar__iptleft-search-icon"
};
const _hoisted_3 = { class: "nut-searchbar__input-inner" };
const _hoisted_4 = ["type", "maxlength", "placeholder", "value"];
const _hoisted_5 = {
  key: 1,
  class: "nut-searchbar__search-icon nut-searchbar__iptright-sarch-icon"
};
const _hoisted_6 = {
  key: 1,
  class: "nut-searchbar__search-icon nut-searchbar__right-search-icon"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: "nut-searchbar",
    style: normalizeStyle(_ctx.searchbarStyle)
  }, [
    _ctx.$slots.leftout ? (openBlock(), createElementBlock("view", _hoisted_1, [
      renderSlot(_ctx.$slots, "leftout")
    ])) : createCommentVNode("", true),
    createElementVNode("view", {
      class: "nut-searchbar__search-input",
      style: normalizeStyle(_ctx.inputSearchbarStyle)
    }, [
      _ctx.$slots.leftin ? (openBlock(), createElementBlock("view", _hoisted_2, [
        renderSlot(_ctx.$slots, "leftin")
      ])) : createCommentVNode("", true),
      createElementVNode("view", _hoisted_3, [
        createElementVNode("form", {
          action: "#",
          onSubmit: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.handleSubmit && _ctx.handleSubmit(...args), ["prevent"]))
        }, [
          createElementVNode("input", {
            class: "nut-searchbar__input-bar",
            type: _ctx.inputType,
            maxlength: _ctx.maxLength,
            placeholder: _ctx.placeholder,
            value: _ctx.modelValue,
            onInput: _cache[0] || (_cache[0] = (...args) => _ctx.valueChange && _ctx.valueChange(...args)),
            onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.valueFocus && _ctx.valueFocus(...args)),
            onBlur: _cache[2] || (_cache[2] = (...args) => _ctx.valueBlur && _ctx.valueBlur(...args))
          }, null, 40, _hoisted_4)
        ], 32),
        _ctx.clearable ? withDirectives((openBlock(), createElementBlock("view", {
          key: 0,
          onClick: _cache[4] || (_cache[4] = (...args) => _ctx.handleClear && _ctx.handleClear(...args)),
          class: "nut-searchbar__input-clear"
        }, [
          createVNode(_component_nut_icon, {
            name: "circle-close",
            size: "12",
            color: "#555"
          })
        ], 512)), [
          [vShow, _ctx.modelValue.length > 0]
        ]) : createCommentVNode("", true)
      ]),
      _ctx.$slots.rightin ? (openBlock(), createElementBlock("view", _hoisted_5, [
        renderSlot(_ctx.$slots, "rightin")
      ])) : createCommentVNode("", true)
    ], 4),
    _ctx.$slots.rightout ? (openBlock(), createElementBlock("view", _hoisted_6, [
      renderSlot(_ctx.$slots, "rightout")
    ])) : createCommentVNode("", true)
  ], 4);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
