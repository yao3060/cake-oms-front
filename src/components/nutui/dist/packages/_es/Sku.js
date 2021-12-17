/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { resolveComponent, openBlock, createElementBlock, createElementVNode, renderSlot, createBlock, createCommentVNode, toDisplayString, ref, watch, onMounted, Fragment, renderList, normalizeClass, createVNode, withCtx, createSlots } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import { T as TypeOfFun } from "./util.js";
const { componentName: componentName$4, create: create$4 } = createComponent("sku-header");
const _sfc_main$4 = create$4({
  props: {
    goods: {
      type: Object,
      default: {}
    }
  },
  emits: [],
  setup(props, { emit, slots }) {
    const getSlots = (name) => slots[name];
    return {
      getSlots
    };
  }
});
const _hoisted_1$4 = { class: "nut-sku-header" };
const _hoisted_2$4 = ["src"];
const _hoisted_3$3 = { class: "nut-sku-header-right" };
const _hoisted_4$3 = {
  key: 3,
  class: "nut-sku-header-right-extra"
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_price = resolveComponent("nut-price");
  return openBlock(), createElementBlock("view", _hoisted_1$4, [
    createElementVNode("img", {
      src: _ctx.goods.imagePath
    }, null, 8, _hoisted_2$4),
    createElementVNode("view", _hoisted_3$3, [
      _ctx.getSlots("sku-header-price") ? renderSlot(_ctx.$slots, "sku-header-price", { key: 0 }) : (openBlock(), createBlock(_component_nut_price, {
        key: 1,
        price: _ctx.goods.price,
        needSymbol: true,
        thousands: false
      }, null, 8, ["price"])),
      _ctx.getSlots("sku-header-extra") ? renderSlot(_ctx.$slots, "sku-header-extra", { key: 2 }) : createCommentVNode("", true),
      _ctx.goods.skuId && !_ctx.getSlots("sku-header-extra") ? (openBlock(), createElementBlock("view", _hoisted_4$3, "\u5546\u54C1\u7F16\u53F7\uFF1A" + toDisplayString(_ctx.goods.skuId), 1)) : createCommentVNode("", true)
    ])
  ]);
}
var SkuHeader = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const { componentName: componentName$3, create: create$3 } = createComponent("sku-select");
const _sfc_main$3 = create$3({
  props: {
    sku: {
      type: Array,
      default: () => []
    }
  },
  emits: ["selectSku"],
  setup(props, { emit }) {
    const skuInfo = ref([]);
    watch(() => props.sku, (value) => {
      skuInfo.value = [].slice.call(value);
    }, { deep: true });
    onMounted(() => {
      if (props.sku.length > 0) {
        skuInfo.value = [].slice.call(props.sku);
      }
    });
    const changeSaleChild = (attrItem, index2, parentItem, parentIndex) => {
      if (attrItem.checkFlag || attrItem.disable) {
        return;
      }
      emit("selectSku", {
        sku: attrItem,
        skuIndex: index2,
        parentSku: parentItem,
        parentIndex
      });
    };
    return {
      skuInfo,
      changeSaleChild
    };
  }
});
const _hoisted_1$3 = { class: "nut-sku-select" };
const _hoisted_2$3 = { class: "nut-sku-select-item-title" };
const _hoisted_3$2 = { class: "nut-sku-select-item-skus" };
const _hoisted_4$2 = ["onClick"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", _hoisted_1$3, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.skuInfo, (item, index2) => {
      return openBlock(), createElementBlock("view", {
        class: "nut-sku-select-item",
        key: item.id
      }, [
        createElementVNode("view", _hoisted_2$3, toDisplayString(item.name), 1),
        createElementVNode("view", _hoisted_3$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(item.list, (itemAttr, itemAttrIndex) => {
            return openBlock(), createElementBlock("view", {
              class: normalizeClass(["nut-sku-select-item-skus-sku", [{ active: !itemAttr.disable && itemAttr.active }, { disable: itemAttr.disable }]]),
              onClick: ($event) => _ctx.changeSaleChild(itemAttr, itemAttrIndex, item, index2),
              key: itemAttr.name
            }, toDisplayString(itemAttr.name), 11, _hoisted_4$2);
          }), 128))
        ])
      ]);
    }), 128))
  ]);
}
var SkuSelect = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const { componentName: componentName$2, create: create$2 } = createComponent("sku-stepper");
const _sfc_main$2 = create$2({
  props: {
    stepperMax: {
      type: [Number, String],
      default: 99999
    },
    stepperMin: {
      type: [Number, String],
      default: 1
    },
    stepperExtraText: {
      type: [Function, Boolean],
      default: false
    },
    stepperTitle: {
      type: String,
      default: "\u8D2D\u4E70\u6570\u91CF"
    }
  },
  emits: ["click", "changeSku", "changeStepper", "clickBtnOptions", "overLimit", "reduce", "add"],
  setup(props, { emit }) {
    const goodsCount = ref(props.stepperMin);
    onMounted(() => {
      goodsCount.value = props.stepperMin;
    });
    const getExtraText = () => {
      const { stepperExtraText } = props;
      if (stepperExtraText && TypeOfFun(stepperExtraText) == "function") {
        return stepperExtraText();
      } else {
        return "";
      }
    };
    const add = (value) => {
      emit("add", value);
    };
    const reduce = (value) => {
      emit("reduce", value);
    };
    const overlimit = (e, action) => {
      emit("overLimit", {
        action,
        value: parseInt(goodsCount.value + "")
      });
    };
    const changeStepper = (value) => {
      goodsCount.value = value;
      emit("changeStepper", value);
    };
    return {
      goodsCount,
      add,
      reduce,
      overlimit,
      getExtraText,
      changeStepper
    };
  }
});
const _hoisted_1$2 = { class: "nut-sku-stepper" };
const _hoisted_2$2 = { class: "nut-sku-stepper-title" };
const _hoisted_3$1 = ["innerHTML"];
const _hoisted_4$1 = { class: "nut-sku-stepper-count" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_inputnumber = resolveComponent("nut-inputnumber");
  return openBlock(), createElementBlock("view", _hoisted_1$2, [
    createElementVNode("view", _hoisted_2$2, toDisplayString(_ctx.stepperTitle), 1),
    createElementVNode("view", {
      class: "nut-sku-stepper-limit",
      innerHTML: _ctx.getExtraText()
    }, null, 8, _hoisted_3$1),
    createElementVNode("view", _hoisted_4$1, [
      createVNode(_component_nut_inputnumber, {
        modelValue: _ctx.goodsCount,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.goodsCount = $event),
        min: _ctx.stepperMin,
        max: _ctx.stepperMax,
        onAdd: _ctx.add,
        onReduce: _ctx.reduce,
        onOverlimit: _ctx.overlimit,
        onChange: _ctx.changeStepper
      }, null, 8, ["modelValue", "min", "max", "onAdd", "onReduce", "onOverlimit", "onChange"])
    ])
  ]);
}
var SkuStepper = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const { componentName: componentName$1, create: create$1 } = createComponent("sku-operate");
const _sfc_main$1 = create$1({
  props: {
    btnOptions: {
      type: Array,
      default: () => ["confirm"]
    },
    btnExtraText: {
      type: String,
      default: ""
    },
    buyText: {
      type: String,
      default: "\u7ACB\u5373\u8D2D\u4E70"
    },
    addCartText: {
      type: String,
      default: "\u52A0\u5165\u8D2D\u7269\u8F66"
    },
    confirmText: {
      type: String,
      default: "\u786E\u5B9A"
    }
  },
  emits: ["click", "changeSku", "changeBuyCount", "clickBtnOperate"],
  setup(props, { emit, slots }) {
    const getBtnDesc = (type) => {
      let mapD = {
        confirm: props.confirmText,
        cart: props.addCartText,
        buy: props.buyText
      };
      return mapD[type];
    };
    onMounted(() => {
      console.log(slots);
    });
    const getSlots = (name) => slots[name];
    const clickBtnOperate = (btn) => {
      emit("clickBtnOperate", btn);
    };
    return {
      getBtnDesc,
      clickBtnOperate,
      getSlots
    };
  }
});
const _hoisted_1$1 = {
  key: 0,
  class: "nut-sku-operate"
};
const _hoisted_2$1 = ["innerHTML"];
const _hoisted_3 = {
  key: 1,
  class: "nut-sku-operate-btn"
};
const _hoisted_4 = ["onClick"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.btnOptions.length > 0 ? (openBlock(), createElementBlock("view", _hoisted_1$1, [
    _ctx.btnExtraText ? (openBlock(), createElementBlock("view", {
      key: 0,
      class: "nut-sku-operate-desc",
      innerHTML: _ctx.btnExtraText
    }, null, 8, _hoisted_2$1)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "operate-btn"),
    !_ctx.getSlots("operate-btn") ? (openBlock(), createElementBlock("view", _hoisted_3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.btnOptions, (btn, i) => {
        return openBlock(), createElementBlock("view", {
          class: normalizeClass([`nut-sku-operate-btn-${btn}`, "nut-sku-operate-btn-item"]),
          key: i,
          onClick: ($event) => _ctx.clickBtnOperate(btn)
        }, toDisplayString(_ctx.getBtnDesc(btn)), 11, _hoisted_4);
      }), 128))
    ])) : createCommentVNode("", true)
  ])) : createCommentVNode("", true);
}
var SkuOperate = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const { componentName, create } = createComponent("sku");
const _sfc_main = create({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    sku: {
      type: Array,
      default: []
    },
    goods: {
      type: Object,
      default: {}
    },
    stepperMax: {
      type: [Number, String],
      default: 99999
    },
    stepperMin: {
      type: [Number, String],
      default: 1
    },
    btnOptions: {
      type: Array,
      default: () => ["confirm"]
    },
    stepperTitle: {
      type: String,
      default: "\u8D2D\u4E70\u6570\u91CF"
    },
    stepperExtraText: {
      type: [Function, Boolean],
      default: false
    },
    btnExtraText: {
      type: String,
      default: ""
    },
    buyText: {
      type: String,
      default: "\u7ACB\u5373\u8D2D\u4E70"
    },
    addCartText: {
      type: String,
      default: "\u52A0\u5165\u8D2D\u7269\u8F66"
    },
    confirmText: {
      type: String,
      default: "\u786E\u5B9A"
    }
  },
  emits: [
    "update:visible",
    "selectSku",
    "changeStepper",
    "clickBtnOperate",
    "clickCloseIcon",
    "clickOverlay",
    "close",
    "reduce",
    "add",
    "overLimit",
    "clickOverlay"
  ],
  components: {
    SkuHeader,
    SkuSelect,
    SkuStepper,
    SkuOperate
  },
  setup(props, { emit, slots }) {
    const showPopup = ref(props.visible);
    const goodsCount = ref(props.stepperMin);
    watch(() => props.visible, (value) => {
      showPopup.value = value;
    });
    watch(() => showPopup.value, (value) => {
      if (value == false) {
        close();
      }
    });
    onMounted(() => {
      console.log("\u66F4\u65B0\u53C2\u6570");
    });
    const getSlots = (name) => slots[name];
    const selectSku = (skus) => {
      emit("selectSku", skus);
    };
    const changeStepper = (value) => {
      goodsCount.value = value;
      emit("changeStepper", value);
    };
    const add = (value) => {
      emit("add", value);
    };
    const reduce = (value) => {
      emit("reduce", value);
    };
    const stepperOverLimit = (count) => {
      emit("overLimit", count);
    };
    const clickBtnOperate = (btn) => {
      emit("clickBtnOperate", {
        type: btn,
        value: goodsCount.value
      });
    };
    const closePopup = (type) => {
      if (type == "icon") {
        emit("click-close-icon");
      }
      if (type == "overlay") {
        emit("click-overlay");
      }
      if (type == "close") {
        emit("close");
      }
      showPopup.value = false;
    };
    const close = () => {
      emit("update:visible", false);
    };
    return {
      showPopup,
      closePopup,
      selectSku,
      changeStepper,
      stepperOverLimit,
      clickBtnOperate,
      add,
      reduce,
      getSlots
    };
  }
});
const _hoisted_1 = { class: "nut-sku" };
const _hoisted_2 = { class: "nut-sku-content" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_sku_header = resolveComponent("sku-header");
  const _component_SkuSelect = resolveComponent("SkuSelect");
  const _component_sku_stepper = resolveComponent("sku-stepper");
  const _component_sku_operate = resolveComponent("sku-operate");
  const _component_nut_popup = resolveComponent("nut-popup");
  return openBlock(), createBlock(_component_nut_popup, {
    position: "bottom",
    closeable: "",
    round: "",
    visible: _ctx.showPopup,
    "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.showPopup = $event),
    onClickCloseIcon: _cache[1] || (_cache[1] = ($event) => _ctx.closePopup("icon")),
    onClickOverlay: _cache[2] || (_cache[2] = ($event) => _ctx.closePopup("overlay")),
    onClose: _cache[3] || (_cache[3] = ($event) => _ctx.closePopup("close")),
    style: { "height": "75%" }
  }, {
    default: withCtx(() => [
      createElementVNode("view", _hoisted_1, [
        renderSlot(_ctx.$slots, "sku-header"),
        !_ctx.getSlots("sku-header") ? (openBlock(), createBlock(_component_sku_header, {
          key: 0,
          goods: _ctx.goods
        }, createSlots({ _: 2 }, [
          _ctx.getSlots("sku-header-price") ? {
            name: "sku-header-price",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "sku-header-price")
            ])
          } : void 0,
          _ctx.getSlots("sku-header-extra") ? {
            name: "sku-header-extra",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "sku-header-extra")
            ])
          } : void 0
        ]), 1032, ["goods"])) : createCommentVNode("", true),
        createElementVNode("view", _hoisted_2, [
          renderSlot(_ctx.$slots, "sku-select-top"),
          renderSlot(_ctx.$slots, "sku-select"),
          !_ctx.getSlots("sku-select") ? (openBlock(), createBlock(_component_SkuSelect, {
            key: 0,
            sku: _ctx.sku,
            onSelectSku: _ctx.selectSku
          }, null, 8, ["sku", "onSelectSku"])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "sku-stepper"),
          !_ctx.getSlots("sku-stepper") ? (openBlock(), createBlock(_component_sku_stepper, {
            key: 1,
            goods: _ctx.goods,
            stepperTitle: _ctx.stepperTitle,
            stepperMax: _ctx.stepperMax,
            stepperMin: _ctx.stepperMin,
            stepperExtraText: _ctx.stepperExtraText,
            onAdd: _ctx.add,
            onReduce: _ctx.reduce,
            onChangeStepper: _ctx.changeStepper,
            onOverLimit: _ctx.stepperOverLimit
          }, null, 8, ["goods", "stepperTitle", "stepperMax", "stepperMin", "stepperExtraText", "onAdd", "onReduce", "onChangeStepper", "onOverLimit"])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "sku-stepper-bottom")
        ]),
        createVNode(_component_sku_operate, {
          btnOptions: _ctx.btnOptions,
          btnExtraText: _ctx.btnExtraText,
          buyText: _ctx.buyText,
          addCartText: _ctx.addCartText,
          confirmText: _ctx.confirmText,
          onClickBtnOperate: _ctx.clickBtnOperate
        }, createSlots({ _: 2 }, [
          _ctx.getSlots("sku-operate") ? {
            name: "operate-btn",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "sku-operate")
            ])
          } : void 0
        ]), 1032, ["btnOptions", "btnExtraText", "buyText", "addCartText", "confirmText", "onClickBtnOperate"])
      ])
    ]),
    _: 3
  }, 8, ["visible"]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
