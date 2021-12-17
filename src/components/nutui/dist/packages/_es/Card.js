/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { c as createComponent } from "./component.js";
import { resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, renderSlot, createVNode, createBlock, Fragment, withCtx, createTextVNode } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("card");
const _sfc_main = create({
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    },
    vipPrice: {
      type: String,
      default: ""
    },
    shopDesc: {
      type: String,
      default: ""
    },
    delivery: {
      type: String,
      default: ""
    },
    shopName: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit, slots }) {
    console.log(slots["origin"]);
    const isHaveSlot = (slot) => {
      return slots[slot];
    };
    return {
      isHaveSlot
    };
  }
});
const _hoisted_1 = { class: "nut-card" };
const _hoisted_2 = { class: "nut-card__left" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "nut-card__right" };
const _hoisted_5 = { class: "nut-card__right__title" };
const _hoisted_6 = { class: "nut-card__right__price" };
const _hoisted_7 = { class: "nut-card__right__other" };
const _hoisted_8 = { class: "nut-card__right__shop" };
const _hoisted_9 = { class: "nut-card__right__shop__name" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_price = resolveComponent("nut-price");
  const _component_nut_tag = resolveComponent("nut-tag");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("img", {
        src: _ctx.imgUrl,
        alt: ""
      }, null, 8, _hoisted_3)
    ]),
    createElementVNode("div", _hoisted_4, [
      createElementVNode("div", _hoisted_5, toDisplayString(_ctx.title), 1),
      renderSlot(_ctx.$slots, "prolist"),
      createElementVNode("div", _hoisted_6, [
        createVNode(_component_nut_price, { price: _ctx.price }, null, 8, ["price"]),
        _ctx.isHaveSlot("origin") ? renderSlot(_ctx.$slots, "origin", { key: 0 }) : (openBlock(), createBlock(_component_nut_price, {
          key: 1,
          class: "nut-card__right__price__origin",
          price: _ctx.vipPrice
        }, null, 8, ["price"]))
      ]),
      createElementVNode("div", _hoisted_7, [
        _ctx.isHaveSlot("shop-tag") ? renderSlot(_ctx.$slots, "shop-tag", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createVNode(_component_nut_tag, { type: "danger" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.shopDesc), 1)
            ]),
            _: 1
          }),
          createVNode(_component_nut_tag, { plain: "" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.delivery), 1)
            ]),
            _: 1
          })
        ], 64))
      ]),
      createElementVNode("div", _hoisted_8, [
        createElementVNode("div", _hoisted_9, toDisplayString(_ctx.shopName), 1),
        renderSlot(_ctx.$slots, "footer")
      ])
    ])
  ]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
