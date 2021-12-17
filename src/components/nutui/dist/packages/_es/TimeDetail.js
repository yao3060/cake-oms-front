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
import { inject, reactive, computed, toRefs, openBlock, createElementBlock, normalizeClass, createElementVNode, Fragment, renderList, toDisplayString } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("timedetail");
const _sfc_main = create({
  name: "timedetail",
  props: {
    times: {
      type: Array,
      default: () => {
        return [];
      }
    },
    detailKey: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ["select"],
  setup: (props, context) => {
    const currentKey = inject("currentKey");
    const currentTime = inject("currentTime");
    const state = reactive({
      currentKey,
      currentTime
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const getClass = (item) => {
      let find = state.currentTime.find((item2) => item2.key == state.currentKey);
      if (find) {
        return {
          "nut-timedetail__detail__list__item": true,
          "nut-timedetail__detail__list__item--curr": find.list.filter((value) => value === item).length > 0
        };
      }
    };
    const renderData = computed(() => {
      return props.times.find((time) => time.key == state.currentKey)["list"];
    });
    const handleTime = (time) => {
      context.emit("select", time);
    };
    return __spreadProps(__spreadValues({
      classes
    }, toRefs(state)), {
      getClass,
      renderData,
      handleTime
    });
  }
});
const _hoisted_1 = { class: "nut-timedetail__detail nut-timedetail__detail--moring" };
const _hoisted_2 = { class: "nut-timedetail__detail__list" };
const _hoisted_3 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("view", _hoisted_1, [
      createElementVNode("view", _hoisted_2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.renderData, (item) => {
          return openBlock(), createElementBlock("view", {
            class: normalizeClass(_ctx.getClass(item)),
            key: item,
            onClick: ($event) => _ctx.handleTime(item)
          }, toDisplayString(item), 11, _hoisted_3);
        }), 128))
      ])
    ])
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
