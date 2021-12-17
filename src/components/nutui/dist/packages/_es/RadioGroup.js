/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { provide, readonly, computed, watch, h } from "vue";
import { c as createComponent } from "./component.js";
const { componentName, create } = createComponent("radiogroup");
const _sfc_main = create({
  props: {
    modelValue: {
      type: [Number, String, Boolean],
      default: ""
    },
    direction: {
      type: String,
      default: "vertical"
    },
    textPosition: {
      type: String,
      default: "right"
    }
  },
  emits: ["change", "update:modelValue"],
  setup(props, { emit, slots }) {
    const updateValue = (value) => emit("update:modelValue", value);
    provide("parent", {
      label: readonly(computed(() => props.modelValue)),
      position: props.textPosition,
      updateValue
    });
    watch(() => props.modelValue, (value) => emit("change", value));
    return () => {
      var _a;
      return h("view", {
        class: `${componentName} ${componentName}--${props.direction}`
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
export { _sfc_main as default };
