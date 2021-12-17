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
import { ref, reactive, toRefs, computed, onMounted, watch, resolveComponent, openBlock, createElementBlock, withModifiers, normalizeClass, createElementVNode, renderSlot, Fragment, normalizeStyle, renderList, createVNode, createCommentVNode, toDisplayString } from "vue";
import { c as createComponent } from "./component.js";
import Popup, { popupProps } from "./Popup.js";
import Button from "./Button.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./OverLay.js";
import "./Icon.js";
import "./pxCheck.js";
const { componentName, create } = createComponent("popover");
const _sfc_main = create({
  inheritAttrs: false,
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button
  },
  props: __spreadProps(__spreadValues({}, popupProps), {
    list: {
      type: Array,
      default: []
    },
    theme: {
      type: String,
      default: "light"
    },
    location: {
      type: String,
      default: "bottom"
    }
  }),
  emits: ["update", "update:visible", "close", "choose", "openPopover"],
  setup(props, { emit }) {
    const reference = ref();
    const state = reactive({
      elWidth: 0,
      elHeight: 0
    });
    const showPopup = ref(props.visible);
    const { theme, location } = toRefs(props);
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}--${theme.value}`]: theme.value
      };
    });
    const popoverContent = computed(() => {
      const prefixCls = "popoverContent";
      return {
        [prefixCls]: true,
        [`${prefixCls}--${location.value}`]: location.value
      };
    });
    const popoverArrow = computed(() => {
      const prefixCls = "popoverArrow";
      return {
        [prefixCls]: true,
        [`${prefixCls}--${location.value}`]: location.value
      };
    });
    function getReference() {
      state.elWidth = reference.value.offsetWidth;
      state.elHeight = reference.value.offsetHeight;
    }
    const getStyle = computed(() => {
      const style = {};
      if (location.value == "top") {
        style.bottom = state.elHeight + 20 + "px";
        style.left = 0 + "px";
      } else if (location.value == "right") {
        style.top = 0 + "px";
        style.right = -state.elWidth + "px";
      } else if (location.value == "left") {
        style.top = 0 + "px";
        style.left = -state.elWidth + "px";
      } else {
        style.top = state.elHeight + 20 + "px";
        style.left = 0 + "px";
      }
      return style;
    });
    const getArrowStyle = computed(() => {
      const style = {};
      if (location.value == "top") {
        style.bottom = -20 + "px";
        style.left = state.elWidth / 2 + "px";
      } else if (location.value == "right") {
        style.top = 20 + "px";
        style.left = -20 + "px";
      } else if (location.value == "left") {
        style.top = 20 + "px";
        style.right = -20 + "px";
      } else {
        style.left = state.elWidth / 2 + "px";
        style.top = -20 + "px";
      }
      return style;
    });
    onMounted(() => {
      getReference();
    });
    watch(() => props.visible, (value) => {
      showPopup.value = value;
    });
    const update = (val) => {
      emit("update", val);
      emit("update:visible", val);
    };
    const openPopover = () => {
      update(!props.visible);
      emit("open");
    };
    const closePopover = () => {
      emit("close");
      emit("update:visible", false);
    };
    const chooseItem = (item, index2) => {
      emit("choose", item, index2);
    };
    return {
      classes,
      showPopup,
      openPopover,
      popoverContent,
      popoverArrow,
      closePopover,
      chooseItem,
      getReference,
      reference,
      getStyle,
      getArrowStyle
    };
  }
});
const _hoisted_1 = { ref: "reference" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "title-name" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.openPopover && _ctx.openPopover(...args), ["stop"])),
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("div", _hoisted_1, [
      renderSlot(_ctx.$slots, "reference")
    ], 512),
    _ctx.showPopup ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
      createElementVNode("view", {
        class: "more-background",
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.closePopover && _ctx.closePopover(...args), ["stop"]))
      }),
      createElementVNode("view", {
        class: normalizeClass(_ctx.popoverContent),
        style: normalizeStyle(_ctx.getStyle)
      }, [
        createElementVNode("view", {
          class: normalizeClass(_ctx.popoverArrow),
          style: normalizeStyle(_ctx.getArrowStyle)
        }, null, 6),
        renderSlot(_ctx.$slots, "content"),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (item, index2) => {
          return openBlock(), createElementBlock("view", {
            key: index2,
            class: normalizeClass({ "title-item": true, disabled: item.disabled }),
            onClick: withModifiers(($event) => _ctx.chooseItem(item, index2), ["stop"])
          }, [
            item.icon ? renderSlot(_ctx.$slots, "default", { key: 0 }, () => [
              createVNode(_component_nut_icon, {
                class: "item-img",
                name: item.icon
              }, null, 8, ["name"])
            ]) : createCommentVNode("", true),
            createElementVNode("view", _hoisted_3, toDisplayString(item.name), 1)
          ], 10, _hoisted_2);
        }), 128))
      ], 6)
    ], 64)) : createCommentVNode("", true)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
