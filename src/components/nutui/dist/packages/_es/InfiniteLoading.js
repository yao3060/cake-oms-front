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
import { reactive, computed, onMounted, onUnmounted, ref, onActivated, onDeactivated, toRefs, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, createVNode, toDisplayString, renderSlot, createCommentVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("infiniteloading");
const _sfc_main = create({
  props: {
    hasMore: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 200
    },
    pullIcon: {
      type: String,
      default: "https://img10.360buyimg.com/imagetools/jfs/t1/169863/6/4565/6306/60125948E7e92774e/40b3a0cf42852bcb.png"
    },
    pullTxt: {
      type: String,
      default: "\u677E\u5F00\u5237\u65B0"
    },
    loadIcon: {
      type: String,
      default: "https://img10.360buyimg.com/imagetools/jfs/t1/169863/6/4565/6306/60125948E7e92774e/40b3a0cf42852bcb.png"
    },
    loadTxt: {
      type: String,
      default: "\u52A0\u8F7D\u4E2D\xB7\xB7\xB7"
    },
    loadMoreTxt: {
      type: String,
      default: "\u54CE\u5440\uFF0C\u8FD9\u91CC\u662F\u5E95\u90E8\u4E86\u5566"
    },
    useWindow: {
      type: Boolean,
      default: true
    },
    containerId: {
      type: String,
      default: ""
    },
    useCapture: {
      type: Boolean,
      default: false
    },
    isOpenRefresh: {
      type: Boolean,
      default: false
    }
  },
  emits: ["scroll-change", "load-more", "refresh"],
  setup(props, { emit, slots }) {
    const state = reactive({
      scrollEl: window,
      scroller: null,
      refreshTop: null,
      beforeScrollTop: 0,
      isTouching: false,
      isInfiniting: false,
      refreshMaxH: 0,
      y: 0,
      x: 0,
      distance: 0
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const getStyle = computed(() => {
      return {
        height: state.distance < 0 ? `0px` : `${state.distance}px`,
        transition: state.isTouching ? `height 0s cubic-bezier(0.25,0.1,0.25,1)` : `height 0.2s cubic-bezier(0.25,0.1,0.25,1)`
      };
    });
    const getParentElement = (el) => {
      return !!props.containerId ? document.querySelector(`#${props.containerId}`) : el && el.parentNode;
    };
    const requestAniFrame = () => {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1e3 / 60);
      };
    };
    const getWindowScrollTop = () => {
      return window.pageYOffset !== void 0 ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    };
    const calculateTopPosition = (el) => {
      return !el ? 0 : el.offsetTop + calculateTopPosition(el.offsetParent);
    };
    const isScrollAtBottom = () => {
      let offsetDistance = 0;
      let resScrollTop = 0;
      let direction = "down";
      const windowScrollTop = getWindowScrollTop();
      if (props.useWindow) {
        if (state.scroller) {
          offsetDistance = calculateTopPosition(state.scroller) + state.scroller.offsetHeight - windowScrollTop - window.innerHeight;
        }
        resScrollTop = windowScrollTop;
      } else {
        const { scrollHeight, clientHeight, scrollTop } = state.scrollEl;
        offsetDistance = scrollHeight - clientHeight - scrollTop;
        resScrollTop = scrollTop;
      }
      if (state.beforeScrollTop > resScrollTop) {
        direction = "up";
      } else {
        direction = "down";
      }
      state.beforeScrollTop = resScrollTop;
      emit("scroll-change", resScrollTop);
      return offsetDistance <= props.threshold && direction == "down";
    };
    const infiniteDone = () => {
      state.isInfiniting = false;
    };
    const handleScroll = () => {
      requestAniFrame()(() => {
        if (!isScrollAtBottom() || !props.hasMore || state.isInfiniting) {
          return false;
        } else {
          state.isInfiniting = true;
          emit("load-more", infiniteDone);
        }
      });
    };
    const scrollListener = () => {
      state.scrollEl.addEventListener("scroll", handleScroll, props.useCapture);
    };
    const refreshDone = () => {
      state.distance = 0;
      state.isTouching = false;
    };
    const touchStart = (event) => {
      if (state.beforeScrollTop == 0 && !state.isTouching && props.isOpenRefresh) {
        state.y = event.touches[0].pageY;
        state.isTouching = true;
        const childHeight = state.refreshTop.firstElementChild.offsetHeight;
        state.refreshMaxH = Math.floor(childHeight * 1 + 10);
      }
    };
    const touchMove = (event) => {
      state.distance = event.touches[0].pageY - state.y;
      if (state.distance > 0 && state.isTouching) {
        event.preventDefault();
        if (state.distance >= state.refreshMaxH)
          state.distance = state.refreshMaxH;
      } else {
        state.distance = 0;
        state.isTouching = false;
      }
    };
    const touchEnd = () => {
      if (state.distance < state.refreshMaxH) {
        state.distance = 0;
      } else {
        emit("refresh", refreshDone);
      }
    };
    onMounted(() => {
      const parentElement = getParentElement(state.scroller);
      state.scrollEl = props.useWindow ? window : parentElement;
      scrollListener();
    });
    onUnmounted(() => {
      state.scrollEl.removeEventListener("scroll", handleScroll, props.useCapture);
    });
    const isKeepAlive = ref(false);
    onActivated(() => {
      if (isKeepAlive.value) {
        isKeepAlive.value = false;
        scrollListener();
      }
    });
    onDeactivated(() => {
      isKeepAlive.value = true;
      state.scrollEl.removeEventListener("scroll", handleScroll, props.useCapture);
    });
    return __spreadProps(__spreadValues({
      classes
    }, toRefs(state)), {
      touchStart,
      touchMove,
      touchEnd,
      getStyle
    });
  }
});
const _hoisted_1 = { class: "top-box" };
const _hoisted_2 = { class: "top-text" };
const _hoisted_3 = { class: "nut-infinite-container" };
const _hoisted_4 = { class: "nut-infinite-bottom" };
const _hoisted_5 = {
  key: 0,
  class: "bottom-box"
};
const _hoisted_6 = { class: "bottom-text" };
const _hoisted_7 = {
  key: 1,
  class: "tips"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    ref: "scroller",
    onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.touchStart && _ctx.touchStart(...args)),
    onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.touchMove && _ctx.touchMove(...args)),
    onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.touchEnd && _ctx.touchEnd(...args))
  }, [
    createElementVNode("view", {
      class: "nut-infinite-top",
      ref: "refreshTop",
      style: normalizeStyle(_ctx.getStyle)
    }, [
      createElementVNode("view", _hoisted_1, [
        createVNode(_component_nut_icon, {
          class: "top-img",
          name: _ctx.pullIcon
        }, null, 8, ["name"]),
        createElementVNode("view", _hoisted_2, toDisplayString(_ctx.pullTxt), 1)
      ])
    ], 4),
    createElementVNode("view", _hoisted_3, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createElementVNode("view", _hoisted_4, [
      _ctx.isInfiniting ? (openBlock(), createElementBlock("view", _hoisted_5, [
        createVNode(_component_nut_icon, {
          class: "bottom-img",
          name: _ctx.loadIcon
        }, null, 8, ["name"]),
        createElementVNode("view", _hoisted_6, toDisplayString(_ctx.loadTxt), 1)
      ])) : !_ctx.hasMore ? (openBlock(), createElementBlock("view", _hoisted_7, toDisplayString(_ctx.loadMoreTxt), 1)) : createCommentVNode("", true)
    ])
  ], 34);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
