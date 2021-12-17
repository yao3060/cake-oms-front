/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, provide, resolveComponent, openBlock, createBlock, normalizeStyle, withCtx, createElementVNode, normalizeClass, toDisplayString, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("timeselect");
const _sfc_main = create({
  props: {
    visible: {
      type: Boolean,
      defalut: false
    },
    height: {
      type: [String],
      default: "20%"
    },
    title: {
      type: String,
      default: "\u53D6\u4EF6\u65F6\u95F4"
    },
    currentKey: {
      type: [Number, String],
      default: 0
    },
    currentTime: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: ["update:visible", "select"],
  setup: (props, context) => {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const popStyle = computed(() => {
      return {
        width: "100%",
        height: props.height
      };
    });
    const currentKey = computed(() => props.currentKey);
    const currentTime = computed(() => props.currentTime);
    const close = () => {
      context.emit("update:visible", false);
      context.emit("select", currentTime.value);
    };
    provide("currentKey", currentKey);
    provide("currentTime", currentTime);
    return {
      classes,
      popStyle,
      close
    };
  }
});
const _hoisted_1 = { class: "nut-timeselect__title" };
const _hoisted_2 = { class: "nut-timeselect__title__fixed" };
const _hoisted_3 = { class: "nut-timeselect__content" };
const _hoisted_4 = { class: "nut-timeselect__content__pannel" };
const _hoisted_5 = { class: "nut-timeselect__content__detail" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_popup = resolveComponent("nut-popup");
  return openBlock(), createBlock(_component_nut_popup, {
    position: "bottom",
    closeable: "",
    round: "",
    visible: _ctx.visible,
    style: normalizeStyle(_ctx.popStyle),
    onClickOverlay: _ctx.close,
    onClickCloseIcon: _ctx.close
  }, {
    default: withCtx(() => [
      createElementVNode("view", {
        class: normalizeClass(_ctx.classes)
      }, [
        createElementVNode("view", _hoisted_1, [
          createElementVNode("view", _hoisted_2, toDisplayString(_ctx.title), 1)
        ]),
        createElementVNode("view", _hoisted_3, [
          createElementVNode("view", _hoisted_4, [
            renderSlot(_ctx.$slots, "pannel")
          ]),
          createElementVNode("view", _hoisted_5, [
            renderSlot(_ctx.$slots, "detail")
          ])
        ])
      ], 2)
    ]),
    _: 3
  }, 8, ["visible", "style", "onClickOverlay", "onClickCloseIcon"]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
