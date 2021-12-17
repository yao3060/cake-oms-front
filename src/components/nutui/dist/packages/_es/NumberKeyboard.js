/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, computed, watch, onMounted, resolveComponent, openBlock, createBlock, withCtx, createElementVNode, createElementBlock, toDisplayString, createCommentVNode, Fragment, renderList, normalizeClass, createTextVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { create } = createComponent("numberkeyboard");
const _sfc_main = create({
  props: {
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "default"
    },
    customKey: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ""
    },
    maxlength: {
      type: [Number, String],
      default: 6
    },
    randomKeys: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  emits: ["input", "delete", "close", "update:value"],
  setup(props, { emit }) {
    console.log(props.overlay);
    const clickKeyIndex = ref(void 0);
    const show = ref(props.visible);
    const root = ref();
    function defaultKey() {
      return [
        ...getBasicKeys(),
        { id: "lock", type: "lock" },
        { id: 0, type: "number" },
        { id: "delete", type: "delete" }
      ];
    }
    function getBasicKeys() {
      const keys = [];
      for (let i = 1; i <= 9; i++) {
        keys.push({ id: i, type: "number" });
      }
      if (props.randomKeys) {
        return keys.sort(() => Math.random() > 0.5 ? 1 : -1);
      }
      return keys;
    }
    function genCustomKeys() {
      const keys = getBasicKeys();
      const { customKey } = props;
      let customKeys = Array.isArray(customKey) ? customKey : [customKey];
      if (customKeys.length > 2) {
        customKeys = [customKeys[0], customKeys[1]];
      }
      if (customKeys.length === 1) {
        if (props.title) {
          keys.push({ id: customKeys[0], type: "custom" }, { id: 0, type: "number" }, { id: "delete", type: "delete" });
        } else {
          keys.push({ id: 0, type: "number" }, { id: customKeys[0], type: "custom" });
        }
      } else if (customKeys.length === 2) {
        keys.push({ id: customKeys[0], type: "custom" }, { id: 0, type: "number" }, { id: customKeys[1], type: "custom" });
        if (props.title) {
          keys.push({ id: "delete", type: "delete" });
        }
      } else {
        keys.push({ id: 0, type: "number" });
      }
      return keys;
    }
    const keysList = computed(() => {
      if (props.type == "rightColumn" || props.title != "") {
        return genCustomKeys();
      }
      return defaultKey();
    });
    watch(() => props.visible, (value) => {
      show.value = value;
    });
    function onTouchstart(item, event) {
      event.stopPropagation();
      clickKeyIndex.value = item.id;
      if (item.type == "number" || item.type == "custom") {
        emit("input", item.id);
        if (props.value.length < props.maxlength) {
          emit("update:value", props.value + item.id);
        }
      }
      if (item.type == "lock") {
        closeBoard();
      }
      if (item.type == "delete") {
        emit("delete");
        emit("update:value", props.value.slice(0, props.value.length - 1));
      }
    }
    function onTouchMove(id, event) {
      event.stopPropagation();
    }
    function onTouchEnd() {
      clickKeyIndex.value = void 0;
    }
    function closeBoard() {
      emit("close");
    }
    onMounted(() => {
    });
    return {
      clickKeyIndex,
      defaultKey,
      closeBoard,
      onTouchEnd,
      onTouchMove,
      onTouchstart,
      keysList,
      genCustomKeys,
      getBasicKeys,
      root,
      show
    };
  }
});
const _hoisted_1 = {
  class: "nut-numberkeyboard",
  ref: "root"
};
const _hoisted_2 = {
  key: 0,
  class: "number-board-header"
};
const _hoisted_3 = { class: "tit" };
const _hoisted_4 = { class: "number-board-body" };
const _hoisted_5 = { class: "number-board" };
const _hoisted_6 = ["onTouchstart", "onTouchmove"];
const _hoisted_7 = {
  key: 1,
  src: "https://img11.360buyimg.com/imagetools/jfs/t1/146371/38/8485/738/5f606425Eca239740/14f4b4f5f20d8a68.png"
};
const _hoisted_8 = {
  key: 2,
  src: "https://img11.360buyimg.com/imagetools/jfs/t1/129395/8/12735/2030/5f61ac37E70cab338/fb477dc11f46056c.png"
};
const _hoisted_9 = {
  key: 0,
  class: "number-board-sidebar"
};
const _hoisted_10 = { class: "key-board-wrapper" };
const _hoisted_11 = /* @__PURE__ */ createElementVNode("img", { src: "https://img11.360buyimg.com/imagetools/jfs/t1/129395/8/12735/2030/5f61ac37E70cab338/fb477dc11f46056c.png" }, null, -1);
const _hoisted_12 = [
  _hoisted_11
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_popup = resolveComponent("nut-popup");
  return openBlock(), createBlock(_component_nut_popup, {
    visible: _ctx.show,
    "onUpdate:visible": _cache[6] || (_cache[6] = ($event) => _ctx.show = $event),
    position: "bottom",
    overlay: _ctx.overlay,
    onClickOverlay: _cache[7] || (_cache[7] = ($event) => _ctx.closeBoard()),
    "overlay-class": "nut-numberkeyboard-overlay"
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1, [
        _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createElementVNode("h3", _hoisted_3, toDisplayString(_ctx.title), 1),
          createElementVNode("span", {
            class: "keyboard-close",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.closeBoard())
          }, "\u5B8C\u6210")
        ])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_4, [
          createElementVNode("div", _hoisted_5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.keysList, (item) => {
              return openBlock(), createElementBlock("div", {
                class: normalizeClass([
                  "key-board-wrapper",
                  {
                    "key-board-wrapper-large": item.id == 0 && _ctx.type == "rightColumn" && Array.isArray(_ctx.customKey) && _ctx.customKey.length == 1
                  }
                ]),
                key: "key" + item.id
              }, [
                createElementVNode("div", {
                  class: normalizeClass([
                    "key",
                    { active: item.id == _ctx.clickKeyIndex },
                    { lock: item.type == "lock" },
                    { delete: item.type == "delete" }
                  ]),
                  onTouchstart: (event) => _ctx.onTouchstart(item, event),
                  onTouchmove: (event) => _ctx.onTouchMove(item, event),
                  onTouchend: _cache[1] || (_cache[1] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args))
                }, [
                  item.type == "number" || item.type == "custom" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createTextVNode(toDisplayString(item.id), 1)
                  ], 64)) : createCommentVNode("", true),
                  item.type == "lock" ? (openBlock(), createElementBlock("img", _hoisted_7)) : createCommentVNode("", true),
                  item.type == "delete" ? (openBlock(), createElementBlock("img", _hoisted_8)) : createCommentVNode("", true)
                ], 42, _hoisted_6)
              ], 2);
            }), 128))
          ]),
          _ctx.type == "rightColumn" ? (openBlock(), createElementBlock("div", _hoisted_9, [
            createElementVNode("div", _hoisted_10, [
              createElementVNode("div", {
                class: normalizeClass(["key", { active: _ctx.clickKeyIndex == "delete" }]),
                onTouchstart: _cache[2] || (_cache[2] = (event) => _ctx.onTouchstart({ id: "delete", type: "delete" }, event)),
                onTouchmove: _cache[3] || (_cache[3] = (event) => _ctx.onTouchMove({ id: "delete", type: "delete" }, event)),
                onTouchend: _cache[4] || (_cache[4] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args))
              }, _hoisted_12, 34)
            ]),
            _ctx.title == "" ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "key-board-wrapper",
              onClick: _cache[5] || (_cache[5] = ($event) => _ctx.closeBoard())
            }, [
              createElementVNode("div", {
                class: normalizeClass(["key", "finish", { activeFinsh: _ctx.clickKeyIndex == "finish" }])
              }, " \u5B8C\u6210 ", 2)
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ])
      ], 512)
    ]),
    _: 1
  }, 8, ["visible", "overlay"]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
