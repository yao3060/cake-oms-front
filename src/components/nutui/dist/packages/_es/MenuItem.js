/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { reactive, computed, inject, getCurrentInstance, resolveComponent, withDirectives, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, vShow, createVNode, mergeProps, withCtx, Fragment, renderList, createBlock, createCommentVNode, toDisplayString, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import _sfc_main$1 from "./Icon.js";
import Popup from "./Popup.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./pxCheck.js";
import "./OverLay.js";
const { componentName, create } = createComponent("menu-item");
const _sfc_main = create({
  props: {
    title: String,
    options: {
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: null,
    cols: {
      type: Number,
      default: 1
    },
    titleIcon: {
      type: String,
      default: "down-arrow"
    }
  },
  components: {
    [_sfc_main$1.name]: _sfc_main$1,
    [Popup.name]: Popup
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, slots }) {
    const state = reactive({
      showPopup: false,
      transition: true,
      showWrapper: false,
      isShowPlaceholderElement: false
    });
    const useParent = () => {
      const parent2 = inject("menuParent", null);
      if (parent2) {
        const instance = getCurrentInstance();
        const { link } = parent2;
        link(instance);
        return {
          parent: parent2
        };
      }
    };
    const { parent } = useParent();
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const toggle = (show = !state.showPopup, options = {}) => {
      if (show === state.showPopup) {
        return;
      }
      state.showPopup = show;
      state.isShowPlaceholderElement = show;
      if (show) {
        state.showWrapper = true;
      }
    };
    const renderTitle = () => {
      var _a;
      if (props.title) {
        return props.title;
      }
      const match = (_a = props.options) == null ? void 0 : _a.find((option) => option.value === props.modelValue);
      return match ? match.text : "";
    };
    const onClick = (option) => {
      state.showPopup = false;
      state.isShowPlaceholderElement = false;
      if (option.value !== props.modelValue) {
        emit("update:modelValue", option.value);
        emit("change", option.value);
      }
    };
    const handleClose = () => {
      state.showWrapper = false;
      state.isShowPlaceholderElement = false;
    };
    const handleClickOutside = () => {
      state.showPopup = false;
    };
    return {
      classes,
      renderTitle,
      state,
      parent,
      toggle,
      onClick,
      handleClose,
      handleClickOutside
    };
  }
});
const _hoisted_1 = { class: "nut-menu-item__content" };
const _hoisted_2 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  const _component_nut_popup = resolveComponent("nut-popup");
  return withDirectives((openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    withDirectives(createElementVNode("div", {
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClickOutside && _ctx.handleClickOutside(...args)),
      class: "placeholder-element",
      style: normalizeStyle({ height: _ctx.parent.offset.value + "px" })
    }, null, 4), [
      [vShow, _ctx.state.isShowPlaceholderElement]
    ]),
    createVNode(_component_nut_popup, mergeProps({
      style: { top: _ctx.parent.offset.value + "px" },
      overlayStyle: { top: _ctx.parent.offset.value + "px" }
    }, _ctx.$attrs, {
      visible: _ctx.state.showPopup,
      "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => _ctx.state.showPopup = $event),
      position: "top",
      duration: _ctx.parent.props.duration,
      "pop-class": "nut-menu__pop",
      overlayClass: "nut-menu__overlay",
      overlay: _ctx.parent.props.overlay,
      onClosed: _ctx.handleClose,
      isWrapTeleport: false
    }), {
      default: withCtx(() => [
        createElementVNode("view", _hoisted_1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, index2) => {
            return openBlock(), createElementBlock("view", {
              key: index2,
              class: normalizeClass(["nut-menu-item__option", { active: option.value === _ctx.modelValue }]),
              style: normalizeStyle({ "flex-basis": 100 / _ctx.cols + "%" }),
              onClick: ($event) => _ctx.onClick(option)
            }, [
              option.value === _ctx.modelValue ? (openBlock(), createBlock(_component_nut_icon, {
                key: 0,
                name: "Check",
                color: _ctx.parent.props.activeColor
              }, null, 8, ["color"])) : createCommentVNode("", true),
              createElementVNode("view", {
                style: normalizeStyle({ color: option.value === _ctx.modelValue ? _ctx.parent.props.activeColor : "" })
              }, toDisplayString(option.text), 5)
            ], 14, _hoisted_2);
          }), 128)),
          renderSlot(_ctx.$slots, "default")
        ])
      ]),
      _: 3
    }, 16, ["style", "overlayStyle", "visible", "duration", "overlay", "onClosed"])
  ], 2)), [
    [vShow, _ctx.state.showWrapper]
  ]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
