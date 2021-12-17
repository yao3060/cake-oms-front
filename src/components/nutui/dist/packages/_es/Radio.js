/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { inject, computed, h } from "vue";
import { c as createComponent } from "./component.js";
import _sfc_main$1 from "./Icon.js";
import "./pxCheck.js";
const { componentName, create } = createComponent("radio");
const _sfc_main = create({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: "round"
    },
    label: {
      type: [String, Number],
      default: ""
    },
    iconName: {
      type: String,
      default: "check-normal"
    },
    iconActiveName: {
      type: String,
      default: "check-checked"
    },
    iconSize: {
      type: [String, Number],
      default: 18
    }
  },
  setup(props, { emit, slots }) {
    let parent = inject("parent");
    const isCurValue = computed(() => {
      return parent.label.value == props.label;
    });
    const color = computed(() => {
      return !props.disabled ? isCurValue.value ? "nut-radio__icon" : "nut-radio__icon--unchecked" : "nut-radio__icon--disable";
    });
    const position = computed(() => {
      return parent.position;
    });
    const renderIcon = () => {
      const { iconName, iconSize, iconActiveName } = props;
      return h(_sfc_main$1, {
        name: isCurValue.value ? iconActiveName : iconName,
        size: iconSize,
        class: color.value
      });
    };
    const renderLabel = () => {
      var _a;
      return h("view", {
        class: `${componentName}__label ${props.disabled ? `${componentName}__label--disabled` : ""}`
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
    const renderButton = () => {
      var _a;
      return h("view", {
        class: `${componentName}__button ${isCurValue.value && `${componentName}__button--active`} ${props.disabled ? `${componentName}__button--disabled` : ""}`
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
    const handleClick = () => {
      if (isCurValue.value || props.disabled)
        return;
      parent.updateValue(props.label);
    };
    let reverseState = position.value === "left";
    return () => {
      return h("view", {
        class: `${componentName} ${componentName}--${props.shape} ${reverseState ? `${componentName}--reverse` : ""}`,
        onClick: handleClick
      }, [
        props.shape == "button" ? renderButton() : reverseState ? [renderLabel(), renderIcon()] : [renderIcon(), renderLabel()]
      ]);
    };
  }
});
export { _sfc_main as default };
