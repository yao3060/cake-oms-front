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
import { ref, reactive, computed, onMounted, watch, toRefs, openBlock, createElementBlock, normalizeStyle, createElementVNode, Fragment, renderList, toDisplayString, toRaw, resolveComponent, normalizeClass, createVNode, withCtx } from "vue";
import { c as createComponent } from "./component.js";
import { u as useTouch } from "./index2.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import Popup, { popupProps } from "./Popup.js";
import "./OverLay.js";
import "./Icon.js";
import "./pxCheck.js";
const commonProps = {
  listData: {
    type: Array,
    default: () => {
      return [];
    }
  },
  readonly: {
    type: Boolean,
    default: false
  },
  visibleItemCount: {
    type: [Number, String],
    default: 7
  },
  defaultIndex: {
    type: [Number, String],
    default: 0
  },
  itemHeight: {
    type: [Number, String],
    default: 35
  }
};
const MOMENTUM_LIMIT_DISTANCE = 15;
const MOMENTUM_LIMIT_TIME = 300;
const DEFAULT_DURATION = 200;
const { create: create$1 } = createComponent("picker-column");
function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function stopPropagation(event) {
  event.stopPropagation();
}
function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
}
function getElementTranslateY(element) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  const translateY = transform.slice(7, transform.length - 1).split(", ")[5];
  return Number(translateY);
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isOptionDisabled(option) {
  return isObject(option) && option.disabled;
}
const _sfc_main$1 = create$1({
  props: __spreadValues({
    dataType: String
  }, commonProps),
  emits: ["click", "change"],
  setup(props, { emit }) {
    const wrapper = ref();
    const state = reactive({
      index: props.defaultIndex,
      offset: 0,
      duration: 0,
      options: props.listData,
      moving: false,
      startOffset: 0,
      touchStartTime: 0,
      momentumOffset: 0,
      transitionEndTrigger: null
    });
    const touch = useTouch();
    const wrapperStyle = computed(() => ({
      transform: `translate3d(0, ${state.offset + baseOffset()}px, 0)`,
      transitionDuration: `${state.duration}ms`,
      transitionProperty: state.duration ? "all" : "none"
    }));
    const getIndexByOffset = (offset) => {
      return range(Math.round(-offset / +props.itemHeight), 0, state.options.length - 1);
    };
    const baseOffset = () => {
      return +props.itemHeight * (+props.visibleItemCount - 1) / 2;
    };
    const stopMomentum = () => {
      state.moving = false;
      state.duration = 0;
      if (state.transitionEndTrigger) {
        state.transitionEndTrigger();
        state.transitionEndTrigger = null;
      }
    };
    const adjustIndex = (index) => {
      index = range(index, 0, state.options.length);
      for (let i = index; i < state.options.length; i++) {
        if (!isOptionDisabled(state.options[i]))
          return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!isOptionDisabled(state.options[i]))
          return i;
      }
    };
    const setIndex = (index, emitChange = false) => {
      index = adjustIndex(index) || 0;
      const offset = -index * +props.itemHeight;
      const trigger = () => {
        if (index !== state.index) {
          state.index = index;
          if (emitChange) {
            emit("change", index);
          }
        }
      };
      if (state.moving && offset !== state.offset) {
        state.transitionEndTrigger = trigger;
      } else {
        trigger();
      }
      state.offset = offset;
    };
    const momentum = (distance, duration) => {
      const speed = Math.abs(distance / duration);
      distance = state.offset + speed / 0.03 * (distance < 0 ? -1 : 1);
      const index = getIndexByOffset(distance);
      setIndex(index, true);
    };
    const onTouchStart = (event) => {
      if (props.readonly) {
        return;
      }
      touch.start(event);
      if (state.moving) {
        const translateY = getElementTranslateY(wrapper.value);
        state.offset = Math.min(0, translateY - baseOffset());
        state.startOffset = state.offset;
      } else {
        state.startOffset = state.offset;
      }
      state.duration = 0;
      state.touchStartTime = Date.now();
      state.momentumOffset = state.startOffset;
      state.transitionEndTrigger = null;
    };
    const onTouchMove = (event) => {
      if (props.readonly) {
        return;
      }
      state.moving = true;
      touch.move(event);
      if (touch.isVertical()) {
        state.moving = true;
        preventDefault(event, true);
      }
      const moveOffset = state.startOffset + touch.deltaY.value;
      if (moveOffset > props.itemHeight) {
        state.offset = props.itemHeight;
      } else {
        state.offset = state.startOffset + touch.deltaY.value;
      }
      const now = Date.now();
      if (now - state.touchStartTime > MOMENTUM_LIMIT_TIME) {
        state.touchStartTime = now;
        state.momentumOffset = state.offset;
      }
    };
    const onTouchEnd = () => {
      const index = getIndexByOffset(state.offset);
      state.duration = DEFAULT_DURATION;
      setIndex(index, true);
      const distance = state.offset - state.momentumOffset;
      const duration = Date.now() - state.touchStartTime;
      const allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
      if (allowMomentum) {
        momentum(distance, duration);
        return;
      }
    };
    onMounted(() => {
      setIndex(+props.defaultIndex);
    });
    watch(() => props.listData, (val) => {
      if (val) {
        state.options = val;
      }
    });
    watch(() => props.defaultIndex, (val) => {
      setIndex(+val);
    });
    return __spreadProps(__spreadValues({}, toRefs(state)), {
      wrapper,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      wrapperStyle,
      stopMomentum,
      columns: state.options,
      height: Number(props.visibleItemCount) * +props.itemHeight
    });
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: "nut-picker__content",
    style: normalizeStyle({ height: _ctx.height + "px" }),
    onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.onTouchStart && _ctx.onTouchStart(...args)),
    onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.onTouchMove && _ctx.onTouchMove(...args)),
    onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args)),
    onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args)),
    onTransitionend: _cache[4] || (_cache[4] = (...args) => _ctx.stopMomentum && _ctx.stopMomentum(...args))
  }, [
    createElementVNode("view", {
      class: "nut-picker__wrapper",
      ref: "wrapper",
      style: normalizeStyle(_ctx.wrapperStyle)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (item, index) => {
        return openBlock(), createElementBlock("view", {
          class: "nut-picker__item",
          key: index
        }, toDisplayString(_ctx.dataType === "cascade" ? item.text : item), 1);
      }), 128))
    ], 4)
  ], 36);
}
var column = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const { create, componentName } = createComponent("picker");
const _sfc_main = create({
  components: {
    [column.name]: column,
    [Popup.name]: Popup
  },
  props: __spreadValues(__spreadProps(__spreadValues({}, popupProps), {
    title: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    okText: {
      type: String,
      default: "\u786E\u5B9A"
    }
  }), commonProps),
  emits: ["close", "change", "confirm", "update:visible"],
  setup(props, { emit }) {
    const childrenKey = "children";
    const valuesKey = "values";
    const state = reactive({
      show: false,
      formattedColumns: props.listData,
      defaultIndex: props.defaultIndex
    });
    let _defaultIndex = props.defaultIndex;
    let defaultIndexList = [];
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const top = computed(() => {
      return Number(+props.visibleItemCount - 1) / 2 * +props.itemHeight;
    });
    const height = computed(() => {
      return Number(props.visibleItemCount) * +props.itemHeight;
    });
    const dataType = computed(() => {
      const firstColumn = state.formattedColumns[0];
      if (typeof firstColumn === "object") {
        if (firstColumn[childrenKey]) {
          return "cascade";
        } else if (firstColumn == null ? void 0 : firstColumn[valuesKey]) {
          addDefaultIndexList(props.listData);
          return "multipleColumns";
        }
      }
      return "text";
    });
    const columnList = computed(() => {
      if (dataType.value === "text") {
        return [
          { values: state.formattedColumns, defaultIndex: state.defaultIndex }
        ];
      } else if (dataType.value === "multipleColumns") {
        return state.formattedColumns;
      } else if (dataType.value === "cascade") {
        return formatCascade(state.formattedColumns, state.defaultIndex);
      }
      return state.formattedColumns;
    });
    const addDefaultIndexList = (listData) => {
      defaultIndexList = [];
      listData.forEach((res) => {
        defaultIndexList.push(res.defaultIndex || 0);
      });
    };
    const formatCascade = (listData, defaultIndex) => {
      const formatted = [];
      let children = listData;
      children.defaultIndex = defaultIndex;
      while (children) {
        formatted.push({
          values: children,
          defaultIndex: children.defaultIndex || 0
        });
        children = children == null ? void 0 : children[children.defaultIndex || 0].children;
      }
      addDefaultIndexList(formatted);
      return formatted;
    };
    const getCascadeData = (listData, defaultIndex) => {
      var _a;
      let arr = listData;
      arr.defaultIndex = defaultIndex;
      const dataList = [];
      while (arr) {
        const item = arr[(_a = arr.defaultIndex) != null ? _a : 0];
        dataList.push(item.text);
        arr = item.children;
      }
      return dataList;
    };
    const close = () => {
      emit("close");
      emit("update:visible", false);
    };
    const changeHandler = (columnIndex, dataIndex) => {
      if (dataType.value === "cascade") {
        let cursor = state.formattedColumns;
        if (columnIndex === 0) {
          state.defaultIndex = dataIndex;
        }
        let i = 0;
        while (cursor) {
          if (i === columnIndex) {
            cursor.defaultIndex = dataIndex;
          } else if (i > columnIndex) {
            cursor.defaultIndex = 0;
          }
          cursor = cursor[cursor.defaultIndex || 0].children;
          i++;
        }
      } else if (dataType.value === "text") {
        _defaultIndex = dataIndex;
      } else if (dataType.value === "multipleColumns") {
        defaultIndexList[columnIndex] = dataIndex;
        const val = defaultIndexList.map((res, i) => toRaw(state.formattedColumns)[i].values[res]);
        emit("change", val);
      }
    };
    const confirm = () => {
      if (dataType.value === "text") {
        state.defaultIndex = _defaultIndex;
        emit("confirm", state.formattedColumns[_defaultIndex]);
      } else if (dataType.value === "multipleColumns") {
        for (let i = 0; i < defaultIndexList.length; i++) {
          state.formattedColumns[i].defaultIndex = defaultIndexList[i];
        }
        const checkedArr = toRaw(state.formattedColumns).map((res) => res.values && res.values[res.defaultIndex]);
        emit("confirm", checkedArr);
      } else if (dataType.value === "cascade") {
        emit("confirm", getCascadeData(toRaw(state.formattedColumns), state.defaultIndex));
      }
      emit("update:visible", false);
    };
    watch(() => props.visible, (val) => {
      state.show = val;
    });
    watch(() => props.listData, (val) => {
      state.formattedColumns = val;
    });
    return __spreadProps(__spreadValues({
      classes
    }, toRefs(state)), {
      column,
      dataType,
      columnList,
      top,
      height,
      close,
      changeHandler,
      confirm
    });
  }
});
const _hoisted_1 = { class: "nut-picker__bar" };
const _hoisted_2 = { class: "nut-picker__column" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_picker_column = resolveComponent("nut-picker-column");
  const _component_nut_popup = resolveComponent("nut-popup");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createVNode(_component_nut_popup, {
      position: "bottom",
      style: normalizeStyle({ height: _ctx.height + 56 + "px" }),
      visible: _ctx.show,
      "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => _ctx.show = $event),
      teleport: _ctx.teleport,
      "lock-scroll": _ctx.lockScroll,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      onClose: _ctx.close
    }, {
      default: withCtx(() => [
        createElementVNode("view", _hoisted_1, [
          createElementVNode("view", {
            class: "nut-picker__left nut-picker__button",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args))
          }, toDisplayString(_ctx.cancelText), 1),
          createElementVNode("view", null, toDisplayString(_ctx.title), 1),
          createElementVNode("view", {
            class: "nut-picker__button",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.confirm())
          }, toDisplayString(_ctx.okText), 1)
        ]),
        createElementVNode("view", _hoisted_2, [
          createElementVNode("view", {
            class: "nut-picker__mask",
            style: normalizeStyle({ backgroundSize: `100% ${_ctx.top}px` })
          }, null, 4),
          createElementVNode("view", {
            class: "nut-picker__hairline",
            style: normalizeStyle({ top: ` ${_ctx.top}px` })
          }, null, 4),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columnList, (item, columnIndex) => {
            return openBlock(), createElementBlock("view", {
              class: "nut-picker__columnitem",
              key: columnIndex
            }, [
              createVNode(_component_nut_picker_column, {
                "list-data": item.values,
                readonly: _ctx.readonly,
                "default-index": item.defaultIndex,
                "visible-item-count": _ctx.visibleItemCount,
                "item-height": _ctx.itemHeight,
                "data-type": _ctx.dataType,
                onChange: (dataIndex) => {
                  _ctx.changeHandler(columnIndex, dataIndex);
                }
              }, null, 8, ["list-data", "readonly", "default-index", "visible-item-count", "item-height", "data-type", "onChange"])
            ]);
          }), 128))
        ])
      ]),
      _: 1
    }, 8, ["style", "visible", "teleport", "lock-scroll", "close-on-click-overlay", "onClose"])
  ], 2);
}
var picker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { picker as default };
