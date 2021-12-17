/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, computed, watch, onMounted, resolveComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, toDisplayString, createCommentVNode, createBlock } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("progress");
const _sfc_main = create({
  props: {
    percentage: {
      type: [Number, String],
      default: 0,
      required: true
    },
    size: {
      type: String,
      default: "base"
    },
    status: {
      type: String,
      default: ""
    },
    strokeWidth: {
      type: [Number, String],
      default: ""
    },
    textInside: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: true
    },
    strokeColor: {
      type: String,
      default: ""
    },
    textColor: {
      tyep: String,
      default: ""
    },
    iconName: {
      type: String,
      default: "checked"
    },
    iconColor: {
      type: String,
      default: "#439422"
    }
  },
  setup(props, { emit }) {
    const height = ref(props.strokeWidth + "px");
    const progressOuter = ref();
    const left = ref();
    const bgStyle = computed(() => {
      return {
        width: props.percentage + "%",
        background: props.strokeColor || ""
      };
    });
    const textStyle = computed(() => {
      return {
        color: props.textColor || ""
      };
    });
    watch(() => props.percentage, (values) => {
      console.log("progressOuter.value.offsetWidth", progressOuter.value.offsetWidth);
      console.log("values", values);
      left.value = progressOuter.value.offsetWidth * Number(values) * 0.01 - 5 + "px";
    });
    onMounted(() => {
      left.value = progressOuter.value.offsetWidth * Number(props.percentage) * 0.01 - 5 + "px";
    });
    return {
      height,
      bgStyle,
      textStyle,
      progressOuter,
      left
    };
  }
});
const _hoisted_1 = { class: "nut-progress" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", {
      class: normalizeClass(["nut-progress-outer", [
        _ctx.showText && !_ctx.textInside ? "nut-progress-outer-part" : "",
        _ctx.size ? "nut-progress-" + _ctx.size : ""
      ]]),
      ref: "progressOuter",
      style: normalizeStyle({ height: _ctx.height })
    }, [
      createElementVNode("div", {
        class: normalizeClass(["nut-progress-inner", _ctx.status == "active" ? "nut-active" : ""]),
        style: normalizeStyle(_ctx.bgStyle)
      }, [
        _ctx.showText && _ctx.textInside ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "nut-progress-text nut-progress-insidetext",
          style: normalizeStyle({ lineHeight: _ctx.height, left: _ctx.left })
        }, [
          createElementVNode("span", {
            style: normalizeStyle(_ctx.textStyle)
          }, toDisplayString(_ctx.percentage) + "%", 5)
        ], 4)) : createCommentVNode("", true)
      ], 6)
    ], 6),
    _ctx.showText && !_ctx.textInside ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "nut-progress-text",
      style: normalizeStyle({ lineHeight: _ctx.height })
    }, [
      _ctx.status == "active" || _ctx.status == "" ? (openBlock(), createElementBlock("span", {
        key: 0,
        style: normalizeStyle(_ctx.textStyle)
      }, toDisplayString(_ctx.percentage) + "%", 5)) : _ctx.status == "icon" ? (openBlock(), createBlock(_component_nut_icon, {
        key: 1,
        size: "16px",
        name: _ctx.iconName,
        color: _ctx.iconColor
      }, null, 8, ["name", "color"])) : createCommentVNode("", true)
    ], 4)) : createCommentVNode("", true)
  ]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
