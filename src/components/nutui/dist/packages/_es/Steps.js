/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { reactive, computed, provide, h } from "vue";
import { c as createComponent } from "./component.js";
const { create, componentName } = createComponent("steps");
const _sfc_main = create({
  props: {
    direction: {
      type: String,
      default: "horizontal"
    },
    current: {
      type: [String, Number],
      default: "0"
    },
    progressDot: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, slots }) {
    const state = reactive({
      children: []
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${props.direction}`]: true,
        [`${prefixCls}-dot`]: !!props.progressDot
      };
    });
    const relation = (child) => {
      child && state.children.push(child);
    };
    provide("parent", {
      relation,
      state,
      props
    });
    return () => {
      var _a;
      return h("view", {
        class: classes.value
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
export { _sfc_main as default };
