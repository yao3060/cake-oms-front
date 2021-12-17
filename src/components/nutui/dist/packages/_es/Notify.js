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
import { reactive, onMounted, watch, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, renderSlot, createElementBlock, Fragment, createTextVNode, toDisplayString, vShow, createVNode, render } from "vue";
import { c as createComponent } from "./component.js";
import Popup from "./Popup.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./OverLay.js";
import "./Icon.js";
import "./pxCheck.js";
const { componentName, create } = createComponent("notify");
const _sfc_main = create({
  components: {
    [Popup.name]: Popup
  },
  props: {
    id: String,
    color: { type: String, default: "" },
    msg: { type: String, default: "" },
    duration: { type: Number, default: 3e3 },
    className: {
      type: String,
      default: ""
    },
    background: { type: String, default: "" },
    type: {
      type: String,
      default: "danger"
    },
    showPopup: {
      type: Boolean,
      default: false
    },
    onClose: Function,
    onClick: Function,
    unmount: Function
  },
  setup(props, { slots }) {
    let timer = null;
    const state = reactive({
      mounted: false
    });
    onMounted(() => {
      state.mounted = true;
    });
    const clickCover = () => {
      props.onClick && props.onClick();
    };
    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    const hide = () => {
      state.mounted = false;
    };
    const show = () => {
      clearTimer();
      if (props.duration) {
        timer = setTimeout(() => {
          hide();
        }, props.duration);
      }
    };
    if (props.duration) {
      show();
    }
    watch(() => props.duration, (val) => {
      if (val) {
        show();
      }
    });
    const onAfterLeave = () => {
      clearTimer();
      props.unmount && props.unmount(props.id);
      props.onClose && props.onClose();
    };
    return { state, hide, onAfterLeave, clickCover };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    name: "toast-fade",
    onAfterLeave: _ctx.onAfterLeave
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("view", {
        class: normalizeClass(["popup-top", "nut-notify", `nut-notify--${_ctx.type}`, { className: _ctx.className }]),
        style: normalizeStyle({ color: _ctx.color, background: _ctx.background }),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickCover && _ctx.clickCover(...args))
      }, [
        _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createTextVNode(toDisplayString(_ctx.msg), 1)
        ], 64))
      ], 6), [
        [vShow, _ctx.state.mounted]
      ])
    ]),
    _: 3
  }, 8, ["onAfterLeave"]);
}
var Notify = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const defaultOptions = {
  type: "base",
  showPopup: false,
  msg: "",
  color: void 0,
  background: void 0,
  duration: 3e3,
  className: "",
  onClosed: null,
  onClick: null,
  onOpened: null,
  textTimer: null,
  unmount: null
};
let idsMap = [];
let optsMap = [];
const clearNotify = (id) => {
  if (id) {
    const container = document.getElementById(id);
    optsMap = optsMap.filter((item) => item.id !== id);
    idsMap = idsMap.filter((item) => item !== id);
    if (container) {
      document.body.removeChild(container);
    }
  } else {
    idsMap.forEach((item) => {
      const container = document.getElementById(item);
      if (container) {
        document.body.removeChild(container);
      }
    });
    optsMap = [];
    idsMap = [];
  }
};
const updateNotify = (opts) => {
  const container = document.getElementById(opts.id);
  if (container) {
    const currentOpt = optsMap.find((item) => item.id === opts.id);
    if (currentOpt) {
      opts = __spreadValues(__spreadValues(__spreadValues({}, defaultOptions), currentOpt), opts);
    } else {
      opts = __spreadValues(__spreadValues({}, defaultOptions), opts);
    }
    const instance = createVNode(Notify, opts);
    render(instance, container);
    return instance.component.ctx;
  }
};
const mountNotify = (opts) => {
  opts.unmount = clearNotify;
  let _id;
  if (opts.id) {
    _id = opts.id;
    if (idsMap.find((item) => item === opts.id)) {
      return updateNotify(opts);
    }
  } else {
    _id = new Date().getTime() + "";
  }
  opts = __spreadValues(__spreadValues({}, defaultOptions), opts);
  opts.id = _id;
  idsMap.push(opts.id);
  optsMap.push(opts);
  const container = document.createElement("view");
  container.id = opts.id;
  const instance = createVNode(Notify, opts);
  render(instance, container);
  document.body.appendChild(container);
  setTimeout(() => {
    instance.showPopup = true;
  }, 0);
  return instance.component.ctx;
};
const errorMsg = (msg) => {
  if (!msg) {
    console.warn("[NutUI Notify]: msg\u4E0D\u80FD\u4E3A\u7A7A");
    return;
  }
};
const NotifyFunction = {
  text(msg, obj = {}) {
    errorMsg(msg);
    return mountNotify(__spreadProps(__spreadValues({}, obj), { msg }));
  },
  primary(msg, obj = {}) {
    errorMsg(msg);
    return mountNotify(__spreadProps(__spreadValues({}, obj), { msg, type: "primary" }));
  },
  success(msg, obj = {}) {
    errorMsg(msg);
    return mountNotify(__spreadProps(__spreadValues({}, obj), { msg, type: "success" }));
  },
  danger(msg, obj = {}) {
    errorMsg(msg);
    return mountNotify(__spreadProps(__spreadValues({}, obj), { msg, type: "danger" }));
  },
  warn(msg, obj = {}) {
    errorMsg(msg);
    return mountNotify(__spreadProps(__spreadValues({}, obj), { msg, type: "warning" }));
  },
  hide() {
    clearNotify();
  },
  install(app) {
    app.config.globalProperties.$notify = NotifyFunction;
  }
};
export { Notify, NotifyFunction, NotifyFunction as default };
