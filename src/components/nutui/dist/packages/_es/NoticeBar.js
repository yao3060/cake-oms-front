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
/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { h, ref, reactive, computed, watch, onMounted, onActivated, onDeactivated, onUnmounted, toRefs, resolveComponent, openBlock, createElementBlock, normalizeClass, withDirectives, normalizeStyle, createBlock, createCommentVNode, createElementVNode, renderSlot, createTextVNode, toDisplayString, withModifiers, createVNode, vShow, Fragment, renderList } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("noticebar");
const _sfc_main = create({
  props: {
    direction: {
      type: String,
      default: "across"
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    standTime: {
      type: Number,
      default: 1e3
    },
    complexAm: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 40
    },
    text: {
      type: String,
      default: ""
    },
    closeMode: {
      type: Boolean,
      default: false
    },
    wrapable: {
      type: Boolean,
      default: false
    },
    leftIcon: { type: String, default: "" },
    color: {
      type: String,
      default: ""
    },
    background: {
      type: String,
      default: ""
    },
    delay: {
      type: [String, Number],
      default: 1
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 50
    }
  },
  components: {
    ScrollItem: function(props) {
      props.item.props.style = props.style;
      return h(props.item);
    }
  },
  emits: ["click", "close"],
  setup(props, { emit, slots }) {
    console.log("componentName", componentName);
    const wrap = ref(null);
    const content = ref(null);
    const state = reactive({
      wrapWidth: 0,
      firstRound: true,
      duration: 0,
      offsetWidth: 0,
      showNoticeBar: true,
      animationClass: "",
      animate: false,
      scrollList: [],
      distance: 0,
      timer: null,
      keepAlive: false
    });
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const iconShow = computed(() => {
      if (props.leftIcon == "close") {
        return false;
      } else {
        return true;
      }
    });
    const barStyle = computed(() => {
      let style = {};
      props.color && (style.color = props.color);
      props.background && (style.background = props.background);
      if (props.direction == "vertical") {
        style.height = `${props.height}px`;
      }
      return style;
    });
    const contentStyle = computed(() => {
      return {
        paddingLeft: state.firstRound ? 0 : state.wrapWidth + "px",
        animationDelay: (state.firstRound ? props.delay : 0) + "s",
        animationDuration: state.duration + "s"
      };
    });
    const iconBg = computed(() => {
      let iconBg2 = "";
      if (props.leftIcon) {
        iconBg2 = props.leftIcon;
      }
      return iconBg2;
    });
    const horseLampStyle = computed(() => {
      let styles = {};
      if (props.complexAm) {
        styles = {
          transform: `translateY(${state.distance}px)`
        };
      } else {
        if (state.animate) {
          let a = ~~(props.height / props.speed / 4);
          styles = {
            transition: `all ${a == 0 ? ~~(props.height / props.speed) : a}s`,
            "margin-top": `-${props.height}px`
          };
        }
      }
      return styles;
    });
    watch(() => props.text, (value) => {
      initScrollWrap(value);
    });
    watch(() => props.list, (value) => {
      state.scrollList = [].concat(value);
    });
    const initScrollWrap = (value) => {
      if (state.showNoticeBar == false) {
        return;
      }
      setTimeout(() => {
        if (!wrap.value || !content.value) {
          return;
        }
        const wrapWidth = wrap.value.getBoundingClientRect().width;
        const offsetWidth = content.value.getBoundingClientRect().width;
        if (props.scrollable && offsetWidth > wrapWidth) {
          state.wrapWidth = wrapWidth;
          state.offsetWidth = offsetWidth;
          state.duration = offsetWidth / props.speed;
          state.animationClass = "play";
        } else {
          state.animationClass = "";
        }
      });
    };
    const handleClick = (event) => {
      emit("click", event);
    };
    const onClickIcon = (event) => {
      state.showNoticeBar = !props.closeMode;
      emit("close", event);
    };
    const onAnimationEnd = () => {
      state.firstRound = false;
      setTimeout(() => {
        state.duration = (state.offsetWidth + state.wrapWidth) / props.speed;
        state.animationClass = "play-infinite";
      }, 0);
    };
    const startRollEasy = () => {
      showhorseLamp();
      state.timer = setInterval(showhorseLamp, ~~(props.height / props.speed / 4 * 1e3) + props.standTime);
    };
    const showhorseLamp = () => {
      state.animate = true;
      setTimeout(() => {
        state.scrollList.push(state.scrollList[0]);
        state.scrollList.shift();
        state.animate = false;
      }, ~~(props.height / props.speed / 4 * 1e3));
    };
    const startRoll = () => {
      state.timer = setInterval(() => {
        let chunk = 100;
        for (let i = 0; i < chunk; i++) {
          scroll(i, i < chunk - 1 ? false : true);
        }
      }, props.standTime + 100 * props.speed);
    };
    const scroll = (n, last) => {
      setTimeout(() => {
        state.distance -= props.height / 100;
        if (last) {
          state.scrollList.push(state.scrollList[0]);
          state.scrollList.shift();
          state.distance = 0;
        }
      }, n * props.speed);
    };
    const go = (item) => {
      emit("click", item);
    };
    const handleClickIcon = () => {
      emit("close", state.scrollList[0]);
    };
    onMounted(() => {
      console.log(props.direction);
      if (props.direction == "vertical") {
        if (slots.default) {
          state.scrollList = [].concat(slots.default()[0].children);
        } else {
          state.scrollList = [].concat(props.list);
        }
        console.log(state.scrollList);
        setTimeout(() => {
          props.complexAm ? startRoll() : startRollEasy();
        }, props.standTime);
      } else {
        initScrollWrap(props.text);
      }
    });
    onActivated(() => {
      if (state.keepAlive) {
        state.keepAlive = false;
      }
    });
    onDeactivated(() => {
      state.keepAlive = true;
      clearInterval(state.timer);
    });
    onUnmounted(() => {
      clearInterval(state.timer);
    });
    return __spreadProps(__spreadValues(__spreadValues({}, toRefs(props)), toRefs(state)), {
      classes,
      iconShow,
      barStyle,
      contentStyle,
      iconBg,
      horseLampStyle,
      wrap,
      content,
      handleClick,
      onClickIcon,
      onAnimationEnd,
      go,
      handleClickIcon,
      slots
    });
  }
});
const _hoisted_1 = {
  ref: "wrap",
  class: "wrap"
};
const _hoisted_2 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  const _component_ScrollItem = resolveComponent("ScrollItem");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    _ctx.direction == "across" ? withDirectives((openBlock(), createElementBlock("view", {
      key: 0,
      class: normalizeClass(["nut-noticebar-page", { withicon: _ctx.closeMode, close: _ctx.closeMode, wrapable: _ctx.wrapable }]),
      style: normalizeStyle(_ctx.barStyle),
      onClick: _cache[3] || (_cache[3] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
    }, [
      _ctx.iconShow ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: "left-icon",
        style: normalizeStyle({ "background-image": `url(${_ctx.iconBg})` })
      }, [
        !_ctx.iconBg ? (openBlock(), createBlock(_component_nut_icon, {
          key: 0,
          name: "notice",
          size: "16",
          color: _ctx.color
        }, null, 8, ["color"])) : createCommentVNode("", true)
      ], 4)) : createCommentVNode("", true),
      createElementVNode("view", _hoisted_1, [
        createElementVNode("view", {
          ref: "content",
          class: normalizeClass(["content", [_ctx.animationClass, { "nut-ellipsis": !_ctx.scrollable && !_ctx.wrapable }]]),
          style: normalizeStyle(_ctx.contentStyle),
          onAnimationend: _cache[0] || (_cache[0] = (...args) => _ctx.onAnimationEnd && _ctx.onAnimationEnd(...args)),
          onWebkitAnimationEnd: _cache[1] || (_cache[1] = (...args) => _ctx.onAnimationEnd && _ctx.onAnimationEnd(...args))
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode("1" + toDisplayString(_ctx.text), 1)
          ])
        ], 38)
      ], 512),
      _ctx.closeMode ? (openBlock(), createElementBlock("view", {
        key: 1,
        class: "right-icon",
        onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.onClickIcon && _ctx.onClickIcon(...args), ["stop"]))
      }, [
        createVNode(_component_nut_icon, {
          name: "close",
          color: _ctx.color
        }, null, 8, ["color"])
      ])) : createCommentVNode("", true)
    ], 6)), [
      [vShow, _ctx.showNoticeBar]
    ]) : createCommentVNode("", true),
    _ctx.scrollList.length > 0 && _ctx.direction == "vertical" ? (openBlock(), createElementBlock("view", {
      key: 1,
      class: "nut-noticebar-vertical",
      style: normalizeStyle(_ctx.barStyle)
    }, [
      _ctx.slots.default ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: "horseLamp_list",
        style: normalizeStyle(_ctx.horseLampStyle)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.scrollList, (item, index2) => {
          return openBlock(), createBlock(_component_ScrollItem, {
            key: index2,
            style: normalizeStyle({ height: _ctx.height + "px", "line-height": _ctx.height + "px" }),
            item
          }, null, 8, ["style", "item"]);
        }), 128))
      ], 4)) : (openBlock(), createElementBlock("ul", {
        key: 1,
        class: "horseLamp_list",
        style: normalizeStyle(_ctx.horseLampStyle)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.scrollList, (item, index2) => {
          return openBlock(), createElementBlock("li", {
            class: "horseLamp_list_item",
            key: index2,
            style: normalizeStyle({ height: _ctx.height }),
            onClick: ($event) => _ctx.go(item)
          }, toDisplayString(item), 13, _hoisted_2);
        }), 128))
      ], 4)),
      createElementVNode("view", {
        class: "go",
        onClick: _cache[4] || (_cache[4] = ($event) => !_ctx.slots.rightIcon && _ctx.handleClickIcon())
      }, [
        _ctx.slots.rightIcon ? renderSlot(_ctx.$slots, "rightIcon", { key: 0 }) : _ctx.closeMode ? (openBlock(), createBlock(_component_nut_icon, {
          key: 1,
          type: "cross",
          color: _ctx.color,
          size: "11px"
        }, null, 8, ["color"])) : createCommentVNode("", true)
      ])
    ], 4)) : createCommentVNode("", true)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
