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
import { ref, reactive, computed, toRefs, nextTick, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, Fragment, renderList, toDisplayString, withDirectives, vShow, createCommentVNode, withModifiers } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("elevator");
const _sfc_main = create({
  props: {
    height: {
      type: [Number, String],
      default: "200px"
    },
    acceptKey: {
      type: [String],
      default: "title"
    },
    indexList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: ["click-item", "click-index"],
  setup(props, context) {
    const spaceHeight = 23;
    const listview = ref(null);
    const state = reactive({
      anchorIndex: 0,
      listHeight: [],
      listGroup: [],
      touchState: {
        y1: 0,
        y2: 0
      },
      scrollStart: false,
      currentIndex: 0
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const resetScrollState = () => {
      state.anchorIndex = 0;
      state.listHeight = [];
      state.listGroup = [];
      state.currentIndex = 0;
      state.scrollStart = false;
      state.touchState = {
        y1: 0,
        y2: 0
      };
    };
    const getData = (el, name) => {
      const prefix = "data-";
      return el.getAttribute(prefix + name);
    };
    const setListGroup = (el) => {
      nextTick(() => {
        if (!state.listGroup.includes(el) && el != null) {
          state.listGroup.push(el);
        }
      });
    };
    const calculateHeight = () => {
      let height = 0;
      state.listHeight.push(height);
      for (let i = 0; i < state.listGroup.length; i++) {
        let item = state.listGroup[i];
        height += item.clientHeight;
        state.listHeight.push(height);
      }
    };
    const scrollTo = (index2) => {
      if (!index2 && index2 !== 0) {
        return;
      }
      if (!state.listHeight.length) {
        calculateHeight();
      }
      if (index2 < 0)
        index2 = 0;
      if (index2 > state.listHeight.length - 2)
        index2 = state.listHeight.length - 2;
      state.currentIndex = index2;
      listview.value.scrollTo(0, state.listHeight[index2]);
    };
    const touchStart = (e) => {
      state.scrollStart = true;
      let index2 = getData(e.target, "index");
      let firstTouch = e.touches[0];
      state.touchState.y1 = firstTouch.pageY;
      state.anchorIndex = +index2;
      state.currentIndex = +index2;
      console.log(state.currentIndex);
      scrollTo(+index2);
    };
    const touchMove = (e) => {
      let firstTouch = e.touches[0];
      state.touchState.y2 = firstTouch.pageY;
      let delta = (state.touchState.y2 - state.touchState.y1) / spaceHeight | 0;
      state.currentIndex = state.anchorIndex + delta;
      scrollTo(state.currentIndex);
    };
    const touchEnd = () => {
      resetScrollState();
    };
    const handleClickItem = (key, item) => {
      context.emit("click-item", key, item);
    };
    const handleClickIndex = (key) => {
      context.emit("click-index", key);
    };
    return __spreadProps(__spreadValues({
      classes
    }, toRefs(state)), {
      setListGroup,
      listview,
      touchStart,
      touchMove,
      touchEnd,
      handleClickItem,
      handleClickIndex
    });
  }
});
const _hoisted_1 = { class: "nut-elevator__list__item__code" };
const _hoisted_2 = ["onClick", "innerHTML"];
const _hoisted_3 = { class: "nut-elevator__bars__inner" };
const _hoisted_4 = ["data-index", "onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("view", {
      class: "nut-elevator__list",
      ref: "listview",
      style: normalizeStyle({ height: isNaN(+_ctx.height) ? _ctx.height : `${_ctx.height}px` })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.indexList, (item) => {
        return openBlock(), createElementBlock("view", {
          class: "nut-elevator__list__item",
          key: item[_ctx.acceptKey],
          ref_for: true,
          ref: _ctx.setListGroup
        }, [
          createElementVNode("view", _hoisted_1, toDisplayString(item[_ctx.acceptKey]), 1),
          (openBlock(true), createElementBlock(Fragment, null, renderList(item.list, (subitem) => {
            return openBlock(), createElementBlock("view", {
              class: "nut-elevator__list__item__name",
              key: subitem["id"],
              onClick: ($event) => _ctx.handleClickItem(item[_ctx.acceptKey], subitem),
              innerHTML: subitem.name
            }, null, 8, _hoisted_2);
          }), 128))
        ]);
      }), 128))
    ], 4),
    _ctx.indexList.length ? withDirectives((openBlock(), createElementBlock("view", {
      key: 0,
      class: "nut-elevator__code--current"
    }, toDisplayString(_ctx.indexList[_ctx.currentIndex][_ctx.acceptKey]), 513)), [
      [vShow, _ctx.scrollStart]
    ]) : createCommentVNode("", true),
    createElementVNode("view", {
      class: "nut-elevator__bars",
      onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.touchStart && _ctx.touchStart(...args)),
      onTouchmove: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.touchMove && _ctx.touchMove(...args), ["stop", "prevent"])),
      onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.touchEnd && _ctx.touchEnd(...args))
    }, [
      createElementVNode("view", _hoisted_3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.indexList, (item, index2) => {
          return openBlock(), createElementBlock("view", {
            class: "nut-elevator__bars__inner__item",
            "data-index": index2,
            key: item[_ctx.acceptKey],
            onClick: ($event) => _ctx.handleClickIndex(item[_ctx.acceptKey])
          }, toDisplayString(item[_ctx.acceptKey]), 9, _hoisted_4);
        }), 128))
      ])
    ], 32)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
