/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, resolveComponent, openBlock, createElementBlock, normalizeClass, Fragment, renderList, normalizeStyle, createVNode, createBlock, createCommentVNode } from "vue";
import { c as createComponent } from "./component.js";
import { p as pxCheck } from "./pxCheck.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("rate");
const _sfc_main = create({
  props: {
    count: {
      type: [String, Number],
      default: 5
    },
    modelValue: {
      type: [String, Number],
      default: 0
    },
    iconSize: {
      type: [String, Number],
      default: 18
    },
    activeColor: {
      type: String,
      default: ""
    },
    voidColor: {
      type: String,
      default: ""
    },
    uncheckedIcon: {
      type: String,
      default: "star-n"
    },
    checkedIcon: {
      type: String,
      default: "star-fill-n"
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    spacing: {
      type: [String, Number],
      default: 14
    },
    classPrefix: {
      type: String,
      default: "nut-icon"
    },
    fontClassName: {
      type: String,
      default: "nutui-iconfont"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const onClick = (e, index2) => {
      e.preventDefault();
      e.stopPropagation();
      if (props.disabled || props.readonly)
        return;
      let value = 0;
      if (index2 === 1 && props.modelValue === index2)
        ;
      else {
        value = index2;
        if (props.allowHalf) {
          if ((e == null ? void 0 : e.target).className.includes("__icon--half")) {
            value -= 0.5;
          }
        }
      }
      emit("update:modelValue", value);
      emit("change", value);
    };
    return {
      classes,
      onClick,
      pxCheck
    };
  }
});
const _hoisted_1 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.count, (n) => {
      return openBlock(), createElementBlock("view", {
        class: "nut-rate-item",
        key: n,
        onClick: ($event) => _ctx.onClick($event, n),
        style: normalizeStyle({ marginRight: _ctx.pxCheck(_ctx.spacing) })
      }, [
        createVNode(_component_nut_icon, {
          size: _ctx.iconSize,
          class: normalizeClass(["nut-rate-item__icon", { "nut-rate-item__icon--disabled": _ctx.disabled || n > _ctx.modelValue }]),
          "font-class-name": _ctx.fontClassName,
          "class-prefix": _ctx.classPrefix,
          color: n <= _ctx.modelValue ? _ctx.activeColor : _ctx.voidColor,
          name: n <= _ctx.modelValue ? _ctx.checkedIcon : _ctx.uncheckedIcon
        }, null, 8, ["size", "class", "font-class-name", "class-prefix", "color", "name"]),
        _ctx.allowHalf && _ctx.modelValue + 1 > n ? (openBlock(), createBlock(_component_nut_icon, {
          key: 0,
          class: "nut-rate-item__icon nut-rate-item__icon--half",
          "font-class-name": _ctx.fontClassName,
          "class-prefix": _ctx.classPrefix,
          color: n <= _ctx.modelValue + 1 ? _ctx.activeColor : _ctx.voidColor,
          size: _ctx.iconSize,
          name: _ctx.checkedIcon
        }, null, 8, ["font-class-name", "class-prefix", "color", "size", "name"])) : _ctx.allowHalf && _ctx.modelValue + 1 < n ? (openBlock(), createBlock(_component_nut_icon, {
          key: 1,
          class: "nut-rate-item__icon nut-rate-item__icon--disabled nut-rate-item__icon--half",
          "font-class-name": _ctx.fontClassName,
          "class-prefix": _ctx.classPrefix,
          color: _ctx.voidColor,
          size: _ctx.iconSize,
          name: _ctx.uncheckedIcon
        }, null, 8, ["font-class-name", "class-prefix", "color", "size", "name"])) : createCommentVNode("", true)
      ], 12, _hoisted_1);
    }), 128))
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
