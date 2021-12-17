/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { inject, computed, onMounted, getCurrentInstance, h } from "vue";
import { c as createComponent } from "./component.js";
import _sfc_main$1 from "./Icon.js";
import "./pxCheck.js";
const { create, componentName } = createComponent("checkbox");
const _sfc_main = create({
  components: {
    nutIcon: _sfc_main$1
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    textPosition: {
      type: String,
      default: "right"
    },
    iconSize: {
      type: [String, Number],
      default: "18"
    },
    iconName: {
      type: String,
      default: "check-normal"
    },
    iconActiveName: {
      type: String,
      default: "checked"
    },
    label: {
      type: String,
      default: ""
    }
  },
  emits: ["change", "update:modelValue"],
  setup(props, { emit, slots }) {
    const parent = inject("parent");
    const hasParent = computed(() => !!parent);
    const pValue = computed(() => {
      if (hasParent.value) {
        return parent.value.value.includes(props.label);
      } else {
        return props.modelValue;
      }
    });
    const pDisabled = computed(() => {
      return hasParent.value ? parent.disabled : props.disabled;
    });
    const checked = computed(() => !!props.modelValue);
    const color = computed(() => {
      return !pDisabled.value ? !pValue.value ? "nut-checkbox__icon--unchecked" : "nut-checkbox__icon" : "nut-checkbox__icon--disable";
    });
    const emitChange = (value, label) => {
      emit("update:modelValue", value);
      emit("change", value, label);
    };
    const renderIcon = () => {
      const { iconName, iconSize, iconActiveName } = props;
      return h(_sfc_main$1, {
        name: !pValue.value ? iconName : iconActiveName,
        size: iconSize,
        class: color.value
      });
    };
    const renderLabel = () => {
      var _a;
      return h("view", {
        class: `${componentName}__label ${pDisabled.value ? `${componentName}__label--disabled` : ""}`
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
    const handleClick = (e) => {
      var _a;
      if (pDisabled.value)
        return;
      emitChange(!checked.value, (_a = slots.default) == null ? void 0 : _a.call(slots)[0].children);
      if (hasParent.value) {
        let value = parent.value.value;
        let { label } = props;
        const index = value.indexOf(label);
        if (index > -1) {
          value.splice(index, 1);
        } else {
          value.push(label);
        }
        parent.updateValue(value);
      }
    };
    onMounted(() => {
      hasParent.value && parent["relation"](getCurrentInstance());
    });
    return () => {
      return h("view", {
        class: `${componentName} ${props.textPosition === "left" ? `${componentName}--reverse` : ""}`,
        onClick: handleClick
      }, [renderIcon(), renderLabel()]);
    };
  }
});
export { _sfc_main as default };
