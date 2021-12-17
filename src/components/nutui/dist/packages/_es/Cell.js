/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot, createBlock, createCommentVNode, Fragment, createElementVNode, toDisplayString, createTextVNode } from "vue";
import { c as createComponent } from "./component.js";
import { useRouter } from "vue-router";
import { p as pxCheck } from "./pxCheck.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("cell");
const _sfc_main = create({
  props: {
    title: { type: String, default: "" },
    subTitle: { type: String, default: "" },
    desc: { type: String, default: "" },
    descTextAlign: { type: String, default: "right" },
    isLink: { type: Boolean, default: false },
    to: [String, Object],
    replace: { type: Boolean, default: false },
    roundRadius: { type: [String, Number], default: "" },
    url: { type: String, default: "" },
    icon: { type: String, default: "" }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}--clickable`]: props.isLink || props.to
      };
    });
    const router = useRouter();
    const baseStyle = computed(() => {
      return {
        borderRadius: pxCheck(props.roundRadius)
      };
    });
    const handleClick = (event) => {
      emit("click", event);
      if (props.to && router) {
        router[props.replace ? "replace" : "push"](props.to);
      } else if (props.url) {
        props.replace ? location.replace(props.url) : location.href = props.url;
      }
    };
    return {
      handleClick,
      classes,
      baseStyle
    };
  }
});
const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "nut-cell__title-desc" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle(_ctx.baseStyle),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      _ctx.title || _ctx.subTitle || _ctx.icon ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: normalizeClass(["nut-cell__title", { icon: _ctx.icon || _ctx.$slots.icon }])
      }, [
        _ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 0 }) : _ctx.icon ? (openBlock(), createBlock(_component_nut_icon, {
          key: 1,
          class: "icon",
          name: _ctx.icon
        }, null, 8, ["name"])) : createCommentVNode("", true),
        _ctx.subTitle ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createElementVNode("view", _hoisted_1, toDisplayString(_ctx.title), 1),
          createElementVNode("view", _hoisted_2, toDisplayString(_ctx.subTitle), 1)
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ], 64))
      ], 2)) : createCommentVNode("", true),
      _ctx.desc ? (openBlock(), createElementBlock("view", {
        key: 1,
        class: "nut-cell__value",
        style: normalizeStyle({ "text-align": _ctx.descTextAlign })
      }, toDisplayString(_ctx.desc), 5)) : createCommentVNode("", true),
      _ctx.$slots.link ? renderSlot(_ctx.$slots, "link", { key: 2 }) : _ctx.isLink || _ctx.to ? (openBlock(), createBlock(_component_nut_icon, {
        key: 3,
        class: "nut-cell__link",
        name: "right"
      })) : createCommentVNode("", true)
    ])
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
