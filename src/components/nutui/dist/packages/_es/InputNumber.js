/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createVNode, createElementVNode } from "vue";
import { c as createComponent } from "./component.js";
import { p as pxCheck } from "./pxCheck.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("inputnumber");
const _sfc_main = create({
  props: {
    modelValue: {
      type: [Number, String],
      default: 0
    },
    inputWidth: {
      type: [Number, String],
      default: ""
    },
    buttonSize: {
      type: [Number, String],
      default: ""
    },
    min: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      default: 9999
    },
    step: {
      type: [Number, String],
      default: 1
    },
    decimalPlaces: {
      type: [Number, String],
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change", "blur", "focus", "reduce", "add", "overlimit"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}--disabled`]: props.disabled
      };
    });
    const fixedDecimalPlaces = (v) => {
      return Number(v).toFixed(Number(props.decimalPlaces));
    };
    const change = (event) => {
      const input = event.target;
      emit("update:modelValue", input.valueAsNumber, event);
    };
    const emitChange = (value, event) => {
      let output_value = fixedDecimalPlaces(value);
      emit("change", output_value, event);
      emit("update:modelValue", output_value, event);
    };
    const addAllow = (value = Number(props.modelValue)) => {
      return value < Number(props.max) && !props.disabled;
    };
    const reduceAllow = (value = Number(props.modelValue)) => {
      return value > Number(props.min) && !props.disabled;
    };
    const reduce = (event) => {
      emit("reduce", event);
      if (reduceAllow()) {
        let output_value = Number(props.modelValue) - Number(props.step);
        emitChange(output_value, event);
      } else {
        emit("overlimit", event, "reduce");
      }
    };
    const add = (event) => {
      emit("add", event);
      if (addAllow()) {
        let output_value = Number(props.modelValue) + Number(props.step);
        emitChange(output_value, event);
      } else {
        emit("overlimit", event, "add");
      }
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
      let value = input.valueAsNumber;
      if (value < Number(props.min)) {
        value = Number(props.min);
      } else if (value > Number(props.max)) {
        value = Number(props.max);
      }
      emitChange(value, event);
      emit("blur", event);
    };
    return {
      classes,
      change,
      blur,
      focus,
      add,
      addAllow,
      reduce,
      reduceAllow,
      pxCheck
    };
  }
});
const _hoisted_1 = ["min", "max", "disabled", "readonly", "value"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle({ height: _ctx.pxCheck(_ctx.buttonSize) })
  }, [
    createVNode(_component_nut_icon, {
      name: "minus",
      class: normalizeClass(["nut-inputnumber__icon", { "nut-inputnumber__icon--disabled": !_ctx.reduceAllow() }]),
      size: _ctx.buttonSize,
      onClick: _ctx.reduce
    }, null, 8, ["class", "size", "onClick"]),
    createElementVNode("input", {
      type: "number",
      min: _ctx.min,
      max: _ctx.max,
      style: normalizeStyle({ width: _ctx.pxCheck(_ctx.inputWidth) }),
      disabled: _ctx.disabled,
      readonly: _ctx.readonly,
      value: _ctx.modelValue,
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.change && _ctx.change(...args)),
      onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.blur && _ctx.blur(...args)),
      onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args))
    }, null, 44, _hoisted_1),
    createVNode(_component_nut_icon, {
      name: "plus",
      class: normalizeClass(["nut-inputnumber__icon", { "nut-inputnumber__icon--disabled": !_ctx.addAllow() }]),
      size: _ctx.buttonSize,
      onClick: _ctx.add
    }, null, 8, ["class", "size", "onClick"])
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
