/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, reactive, computed, onMounted, onActivated, onDeactivated, openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { r as requestAniFrame } from "./raf.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("drag");
const _sfc_main = create({
  props: {
    attract: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: "all"
    },
    boundary: {
      type: Object,
      default: () => {
        return {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        };
      }
    }
  },
  setup(props, { emit }) {
    const myDrag = ref();
    const state = reactive({
      keepAlive: false,
      elWidth: 0,
      elHeight: 0,
      screenWidth: 0,
      screenHeight: 0,
      startTop: 0,
      startLeft: 0,
      nx: 0,
      ny: 0,
      xPum: 0,
      yPum: 0,
      position: { x: 0, y: 0 },
      boundary: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    function getInfo() {
      const domElem = document.documentElement;
      state.elWidth = myDrag.value.offsetWidth;
      state.elHeight = myDrag.value.offsetHeight;
      state.screenWidth = domElem.clientWidth;
      state.screenHeight = domElem.clientHeight;
    }
    function goLeft(target) {
      if (state.boundary.left) {
        if (+target.style.left.split("px")[0] > state.boundary.left) {
          target.style.left = +target.style.left.split("px")[0] - 10 + "px";
          requestAniFrame(() => {
            goLeft(target);
          });
        } else {
          target.style.left = `${state.boundary.left}px`;
        }
      } else {
        if (+target.style.left.split("px")[0] > 10) {
          target.style.left = +target.style.left.split("px")[0] - 10 + "px";
          requestAniFrame(() => {
            goLeft(target);
          });
        } else {
          target.style.left = "0px";
        }
      }
    }
    function goRight(target, rightLocation) {
      if (rightLocation - parseInt(target.style.left.split("px")[0]) > 10) {
        target.style.left = parseInt(target.style.left.split("px")[0]) + 10 + "px";
        requestAniFrame(() => {
          goRight(target, rightLocation);
        });
      } else {
        target.style.left = rightLocation + "px";
      }
    }
    function touchMove(e) {
      e.preventDefault();
      const target = e.currentTarget;
      if (e.targetTouches.length === 1) {
        const touch = e.targetTouches[0];
        state.nx = touch.clientX - state.position.x;
        state.ny = touch.clientY - state.position.y;
        state.xPum = state.startLeft + state.nx;
        state.yPum = state.startTop + state.ny;
        const rightLocation = state.screenWidth - state.elWidth - state.boundary.right;
        if (Math.abs(state.xPum) > rightLocation) {
          state.xPum = rightLocation;
        } else if (state.xPum <= state.boundary.left) {
          state.xPum = state.boundary.left;
        }
        if (state.yPum < state.boundary.top) {
          state.yPum = state.boundary.top;
        } else if (state.yPum > state.screenHeight - state.elHeight - state.boundary.bottom) {
          state.yPum = state.screenHeight - state.elHeight - state.boundary.bottom;
        }
        if (props.direction != "y") {
          target.style.left = state.xPum + "px";
        }
        if (props.direction != "x") {
          target.style.top = state.yPum + "px";
        }
      }
    }
    function touchEnd(e) {
      const target = e.currentTarget;
      const touch = e.changedTouches[0];
      let currX = touch.clientX;
      const rightLocation = state.screenWidth - state.elWidth - state.boundary.right;
      if (currX > rightLocation) {
        currX = rightLocation;
      } else if (currX < state.boundary.left) {
        currX = state.boundary.left;
      } else {
        currX = currX < state.screenWidth / 2 ? state.boundary.left : rightLocation;
      }
      if (props.direction != "y" && props.attract) {
        if (currX < state.screenWidth / 2) {
          requestAniFrame(() => {
            goLeft(target);
          });
        } else {
          requestAniFrame(() => {
            goRight(target, rightLocation);
          });
        }
      }
      if (props.direction != "x") {
        target.style.top = state.yPum + "px";
      }
    }
    function touchStart(e) {
      const target = e.currentTarget;
      const touches = e.touches[0];
      const touch = e.targetTouches[0];
      state.startTop = target.offsetTop;
      state.startLeft = target.offsetLeft;
      state.position.x = touches.clientX;
      state.position.y = touches.clientY;
      state.nx = touch.clientX - state.position.x;
      state.ny = touch.clientY - state.position.y;
      state.xPum = state.startLeft + state.nx;
      state.yPum = state.startTop + state.ny;
    }
    onMounted(() => {
      getInfo();
      state.boundary = props.boundary;
    });
    onActivated(() => {
      if (state.keepAlive) {
        state.keepAlive = false;
      }
    });
    onDeactivated(() => {
      state.keepAlive = true;
      myDrag.removeEventListener("touchstart", touchStart);
      myDrag.removeEventListener("touchmove", touchMove);
      myDrag.removeEventListener("touchend", touchEnd);
    });
    return {
      classes,
      myDrag,
      touchStart,
      touchMove,
      touchEnd
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    ref: "myDrag",
    onTouchstart: _cache[0] || (_cache[0] = ($event) => _ctx.touchStart($event)),
    onTouchmove: _cache[1] || (_cache[1] = ($event) => _ctx.touchMove($event)),
    onTouchend: _cache[2] || (_cache[2] = ($event) => _ctx.touchEnd($event))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 34);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
