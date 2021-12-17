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
import { reactive, computed, onMounted, onBeforeUnmount, onBeforeMount, onActivated, onDeactivated, watch, toRefs, resolveComponent, openBlock, createBlock, Teleport, normalizeClass, normalizeStyle, createCommentVNode, createVNode, Transition, withCtx, withDirectives, createElementVNode, renderSlot, createElementBlock, vShow } from "vue";
import overlay, { overlayProps } from "./OverLay.js";
import _sfc_main$1 from "./Icon.js";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./pxCheck.js";
let count = 0;
const CLSNAME = "nut-overflow-hidden";
const useLockScroll = (isLock) => {
  const lock = () => {
    if (isLock()) {
      !count && document.body.classList.add(CLSNAME);
      count++;
    }
  };
  const unlock = () => {
    if (isLock() && count) {
      count--;
      !count && document.body.classList.remove(CLSNAME);
    }
  };
  return [lock, unlock];
};
const { componentName, create } = createComponent("popup");
let _zIndex = 2e3;
const popupProps = __spreadProps(__spreadValues({}, overlayProps), {
  position: {
    type: String,
    default: "center"
  },
  transition: String,
  style: {
    type: Object
  },
  popClass: {
    type: String,
    default: ""
  },
  closeable: {
    type: Boolean,
    default: false
  },
  closeIconPosition: {
    type: String,
    default: "top-right"
  },
  closeIcon: {
    type: String,
    default: "close"
  },
  destroyOnClose: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: [String, Element],
    default: "body"
  },
  overlay: {
    type: Boolean,
    default: true
  },
  round: {
    type: Boolean,
    default: false
  },
  isWrapTeleport: {
    type: Boolean,
    default: true
  }
});
const _sfc_main = create({
  components: {
    [overlay.name]: overlay,
    [_sfc_main$1.name]: _sfc_main$1
  },
  props: __spreadValues({}, popupProps),
  emits: ["click", "click-close-icon", "open", "close", "opend", "closed", "update:visible", "click-overlay"],
  setup(props, { emit }) {
    const state = reactive({
      zIndex: props.zIndex ? props.zIndex : _zIndex,
      showSlot: true,
      transitionName: `popup-fade-${props.position}`,
      overLayCount: 1,
      keepAlive: false
    });
    const [lockScroll, unlockScroll] = useLockScroll(() => props.lockScroll);
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        ["round"]: props.round,
        [`popup-${props.position}`]: true,
        [props.popClass]: true
      };
    });
    const popStyle = computed(() => {
      return __spreadValues({
        zIndex: state.zIndex,
        animationDuration: props.duration ? `${props.duration}s` : "initial"
      }, props.style);
    });
    const open = () => {
      if (!props.visible) {
        if (props.zIndex !== void 0) {
          _zIndex = Number(props.zIndex);
        }
        emit("update:visible", true);
        lockScroll();
        state.zIndex = ++_zIndex;
      }
      if (props.destroyOnClose) {
        state.showSlot = true;
      }
      emit("open");
    };
    const close = () => {
      if (props.visible) {
        unlockScroll();
        emit("update:visible", false);
        if (props.destroyOnClose) {
          setTimeout(() => {
            state.showSlot = false;
            emit("close");
          }, +props.duration * 1e3);
        }
      }
    };
    const onClick = (e) => {
      emit("click", e);
    };
    const onClickCloseIcon = (e) => {
      emit("click-close-icon", e);
      close();
    };
    const onClickOverlay = (e) => {
      if (props.closeOnClickOverlay) {
        emit("click-overlay", e);
        close();
      }
    };
    const onOpened = (e) => {
      emit("opend", e);
    };
    const onClosed = (e) => {
      emit("closed", e);
    };
    onMounted(() => {
      props.transition ? state.transitionName = props.transition : state.transitionName = `popup-slide-${props.position}`;
      props.visible && open();
    });
    onBeforeUnmount(() => {
      props.visible && close();
    });
    onBeforeMount(() => {
      if (props.visible) {
        unlockScroll();
      }
    });
    onActivated(() => {
      if (state.keepAlive) {
        emit("update:visible", true);
        state.keepAlive = false;
      }
    });
    onDeactivated(() => {
      if (props.visible) {
        close();
        state.keepAlive = true;
      }
    });
    watch(() => props.visible, (value) => {
      if (value) {
        open();
      } else {
        close();
      }
    });
    watch(() => props.position, (value) => {
      value === "center" ? state.transitionName = "popup-fade" : state.transitionName = `popup-slide-${value}`;
    });
    return __spreadProps(__spreadValues({}, toRefs(state)), {
      popStyle,
      classes,
      onClick,
      onClickCloseIcon,
      onClickOverlay,
      onOpened,
      onClosed
    });
  }
});
const _hoisted_1 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_overlay = resolveComponent("nut-overlay");
  const _component_nut_icon = resolveComponent("nut-icon");
  return _ctx.isWrapTeleport ? (openBlock(), createBlock(Teleport, {
    key: 0,
    to: _ctx.teleport
  }, [
    _ctx.overlay ? (openBlock(), createBlock(_component_nut_overlay, {
      key: 0,
      visible: _ctx.visible,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      class: normalizeClass(_ctx.overlayClass),
      style: normalizeStyle(_ctx.overlayStyle),
      "z-index": _ctx.zIndex,
      "lock-scroll": _ctx.lockScroll,
      duration: _ctx.duration,
      onClick: _ctx.onClickOverlay
    }, null, 8, ["visible", "close-on-click-overlay", "class", "style", "z-index", "lock-scroll", "duration", "onClick"])) : createCommentVNode("", true),
    createVNode(Transition, {
      name: _ctx.transitionName,
      onAfterEnter: _ctx.onOpened,
      onAfterLeave: _ctx.onClosed
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("view", {
          class: normalizeClass(_ctx.classes),
          style: normalizeStyle(_ctx.popStyle),
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        }, [
          _ctx.showSlot ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true),
          _ctx.closeable ? (openBlock(), createElementBlock("view", {
            key: 1,
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClickCloseIcon && _ctx.onClickCloseIcon(...args)),
            class: normalizeClass(["nutui-popup__close-icon", "nutui-popup__close-icon--" + _ctx.closeIconPosition])
          }, [
            createVNode(_component_nut_icon, {
              name: _ctx.closeIcon,
              size: "12px"
            }, null, 8, ["name"])
          ], 2)) : createCommentVNode("", true)
        ], 6), [
          [vShow, _ctx.visible]
        ])
      ]),
      _: 3
    }, 8, ["name", "onAfterEnter", "onAfterLeave"])
  ], 8, ["to"])) : (openBlock(), createElementBlock("view", _hoisted_1, [
    _ctx.overlay ? (openBlock(), createBlock(_component_nut_overlay, {
      key: 0,
      visible: _ctx.visible,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      class: normalizeClass(_ctx.overlayClass),
      style: normalizeStyle(_ctx.overlayStyle),
      "z-index": _ctx.zIndex,
      "lock-scroll": _ctx.lockScroll,
      duration: _ctx.duration,
      onClick: _ctx.onClickOverlay
    }, null, 8, ["visible", "close-on-click-overlay", "class", "style", "z-index", "lock-scroll", "duration", "onClick"])) : createCommentVNode("", true),
    createVNode(Transition, {
      name: _ctx.transitionName,
      onAfterEnter: _ctx.onOpened,
      onAfterLeave: _ctx.onClosed
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("view", {
          class: normalizeClass(_ctx.classes),
          style: normalizeStyle(_ctx.popStyle),
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        }, [
          _ctx.showSlot ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true),
          _ctx.closeable ? (openBlock(), createElementBlock("view", {
            key: 1,
            onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onClickCloseIcon && _ctx.onClickCloseIcon(...args)),
            class: normalizeClass(["nutui-popup__close-icon", "nutui-popup__close-icon--" + _ctx.closeIconPosition])
          }, [
            createVNode(_component_nut_icon, {
              name: _ctx.closeIcon,
              size: "12px"
            }, null, 8, ["name"])
          ], 2)) : createCommentVNode("", true)
        ], 6), [
          [vShow, _ctx.visible]
        ])
      ]),
      _: 3
    }, 8, ["name", "onAfterEnter", "onAfterLeave"])
  ]));
}
var Popup = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Popup as default, popupProps };
