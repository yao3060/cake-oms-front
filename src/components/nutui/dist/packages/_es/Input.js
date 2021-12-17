/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createCommentVNode, normalizeStyle, withDirectives, createVNode, vShow } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
function trimExtraChar(value, char, regExp) {
  const index2 = value.indexOf(char);
  if (index2 === -1) {
    return value;
  }
  if (char === "-" && index2 !== 0) {
    return value.slice(0, index2);
  }
  return value.slice(0, index2 + 1) + value.slice(index2).replace(regExp, "");
}
function formatNumber(value, allowDot = true, allowMinus = true) {
  if (allowDot) {
    value = trimExtraChar(value, ".", /\./g);
  } else {
    value = value.replace(/\./g, "");
  }
  if (allowMinus) {
    value = trimExtraChar(value, "-", /-/g);
  } else {
    value = value.replace(/-/, "");
  }
  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, "");
}
const { componentName, create } = createComponent("input");
const _sfc_main = create({
  props: {
    type: {
      type: String,
      default: "text"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u4FE1\u606F"
    },
    label: {
      type: String,
      default: ""
    },
    requireShow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: "left"
    },
    maxLength: {
      type: [String, Number],
      default: ""
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["change", "update:modelValue", "blur", "focus", "clear"],
  setup(props, { emit }) {
    const active = ref(false);
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-require`]: props.requireShow
      };
    });
    const styles = computed(() => {
      return {
        textAlign: props.textAlign
      };
    });
    const valueChange = (event) => {
      const input = event.target;
      let val = input.value;
      if (props.type === "digit") {
        val = formatNumber(val, true);
      }
      if (props.type === "number") {
        val = formatNumber(val, false);
      }
      if (props.maxLength && val.length > Number(props.maxLength)) {
        val = val.slice(0, Number(props.maxLength));
      }
      emit("update:modelValue", val, event);
      emit("change", val, event);
    };
    const valueFocus = (event) => {
      const input = event.target;
      let value = input.value;
      active.value = true;
      emit("focus", value, event);
    };
    const valueBlur = (event) => {
      setTimeout(() => {
        active.value = false;
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
    return {
      active,
      classes,
      styles,
      valueChange,
      valueFocus,
      valueBlur,
      handleClear
    };
  }
});
const _hoisted_1 = { class: "nut-input-label" };
const _hoisted_2 = {
  key: 0,
  class: "label-string"
};
const _hoisted_3 = ["type", "maxlength", "placeholder", "disabled", "readonly", "value"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("view", _hoisted_1, [
      _ctx.label ? (openBlock(), createElementBlock("view", _hoisted_2, toDisplayString(_ctx.label), 1)) : createCommentVNode("", true)
    ]),
    createElementVNode("input", {
      class: "input-text",
      style: normalizeStyle(_ctx.styles),
      type: _ctx.type,
      maxlength: _ctx.maxLength,
      placeholder: _ctx.placeholder,
      disabled: _ctx.disabled,
      readonly: _ctx.readonly,
      value: _ctx.modelValue,
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.valueChange && _ctx.valueChange(...args)),
      onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.valueFocus && _ctx.valueFocus(...args)),
      onBlur: _cache[2] || (_cache[2] = (...args) => _ctx.valueBlur && _ctx.valueBlur(...args))
    }, null, 44, _hoisted_3),
    _ctx.clearable && !_ctx.readonly ? withDirectives((openBlock(), createElementBlock("view", {
      key: 0,
      onClick: _cache[3] || (_cache[3] = (...args) => _ctx.handleClear && _ctx.handleClear(...args)),
      class: "nut-textinput-clear"
    }, [
      createVNode(_component_nut_icon, {
        name: "close-little",
        size: "12px"
      })
    ], 512)), [
      [vShow, _ctx.active && _ctx.modelValue.length > 0]
    ]) : createCommentVNode("", true)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
