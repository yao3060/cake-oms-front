/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { getCurrentInstance, inject, reactive, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
function useExpose(apis) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}
const { create, componentName } = createComponent("swiper-item");
const _sfc_main = create({
  props: {},
  setup(props, { slots }) {
    const parent = inject("parent");
    parent["relation"](getCurrentInstance());
    const state = reactive({
      offset: 0
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const style = computed(() => {
      const style2 = {};
      const direction = parent == null ? void 0 : parent.props.direction;
      if (parent == null ? void 0 : parent.size.value) {
        style2[direction === "horizontal" ? "width" : "height"] = `${parent == null ? void 0 : parent.size.value}px`;
      }
      if (state.offset) {
        style2["transform"] = `translate${direction === "horizontal" ? "X" : "Y"}(${state.offset}px)`;
      }
      return style2;
    });
    const setOffset = (offset) => {
      state.offset = offset;
    };
    useExpose({ setOffset });
    return {
      style,
      classes
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 6);
}
var SwiperItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { SwiperItem as default };
