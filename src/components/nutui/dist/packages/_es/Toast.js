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
import { reactive, onMounted, watch, computed, resolveComponent, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, createElementBlock, createVNode, createCommentVNode, toDisplayString, vShow, render } from "vue";
import { c as createComponent } from "./component.js";
import _sfc_main$1 from "./Icon.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./pxCheck.js";
const { create } = createComponent("toast");
const _sfc_main = create({
  components: {
    [_sfc_main$1.name]: _sfc_main$1
  },
  props: {
    id: String,
    msg: String,
    duration: {
      type: Number,
      default: 2e3
    },
    center: {
      type: Boolean,
      default: true
    },
    type: String,
    customClass: String,
    bottom: {
      type: String,
      default: "30px"
    },
    size: {
      type: [String, Number],
      default: "base"
    },
    icon: String,
    textAlignCenter: {
      type: Boolean,
      default: true
    },
    loadingRotate: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: "rgba(0, 0, 0, .8)"
    },
    onClose: Function,
    unmount: Function,
    cover: {
      type: Boolean,
      default: false
    },
    coverColor: {
      type: String,
      default: "rgba(0, 0, 0, 0)"
    },
    title: {
      type: String,
      default: ""
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let timer;
    const state = reactive({
      mounted: false
    });
    onMounted(() => {
      state.mounted = true;
    });
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
    const clickCover = () => {
      if (props.closeOnClickOverlay) {
        hide();
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
    const hasIcon = computed(() => {
      if (props.type !== "text") {
        return true;
      } else {
        return !!props.icon;
      }
    });
    const toastBodyClass = computed(() => {
      return [
        "nut-toast",
        { "nut-toast-center": props.center },
        { "nut-toast-has-icon": hasIcon.value },
        { "nut-toast-cover": props.cover },
        { "nut-toast-loading": props.type === "loading" },
        props.customClass,
        "nut-toast-" + props.size
      ];
    });
    const onAfterLeave = () => {
      clearTimer();
      props.unmount(props.id);
      props.onClose && props.onClose();
    };
    return {
      state,
      hide,
      clickCover,
      hasIcon,
      toastBodyClass,
      onAfterLeave
    };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "nut-toast-icon-wrapper"
};
const _hoisted_2 = {
  key: 1,
  class: "nut-toast-title"
};
const _hoisted_3 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createBlock(Transition, {
    name: "toast-fade",
    onAfterLeave: _ctx.onAfterLeave
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("view", {
        class: normalizeClass(_ctx.toastBodyClass),
        style: normalizeStyle({
          bottom: _ctx.center ? "auto" : _ctx.bottom,
          "background-color": _ctx.coverColor
        }),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickCover && _ctx.clickCover(...args))
      }, [
        createElementVNode("view", {
          class: "nut-toast-inner",
          style: normalizeStyle({
            "text-align": _ctx.textAlignCenter ? "center" : "left",
            "background-color": _ctx.bgColor
          })
        }, [
          _ctx.hasIcon ? (openBlock(), createElementBlock("view", _hoisted_1, [
            createVNode(_component_nut_icon, {
              size: "20",
              color: "#ffffff",
              name: _ctx.icon
            }, null, 8, ["name"])
          ])) : createCommentVNode("", true),
          _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(_ctx.title), 1)) : createCommentVNode("", true),
          createElementVNode("view", {
            class: "nut-toast-text",
            innerHTML: _ctx.msg
          }, null, 8, _hoisted_3)
        ], 4)
      ], 6), [
        [vShow, _ctx.state.mounted]
      ])
    ]),
    _: 1
  }, 8, ["onAfterLeave"]);
}
var Toast = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const defaultOptions = {
  msg: "",
  id: "",
  duration: 2e3,
  center: true,
  type: "text",
  title: "",
  customClass: "",
  bottom: "30px",
  size: "base",
  icon: null,
  textAlignCenter: true,
  loadingRotate: true,
  bgColor: "rgba(0, 0, 0, .8)",
  onClose: null,
  unmount: null,
  cover: false,
  coverColor: "rgba(0, 0, 0, 0)",
  closeOnClickOverlay: false
};
let idsMap = [];
let optsMap = [];
const clearToast = (id) => {
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
const updateToast = (opts) => {
  const container = document.getElementById(opts.id);
  if (container) {
    const currentOpt = optsMap.find((item) => item.id === opts.id);
    if (currentOpt) {
      opts = __spreadValues(__spreadValues(__spreadValues({}, defaultOptions), currentOpt), opts);
    } else {
      opts = __spreadValues(__spreadValues({}, defaultOptions), opts);
    }
    const instance = createVNode(Toast, opts);
    render(instance, container);
    return instance.component.ctx;
  }
};
const mountToast = (opts) => {
  opts.unmount = clearToast;
  let _id;
  if (opts.id) {
    _id = opts.id;
    if (idsMap.find((item) => item === opts.id)) {
      return updateToast(opts);
    }
  } else {
    _id = new Date().getTime() + "";
  }
  opts = __spreadValues(__spreadValues({}, defaultOptions), opts);
  opts.id = _id;
  idsMap.push(opts.id);
  optsMap.push(opts);
  const container = document.createElement("div");
  container.id = opts.id;
  const instance = createVNode(Toast, opts);
  render(instance, container);
  document.body.appendChild(container);
  return instance.component.ctx;
};
const errorMsg = (msg) => {
  if (!msg) {
    console.warn("[NutUI Toast]: msg\u4E0D\u80FD\u4E3A\u7A7A");
    return;
  }
};
const ToastFunction = {
  text(msg, opts = {}) {
    errorMsg(msg);
    return mountToast(__spreadProps(__spreadValues({}, opts), { type: "text", msg }));
  },
  success(msg, opts = {}) {
    errorMsg(msg);
    return mountToast(__spreadProps(__spreadValues({ icon: "success" }, opts), { msg, type: "success" }));
  },
  fail(msg, opts = {}) {
    errorMsg(msg);
    return mountToast(__spreadProps(__spreadValues({ icon: "failure" }, opts), { msg, type: "fail" }));
  },
  warn(msg, opts = {}) {
    errorMsg(msg);
    return mountToast(__spreadProps(__spreadValues({ icon: "tips" }, opts), { msg, type: "warn" }));
  },
  loading(msg, opts = {}) {
    return mountToast(__spreadProps(__spreadValues({
      icon: "loading"
    }, opts), {
      msg,
      type: "loading"
    }));
  },
  hide(id) {
    clearToast(id);
  },
  install(app) {
    app.use(Toast);
    app.config.globalProperties.$toast = ToastFunction;
  }
};
export { Toast, ToastFunction, ToastFunction as default };
