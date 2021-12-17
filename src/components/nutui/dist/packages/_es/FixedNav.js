/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createBlock, createCommentVNode, renderSlot, createElementVNode, Fragment, renderList, toDisplayString, createVNode } from "vue";
import { c as createComponent } from "./component.js";
import overlay from "./OverLay.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("fixednav");
const _sfc_main = create({
  components: {
    [overlay.name]: overlay
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    },
    navList: {
      default: () => [],
      type: Array
    },
    activeText: {
      default: "\u6536\u8D77\u5BFC\u822A",
      type: String
    },
    unActiveText: {
      default: "\u5FEB\u901F\u5BFC\u822A",
      type: String
    },
    position: {
      default: () => {
        return {
          top: "auto",
          bottom: "auto"
        };
      },
      type: Object
    },
    type: {
      default: "right",
      type: String
    }
  },
  components: {},
  emits: ["update:visible", "selected"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        active: props.visible,
        [props.type]: true
      };
    });
    const updateValue = (value = !props.visible) => {
      emit("update:visible", value);
    };
    const selected = (item, event) => {
      emit("selected", {
        item,
        event
      });
    };
    return { classes, updateValue, selected };
  }
});
const _hoisted_1 = { class: "nut-fixednav__list" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "span" };
const _hoisted_5 = {
  key: 0,
  class: "b"
};
const _hoisted_6 = { class: "text" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_overlay = resolveComponent("nut-overlay");
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle(_ctx.position)
  }, [
    _ctx.overlay ? (openBlock(), createBlock(_component_nut_overlay, {
      key: 0,
      visible: _ctx.visible,
      "z-index": 200,
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.updateValue(false))
    }, null, 8, ["visible"])) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "list", {}, () => [
      createElementVNode("view", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.navList, (item, index2) => {
          return openBlock(), createElementBlock("view", {
            class: "nut-fixednav__list-item",
            onClick: ($event) => _ctx.selected(item, $event),
            key: item.id || index2
          }, [
            createElementVNode("img", {
              src: item.icon
            }, null, 8, _hoisted_3),
            createElementVNode("view", _hoisted_4, toDisplayString(item.text), 1),
            item.num ? (openBlock(), createElementBlock("view", _hoisted_5, toDisplayString(item.num), 1)) : createCommentVNode("", true)
          ], 8, _hoisted_2);
        }), 128))
      ])
    ]),
    createElementVNode("div", {
      class: "nut-fixednav__btn",
      onClick: _cache[1] || (_cache[1] = ($event) => _ctx.updateValue())
    }, [
      renderSlot(_ctx.$slots, "btn", {}, () => [
        createVNode(_component_nut_icon, {
          name: "left",
          color: "#fff"
        }),
        createElementVNode("view", _hoisted_6, toDisplayString(_ctx.visible ? _ctx.activeText : _ctx.unActiveText), 1)
      ])
    ])
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
