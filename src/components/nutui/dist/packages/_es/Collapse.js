/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { provide, openBlock, createElementBlock, renderSlot } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("collapse");
const _sfc_main = create({
  props: {
    active: {
      type: [String, Number, Array]
    },
    accordion: {
      type: Boolean
    },
    titleIcon: {
      type: String,
      default: ""
    },
    titleIconSize: {
      type: String,
      default: "16px"
    },
    titleIconColor: {
      type: String,
      default: ""
    },
    titleIconPosition: {
      type: String,
      default: "left"
    },
    icon: {
      type: String,
      default: ""
    },
    iconSize: {
      type: String,
      default: "16px"
    },
    iconColor: {
      type: String,
      default: ""
    },
    rotate: {
      type: [String, Number],
      default: 180
    }
  },
  emits: ["update:active", "change"],
  setup(props, { emit }) {
    const changeVal = (val) => {
      emit("update:active", val);
      emit("change", val);
    };
    const changeValAry = (name) => {
      const activeItem = props.active instanceof Object ? Object.values(props.active) : props.active;
      let index2 = -1;
      activeItem.forEach((item, idx) => {
        if (String(item) == String(name)) {
          index2 = idx;
        }
      });
      index2 > -1 ? activeItem.splice(index2, 1) : activeItem.push(name);
      changeVal(activeItem);
    };
    const isExpanded = (name) => {
      const { accordion, active } = props;
      if (accordion) {
        return typeof active === "number" || typeof active === "string" ? active == name : false;
      }
    };
    provide("collapseParent", {
      children: [],
      props,
      changeValAry,
      changeVal,
      isExpanded
    });
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
