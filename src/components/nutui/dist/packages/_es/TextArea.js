/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, toDisplayString, createCommentVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("textarea");
const _sfc_main = create({
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    textAlign: {
      type: String,
      default: "left"
    },
    limitShow: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: [String, Number],
      default: ""
    },
    rows: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change", "blur", "focus"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}--disabled`]: props.disabled
      };
    });
    const styles = computed(() => {
      return {
        textAlign: props.textAlign,
        resize: props.autosize ? "vertical" : "none"
      };
    });
    const emitChange = (value, event) => {
      if (props.maxLength && value.length > Number(props.maxLength)) {
        value = value.substring(0, Number(props.maxLength));
      }
      emit("change", value, event);
      emit("update:modelValue", value, event);
    };
    const change = (event) => {
      const input = event.target;
      emitChange(input.value, event);
    };
    const focus = (event) => {
      if (props.disabled)
        return;
      if (props.readonly)
        return;
      emit("focus", event);
    };
    const blur = (event) => {
      if (props.disabled)
        return;
      if (props.readonly)
        return;
      const input = event.target;
      let value = input.value;
      emitChange(value, event);
      emit("blur", { value, event });
    };
    return {
      classes,
      styles,
      change,
      focus,
      blur
    };
  }
});
const _hoisted_1 = ["rows", "disabled", "readonly", "value", "maxlength", "placeholder"];
const _hoisted_2 = {
  key: 0,
  class: "nut-textarea__limit"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("textarea", {
      class: "nut-textarea__textarea",
      style: normalizeStyle(_ctx.styles),
      rows: _ctx.rows,
      disabled: _ctx.disabled,
      readonly: _ctx.readonly,
      value: _ctx.modelValue,
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.change && _ctx.change(...args)),
      onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.blur && _ctx.blur(...args)),
      onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
      maxlength: _ctx.maxLength,
      placeholder: _ctx.placeholder
    }, null, 44, _hoisted_1),
    _ctx.limitShow ? (openBlock(), createElementBlock("view", _hoisted_2, toDisplayString(_ctx.modelValue ? _ctx.modelValue.length : 0) + "/" + toDisplayString(_ctx.maxLength), 1)) : createCommentVNode("", true)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
