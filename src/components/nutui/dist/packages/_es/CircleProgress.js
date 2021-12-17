/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, renderSlot, createTextVNode, toDisplayString } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("circleprogress");
const _sfc_main = create({
  props: {
    progress: {
      type: [Number, String],
      required: true
    },
    strokeInnerWidth: {
      type: [Number, String],
      default: 10
    },
    isAuto: {
      tyep: Boolean,
      default: false
    },
    progressOption: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const option = computed(() => {
      let baseOption = {
        radius: 50,
        strokeOutWidth: 10,
        backColor: "#d9d9d9",
        progressColor: "red",
        cy: 1,
        cx: 1,
        size: 1,
        startPosition: ""
      };
      Object.assign(baseOption, props.progressOption);
      baseOption.cy = baseOption.cx = baseOption.radius + baseOption.strokeOutWidth;
      baseOption.size = (baseOption.radius + baseOption.strokeOutWidth) * 2;
      baseOption.startPosition = "rotate(-90," + baseOption.cx + "," + baseOption.cy + ")";
      return baseOption;
    });
    const arcLength = computed(() => {
      let circleLength = Math.floor(2 * Math.PI * option.value.radius);
      let progressLength = props.progress / 100 * circleLength;
      return `${progressLength},${circleLength}`;
    });
    return {
      classes,
      option,
      arcLength
    };
  }
});
const _hoisted_1 = ["height", "width"];
const _hoisted_2 = ["r", "cx", "cy", "stroke", "stroke-width"];
const _hoisted_3 = ["r", "cx", "cy", "stroke", "stroke-dasharray", "stroke-width", "transform"];
const _hoisted_4 = { class: "nut-circleprogress-content" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes),
    style: normalizeStyle({ height: _ctx.option.size + "px", width: _ctx.option.size + "px" })
  }, [
    (openBlock(), createElementBlock("svg", {
      height: _ctx.option.size,
      width: _ctx.option.size,
      "x-mlns": "http://www.w3.org/200/svg"
    }, [
      createElementVNode("circle", {
        r: _ctx.option.radius,
        cx: _ctx.option.cx,
        cy: _ctx.option.cy,
        stroke: _ctx.option.backColor,
        "stroke-width": _ctx.option.strokeOutWidth,
        fill: "none"
      }, null, 8, _hoisted_2),
      createElementVNode("circle", {
        r: _ctx.option.radius,
        cx: _ctx.option.cx,
        cy: _ctx.option.cy,
        stroke: _ctx.option.progressColor,
        "stroke-dasharray": _ctx.arcLength,
        "stroke-width": _ctx.strokeInnerWidth,
        fill: "none",
        transform: _ctx.option.startPosition,
        "stroke-linecap": "round",
        style: { "transition": "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s" }
      }, null, 8, _hoisted_3)
    ], 8, _hoisted_1)),
    createElementVNode("div", _hoisted_4, [
      !_ctx.isAuto ? renderSlot(_ctx.$slots, "default", { key: 0 }, () => [
        createTextVNode(toDisplayString(_ctx.progress) + "%", 1)
      ]) : renderSlot(_ctx.$slots, "default", { key: 1 })
    ])
  ], 6);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
