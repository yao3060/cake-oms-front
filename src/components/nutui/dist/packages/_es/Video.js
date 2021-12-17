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
import { reactive, ref, computed, watch, nextTick, onMounted, toRefs, openBlock, createElementBlock, createElementVNode, createCommentVNode, withDirectives, vShow, normalizeClass, toDisplayString, normalizeStyle, withModifiers } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const throttle = (func, wait, type) => {
  if (type === 1) {
    var previous = 0;
  } else if (type === 2) {
    var timeout;
  }
  return function() {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
};
const { create } = createComponent("video");
const _sfc_main = create({
  props: {
    source: {
      type: Object,
      default: {}
    },
    options: {
      type: Object,
      default: {
        autoplay: false,
        volume: 0.5,
        poster: "",
        loop: false,
        controls: true,
        muted: false,
        disabled: false,
        playsinline: false,
        touchPlay: false,
        preload: ""
      },
      required: true
    },
    model: {
      type: String,
      default: ""
    }
  },
  components: {},
  emits: ["click", "play", "pause", "playend"],
  setup(props, { emit }) {
    const state = reactive({
      videoElm: null,
      initial: true,
      showToolbox: false,
      player: {
        $player: null,
        pos: null
      },
      progressBar: {
        progressElm: null,
        pos: null
      },
      videoSet: {
        loaded: 0,
        displayTime: "00:00",
        totalTime: "00:00",
        progress: {
          width: 0,
          current: 0
        }
      },
      state: {
        controlShow: true,
        vol: 0.5,
        currentTime: 0,
        fullScreen: false,
        playing: false,
        isLoading: false,
        isEnd: false,
        isError: false,
        isMuted: false
      },
      showTouchMask: false
    });
    const root = ref();
    const isDisabled = computed(() => {
      return props.options.disabled;
    });
    watch(props.source, (newValue) => {
      if (newValue.src) {
        nextTick(() => {
          state.videoElm.load();
        });
      }
    });
    watch(props.options, (newValue) => {
      state.state.isMuted = newValue.muted ? newValue.muted : false;
    }, { immediate: true });
    const init = () => {
      state.videoElm = root.value;
      if (props.options.autoplay) {
        state.videoElm.play();
      }
      if (props.options.touchPlay) {
        state.showTouchMask = true;
      }
      if (props.options.playsinline) {
        state.videoElm.setAttribute("playsinline", props.options.playsinline);
        state.videoElm.setAttribute("webkit-playsinline", props.options.playsinline);
        state.videoElm.setAttribute("x5-video-player-type", "h5-page");
        state.videoElm.setAttribute("x5-video-player-fullscreen", false);
      }
      volumeHandle();
      if (state.showToolbox) {
        customerInit();
      } else {
        state.videoElm.addEventListener("play", () => {
          state.state.playing = true;
          emit("play", state.videoElm);
        });
        state.videoElm.addEventListener("pause", () => {
          state.state.playing = false;
          emit("pause", state.videoElm);
        });
        state.videoElm.addEventListener("ended", playEnded);
        state.videoElm.addEventListener("timeupdate", throttle(getPlayTime, 100, 1));
      }
    };
    const customerInit = () => {
      const $player = root.value;
      const $progress = root.value.getElementsByClassName("progress")[0];
      state.player.$player = $player;
      state.progressBar.progressElm = $progress;
      state.progressBar.pos = $progress.getBoundingClientRect();
      state.videoSet.progress.width = Math.round($progress.getBoundingClientRect().width);
    };
    const play = () => {
      if (props.options.autoplay && props.options.disabled) {
        state.state.playing = true;
        return false;
      }
      state.state.playing = !state.state.playing;
      if (state.videoElm) {
        if (state.state.playing) {
          try {
            state.videoElm.play();
            state.videoElm.addEventListener("progress", () => {
              getLoadTime();
            });
            state.videoElm.addEventListener("timeupdate", throttle(getPlayTime, 100, 1));
            state.videoElm.addEventListener("ended", playEnded);
            emit("play", state.videoElm);
          } catch (e) {
            handleError();
          }
        } else {
          state.videoElm.pause();
          emit("pause", state.videoElm);
        }
      }
    };
    const timeFormat = (t) => {
      var h = Math.floor(t / 3600);
      if (h < 10) {
        h = "0" + h;
      }
      var m = Math.floor(t % 3600 / 60);
      if (m < 10) {
        m = "0" + m;
      }
      var s = Math.round(t % 3600 % 60);
      if (s < 10) {
        s = "0" + s;
      }
      var str = "";
      if (h != 0) {
        str = h + ":" + m + ":" + s;
      } else {
        str = m + ":" + s;
      }
      return str;
    };
    const getLoadTime = () => {
      if (state.videoSet.loaded)
        state.videoSet.loaded = state.videoElm.buffered.end(0) / state.videoElm.duration * 100;
    };
    const getPlayTime = () => {
      const percent = state.videoElm.currentTime / state.videoElm.duration;
      state.videoSet.progress.current = Math.round(state.videoSet.progress.width * percent);
      state.videoSet.totalTime = timeFormat(state.videoElm.duration);
      state.videoSet.displayTime = timeFormat(state.videoElm.currentTime);
    };
    const playEnded = () => {
      state.state.playing = false;
      state.state.isEnd = true;
      state.videoSet.displayTime = "00:00";
      state.videoSet.progress.current = 0;
      state.videoElm.currentTime = 0;
      emit("playend", state.videoElm);
    };
    const handleError = () => {
      state.state.isError = true;
    };
    const volumeHandle = () => {
      state.state.vol = props.options.volume;
    };
    const handleMuted = () => {
      state.state.isMuted = !state.state.isMuted;
      state.videoElm.muted = state.state.isMuted;
    };
    const touchSlidSrart = () => {
    };
    const touchSlidMove = (e) => {
      let currentX = e.targetTouches[0].pageX;
      let offsetX = currentX - state.progressBar.pos.left;
      if (offsetX <= 0) {
        offsetX = 0;
      }
      if (offsetX >= state.videoSet.progress.width) {
        offsetX = state.videoSet.progress.width;
      }
      state.videoSet.progress.current = offsetX;
      let percent = state.videoSet.progress.current / state.videoSet.progress.width;
      state.videoElm.duration && setPlayTime(percent, state.videoElm.duration);
    };
    const touchSlidEnd = (e) => {
      let currentX = e.changedTouches[0].pageX;
      let offsetX = currentX - state.progressBar.pos.left;
      state.videoSet.progress.current = offsetX;
      let percent = offsetX / state.videoSet.progress.width;
      state.videoElm.duration && setPlayTime(percent, state.videoElm.duration);
    };
    const setPlayTime = (percent, totalTime) => {
      state.videoElm.currentTime = Math.floor(percent * totalTime);
    };
    const retry = () => {
      state.state.isError = false;
      init();
    };
    const fullScreen = () => {
      if (!state.state.fullScreen) {
        state.state.fullScreen = true;
        state.videoElm.webkitRequestFullScreen();
      } else {
        state.state.fullScreen = false;
        document.webkitCancelFullScreen();
      }
    };
    onMounted(() => {
      init();
    });
    return __spreadProps(__spreadValues(__spreadValues({
      root
    }, toRefs(props)), toRefs(state)), {
      handleError,
      isDisabled,
      play,
      handleMuted,
      touchSlidSrart,
      touchSlidMove,
      touchSlidEnd,
      retry,
      fullScreen
    });
  }
});
const _hoisted_1 = {
  class: "nut-video",
  ref: "videocon"
};
const _hoisted_2 = ["muted", "autoplay", "loop", "poster", "controls", "preload"];
const _hoisted_3 = ["src", "type"];
const _hoisted_4 = { class: "current-time" };
const _hoisted_5 = { class: "progress-container" };
const _hoisted_6 = {
  class: "progress",
  ref: "progressBar"
};
const _hoisted_7 = /* @__PURE__ */ createElementVNode("div", { class: "move-handle" }, null, -1);
const _hoisted_8 = [
  _hoisted_7
];
const _hoisted_9 = {
  class: "played",
  ref: "playedBar"
};
const _hoisted_10 = { class: "duration-time" };
const _hoisted_11 = { class: "nut-video-error" };
const _hoisted_12 = /* @__PURE__ */ createElementVNode("p", { class: "lose" }, "\u89C6\u9891\u52A0\u8F7D\u5931\u8D25", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("video", {
      ref: "root",
      class: "nut-video-player",
      muted: _ctx.options.muted,
      autoplay: _ctx.options.autoplay,
      loop: _ctx.options.loop,
      poster: _ctx.options.poster,
      controls: _ctx.options.controls,
      preload: _ctx.options.preload,
      onError: _cache[0] || (_cache[0] = (...args) => _ctx.handleError && _ctx.handleError(...args))
    }, [
      createElementVNode("source", {
        src: _ctx.source.src,
        type: _ctx.source.type
      }, null, 8, _hoisted_3)
    ], 40, _hoisted_2),
    _ctx.showToolbox && !_ctx.isDisabled ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "playing-mask",
      ref: "touchMask",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.play && _ctx.play(...args))
    }, null, 512)) : createCommentVNode("", true),
    _ctx.showToolbox && !_ctx.isDisabled ? withDirectives((openBlock(), createElementBlock("div", {
      key: 1,
      class: "nut-video-play-btn",
      ref: "palyBtn",
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.play && _ctx.play(...args))
    }, null, 512)), [
      [vShow, !_ctx.state.playing]
    ]) : createCommentVNode("", true),
    withDirectives(createElementVNode("div", {
      class: normalizeClass(["nut-video-controller", { "show-control": !_ctx.state.playing, "hide-control": _ctx.state.playing }])
    }, [
      createElementVNode("div", {
        class: "control-play-btn",
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.play && _ctx.play(...args))
      }),
      createElementVNode("div", _hoisted_4, toDisplayString(_ctx.videoSet.displayTime), 1),
      createElementVNode("div", _hoisted_5, [
        createElementVNode("div", _hoisted_6, [
          createElementVNode("div", {
            class: "buffered",
            style: normalizeStyle({ width: `${_ctx.videoSet.loaded}%` })
          }, null, 4),
          createElementVNode("div", {
            class: "video-ball",
            style: normalizeStyle({
              transform: `translate3d(${_ctx.videoSet.progress.current}px, -50%, 0)`
            }),
            onTouchmove: _cache[4] || (_cache[4] = withModifiers(($event) => _ctx.touchSlidMove($event), ["stop", "prevent"])),
            onTouchstart: _cache[5] || (_cache[5] = withModifiers(($event) => _ctx.touchSlidSrart($event), ["stop"])),
            onTouchend: _cache[6] || (_cache[6] = withModifiers(($event) => _ctx.touchSlidEnd($event), ["stop"]))
          }, _hoisted_8, 36),
          createElementVNode("div", _hoisted_9, null, 512)
        ], 512)
      ]),
      createElementVNode("div", _hoisted_10, toDisplayString(_ctx.videoSet.totalTime), 1),
      createElementVNode("div", {
        class: normalizeClass(["volume", { muted: _ctx.state.isMuted }]),
        onClick: _cache[7] || (_cache[7] = (...args) => _ctx.handleMuted && _ctx.handleMuted(...args))
      }, null, 2),
      createElementVNode("div", {
        class: "fullscreen-icon",
        onClick: _cache[8] || (_cache[8] = (...args) => _ctx.fullScreen && _ctx.fullScreen(...args))
      })
    ], 2), [
      [vShow, _ctx.showToolbox && !_ctx.isDisabled]
    ]),
    withDirectives(createElementVNode("div", _hoisted_11, [
      _hoisted_12,
      createElementVNode("p", {
        class: "retry",
        onClick: _cache[9] || (_cache[9] = (...args) => _ctx.retry && _ctx.retry(...args))
      }, "\u70B9\u51FB\u91CD\u8BD5")
    ], 512), [
      [vShow, _ctx.state.isError]
    ])
  ], 512);
}
var Video = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Video as default };
