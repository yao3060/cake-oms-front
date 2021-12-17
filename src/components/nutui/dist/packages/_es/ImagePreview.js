var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { toRefs, reactive, watch, onMounted, resolveComponent, openBlock, createBlock, withCtx, createElementVNode, withModifiers, createElementBlock, Fragment, renderList, createVNode, createCommentVNode, toDisplayString, render, h } from "vue";
import { c as createComponent } from "./component.js";
import Popup from "./Popup.js";
import Video from "./Video.js";
import Swiper from "./Swiper.js";
import SwiperItem from "./SwiperItem.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./OverLay.js";
import "./Icon.js";
import "./pxCheck.js";
import "./index.js";
const { componentName, create } = createComponent("imagepreview");
const _sfc_main = create({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default: () => []
    },
    videos: {
      type: Array,
      default: () => []
    },
    contentClose: {
      type: Boolean,
      default: false
    },
    initNo: {
      type: Number,
      default: 1
    },
    paginationVisible: {
      type: Boolean,
      default: false
    },
    paginationColor: {
      type: String,
      default: "#fff"
    }
  },
  emits: ["close"],
  components: {
    [Popup.name]: Popup,
    [Video.name]: Video,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  setup(props, { emit }) {
    toRefs(props);
    const state = reactive({
      showPop: false,
      active: 1,
      maxNo: 1,
      source: {
        src: "https://storage.jd.com/about/big-final.mp4?Expires=3730193075&AccessKey=3LoYX1dQWa6ZXzQl&Signature=ViMFjz%2BOkBxS%2FY1rjtUVqbopbJI%3D",
        type: "video/mp4"
      },
      options: {
        muted: true,
        controls: true
      }
    });
    const slideChangeEnd = function(page) {
      state.active = page + 1;
    };
    const closeOnImg = () => {
      if (props.contentClose) {
        onClose();
      }
    };
    const onClose = () => {
      state.showPop = false;
      state.active = 1;
      emit("close");
    };
    watch(() => props.show, (val) => {
      state.showPop = val;
    });
    onMounted(() => {
      state.active = props.initNo;
      state.showPop = props.show;
      state.maxNo = props.images.length + props.videos.length;
    });
    return __spreadProps(__spreadValues({}, toRefs(state)), {
      slideChangeEnd,
      onClose,
      closeOnImg
    });
  }
});
const _hoisted_1 = ["src"];
const _hoisted_2 = { class: "nut-imagepreview-index" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_video = resolveComponent("nut-video");
  const _component_nut_swiper_item = resolveComponent("nut-swiper-item");
  const _component_nut_swiper = resolveComponent("nut-swiper");
  const _component_nut_popup = resolveComponent("nut-popup");
  return openBlock(), createBlock(_component_nut_popup, {
    "pop-class": "custom-pop",
    visible: _ctx.showPop,
    "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => _ctx.showPop = $event),
    onClick: _ctx.onClose
  }, {
    default: withCtx(() => [
      createElementVNode("view", {
        class: "nut-imagepreview",
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.closeOnImg && _ctx.closeOnImg(...args), ["stop"]))
      }, [
        _ctx.showPop ? (openBlock(), createBlock(_component_nut_swiper, {
          key: 0,
          "auto-play": 3e3,
          class: "nut-imagepreview-swiper",
          loop: true,
          "is-preventDefault": false,
          direction: "horizontal",
          onChange: _ctx.slideChangeEnd,
          "init-page": _ctx.initNo > _ctx.maxNo ? _ctx.maxNo - 1 : _ctx.initNo - 1,
          "pagination-visible": _ctx.paginationVisible,
          "pagination-color": _ctx.paginationColor
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.videos, (item, index) => {
              return openBlock(), createBlock(_component_nut_swiper_item, { key: index }, {
                default: withCtx(() => [
                  createVNode(_component_nut_video, {
                    source: item.source,
                    options: item.options
                  }, null, 8, ["source", "options"])
                ]),
                _: 2
              }, 1024);
            }), 128)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (item, index) => {
              return openBlock(), createBlock(_component_nut_swiper_item, { key: index }, {
                default: withCtx(() => [
                  createElementVNode("img", {
                    src: item.src,
                    class: "nut-imagepreview-img"
                  }, null, 8, _hoisted_1)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        }, 8, ["onChange", "init-page", "pagination-visible", "pagination-color"])) : createCommentVNode("", true),
        createElementVNode("view", _hoisted_2, toDisplayString(_ctx.active) + " / " + toDisplayString(_ctx.images.length + _ctx.videos.length), 1)
      ])
    ]),
    _: 1
  }, 8, ["visible", "onClick"]);
}
var ImagePreview = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
class ImagePreviewOptions {
  constructor() {
    __publicField(this, "show", false);
    __publicField(this, "images", []);
    __publicField(this, "initNo", 1);
    __publicField(this, "paginationVisible", false);
    __publicField(this, "paginationColor", "");
    __publicField(this, "teleport", "body");
    __publicField(this, "onClose", () => {
    });
  }
}
class ImagePreviewFunction {
  constructor(_options) {
    __publicField(this, "options", new ImagePreviewOptions());
    let options = Object.assign(this.options, _options);
    let elWarp = document.body;
    let teleport = options.teleport;
    if (teleport != "body") {
      if (typeof teleport == "string") {
        elWarp = document.querySelector(teleport);
      } else {
        elWarp = options.teleport;
      }
    }
    const root = document.createElement("view");
    root.id = "imagepreview-" + new Date().getTime();
    const Wrapper = {
      setup() {
        options.teleport = `#${root.id}`;
        return () => {
          return h(ImagePreview, options);
        };
      }
    };
    const instance = createVNode(Wrapper);
    elWarp.appendChild(root);
    render(instance, root);
  }
}
const _ImagePreview = function(options) {
  return new ImagePreviewFunction(options);
};
_ImagePreview.install = (app) => {
  app.use(ImagePreview);
  app.config.globalProperties.$imagepreview = _ImagePreview;
};
export { ImagePreview, ImagePreviewOptions, _ImagePreview as default };
