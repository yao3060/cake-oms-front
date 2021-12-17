/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, normalizeStyle, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("navbar");
const _sfc_main = create({
  props: {
    leftShow: { type: Boolean, default: true },
    title: { type: String, default: "" },
    titIcon: { type: String, default: "" },
    tabs: {
      type: Array,
      defaul: () => {
        return [];
      }
    },
    icon: { type: String, default: "" },
    desc: { type: String, default: "" },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },
  emits: [
    "click",
    "on-click-back",
    "on-click-title",
    "on-click-right",
    "on-click-desc",
    "on-click-icon",
    "on-click-more",
    "on-click-clear",
    "on-click-send",
    "on-click-slot",
    "on-click-slot-send",
    "switch-tab"
  ],
  setup(props, { emit }) {
    const activeIndex = ref(props.defaultIndex);
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    function switchTitle(id, name) {
      activeIndex.value = id;
      console.log(id);
      emit("switch-tab", activeIndex.value, name);
    }
    function handleLeft() {
      emit("on-click-back");
    }
    function handleCenter() {
      emit("on-click-title");
    }
    function handleCenterIcon() {
      emit("on-click-icon");
    }
    function handleClear() {
      emit("on-click-clear");
    }
    function handleSend() {
      emit("on-click-send");
    }
    function handleSlot() {
      emit("on-click-slot");
    }
    function handleSends() {
      emit("on-click-slot-send");
    }
    return {
      classes,
      handleLeft,
      handleCenter,
      handleCenterIcon,
      handleClear,
      handleSend,
      handleSlot,
      handleSends,
      switchTitle,
      activeIndex
    };
  }
});
const _hoisted_1 = { class: "nut-navbar__left" };
const _hoisted_2 = { class: "tab-title" };
const _hoisted_3 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("view", _hoisted_1, [
      _ctx.leftShow ? (openBlock(), createBlock(_component_nut_icon, {
        key: 0,
        color: "#979797",
        name: "left",
        onClick: _ctx.handleLeft
      }, null, 8, ["onClick"])) : createCommentVNode("", true)
    ]),
    _ctx.title || _ctx.titIcon || _ctx.tabs ? (openBlock(), createElementBlock("view", {
      key: 0,
      class: normalizeClass(["nut-navbar__title", { icon: _ctx.icon }])
    }, [
      _ctx.title ? (openBlock(), createElementBlock("view", {
        key: 0,
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleCenter && _ctx.handleCenter(...args))
      }, toDisplayString(_ctx.title), 1)) : createCommentVNode("", true),
      _ctx.titIcon ? (openBlock(), createBlock(_component_nut_icon, {
        key: 1,
        class: "icon",
        name: _ctx.titIcon,
        onClick: _ctx.handleCenterIcon
      }, null, 8, ["name", "onClick"])) : createCommentVNode("", true),
      createElementVNode("view", _hoisted_2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, (item, index2) => {
          return openBlock(), createElementBlock("view", {
            class: normalizeClass([
              "tab-title-box",
              { "nut-tab-active": _ctx.activeIndex == item.id || _ctx.activeIndex == index2 }
            ]),
            onClick: ($event) => _ctx.switchTitle(item.id, item.name),
            key: item.id
          }, toDisplayString(item.name), 11, _hoisted_3);
        }), 128))
      ])
    ], 2)) : createCommentVNode("", true),
    _ctx.desc || _ctx.icon ? (openBlock(), createElementBlock("view", {
      key: 1,
      class: normalizeClass(["nut-navbar__right", { icon: _ctx.icon }])
    }, [
      _ctx.desc ? (openBlock(), createElementBlock("view", {
        key: 0,
        style: normalizeStyle({ "text-align": _ctx.descTextAlign }),
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClear && _ctx.handleClear(...args))
      }, toDisplayString(_ctx.desc), 5)) : createCommentVNode("", true),
      _ctx.icon ? (openBlock(), createElementBlock("view", {
        key: 1,
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleSends && _ctx.handleSends(...args))
      }, [
        renderSlot(_ctx.$slots, "icons")
      ])) : createCommentVNode("", true),
      createElementVNode("view", null, [
        _ctx.icon ? (openBlock(), createBlock(_component_nut_icon, {
          key: 0,
          class: "rightIcon",
          name: _ctx.icon,
          onClick: _ctx.handleSend
        }, null, 8, ["name", "onClick"])) : createCommentVNode("", true)
      ])
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
