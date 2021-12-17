/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { reactive, computed, onMounted, onUnmounted, onActivated, onDeactivated, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, withModifiers, renderSlot, createVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("backtop");
const _sfc_main = create({
  props: {
    bottom: {
      type: Number,
      default: 20
    },
    right: {
      type: Number,
      default: 10
    },
    elId: {
      type: String,
      default: ""
    },
    distance: {
      type: Number,
      default: 200
    },
    zIndex: {
      type: Number,
      default: 10
    },
    isAnimation: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 1e3
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const state = reactive({
      backTop: false,
      scrollTop: 0,
      scrollEl: window,
      startTime: 0,
      keepAlive: false
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        show: state.backTop
      };
    });
    const style = computed(() => {
      return {
        right: `${props.right}px`,
        bottom: `${props.bottom}px`,
        zIndex: props.zIndex
      };
    });
    function scrollListener() {
      if (state.scrollEl instanceof Window) {
        state.scrollTop = state.scrollEl.pageYOffset;
      } else {
        state.scrollTop = state.scrollEl.scrollTop;
      }
      state.backTop = state.scrollTop >= props.distance;
    }
    function scroll(y = 0) {
      if (state.scrollEl instanceof Window) {
        window.scrollTo(0, y);
      } else {
        state.scrollEl.scrollTop = y;
      }
    }
    function scrollAnimation() {
      let cid = requestAniFrame()(function fn() {
        var t = props.duration - Math.max(0, state.startTime - +new Date() + props.duration);
        var y = t * -state.scrollTop / props.duration + state.scrollTop;
        scroll(y);
        cid = requestAniFrame()(fn);
        if (t == props.duration || y == 0) {
          window.cancelAnimationFrame(cid);
        }
      });
    }
    function addEventListener() {
      state.scrollEl.addEventListener("scroll", scrollListener, false);
      state.scrollEl.addEventListener("resize", scrollListener, false);
    }
    function removeEventListener() {
      state.scrollEl.removeEventListener("scroll", scrollListener, false);
      state.scrollEl.removeEventListener("resize", scrollListener, false);
    }
    function initCancelAniFrame() {
      window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
    }
    function requestAniFrame() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1e3 / 60);
      };
    }
    function click(e) {
      state.startTime = +new Date();
      props.isAnimation && props.duration > 0 ? scrollAnimation() : scroll();
      emit("click", e);
    }
    function init() {
      if (props.elId && document.getElementById(props.elId)) {
        state.scrollEl = document.getElementById(props.elId);
      }
      addEventListener();
      initCancelAniFrame();
    }
    onMounted(() => {
      init();
    });
    onUnmounted(() => {
      removeEventListener();
    });
    onActivated(() => {
      if (state.keepAlive) {
        state.keepAlive = false;
        init();
      }
    });
    onDeactivated(() => {
      state.keepAlive = true;
      removeEventListener();
    });
    return {
      state,
      classes,
      style,
      click
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle(_ctx.style),
    onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.click && _ctx.click(...args), ["stop"]))
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createVNode(_component_nut_icon, {
        size: "19px",
        class: "nut-backtop-main",
        name: "top"
      })
    ])
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
