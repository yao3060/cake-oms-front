/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { reactive, ref, computed, provide, onMounted, nextTick, onActivated, onDeactivated, onBeforeUnmount, watch, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, renderSlot, Fragment, renderList, createCommentVNode } from "vue";
import { c as createComponent } from "./component.js";
import { u as useExpose } from "./index.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const DISTANCE = 5;
function useTouch() {
  const state = reactive({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    direction: ""
  });
  const getDirection = (x, y) => {
    if (x > y && x > DISTANCE)
      return "horizontal";
    if (y > x && y > DISTANCE)
      return "vertical";
    return "";
  };
  const reset = () => {
    state.startX = 0;
    state.startY = 0;
    state.deltaX = 0;
    state.deltaY = 0;
    state.offsetX = 0;
    state.offsetY = 0;
    state.direction = "";
  };
  const start = (e) => {
    reset();
    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };
  const move = (e) => {
    state.deltaX = e.touches[0].clientX - state.startX;
    state.deltaY = e.touches[0].clientY - state.startY;
    state.offsetX = Math.abs(state.deltaX);
    state.offsetY = Math.abs(state.deltaY);
    if (!state.direction) {
      state.direction = getDirection(state.offsetX, state.offsetY);
    }
  };
  return {
    state,
    start,
    reset,
    move
  };
}
const { create, componentName } = createComponent("swiper");
const _sfc_main = create({
  props: {
    width: {
      type: [Number, String],
      default: window.innerWidth
    },
    height: {
      type: [Number, String],
      default: 0
    },
    direction: {
      type: [String],
      default: "horizontal"
    },
    paginationVisible: {
      type: Boolean,
      default: false
    },
    paginationColor: {
      type: String,
      default: "#fff"
    },
    loop: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 500
    },
    autoPlay: {
      type: [Number, String],
      default: 0
    },
    initPage: {
      type: [Number, String],
      default: 0
    },
    touchable: {
      type: Boolean,
      default: true
    },
    isPreventDefault: {
      type: Boolean,
      default: true
    },
    isStopPropagation: {
      type: Boolean,
      default: true
    }
  },
  emits: ["change"],
  setup(props, { emit, slots }) {
    const container = ref();
    const state = reactive({
      active: 0,
      num: 0,
      rect: null,
      width: 0,
      height: 0,
      moving: false,
      offset: 0,
      touchTime: 0,
      autoplayTimer: 0,
      children: [],
      style: {}
    });
    const touch = useTouch();
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const isVertical = computed(() => props.direction === "vertical");
    const delTa = computed(() => {
      return isVertical.value ? touch.state.deltaY : touch.state.deltaX;
    });
    const isCorrectDirection = computed(() => {
      return touch.state.direction === props.direction;
    });
    const childCount = computed(() => state.children.length);
    const size = computed(() => state[isVertical.value ? "height" : "width"]);
    const trackSize = computed(() => childCount.value * size.value);
    const minOffset = computed(() => {
      if (state.rect) {
        const base = isVertical.value ? state.rect.height : state.rect.width;
        return base - size.value * childCount.value;
      }
      return 0;
    });
    const activePagination = computed(() => (state.active + childCount.value) % childCount.value);
    const getStyle = () => {
      state.style = {
        transitionDuration: `${state.moving ? 0 : props.duration}ms`,
        transform: `translate${isVertical.value ? "Y" : "X"}(${state.offset}px)`,
        [isVertical.value ? "height" : "width"]: `${size.value * childCount.value}px`,
        [isVertical.value ? "width" : "height"]: `${isVertical.value ? state.width : state.height}px`
      };
    };
    const relation = (child) => {
      if (child.proxy) {
        state.children.push(child.proxy);
      }
    };
    const range = (num, min, max) => {
      return Math.min(Math.max(num, min), max);
    };
    const requestFrame = (fn) => {
      window.requestAnimationFrame.call(window, fn);
    };
    const getOffset = (active, offset = 0) => {
      let currentPosition = active * size.value;
      if (!props.loop) {
        currentPosition = Math.min(currentPosition, -minOffset.value);
      }
      let targetOffset = offset - currentPosition;
      if (!props.loop) {
        targetOffset = range(targetOffset, minOffset.value, 0);
      }
      return targetOffset;
    };
    const getActive = (pace) => {
      const { active } = state;
      if (pace) {
        if (props.loop) {
          return range(active + pace, -1, childCount.value);
        }
        return range(active + pace, 0, childCount.value - 1);
      }
      return active;
    };
    const move = ({ pace = 0, offset = 0, isEmit = false }) => {
      if (childCount.value <= 1)
        return;
      const { active } = state;
      const targetActive = getActive(pace);
      const targetOffset = getOffset(targetActive, offset);
      if (props.loop) {
        if (state.children[0] && targetOffset !== minOffset.value) {
          const rightBound = targetOffset < minOffset.value;
          state.children[0].setOffset(rightBound ? trackSize.value : 0);
        }
        if (state.children[childCount.value - 1] && targetOffset !== 0) {
          const leftBound = targetOffset > 0;
          state.children[childCount.value - 1].setOffset(leftBound ? -trackSize.value : 0);
        }
      }
      state.active = targetActive;
      state.offset = targetOffset;
      if (isEmit && active !== state.active) {
        emit("change", activePagination.value);
      }
      getStyle();
    };
    const resettPosition = () => {
      state.moving = true;
      if (state.active <= -1) {
        move({ pace: childCount.value });
      }
      if (state.active >= childCount.value) {
        move({ pace: -childCount.value });
      }
    };
    const stopAutoPlay = () => {
      clearTimeout(state.autoplayTimer);
    };
    const prev = () => {
      resettPosition();
      touch.reset();
      requestFrame(() => {
        requestFrame(() => {
          state.moving = false;
          move({
            pace: -1,
            isEmit: true
          });
        });
      });
    };
    const next = () => {
      resettPosition();
      touch.reset();
      requestFrame(() => {
        requestFrame(() => {
          state.moving = false;
          move({
            pace: 1,
            isEmit: true
          });
        });
      });
    };
    const to = (index) => {
      resettPosition();
      touch.reset();
      requestFrame(() => {
        requestFrame(() => {
          state.moving = false;
          let targetIndex;
          if (props.loop && childCount.value === index) {
            targetIndex = state.active === 0 ? 0 : index;
          } else {
            targetIndex = index % childCount.value;
          }
          move({
            pace: targetIndex - state.active,
            isEmit: true
          });
        });
      });
    };
    const autoplay = () => {
      if (props.autoPlay <= 0 || childCount.value <= 1)
        return;
      stopAutoPlay();
      state.autoplayTimer = setTimeout(() => {
        next();
        autoplay();
      }, Number(props.autoPlay));
    };
    const init = (active = +props.initPage) => {
      stopAutoPlay();
      state.rect = container.value.getBoundingClientRect();
      active = Math.min(childCount.value - 1, active);
      state.width = props.width ? +props.width : state.rect.width;
      state.height = props.height ? +props.height : state.rect.height;
      state.active = active;
      state.offset = getOffset(state.active);
      state.moving = true;
      getStyle();
      autoplay();
    };
    const onTouchStart = (e) => {
      if (props.isPreventDefault)
        e.preventDefault();
      if (props.isStopPropagation)
        e.stopPropagation();
      if (!props.touchable)
        return;
      touch.start(e);
      state.touchTime = Date.now();
      stopAutoPlay();
      resettPosition();
    };
    const onTouchMove = (e) => {
      if (props.touchable && state.moving) {
        touch.move(e);
        if (isCorrectDirection.value) {
          move({
            offset: delTa.value
          });
        }
      }
    };
    const onTouchEnd = (e) => {
      if (!props.touchable || !state.moving)
        return;
      const speed = delTa.value / (Date.now() - state.touchTime);
      const isShouldMove = Math.abs(speed) > 0.3 || Math.abs(delTa.value) > +(size.value / 2).toFixed(2);
      if (isShouldMove && isCorrectDirection.value) {
        let pace = 0;
        const offset = isVertical.value ? touch.state.offsetY : touch.state.offsetX;
        if (props.loop) {
          pace = offset > 0 ? delTa.value > 0 ? -1 : 1 : 0;
        } else {
          pace = -Math[delTa.value > 0 ? "ceil" : "floor"](delTa.value / size.value);
        }
        move({
          pace,
          isEmit: true
        });
      } else if (delTa.value) {
        move({ pace: 0 });
      }
      state.moving = false;
      getStyle();
      autoplay();
    };
    provide("parent", {
      props,
      size,
      relation
    });
    useExpose({
      prev,
      next,
      to
    });
    onMounted(() => {
      nextTick(() => {
        init();
      });
    });
    onActivated(() => {
      nextTick(() => {
        init();
      });
    });
    onDeactivated(() => {
      stopAutoPlay();
    });
    onBeforeUnmount(() => {
      stopAutoPlay();
    });
    watch(() => props.initPage, (val) => {
      nextTick(() => {
        init(Number(val));
      });
    });
    watch(() => state.children.length, () => {
      nextTick(() => {
        init(state.active);
      });
    });
    watch(() => props.autoPlay, (val) => {
      val > 0 ? autoplay() : stopAutoPlay();
    });
    return {
      state,
      classes,
      container,
      componentName,
      isVertical,
      slots,
      activePagination,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    ref: "container",
    class: normalizeClass(_ctx.classes),
    onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.onTouchStart && _ctx.onTouchStart(...args)),
    onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.onTouchMove && _ctx.onTouchMove(...args)),
    onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args)),
    onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args))
  }, [
    createElementVNode("view", {
      class: normalizeClass({
        [`${_ctx.componentName}-inner`]: true,
        [`${_ctx.componentName}-vertical`]: _ctx.isVertical
      }),
      style: normalizeStyle(_ctx.state.style)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 6),
    renderSlot(_ctx.$slots, "page"),
    _ctx.paginationVisible && !_ctx.slots.page ? (openBlock(), createElementBlock("view", {
      key: 0,
      class: normalizeClass({
        [`${_ctx.componentName}-pagination`]: true,
        [`${_ctx.componentName}-pagination-vertical`]: _ctx.isVertical
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.state.children.length, (item, index) => {
        return openBlock(), createElementBlock("i", {
          style: normalizeStyle({
            backgroundColor: _ctx.activePagination === index ? _ctx.paginationColor : "#ddd"
          }),
          key: index
        }, null, 4);
      }), 128))
    ], 2)) : createCommentVNode("", true)
  ], 34);
}
var Swiper = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Swiper as default };
