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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, onMounted, watch, computed, resolveComponent, openBlock, createBlock, withCtx, createElementVNode, normalizeClass, createElementBlock, renderSlot, Fragment, createTextVNode, toDisplayString, createCommentVNode, normalizeStyle, createVNode, render, h } from "vue";
import { c as createComponent } from "./component.js";
import Popup, { popupProps } from "./Popup.js";
import Button from "./Button.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./OverLay.js";
import "./Icon.js";
import "./pxCheck.js";
const { componentName, create } = createComponent("dialog");
const _sfc_main = create({
  inheritAttrs: false,
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button
  },
  props: __spreadProps(__spreadValues({}, popupProps), {
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    noFooter: {
      type: Boolean,
      default: false
    },
    noOkBtn: {
      type: Boolean,
      default: false
    },
    noCancelBtn: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    okText: {
      type: String,
      default: "\u786E\u5B9A"
    },
    okBtnDisabled: {
      type: Boolean,
      default: false
    },
    cancelAutoClose: {
      type: Boolean,
      default: true
    },
    textAlign: {
      type: String,
      default: "center"
    },
    closeOnPopstate: {
      type: Boolean,
      default: false
    },
    footerDirection: {
      type: String,
      default: "horizontal"
    }
  }),
  emits: ["update", "update:visible", "ok", "cancel", "open", "opened", "close", "closed"],
  setup(props, { emit }) {
    const showPopup = ref(props.visible);
    onMounted(() => {
      if (props.closeOnPopstate) {
        window.addEventListener("popstate", function() {
          closed();
        });
      }
    });
    watch(() => props.visible, (value) => {
      showPopup.value = value;
    });
    const classes = computed(() => {
      return {
        [componentName]: true
      };
    });
    const update = (val) => {
      emit("update", val);
      emit("update:visible", val);
    };
    const closed = () => {
      update(false);
      emit("closed");
    };
    const onCancel = () => {
      emit("cancel");
      if (props.cancelAutoClose) {
        closed();
      }
    };
    const onOk = () => {
      emit("ok");
      closed();
    };
    return {
      closed,
      classes,
      onCancel,
      onOk,
      showPopup
    };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "nut-dialog__header"
};
const _hoisted_2 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_button = resolveComponent("nut-button");
  const _component_nut_popup = resolveComponent("nut-popup");
  return openBlock(), createBlock(_component_nut_popup, {
    teleport: _ctx.teleport,
    visible: _ctx.showPopup,
    "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.showPopup = $event),
    "close-on-click-overlay": _ctx.closeOnClickOverlay,
    "lock-scroll": _ctx.lockScroll,
    round: "",
    onClickOverlay: _ctx.closed,
    onClickCloseIcon: _ctx.closed
  }, {
    default: withCtx(() => [
      createElementVNode("view", {
        class: normalizeClass(_ctx.classes)
      }, [
        _ctx.title ? (openBlock(), createElementBlock("view", _hoisted_1, [
          _ctx.$slots.header ? renderSlot(_ctx.$slots, "header", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ], 64))
        ])) : createCommentVNode("", true),
        createElementVNode("view", {
          class: "nut-dialog__content",
          style: normalizeStyle({ textAlign: _ctx.textAlign })
        }, [
          _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock("view", {
            key: 1,
            innerHTML: _ctx.content
          }, null, 8, _hoisted_2))
        ], 4),
        !_ctx.noFooter ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: normalizeClass(["nut-dialog__footer", { [_ctx.footerDirection]: _ctx.footerDirection }])
        }, [
          _ctx.$slots.footer ? renderSlot(_ctx.$slots, "footer", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !_ctx.noCancelBtn ? (openBlock(), createBlock(_component_nut_button, {
              key: 0,
              size: "small",
              plain: "",
              type: "primary",
              class: "nut-dialog__footer-cancel",
              onClick: _ctx.onCancel
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.cancelText), 1)
              ]),
              _: 1
            }, 8, ["onClick"])) : createCommentVNode("", true),
            !_ctx.noOkBtn ? (openBlock(), createBlock(_component_nut_button, {
              key: 1,
              size: "small",
              type: "primary",
              class: normalizeClass(["nut-dialog__footer-ok", { disabled: _ctx.okBtnDisabled }]),
              disabled: _ctx.okBtnDisabled,
              onClick: _ctx.onOk
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.okText), 1)
              ]),
              _: 1
            }, 8, ["class", "disabled", "onClick"])) : createCommentVNode("", true)
          ], 64))
        ], 2)) : createCommentVNode("", true)
      ], 2)
    ]),
    _: 3
  }, 8, ["teleport", "visible", "close-on-click-overlay", "lock-scroll", "onClickOverlay", "onClickCloseIcon"]);
}
var Dialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
class DialogOptions {
  constructor() {
    __publicField(this, "title", "");
    __publicField(this, "content", "");
    __publicField(this, "cancelText", "\u53D6\u6D88");
    __publicField(this, "okText", "\u786E\u5B9A");
    __publicField(this, "textAlign", "center");
    __publicField(this, "teleport", "body");
    __publicField(this, "onUpdate", (value) => {
    });
    __publicField(this, "onOk", () => {
    });
    __publicField(this, "onCancel", () => {
    });
    __publicField(this, "onClose", () => {
    });
    __publicField(this, "onClosed", () => {
    });
    __publicField(this, "visible", true);
    __publicField(this, "noFooter", false);
    __publicField(this, "noOkBtn", false);
    __publicField(this, "noCancelBtn", false);
    __publicField(this, "okBtnDisabled", false);
    __publicField(this, "closeOnPopstate", false);
    __publicField(this, "lockScroll", false);
  }
}
class DialogFunction {
  constructor(_options) {
    __publicField(this, "options", new DialogOptions());
    __publicField(this, "close", () => {
    });
    __publicField(this, "setDefaultOptions", (options) => {
    });
    __publicField(this, "resetDefaultOptions", () => {
    });
    let options = Object.assign(this.options, _options);
    let elWarp = document.body;
    let teleport = options.teleport;
    if (teleport != "body") {
      if (typeof teleport == "string") {
        elWarp = document.querySelector(teleport);
      } else {
        elWarp = options.teleport;
      }
    }
    const root = document.createElement("view");
    root.id = "dialog-" + new Date().getTime();
    const Wrapper = {
      setup() {
        options.onUpdate = (val) => {
          if (val == false) {
            elWarp.removeChild(root);
          }
        };
        options.teleport = `#${root.id}`;
        return () => {
          return h(Dialog, options);
        };
      }
    };
    const instance = createVNode(Wrapper);
    elWarp.appendChild(root);
    render(instance, root);
  }
}
const _Dialog = function(options) {
  return new DialogFunction(options);
};
_Dialog.install = (app) => {
  app.use(Dialog);
  app.config.globalProperties.$dialog = _Dialog;
};
export { Dialog, DialogOptions, _Dialog as default };
