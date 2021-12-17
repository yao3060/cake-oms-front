/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, ref, onMounted, onUnmounted, onDeactivated, watch, nextTick, openBlock, createElementBlock, normalizeClass, createElementVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("barrage");
const _sfc_main = create({
  props: {
    danmu: {
      type: Array,
      default: () => []
    },
    frequency: {
      type: Number,
      default: 500
    },
    speeds: {
      type: Number,
      default: 2e3
    },
    rows: {
      type: Number,
      default: 3
    },
    top: {
      type: Number,
      default: 10
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    let dmBody = ref(document.createElement("div"));
    let dmContainer = ref(document.createElement("div"));
    let timer = 0;
    const danmuList = ref(props.danmu);
    const rows = ref(props.rows);
    const top = ref(props.top);
    const index2 = ref(0);
    const speeds = props.speeds;
    const danmuCWidth = ref(0);
    onMounted(() => {
      danmuCWidth.value = dmBody.value.offsetWidth;
      run();
    });
    onUnmounted(() => {
      clearInterval(timer);
      timer = 0;
    });
    onDeactivated(() => {
      clearInterval(timer);
      timer = 0;
    });
    watch(() => props.danmu, (newValue, oldVlaue) => {
      danmuList.value = [...newValue];
    });
    const add = (word) => {
      const _index = index2.value % danmuList.value.length;
      danmuList.value.splice(_index, 0, word);
    };
    const run = () => {
      clearInterval(timer);
      timer = 0;
      timer = setInterval(() => {
        play();
        run();
      }, props.frequency);
    };
    const play = () => {
      const _index = props.loop ? index2.value % danmuList.value.length : index2.value;
      let el = document.createElement(`view`);
      el.innerHTML = danmuList.value[_index];
      el.classList.add("dmitem");
      dmContainer.value.appendChild(el);
      nextTick(() => {
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        el.classList.add("move");
        el.style.animationDuration = `${speeds}ms`;
        el.style.top = _index % rows.value * (height + top.value) + 20 + "px";
        el.style.width = width + 20 + "px";
        el.style.setProperty("--move-distance", `-${danmuCWidth.value}px`);
        el.dataset.index = `${_index}`;
        el.addEventListener("animationend", () => {
          dmContainer.value.removeChild(el);
        });
        index2.value++;
      });
    };
    return { classes, danmuList, dmBody, dmContainer, add };
  }
});
const _hoisted_1 = {
  ref: "dmContainer",
  class: "dmContainer"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    ref: "dmBody",
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("view", _hoisted_1, null, 512)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
