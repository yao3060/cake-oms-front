var __defProp = Object.defineProperty;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { p as pxCheck } from "./pxCheck.js";
import { provide, computed, ref, watch, onMounted, onActivated, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, renderSlot, Fragment, renderList, createCommentVNode, createVNode, toDisplayString } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("tabs");
class Title {
  constructor() {
    __publicField(this, "title", "");
    __publicField(this, "titleSlot");
    __publicField(this, "paneKey", "");
    __publicField(this, "disabled", false);
  }
}
const _sfc_main = create({
  props: {
    modelValue: {
      type: [String, Number],
      default: 0
    },
    color: {
      type: String,
      default: ""
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    size: {
      type: String,
      default: "normal"
    },
    type: {
      type: String,
      default: "line"
    },
    titleScroll: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: ""
    },
    animatedTime: {
      type: [Number, String],
      default: 300
    },
    titleGutter: {
      type: [Number, String],
      default: 0
    }
  },
  components: {},
  emits: ["update:modelValue", "click", "change"],
  setup(props, { emit, slots }) {
    provide("activeKey", { activeKey: computed(() => props.modelValue) });
    const titles = ref([]);
    const currentIndex = ref(props.modelValue || 0);
    const renderTitles = (vnodes) => {
      vnodes.forEach((vnode, index2) => {
        var _a, _b, _c, _d, _e;
        let type = vnode.type;
        type = type.name || type;
        if (type == "nut-tabpane") {
          let title = new Title();
          if (((_a = vnode.props) == null ? void 0 : _a.title) || ((_b = vnode.props) == null ? void 0 : _b["pane-key"])) {
            title.title = (_c = vnode.props) == null ? void 0 : _c.title;
            title.paneKey = ((_d = vnode.props) == null ? void 0 : _d["pane-key"]) || index2;
            title.disabled = (_e = vnode.props) == null ? void 0 : _e.disabled;
          }
          titles.value.push(title);
        } else {
          renderTitles(vnode.children);
        }
      });
    };
    const init = (vnodes = slots.default()) => {
      titles.value = [];
      if (vnodes.length) {
        renderTitles(vnodes);
      }
    };
    watch(() => slots.default(), (vnodes) => {
      init(vnodes);
    });
    watch(() => props.modelValue, (value) => {
      let index2 = titles.value.findIndex((item) => item.paneKey == value);
      if (index2 == -1) {
        console.error("[NutUI] <Tabs> \u8BF7\u68C0\u67E5 v-model \u503C\u662F\u5426\u4E3A paneKey ,\u5982 paneKey \u672A\u8BBE\u7F6E\uFF0C\u8BF7\u91C7\u7528\u4E0B\u6807\u63A7\u5236 .");
      } else {
        currentIndex.value = index2;
      }
    });
    onMounted(init);
    onActivated(init);
    const contentStyle = computed(() => {
      return {
        transform: props.direction == "horizontal" ? `translate3d(-${currentIndex.value * 100}%, 0, 0)` : `translate3d( 0,-${currentIndex.value * 100}%, 0)`,
        transitionDuration: `${props.animatedTime}ms`
      };
    });
    const tabsNavStyle = computed(() => {
      return {
        background: props.background
      };
    });
    const tabsActiveStyle = computed(() => {
      return {
        color: props.type == "smile" ? props.color : "",
        background: props.type == "line" ? props.color : ""
      };
    });
    const titleStyle = computed(() => {
      return {
        marginLeft: pxCheck(props.titleGutter),
        marginRight: pxCheck(props.titleGutter)
      };
    });
    const methods = {
      tabChange: (item, index2) => {
        emit("click", item);
        if (item.disabled) {
          return;
        }
        currentIndex.value = index2;
        emit("update:modelValue", item.paneKey);
        emit("change", item);
      }
    };
    return __spreadValues({
      titles,
      contentStyle,
      tabsNavStyle,
      tabsActiveStyle,
      titleStyle
    }, methods);
  }
});
const _hoisted_1 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(["nut-tabs", [_ctx.direction]])
  }, [
    createElementVNode("view", {
      class: normalizeClass(["nut-tabs__titles", { [_ctx.type]: _ctx.type, scrollable: _ctx.titleScroll, [_ctx.size]: _ctx.size }]),
      style: normalizeStyle(_ctx.tabsNavStyle)
    }, [
      _ctx.$slots.titles ? renderSlot(_ctx.$slots, "titles", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.titles, (item, index2) => {
        return openBlock(), createElementBlock("view", {
          class: normalizeClass(["nut-tabs__titles-item", { active: item.paneKey == _ctx.modelValue, disabled: item.disabled }]),
          style: normalizeStyle(_ctx.titleStyle),
          onClick: ($event) => _ctx.tabChange(item, index2),
          key: item.paneKey
        }, [
          _ctx.type == "line" ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: "nut-tabs__titles-item__line",
            style: normalizeStyle(_ctx.tabsActiveStyle)
          }, null, 4)) : createCommentVNode("", true),
          _ctx.type == "smile" ? (openBlock(), createElementBlock("view", {
            key: 1,
            class: "nut-tabs__titles-item__smile",
            style: normalizeStyle(_ctx.tabsActiveStyle)
          }, [
            createVNode(_component_nut_icon, {
              color: _ctx.color,
              name: "joy-smile"
            }, null, 8, ["color"])
          ], 4)) : createCommentVNode("", true),
          createElementVNode("view", {
            class: normalizeClass(["nut-tabs__titles-item__text", { ellipsis: _ctx.ellipsis && !_ctx.titleScroll && _ctx.direction == "horizontal" }])
          }, toDisplayString(item.title), 3)
        ], 14, _hoisted_1);
      }), 128))
    ], 6),
    createElementVNode("view", {
      class: "nut-tabs__content",
      style: normalizeStyle(_ctx.contentStyle)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 4)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
