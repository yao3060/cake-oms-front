/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { reactive, provide, computed, watch, h } from "vue";
import { c as createComponent } from "./component.js";
import { u as useExpose } from "./index.js";
const { create, componentName } = createComponent("checkboxgroup");
const _sfc_main = create({
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["change", "update:modelValue"],
  setup(props, { slots, emit }) {
    const state = reactive({
      children: []
    });
    const relation = (child) => {
      if (child.proxy) {
        state.children.push(child.proxy);
      }
    };
    const updateValue = (value) => {
      emit("update:modelValue", value);
      emit("change", value);
    };
    const toggleAll = (checked) => {
      let values = [];
      if (!!checked) {
        state.children.forEach((item) => {
          values.push(item == null ? void 0 : item.label);
        });
      }
      emit("update:modelValue", values);
    };
    provide("parent", {
      value: computed(() => props.modelValue),
      disabled: props.disabled,
      updateValue,
      relation
    });
    watch(() => props.modelValue, (value) => {
      emit("change", value);
    });
    useExpose({ toggleAll });
    return () => {
      var _a;
      return h("view", {
        class: `${componentName}`
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
export { _sfc_main as default };
