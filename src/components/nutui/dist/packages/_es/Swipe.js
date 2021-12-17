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
import { u as useTouch } from "./index2.js";
import { computed, ref, reactive, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("swipe");
const _sfc_main = create({
  props: {
    name: {
      type: String,
      default: ""
    },
    touchMoveStopPropagation: {
      type: Boolean,
      default: false
    },
    touchMovePreventDefault: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["open", "close"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const getRefWidth = (ref2) => {
      var _a;
      return ((_a = ref2.value) == null ? void 0 : _a.clientWidth) || 0;
    };
    const leftRef = ref(), leftRefWidth = computed(() => {
      return getRefWidth(leftRef);
    });
    const rightRef = ref(), rightRefWidth = computed(() => {
      return getRefWidth(rightRef);
    });
    let opened = false;
    let position = "";
    let oldPosition = "";
    const state = reactive({
      offset: 0,
      moving: false
    });
    const open = (p = "") => {
      opened = true;
      if (p) {
        state.offset = p === "left" ? -rightRefWidth.value : leftRefWidth.value;
      }
      emit("open", {
        name: props.name,
        position: position || p
      });
    };
    const close = () => {
      state.offset = 0;
      opened = false;
      emit("close", {
        name: props.name,
        position
      });
    };
    const touchStyle = computed(() => {
      return {
        transform: `translate3d(${state.offset}px, 0, 0)`
      };
    });
    const setoffset = (deltaX) => {
      position = deltaX > 0 ? "right" : "left";
      let offset = deltaX;
      switch (position) {
        case "left":
          if (opened && oldPosition === position) {
            offset = -rightRefWidth.value;
          } else {
            offset = Math.abs(deltaX) > rightRefWidth.value ? -rightRefWidth.value : deltaX;
          }
          break;
        case "right":
          if (opened && oldPosition === position) {
            offset = leftRefWidth.value;
          } else {
            offset = Math.abs(deltaX) > leftRefWidth.value ? leftRefWidth.value : deltaX;
          }
          break;
      }
      state.offset = offset;
    };
    const touch = useTouch();
    const touchMethods = {
      onTouchStart(event) {
        if (props.disabled)
          return;
        touch.start(event);
      },
      onTouchMove(event) {
        if (props.disabled)
          return;
        touch.move(event);
        if (touch.isHorizontal()) {
          state.moving = true;
          setoffset(touch.deltaX.value);
          if (props.touchMovePreventDefault) {
            event.preventDefault();
          }
          if (props.touchMoveStopPropagation) {
            event.stopPropagation();
          }
        }
      },
      onTouchEnd() {
        if (state.moving) {
          state.moving = false;
          oldPosition = position;
          switch (position) {
            case "left":
              if (Math.abs(state.offset) <= rightRefWidth.value / 2) {
                close();
              } else {
                state.offset = -rightRefWidth.value;
                open();
              }
              break;
            case "right":
              if (Math.abs(state.offset) <= leftRefWidth.value / 2) {
                close();
              } else {
                state.offset = leftRefWidth.value;
                open();
              }
              break;
          }
        }
      }
    };
    return __spreadProps(__spreadValues({
      classes,
      touchStyle
    }, touchMethods), {
      leftRef,
      rightRef,
      open,
      close
    });
  }
});
const _hoisted_1 = {
  class: "nut-swipe__left",
  ref: "leftRef"
};
const _hoisted_2 = { class: "nut-swipe__content" };
const _hoisted_3 = {
  class: "nut-swipe__right",
  ref: "rightRef"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle(_ctx.touchStyle),
    onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.onTouchStart && _ctx.onTouchStart(...args)),
    onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.onTouchMove && _ctx.onTouchMove(...args)),
    onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args)),
    onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args))
  }, [
    createElementVNode("view", _hoisted_1, [
      renderSlot(_ctx.$slots, "left")
    ], 512),
    createElementVNode("view", _hoisted_2, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createElementVNode("view", _hoisted_3, [
      renderSlot(_ctx.$slots, "right")
    ], 512)
  ], 38);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
