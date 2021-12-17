/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, computed, reactive, onMounted, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createVNode, withCtx, createTextVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("signature");
const _sfc_main = create({
  props: {
    customClass: {
      type: String,
      default: ""
    },
    lineWidth: {
      type: Number,
      default: 2
    },
    strokeStyle: {
      type: String,
      default: "#000"
    },
    type: {
      type: String,
      default: "png"
    },
    unSupportTpl: {
      type: String,
      default: "\u5BF9\u4E0D\u8D77\uFF0C\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301Canvas\uFF0C\u65E0\u6CD5\u4F7F\u7528\u672C\u63A7\u4EF6\uFF01"
    }
  },
  components: {},
  emits: ["confirm", "clear"],
  setup(props, { emit }) {
    const canvas = ref(null);
    const wrap = ref(null);
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${props.customClass}`]: props.customClass
      };
    });
    const state = reactive({
      canvasHeight: 0,
      canvasWidth: 0,
      ctx: null,
      isSupportTouch: "ontouchstart" in window,
      events: "ontouchstart" in window ? ["touchstart", "touchmove", "touchend", "touchleave"] : ["mousedown", "mousemove", "mouseup", "mouseleave"]
    });
    const isCanvasSupported = () => {
      let elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    };
    const addEvent = () => {
      canvas.value.addEventListener(state.events[0], startEventHandler, false);
    };
    const startEventHandler = (event) => {
      event.preventDefault();
      state.ctx.beginPath();
      state.ctx.lineWidth = props.lineWidth;
      state.ctx.strokeStyle = props.strokeStyle;
      canvas.value.addEventListener(state.events[1], moveEventHandler, false);
      canvas.value.addEventListener(state.events[2], endEventHandler, false);
      canvas.value.addEventListener(state.events[3], leaveEventHandler, false);
    };
    const moveEventHandler = (event) => {
      event.preventDefault();
      let evt = state.isSupportTouch ? event.touches[0] : event;
      let coverPos = canvas.value.getBoundingClientRect();
      let mouseX = evt.clientX - coverPos.left;
      let mouseY = evt.clientY - coverPos.top;
      state.ctx.lineTo(mouseX, mouseY);
      state.ctx.stroke();
    };
    const endEventHandler = (event) => {
      event.preventDefault();
      canvas.value.removeEventListener(state.events[1], moveEventHandler, false);
      canvas.value.removeEventListener(state.events[2], endEventHandler, false);
    };
    const leaveEventHandler = (event) => {
      event.preventDefault();
      canvas.value.removeEventListener(state.events[1], moveEventHandler, false);
      canvas.value.removeEventListener(state.events[2], endEventHandler, false);
    };
    const clear = () => {
      canvas.value.addEventListener(state.events[2], endEventHandler, false);
      state.ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
      state.ctx.closePath();
      emit("clear");
    };
    const confirm = () => {
      onSave(canvas.value);
    };
    const onSave = (canvas2) => {
      let dataurl;
      switch (props.type) {
        case "png":
          dataurl = canvas2.toDataURL("image/png");
          break;
        case "jpg":
          dataurl = canvas2.toDataURL("image/jpeg", 0.8);
          break;
      }
      clear();
      emit("confirm", canvas2, dataurl);
    };
    onMounted(() => {
      if (isCanvasSupported()) {
        state.ctx = canvas.value.getContext("2d");
        state.canvasWidth = wrap.value.offsetWidth;
        state.canvasHeight = wrap.value.offsetHeight;
        addEvent();
      }
    });
    return { canvas, wrap, isCanvasSupported, confirm, clear, classes };
  }
});
const _hoisted_1 = {
  class: "nut-signature-inner",
  ref: "wrap"
};
const _hoisted_2 = ["height", "width"];
const _hoisted_3 = {
  key: 1,
  class: "nut-signature-unsopport"
};
const _hoisted_4 = /* @__PURE__ */ createTextVNode("\u91CD\u7B7E");
const _hoisted_5 = /* @__PURE__ */ createTextVNode("\u786E\u8BA4");
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_button = resolveComponent("nut-button");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("div", _hoisted_1, [
      _ctx.isCanvasSupported ? (openBlock(), createElementBlock("canvas", {
        key: 0,
        ref: "canvas",
        height: _ctx.canvasHeight,
        width: _ctx.canvasWidth
      }, null, 8, _hoisted_2)) : (openBlock(), createElementBlock("p", _hoisted_3, toDisplayString(_ctx.unSupportTpl), 1))
    ], 512),
    createVNode(_component_nut_button, {
      class: "nut-signature-btn",
      type: "default",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.clear())
    }, {
      default: withCtx(() => [
        _hoisted_4
      ]),
      _: 1
    }),
    createVNode(_component_nut_button, {
      class: "nut-signature-btn",
      type: "primary",
      onClick: _cache[1] || (_cache[1] = ($event) => _ctx.confirm())
    }, {
      default: withCtx(() => [
        _hoisted_5
      ]),
      _: 1
    })
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
