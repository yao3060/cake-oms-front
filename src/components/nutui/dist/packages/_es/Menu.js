/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, computed, reactive, provide, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, Fragment, renderList, normalizeStyle, toDisplayString, createVNode, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { u as useRect } from "./index3.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("menu");
const _sfc_main = create({
  props: {
    activeColor: {
      type: String,
      default: "#FA2C19"
    },
    overlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0
    }
  },
  setup(props, { emit, slots }) {
    const barRef = ref();
    const offset = ref(0);
    const useChildren = () => {
      const publicChildren = reactive([]);
      const internalChildren = reactive([]);
      const linkChildren2 = (value) => {
        const link = (child) => {
          if (child.proxy) {
            internalChildren.push(child);
            publicChildren.push(child.proxy);
          }
        };
        provide("menuParent", Object.assign({
          link,
          children: publicChildren,
          internalChildren
        }, value));
      };
      return {
        children: publicChildren,
        linkChildren: linkChildren2
      };
    };
    const { children, linkChildren } = useChildren();
    const opened = computed(() => children.some((item) => item.state.showWrapper));
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const updateOffset = () => {
      if (barRef.value) {
        const rect = useRect(barRef);
        offset.value = rect.bottom;
      }
    };
    linkChildren({ props, offset });
    const toggleItem = (active) => {
      children.forEach((item, index2) => {
        if (index2 === active) {
          updateOffset();
          item.toggle();
        } else if (item.state.showPopup) {
          item.toggle(false, { immediate: true });
        }
      });
    };
    return {
      toggleItem,
      children,
      opened,
      classes,
      barRef
    };
  }
});
const _hoisted_1 = ["onClick"];
const _hoisted_2 = { class: "nut-menu__title-text" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("view", {
      class: normalizeClass(["nut-menu__bar", { opened: _ctx.opened }]),
      ref: "barRef"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.children, (item, index2) => {
        return openBlock(), createElementBlock("view", {
          key: index2,
          class: normalizeClass(["nut-menu__item", { disabled: item.disabled }]),
          onClick: ($event) => !item.disabled && _ctx.toggleItem(index2),
          style: normalizeStyle({ color: item.state.showPopup ? _ctx.activeColor : "" })
        }, [
          createElementVNode("view", {
            class: normalizeClass(["nut-menu__title", { active: item.state.showPopup }])
          }, [
            createElementVNode("view", _hoisted_2, toDisplayString(item.renderTitle()), 1),
            createVNode(_component_nut_icon, {
              name: item.titleIcon,
              size: "10",
              class: "nut-menu__title-icon"
            }, null, 8, ["name"])
          ], 2)
        ], 14, _hoisted_1);
      }), 128))
    ], 2),
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
