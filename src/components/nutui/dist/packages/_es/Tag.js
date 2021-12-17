/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { toRefs, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot, createBlock, createCommentVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("tag");
const _sfc_main = create({
  props: {
    color: { type: String, default: "" },
    textColor: { type: String, default: "" },
    type: {
      type: String,
      default: "default"
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    mark: {
      type: Boolean,
      default: false
    },
    closeable: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(props, { emit }) {
    const { type, color, plain, round, mark, textColor } = toRefs(props);
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}--${type.value}`]: type.value,
        [`${prefixCls}--plain`]: plain.value,
        [`${prefixCls}--round`]: round.value,
        [`${prefixCls}--mark`]: mark.value
      };
    });
    const getStyle = () => {
      if (color == null ? void 0 : color.value) {
        return {
          background: color.value,
          color: textColor.value
        };
      }
      if (plain.value) {
        return {
          color: "#FA2400",
          background: "#fff",
          border: "1px solid rgba(250,36,0,1)"
        };
      }
      return {
        color: "",
        background: ""
      };
    };
    const onClose = (event) => {
      event.stopPropagation();
      emit("close", event);
    };
    return {
      classes,
      getStyle,
      onClose
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle(_ctx.getStyle())
  }, [
    renderSlot(_ctx.$slots, "default"),
    _ctx.closeable ? (openBlock(), createBlock(_component_nut_icon, {
      key: 0,
      class: "nut-tag--close",
      name: "close",
      size: "12",
      onClick: _ctx.onClose
    }, null, 8, ["onClick"])) : createCommentVNode("", true)
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
