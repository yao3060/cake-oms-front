/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, computed, watch, resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, toDisplayString, withDirectives, normalizeStyle, vModelText, Fragment, renderList, createCommentVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("shortpassword");
const _sfc_main = create({
  props: {
    title: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5BC6\u7801"
    },
    desc: {
      type: String,
      default: "\u60A8\u4F7F\u7528\u4E86\u865A\u62DF\u8D44\u4EA7\uFF0C\u8BF7\u8FDB\u884C\u9A8C\u8BC1"
    },
    tips: {
      type: String,
      default: "\u5FD8\u8BB0\u5BC6\u7801"
    },
    visible: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    errorMsg: {
      type: String,
      default: ""
    },
    noButton: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    length: {
      type: [String, Number],
      default: 6
    }
  },
  emits: ["update:modelValue", "update:visible", "complete", "change", "ok", "tips", "close", "cancel"],
  setup(props, { emit }) {
    const realInput = ref(props.modelValue);
    const realpwd = ref();
    const comLen = computed(() => range(Number(props.length)));
    const show = ref(props.visible);
    function sureClick() {
      emit("ok", realInput.value);
    }
    function focus() {
      realpwd.value.focus();
    }
    watch(() => props.visible, (value) => {
      show.value = value;
    });
    watch(() => props.modelValue, (value) => {
      realInput.value = value;
      console.log("watch", value);
    });
    function changeValue(e) {
      const input = e.target;
      let val = input.value;
      if (val.length > comLen.value) {
        val = val.slice(0, comLen.value);
        realInput.value = val;
      }
      if (String(realInput.value).length === comLen.value) {
        emit("complete", val);
      }
      emit("change", val);
      emit("update:modelValue", val);
    }
    function close() {
      emit("update:visible", false);
      emit("cancel");
    }
    function closeIcon() {
      emit("update:visible", false);
      emit("close");
    }
    function range(val) {
      return Math.min(Math.max(4, val), 6);
    }
    function onTips() {
      emit("tips");
    }
    function systemStyle() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        return {
          paddingRight: "1200px"
        };
      }
      if (isAndroid) {
        return {
          opacity: 0,
          zindex: 10
        };
      }
    }
    return {
      comLen,
      sureClick,
      realInput,
      realpwd,
      focus,
      range,
      changeValue,
      close,
      onTips,
      show,
      systemStyle,
      closeIcon
    };
  }
});
const _hoisted_1 = { class: "nut-shortpsd-title" };
const _hoisted_2 = { class: "nut-shortpsd-subtitle" };
const _hoisted_3 = { class: "nut-input-normalw" };
const _hoisted_4 = /* @__PURE__ */ createElementVNode("div", { class: "nut-input-site" }, null, -1);
const _hoisted_5 = {
  key: 0,
  class: "nut-shortpsd-icon"
};
const _hoisted_6 = { class: "nut-shortpsd-message" };
const _hoisted_7 = { class: "nut-shortpsd-error" };
const _hoisted_8 = {
  key: 0,
  class: "nut-shortpsd-forget"
};
const _hoisted_9 = {
  key: 0,
  class: "nut-shortpsd-footer"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  const _component_nut_popup = resolveComponent("nut-popup");
  return openBlock(), createElementBlock("view", null, [
    createVNode(_component_nut_popup, {
      style: {
        padding: "32px 24px 28px 24px",
        borderRadius: "12px",
        textAlign: "center"
      },
      visible: _ctx.show,
      "onUpdate:visible": _cache[6] || (_cache[6] = ($event) => _ctx.show = $event),
      closeable: true,
      onClickCloseIcon: _ctx.closeIcon,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      onClickOverlay: _ctx.close
    }, {
      default: withCtx(() => [
        createElementVNode("view", _hoisted_1, toDisplayString(_ctx.title), 1),
        createElementVNode("view", _hoisted_2, toDisplayString(_ctx.desc), 1),
        createElementVNode("div", _hoisted_3, [
          withDirectives(createElementVNode("input", {
            ref: "realpwd",
            class: "nut-input-real",
            type: "number",
            maxlength: "6",
            style: normalizeStyle(_ctx.systemStyle()),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.realInput = $event),
            onInput: _cache[1] || (_cache[1] = (...args) => _ctx.changeValue && _ctx.changeValue(...args))
          }, null, 36), [
            [vModelText, _ctx.realInput]
          ]),
          _hoisted_4,
          createElementVNode("view", {
            class: "nut-shortpsd-fake",
            onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(new Array(_ctx.comLen), (sublen, index2) => {
              return openBlock(), createElementBlock("view", {
                class: "nut-shortpsd-li",
                key: index2
              }, [
                String(_ctx.realInput).length > index2 ? (openBlock(), createElementBlock("view", _hoisted_5)) : createCommentVNode("", true)
              ]);
            }), 128))
          ])
        ]),
        createElementVNode("view", _hoisted_6, [
          createElementVNode("view", _hoisted_7, toDisplayString(_ctx.errorMsg), 1),
          _ctx.tips ? (openBlock(), createElementBlock("view", _hoisted_8, [
            createVNode(_component_nut_icon, {
              class: "icon",
              size: "11px",
              name: "tips"
            }),
            createElementVNode("view", {
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onTips && _ctx.onTips(...args))
            }, toDisplayString(_ctx.tips), 1)
          ])) : createCommentVNode("", true)
        ]),
        !_ctx.noButton ? (openBlock(), createElementBlock("view", _hoisted_9, [
          createElementVNode("view", {
            class: "nut-shortpsd-cancle",
            onClick: _cache[4] || (_cache[4] = (...args) => _ctx.close && _ctx.close(...args))
          }, "\u53D6\u6D88"),
          createElementVNode("view", {
            class: "nut-shortpsd-sure",
            onClick: _cache[5] || (_cache[5] = (...args) => _ctx.sureClick && _ctx.sureClick(...args))
          }, "\u786E\u8BA4")
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["visible", "onClickCloseIcon", "close-on-click-overlay", "onClickOverlay"])
  ]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
