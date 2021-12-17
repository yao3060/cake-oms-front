/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { c as createComponent } from "./component.js";
import { useRouter } from "vue-router";
import { inject, reactive, getCurrentInstance, computed, watch, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, toDisplayString, createCommentVNode, createVNode } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("tabbar-item");
const _sfc_main = create({
  props: {
    tabTitle: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    href: {
      type: String,
      default: ""
    },
    num: {
      type: String,
      default: ""
    },
    activeImg: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    },
    classPrefix: {
      type: String,
      default: "nut-icon"
    },
    fontClassName: {
      type: String,
      default: "nutui-iconfont"
    },
    to: [Object, String]
  },
  setup(props, ctx) {
    const parent = inject("parent");
    const state = reactive({
      size: parent.size,
      unactiveColor: parent.unactiveColor,
      activeColor: parent.activeColor,
      active: parent.modelValue,
      index: 0
    });
    const router = useRouter();
    const relation = (child) => {
      if (child.proxy) {
        let index2 = parent.children.length;
        state.index = index2;
        parent.children.push(child.proxy);
      }
    };
    relation(getCurrentInstance());
    function change(index2) {
      parent.changeIndex(index2);
    }
    const choosed = computed(() => {
      if (parent) {
        return parent.modelValue;
      }
      return null;
    });
    watch(choosed, (value, oldValue) => {
      state.active = value;
      setTimeout(() => {
        if (parent.children[value].href) {
          window.location.href = parent.children[value].href;
        }
        if (parent.children[value].to) {
          let to = parent.children[value].to;
          router.push(to);
        }
      });
    });
    return {
      state,
      change
    };
  }
});
const _hoisted_1 = { class: "nut-tabbar-item_icon-box" };
const _hoisted_2 = {
  key: 0,
  class: "nut-tabbar-item_icon-box_tips nut-tabbar-item_icon-box_num"
};
const _hoisted_3 = {
  key: 1,
  class: "nut-tabbar-item_icon-box_tips nut-tabbar-item_icon-box_nums"
};
const _hoisted_4 = { key: 2 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["nut-tabbar-item", { "nut-tabbar-item__icon--unactive": _ctx.state.active != _ctx.state.index }]),
    style: normalizeStyle({
      color: _ctx.state.active == _ctx.state.index ? _ctx.state.activeColor : _ctx.state.unactiveColor
    }),
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.change(_ctx.state.index))
  }, [
    createElementVNode("view", _hoisted_1, [
      _ctx.num && _ctx.num <= 99 ? (openBlock(), createElementBlock("view", _hoisted_2, toDisplayString(_ctx.num), 1)) : _ctx.num && _ctx.num > 100 ? (openBlock(), createElementBlock("view", _hoisted_3, toDisplayString("99+"))) : createCommentVNode("", true),
      _ctx.icon ? (openBlock(), createElementBlock("view", _hoisted_4, [
        createVNode(_component_nut_icon, {
          class: "nut-tabbar-item_icon-box_icon",
          size: _ctx.state.size,
          name: _ctx.icon,
          "font-class-name": _ctx.fontClassName,
          "class-prefix": _ctx.classPrefix
        }, null, 8, ["size", "name", "font-class-name", "class-prefix"])
      ])) : createCommentVNode("", true),
      !_ctx.icon && _ctx.activeImg ? (openBlock(), createElementBlock("div", {
        key: 3,
        class: "nut-tabbar-item_icon-box_icon",
        style: normalizeStyle({
          backgroundImage: `url(${_ctx.state.active == _ctx.state.index ? _ctx.activeImg : _ctx.img})`,
          width: _ctx.state.size,
          height: _ctx.state.size
        })
      }, null, 4)) : createCommentVNode("", true),
      createElementVNode("view", {
        class: normalizeClass(["nut-tabbar-item_icon-box_nav-word", { "nut-tabbar-item_icon-box_big-word": !_ctx.icon && !_ctx.activeImg }])
      }, toDisplayString(_ctx.tabTitle), 3)
    ])
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
