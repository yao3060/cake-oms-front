/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { toRefs, computed, resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, createVNode, renderSlot, createCommentVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("avatar");
const _sfc_main = create({
  props: {
    size: {
      type: String,
      default: "normal"
    },
    shape: {
      type: String,
      default: "round"
    },
    bgColor: {
      type: String,
      default: "#eee"
    },
    icon: {
      type: String,
      default: ""
    }
  },
  emits: ["active-avatar"],
  setup(props, { emit, slots }) {
    const { size, shape, bgColor, icon } = toRefs(props);
    const sizeValue = ["large", "normal", "small"];
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        ["avatar-" + size.value]: true,
        ["avatar-" + shape.value]: true
      };
    });
    const styles = computed(() => {
      return {
        width: sizeValue.indexOf(size.value) > -1 ? "" : `${size.value}px`,
        height: sizeValue.indexOf(size.value) > -1 ? "" : `${size.value}px`,
        backgroundColor: `${bgColor.value}`
      };
    });
    const iconStyles = computed(() => {
      return !!icon.value ? icon.value : "";
    });
    const isShowText = computed(() => {
      return slots.default;
    });
    const activeAvatar = (event) => {
      emit("active-avatar", event);
    };
    return {
      classes,
      styles,
      iconStyles,
      isShowText,
      activeAvatar
    };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "text"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    style: normalizeStyle(_ctx.styles),
    class: normalizeClass(_ctx.classes),
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.activeAvatar(_ctx.e))
  }, [
    createVNode(_component_nut_icon, {
      class: "icon",
      name: _ctx.iconStyles
    }, null, 8, ["name"]),
    _ctx.isShowText ? (openBlock(), createElementBlock("view", _hoisted_1, [
      renderSlot(_ctx.$slots, "default")
    ])) : createCommentVNode("", true)
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
