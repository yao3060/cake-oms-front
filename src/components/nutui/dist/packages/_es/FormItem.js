/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { p as pxCheck } from "./pxCheck.js";
import { inject, computed, resolveComponent, openBlock, createBlock, normalizeClass, withCtx, createElementBlock, normalizeStyle, toDisplayString, createCommentVNode, createElementVNode, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("form-item");
const _sfc_main = create({
  inheritAttrs: false,
  props: {
    prop: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    rules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    showErrorMessage: {
      type: Boolean,
      default: true
    },
    showErrorLine: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: [String, Number],
      default: ""
    },
    labelAlign: {
      type: String,
      default: "left"
    },
    errorMessageAlign: {
      type: String,
      default: "left"
    },
    bodyAlign: {
      type: String,
      default: "left"
    }
  },
  components: {},
  emits: [""],
  setup(props, { emit }) {
    const parent = inject("formErrorTip");
    const labelStyle = computed(() => {
      return {
        width: pxCheck(props.labelWidth),
        textAlign: props.labelAlign
      };
    });
    const bodyStyle = computed(() => {
      return {
        textAlign: props.bodyAlign
      };
    });
    const errorMessageStyle = computed(() => {
      return {
        textAlign: props.errorMessageAlign
      };
    });
    return { parent, labelStyle, bodyStyle, errorMessageStyle };
  }
});
const _hoisted_1 = { class: "nut-cell__value nut-form-item__body" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_cell = resolveComponent("nut-cell");
  return openBlock(), createBlock(_component_nut_cell, {
    class: normalizeClass(["nut-form-item", { error: _ctx.parent[_ctx.prop], line: _ctx.showErrorLine }])
  }, {
    default: withCtx(() => [
      _ctx.label ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: normalizeClass(["nut-cell__title nut-form-item__label", { required: _ctx.required }]),
        style: normalizeStyle(_ctx.labelStyle)
      }, toDisplayString(_ctx.label), 7)) : createCommentVNode("", true),
      createElementVNode("view", _hoisted_1, [
        createElementVNode("view", {
          class: "nut-form-item__body__slots",
          style: normalizeStyle(_ctx.bodyStyle)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 4),
        _ctx.parent[_ctx.prop] && _ctx.showErrorMessage ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "nut-form-item__body__tips",
          style: normalizeStyle(_ctx.errorMessageStyle)
        }, toDisplayString(_ctx.parent[_ctx.prop]), 5)) : createCommentVNode("", true)
      ])
    ]),
    _: 3
  }, 8, ["class"]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
