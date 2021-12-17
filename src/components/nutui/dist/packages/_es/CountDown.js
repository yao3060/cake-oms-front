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
import { reactive, computed, watch, toRefs, openBlock, createElementBlock, normalizeClass, renderSlot, toDisplayString, Fragment, createElementVNode, createCommentVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("countdown");
const _sfc_main = create({
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      }
    },
    paused: {
      default: false,
      type: Boolean
    },
    showDays: {
      default: false,
      type: Boolean
    },
    showPlainText: {
      default: false,
      type: Boolean
    },
    startTime: {
      type: [Number, String],
      validator(v) {
        const dateStr = new Date(v).toString().toLowerCase();
        return dateStr !== "invalid date";
      }
    },
    endTime: {
      type: [Number, String],
      validator(v) {
        const dateStr = new Date(v).toString().toLowerCase();
        return dateStr !== "invalid date";
      }
    }
  },
  components: {},
  emits: ["input", "on-end", "on-restart", "on-paused", "update:modelValue"],
  setup(props, { emit, slots }) {
    console.log("componentName", componentName);
    const state = reactive({
      restTime: 0,
      p: 0,
      _curr: 0,
      timer: null
    });
    const resttime = computed(() => {
      const rest = restTime(state.restTime);
      const { d, h, m, s } = rest;
      if (!props.showDays && d > 0) {
        rest.h = fill2(Number(rest.h) + d * 24);
        rest.d = 0;
      }
      return rest;
    });
    const plainText = computed(() => {
      const { d, h, m, s } = resttime.value;
      return `${d > 0 && props.showDays ? d + "\u5929" + h : h}\u5C0F\u65F6${m}\u5206${s}\u79D2`;
    });
    watch(() => props.value, (value) => {
    });
    watch(() => state.restTime, (value) => {
      let tranTime = restTime(value);
      emit("update:modelValue", tranTime);
      emit("input", tranTime);
    });
    watch(() => props.paused, (v, ov) => {
      if (!ov) {
        state._curr = getTimeStamp();
        emit("on-paused", state.restTime);
      } else {
        state.p += getTimeStamp() - state._curr;
        emit("on-restart", state.restTime);
      }
    });
    watch(() => props.endTime, (value) => {
      initTimer();
    });
    watch(() => props.startTime, (value) => {
      initTimer();
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const getTimeStamp = (timeStr) => {
      if (!timeStr)
        return Date.now();
      let t = timeStr;
      t = t > 0 ? +t : t.toString().replace(/\-/g, "/");
      return new Date(t).getTime();
    };
    const initTimer = () => {
      const delay = 1e3;
      const curr = Date.now();
      const start = getTimeStamp(props.startTime || curr);
      const end = getTimeStamp(props.endTime || curr);
      const diffTime = curr - start;
      state.restTime = end - (start + diffTime);
      state.timer = setInterval(() => {
        if (!props.paused) {
          let restTime2 = end - (Date.now() - state.p + diffTime);
          state.restTime = restTime2;
          if (restTime2 < delay) {
            state.restTime = 0;
            emit("on-end");
            clearInterval(state.timer);
          }
        }
      }, delay);
    };
    const fill2 = (v) => {
      v += "";
      while (v.length < 2) {
        v = "0" + v;
      }
      return v;
    };
    const restTime = (t) => {
      const ts = t;
      let rest = {
        d: "-",
        h: "--",
        m: "--",
        s: "--"
      };
      if (ts === 0) {
        rest = {
          d: "0",
          h: "00",
          m: "00",
          s: "00"
        };
      }
      if (ts) {
        const ds = 24 * 60 * 60 * 1e3;
        const hs = 60 * 60 * 1e3;
        const ms = 60 * 1e3;
        const d = ts >= ds ? parseInt(ts / ds) : 0;
        const h = ts - d * ds >= hs ? parseInt((ts - d * ds) / hs) : 0;
        const m = ts - d * ds - h * hs >= ms ? parseInt((ts - d * ds - h * hs) / ms) : 0;
        const s = Math.round((ts - d * ds - h * hs - m * ms) / 1e3);
        if (d >= 0)
          rest.d = d + "";
        if (h >= 0)
          rest.h = fill2(h);
        if (m >= 0)
          rest.m = fill2(m);
        if (s >= 0)
          rest.s = fill2(s);
      }
      return rest;
    };
    initTimer();
    return __spreadProps(__spreadValues({}, toRefs(props)), {
      slots,
      classes,
      getTimeStamp,
      initTimer,
      resttime,
      plainText
    });
  }
});
const _hoisted_1 = {
  key: 1,
  class: "nut-cd-block"
};
const _hoisted_2 = { class: "nut-cd-block" };
const _hoisted_3 = /* @__PURE__ */ createElementVNode("view", { class: "nut-cd-dot" }, "\u5929", -1);
const _hoisted_4 = { class: "nut-cd-block" };
const _hoisted_5 = /* @__PURE__ */ createElementVNode("view", { class: "nut-cd-dot" }, ":", -1);
const _hoisted_6 = { class: "nut-cd-block" };
const _hoisted_7 = /* @__PURE__ */ createElementVNode("view", { class: "nut-cd-dot" }, ":", -1);
const _hoisted_8 = { class: "nut-cd-block" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : _ctx.showPlainText ? (openBlock(), createElementBlock("view", _hoisted_1, toDisplayString(_ctx.plainText), 1)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
      _ctx.resttime.d >= 0 && _ctx.showDays ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createElementVNode("view", _hoisted_2, toDisplayString(_ctx.resttime.d), 1),
        _hoisted_3
      ], 64)) : createCommentVNode("", true),
      createElementVNode("view", _hoisted_4, toDisplayString(_ctx.resttime.h), 1),
      _hoisted_5,
      createElementVNode("view", _hoisted_6, toDisplayString(_ctx.resttime.m), 1),
      _hoisted_7,
      createElementVNode("view", _hoisted_8, toDisplayString(_ctx.resttime.s), 1)
    ], 64))
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
