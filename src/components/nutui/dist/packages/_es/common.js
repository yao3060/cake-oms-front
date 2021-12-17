/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { provide, shallowReactive, getCurrentInstance, markRaw, isVNode, computed, h } from "vue";
import { c as createComponent } from "./component.js";
import { p as pxCheck } from "./pxCheck.js";
function flattenVNodes(children, childName) {
  const result = [];
  const traverse = (children2) => {
    if (!Array.isArray(children2))
      return;
    children2.forEach((child) => {
      var _a;
      if (!isVNode(child))
        return;
      if (childName) {
        if (child.type && child.type.name === childName) {
          result.push(child);
          return;
        }
      } else {
        result.push(child);
      }
      if ((_a = child.component) == null ? void 0 : _a.subTree) {
        traverse(child.component.subTree.children);
      }
      if (child.children) {
        traverse(child.children);
      }
    });
  };
  traverse(children);
  return result;
}
function sortChildren(parent, internalChildren, childName) {
  const vnodes = flattenVNodes(parent.subTree.children, childName);
  internalChildren.sort((a, b) => {
    return vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode);
  });
}
function useProvide(key, childName) {
  const internalChildren = shallowReactive([]);
  const parent = getCurrentInstance();
  const add = (child) => {
    if (!child.proxy)
      return;
    internalChildren.push(markRaw(child));
    sortChildren(parent, internalChildren, childName);
  };
  const remove = (child) => {
    internalChildren.splice(internalChildren.indexOf(markRaw(child)), 1);
  };
  const extend = Object.assign;
  return (value) => {
    provide(key, extend({
      add,
      remove,
      internalChildren
    }, value));
    return {
      internalChildren
    };
  };
}
const { componentName } = createComponent("grid");
const GRID_KEY = Symbol("grid");
const gridProps = {
  columnNum: {
    type: [Number, String],
    default: 4
  },
  iconSize: {
    type: [Number, String],
    default: 28
  },
  iconColor: {
    type: String
  },
  border: {
    type: Boolean,
    default: true
  },
  gutter: {
    type: [Number, String],
    default: 0
  },
  center: {
    type: Boolean,
    default: true
  },
  square: {
    type: Boolean,
    default: false
  },
  reverse: {
    type: Boolean,
    default: false
  },
  direction: {
    type: String
  },
  clickable: {
    type: Boolean,
    default: false
  }
};
const component = {
  props: gridProps,
  setup(props, { slots }) {
    useProvide(GRID_KEY, `${componentName}-item`)({ props });
    const rootClass = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}--border`]: props.border && !props.gutter
      };
    });
    const rootStyle = computed(() => {
      const style = {};
      if (props.gutter) {
        style.paddingLeft = pxCheck(props.gutter);
      }
      return style;
    });
    return () => {
      var _a;
      return h("view", {
        class: rootClass.value,
        style: rootStyle.value
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
};
export { GRID_KEY as G, component as c };
