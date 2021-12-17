/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { h } from "vue";
import { c as createComponent } from "./component.js";
import { p as pxCheck } from "./pxCheck.js";
const { componentName, create } = createComponent("icon");
const _sfc_main = create({
  props: {
    name: { type: String, default: "" },
    size: { type: [String, Number], default: "" },
    classPrefix: { type: String, default: "nut-icon" },
    fontClassName: { type: String, default: "nutui-iconfont" },
    color: { type: String, default: "" },
    tag: { type: String, default: "i" }
  },
  emits: ["click"],
  setup(props, { emit, slots }) {
    const handleClick = (event) => {
      emit("click", event);
    };
    const isImage = () => {
      return props.name ? props.name.indexOf("/") !== -1 : false;
    };
    return () => {
      var _a;
      const _isImage = isImage();
      return h(_isImage ? "img" : props.tag, {
        class: _isImage ? `${componentName}__img` : `${props.fontClassName} ${componentName} ${props.classPrefix}-${props.name}`,
        style: {
          color: props.color,
          fontSize: pxCheck(props.size),
          width: pxCheck(props.size),
          height: pxCheck(props.size)
        },
        onClick: handleClick,
        src: _isImage ? props.name : ""
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
export { _sfc_main as default };
