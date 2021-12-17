/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { inject, getCurrentInstance, onUnmounted, computed, ref, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, renderSlot, Fragment, createBlock, toDisplayString } from "vue";
import { useRouter } from "vue-router";
import { c as createComponent } from "./component.js";
import { p as pxCheck } from "./pxCheck.js";
import { G as GRID_KEY } from "./common.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
function useInject(key) {
  const parent = inject(key, null);
  if (parent) {
    const instance = getCurrentInstance();
    const { add, remove, internalChildren } = parent;
    add(instance);
    onUnmounted(() => remove(instance));
    const index2 = computed(() => internalChildren.indexOf(instance));
    return {
      parent,
      index: index2
    };
  }
  return {
    parent: null,
    index: ref(-1)
  };
}
const { create, componentName } = createComponent("grid-item");
const _sfc_main = create({
  props: {
    text: {
      type: String
    },
    icon: {
      type: String
    },
    iconSize: {
      type: [Number, String]
    },
    iconColor: {
      type: String
    },
    to: {
      type: [String, Object]
    },
    url: {
      type: String,
      default: ""
    },
    replace: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const Parent = useInject(GRID_KEY);
    if (!Parent.parent)
      return;
    const index2 = Parent.index;
    const parent = Parent.parent.props;
    const rootClass = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const rootStyle = computed(() => {
      const style = {
        flexBasis: `${100 / +parent.columnNum}%`
      };
      if (parent.square) {
        style.paddingTop = `${100 / +parent.columnNum}%`;
      } else if (parent.gutter) {
        style.paddingRight = pxCheck(parent.gutter);
        if (index2.value >= parent.columnNum) {
          style.marginTop = pxCheck(parent.gutter);
        }
      }
      return style;
    });
    const contentClass = computed(() => {
      const prefixCls = `${componentName}__content`;
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}--border`]: parent.border,
        [`${prefixCls}--surround`]: parent.border && parent.gutter,
        [`${prefixCls}--center`]: parent.center,
        [`${prefixCls}--square`]: parent.square,
        [`${prefixCls}--reverse`]: parent.reverse,
        [`${prefixCls}--${parent.direction}`]: !!parent.direction,
        [`${prefixCls}--clickable`]: parent.clickable || props.to || props.url
      };
    });
    const iconProps = computed(() => {
      return {
        name: props.icon,
        size: props.iconSize || parent.iconSize,
        color: props.iconColor || parent.iconColor
      };
    });
    const router = useRouter();
    const handleClick = (event) => {
      emit("click", event);
      if (props.to && router) {
        router[props.replace ? "replace" : "push"](props.to);
      } else if (props.url) {
        props.replace ? location.replace(props.url) : location.href = props.url;
      }
    };
    return {
      rootClass,
      rootStyle,
      contentClass,
      iconProps,
      handleClick
    };
  }
});
const _hoisted_1 = {
  key: 3,
  class: "nut-grid-item__text"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.rootClass),
    style: normalizeStyle(_ctx.rootStyle),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    createElementVNode("view", {
      class: normalizeClass(_ctx.contentClass)
    }, [
      _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        _ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 0 }) : (openBlock(), createBlock(_component_nut_icon, {
          key: 1,
          name: _ctx.iconProps.name,
          size: _ctx.iconProps.size,
          color: _ctx.iconProps.color
        }, null, 8, ["name", "size", "color"])),
        _ctx.$slots.text ? renderSlot(_ctx.$slots, "text", { key: 2 }) : (openBlock(), createElementBlock("view", _hoisted_1, toDisplayString(_ctx.text), 1))
      ], 64))
    ], 2)
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
