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
import { inject, reactive, computed, getCurrentInstance, ref, watch, onMounted, toRefs, nextTick, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, createBlock, createCommentVNode, renderSlot, normalizeStyle } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create, componentName } = createComponent("collapse-item");
const _sfc_main = create({
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: [Number, String],
      default: -1,
      required: true
    },
    collapseRef: {
      type: Object
    }
  },
  setup(props) {
    const collapse = inject("collapseParent");
    const parent = reactive(collapse);
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}-icon`]: parent.props.icon
      };
    });
    const relation = (child) => {
      if (child.proxy) {
        parent.children.push(child.proxy);
      }
    };
    relation(getCurrentInstance());
    const proxyData = reactive({
      icon: parent.props.icon,
      iconSize: parent.props.iconSize,
      iconColor: parent.props.iconColor,
      openExpanded: false,
      iconStyle: {
        transform: "rotate(0deg)",
        marginTop: parent.props.iconHeght ? "-" + parent.props.iconHeght / 2 + "px" : "-10px"
      }
    });
    const titleIconStyle = reactive({
      titleIcon: parent.props.titleIcon,
      titleIconSize: parent.props.titleIconSize,
      titleIconColor: parent.props.titleIconColor,
      titleIconPosition: parent.props.titleIconPosition
    });
    const wrapperRef = ref(null);
    const contentRef = ref(null);
    const onTransitionEnd = () => {
      const wrapperRefEle = document.getElementsByClassName("collapse-wrapper")[0];
      wrapperRefEle.style.willChange = "auto";
    };
    const animation = () => {
      const wrapperRefEle = wrapperRef.value;
      const contentRefEle = contentRef.value;
      if (!wrapperRefEle || !contentRefEle) {
        return;
      }
      const offsetHeight = contentRefEle.offsetHeight;
      if (offsetHeight) {
        const contentHeight = `${offsetHeight}px`;
        wrapperRefEle.style.willChange = "height";
        wrapperRefEle.style.height = !proxyData.openExpanded ? 0 : contentHeight;
        if (parent.props.icon && !proxyData.openExpanded) {
          proxyData.iconStyle["transform"] = "rotate(0deg)";
        } else {
          proxyData.iconStyle["transform"] = "rotate(" + parent.props.rotate + "deg)";
        }
      }
      if (!proxyData.openExpanded) {
        onTransitionEnd();
      }
    };
    const open = () => {
      proxyData.openExpanded = !proxyData.openExpanded;
      animation();
    };
    const defaultOpen = () => {
      open();
      if (parent.props.icon) {
        proxyData["iconStyle"]["transform"] = "rotate(" + parent.props.rotate + "deg)";
      }
    };
    const currentName = computed(() => props.name);
    const toggleOpen = () => {
      if (parent.props.accordion) {
        parent.children.forEach((item, index2) => {
          if (currentName.value == item.name) {
            item.changeOpen(!item.openExpanded);
          } else {
            item.changeOpen(false);
            item.animation();
          }
        });
        nextTick(() => {
          parent.changeVal(currentName.value);
          animation();
        });
      } else {
        parent.changeValAry(props.name);
        open();
      }
    };
    const changeOpen = (bol) => {
      proxyData.openExpanded = bol;
    };
    const expanded = computed(() => {
      if (parent) {
        return parent.isExpanded(props.name);
      }
      return null;
    });
    watch(expanded, (value, oldValue) => {
      if (value) {
        proxyData.openExpanded = true;
      }
    });
    onMounted(() => {
      const { name } = props;
      const active = parent && parent.props.active;
      if (typeof active == "number" || typeof active == "string") {
        if (name == active) {
          defaultOpen();
        }
      } else if (Object.values(active) instanceof Array) {
        const f = Object.values(active).filter((item) => item == name);
        if (f.length > 0) {
          defaultOpen();
        }
      }
    });
    return __spreadProps(__spreadValues(__spreadValues(__spreadValues({
      classes
    }, toRefs(proxyData)), toRefs(parent.props)), toRefs(titleIconStyle)), {
      wrapperRef,
      contentRef,
      open,
      toggleOpen,
      changeOpen,
      animation
    });
  }
});
const _hoisted_1 = { class: "collapse-title" };
const _hoisted_2 = { class: "collapse-title-value" };
const _hoisted_3 = ["innerHTML"];
const _hoisted_4 = {
  key: 0,
  class: "subTitle"
};
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = {
  class: "collapse-wrapper",
  ref: "wrapperRef"
};
const _hoisted_7 = {
  class: "collapse-content",
  ref: "contentRef"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("view", {
      class: normalizeClass(["collapse-item", { "item-expanded": _ctx.openExpanded }, { "nut-collapse-item-disabled": _ctx.disabled }]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleOpen && _ctx.toggleOpen(...args))
    }, [
      createElementVNode("view", _hoisted_1, [
        createElementVNode("view", null, [
          createElementVNode("view", _hoisted_2, [
            _ctx.titleIcon ? (openBlock(), createBlock(_component_nut_icon, {
              key: 0,
              name: _ctx.titleIcon,
              size: _ctx.titleIconSize,
              color: _ctx.titleIconColor,
              class: normalizeClass([_ctx.titleIconPosition == "left" ? "titleIconLeft" : "titleIconRight"])
            }, null, 8, ["name", "size", "color", "class"])) : createCommentVNode("", true),
            _ctx.$slots.mTitle ? renderSlot(_ctx.$slots, "mTitle", { key: 1 }) : (openBlock(), createElementBlock("view", {
              key: 2,
              innerHTML: _ctx.title,
              class: "collapse-icon-title"
            }, null, 8, _hoisted_3))
          ])
        ])
      ]),
      _ctx.$slots.sTitle ? (openBlock(), createElementBlock("view", _hoisted_4, [
        renderSlot(_ctx.$slots, "sTitle")
      ])) : (openBlock(), createElementBlock("view", {
        key: 1,
        innerHTML: _ctx.subTitle,
        class: "subTitle"
      }, null, 8, _hoisted_5)),
      _ctx.icon ? (openBlock(), createBlock(_component_nut_icon, {
        key: 2,
        name: _ctx.icon,
        size: _ctx.iconSize,
        color: _ctx.iconColor,
        class: normalizeClass(["collapse-icon", { "col-expanded": _ctx.openExpanded }, { "collapse-icon-disabled": _ctx.disabled }]),
        style: normalizeStyle(_ctx.iconStyle)
      }, null, 8, ["name", "size", "color", "class", "style"])) : createCommentVNode("", true)
    ], 2),
    createElementVNode("view", _hoisted_6, [
      createElementVNode("view", _hoisted_7, [
        renderSlot(_ctx.$slots, "default")
      ], 512)
    ], 512)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
