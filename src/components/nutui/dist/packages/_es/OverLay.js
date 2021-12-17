var __defProp = Object.defineProperty;
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
/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, watch, onDeactivated, onBeforeUnmount, onMounted, onActivated, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, withModifiers, normalizeStyle, renderSlot, vShow } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("overlay");
const overlayProps = {
  visible: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  duration: {
    type: [Number, String],
    default: 0.3
  },
  overlayClass: {
    type: String,
    default: ""
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  overlayStyle: {
    type: Object
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
};
const _sfc_main = create({
  props: overlayProps,
  emits: ["click", "update:visible"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [props.overlayClass]: true
      };
    });
    watch(() => props.visible, (value) => {
      value ? lock() : unlock();
    });
    const lock = () => {
      if (props.lockScroll && props.visible) {
        document.body.classList.add("nut-overflow-hidden");
      }
    };
    const unlock = () => {
      document.body.classList.remove("nut-overflow-hidden");
    };
    onDeactivated(unlock);
    onBeforeUnmount(unlock);
    onMounted(lock);
    onActivated(lock);
    const style = computed(() => {
      return __spreadValues({
        animationDuration: `${props.duration}s`,
        zIndex: props.zIndex
      }, props.overlayStyle);
    });
    const touchmove = (e) => {
      if (props.lockScroll)
        e.preventDefault();
    };
    const onClick = (e) => {
      emit("click", e);
      if (props.closeOnClickOverlay) {
        emit("update:visible", false);
      }
    };
    return { classes, style, touchmove, onClick };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "overlay-fade" }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("view", {
        class: normalizeClass(_ctx.classes),
        onTouchmove: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.touchmove && _ctx.touchmove(...args), ["stop"])),
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
        style: normalizeStyle(_ctx.style)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 38), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 3
  });
}
var overlay = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { overlay as default, overlayProps };
