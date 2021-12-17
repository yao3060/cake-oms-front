/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { toRefs, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, createBlock, createCommentVNode, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import _sfc_main$1 from "./Icon.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./pxCheck.js";
const { componentName, create } = createComponent("button");
const _sfc_main = create({
  components: {
    [_sfc_main$1.name]: _sfc_main$1
  },
  props: {
    color: String,
    shape: {
      type: String,
      default: "round"
    },
    plain: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "normal"
    },
    block: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    }
  },
  emits: ["click"],
  setup(props, { emit, slots }) {
    const { type, size, shape, disabled, loading, color, plain, block } = toRefs(props);
    const handleClick = (event) => {
      if (!loading.value && !disabled.value) {
        emit("click", event);
      }
    };
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}--${type.value}`]: type.value,
        [`${prefixCls}--${size.value}`]: size.value,
        [`${prefixCls}--${shape.value}`]: shape.value,
        [`${prefixCls}--plain`]: plain.value,
        [`${prefixCls}--block`]: block.value,
        [`${prefixCls}--disabled`]: disabled.value,
        [`${prefixCls}--loading`]: loading.value
      };
    });
    const getStyle = computed(() => {
      var _a;
      const style = {};
      if (color == null ? void 0 : color.value) {
        if (plain.value) {
          style.color = color.value;
          style.background = "#fff";
          if (!((_a = color.value) == null ? void 0 : _a.includes("gradient"))) {
            style.borderColor = color.value;
          }
        } else {
          style.color = "#fff";
          style.background = color.value;
        }
      }
      return style;
    });
    return {
      handleClick,
      classes,
      getStyle
    };
  }
});
const _hoisted_1 = { class: "nut-button__warp" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle(_ctx.getStyle),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    createElementVNode("view", _hoisted_1, [
      _ctx.loading ? (openBlock(), createBlock(_component_nut_icon, {
        key: 0,
        class: "nut-icon-loading"
      })) : createCommentVNode("", true),
      _ctx.icon && !_ctx.loading ? (openBlock(), createBlock(_component_nut_icon, {
        key: 1,
        class: normalizeClass(_ctx.icon),
        name: _ctx.icon
      }, null, 8, ["class", "name"])) : createCommentVNode("", true),
      _ctx.$slots.default ? (openBlock(), createElementBlock("view", {
        key: 2,
        class: normalizeClass({ text: _ctx.icon || _ctx.loading })
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2)) : createCommentVNode("", true)
    ])
  ], 6);
}
var Button = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Button as default };
