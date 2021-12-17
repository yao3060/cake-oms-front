var __defProp = Object.defineProperty;
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
/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { ref, reactive, watch, toRefs, openBlock, createElementBlock, normalizeClass, createElementVNode, Fragment, toDisplayString, createCommentVNode, renderList, withModifiers, resolveComponent, createBlock, withCtx, createVNode } from "vue";
import { c as createComponent } from "./component.js";
import { r as requestAniFrame } from "./raf.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const Utils = {
  isLeapYear: function(y) {
    return y % 4 == 0 && y % 100 != 0 || y % 400 == 0;
  },
  getWhatDay: function(year, month, day) {
    const date = new Date(year + "/" + month + "/" + day);
    const index2 = date.getDay();
    const dayNames = [
      "\u661F\u671F\u65E5",
      "\u661F\u671F\u4E00",
      "\u661F\u671F\u4E8C",
      "\u661F\u671F\u4E09",
      "\u661F\u671F\u56DB",
      "\u661F\u671F\u4E94",
      "\u661F\u671F\u516D"
    ];
    return dayNames[index2];
  },
  getMonthPreDay: function(year, month) {
    const date = new Date(year + "/" + month + "/01");
    let day = date.getDay();
    if (day == 0) {
      day = 7;
    }
    return day;
  },
  getMonthDays: function(year, month) {
    if (/^0/.test(month)) {
      month = month.split("")[1];
    }
    return [
      0,
      31,
      this.isLeapYear(Number(year)) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ][month];
  },
  getNumTwoBit: function(n) {
    n = Number(n);
    return (n > 9 ? "" : "0") + n;
  },
  date2Str: function(date, split) {
    split = split || "-";
    const y = date.getFullYear();
    const m = this.getNumTwoBit(date.getMonth() + 1);
    const d = this.getNumTwoBit(date.getDate());
    return [y, m, d].join(split);
  },
  getDay: function(i) {
    i = i || 0;
    let date = new Date();
    const diff = i * (1e3 * 60 * 60 * 24);
    date = new Date(date.getTime() + diff);
    return this.date2Str(date);
  },
  compareDate: function(date1, date2) {
    const startTime = new Date(date1.replace("-", "/").replace("-", "/"));
    const endTime = new Date(date2.replace("-", "/").replace("-", "/"));
    if (startTime >= endTime) {
      return false;
    }
    return true;
  },
  isEqual: function(date1, date2) {
    const startTime = new Date(date1).getTime();
    const endTime = new Date(date2).getTime();
    if (startTime == endTime) {
      return true;
    }
    return false;
  }
};
const { create: create$1 } = createComponent("calendar-item");
const _sfc_main$1 = create$1({
  props: {
    type: {
      type: String,
      default: "one"
    },
    isAutoBackFill: {
      type: Boolean,
      default: false
    },
    poppable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "\u65E5\u5386\u9009\u62E9"
    },
    defaultValue: {
      type: String,
      default: null
    },
    startDate: {
      type: String,
      default: Utils.getDay(0)
    },
    endDate: {
      type: String,
      default: Utils.getDay(365)
    }
  },
  emits: ["choose", "update", "close"],
  setup(props, { emit }) {
    const weeks = ref(["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"]);
    const months = ref(null);
    const monthsPanel = ref(null);
    const weeksPanel = ref(null);
    const state = reactive({
      yearMonthTitle: "",
      currDate: "",
      unLoadPrev: false,
      touchParams: {
        startY: 0,
        endY: 0,
        startTime: 0,
        endTime: 0,
        lastY: 0,
        lastTime: 0
      },
      transformY: 0,
      translateY: 0,
      scrollDistance: 0,
      defaultData: [],
      chooseData: [],
      monthsData: [],
      dayPrefix: "calendar-month-day",
      startData: "",
      endData: "",
      isRange: props.type === "range",
      timer: 0
    });
    const splitDate = (date) => {
      return date.split("-");
    };
    const isStart = (currDate) => {
      return Utils.isEqual(state.currDate[0], currDate);
    };
    const isEnd = (currDate) => {
      return Utils.isEqual(state.currDate[1], currDate);
    };
    const getCurrDate = (day, month, isRange) => {
      return isRange ? month.curData[3] + "-" + month.curData[4] + "-" + Utils.getNumTwoBit(+day.day) : month.curData[0] + "-" + month.curData[1] + "-" + Utils.getNumTwoBit(+day.day);
    };
    const getClass = (day, month, isRange) => {
      const currDate = getCurrDate(day, month, isRange);
      if (day.type == "curr") {
        if (!state.isRange && Utils.isEqual(state.currDate, currDate) || state.isRange && (isStart(currDate) || isEnd(currDate))) {
          return `${state.dayPrefix}-active`;
        } else if (props.startDate && Utils.compareDate(currDate, props.startDate) || props.endDate && Utils.compareDate(props.endDate, currDate)) {
          return `${state.dayPrefix}-disabled`;
        } else if (state.isRange && Array.isArray(state.currDate) && Object.values(state.currDate).length == 2 && Utils.compareDate(state.currDate[0], currDate) && Utils.compareDate(currDate, state.currDate[1])) {
          return `${state.dayPrefix}-choose`;
        } else {
          return null;
        }
      } else {
        return `${state.dayPrefix}-disabled`;
      }
    };
    const confirm = () => {
      if (state.isRange && state.chooseData.length == 2 || !state.isRange) {
        emit("choose", state.chooseData);
        if (props.poppable) {
          emit("update");
        }
      }
    };
    const chooseDay = (day, month, isFirst, isRange) => {
      if (getClass(day, month, isRange) != `${state.dayPrefix}-disabled`) {
        let days = [...month.curData];
        days = isRange ? days.splice(3) : days.splice(0, 3);
        days[2] = typeof day.day == "number" ? Utils.getNumTwoBit(day.day) : day.day;
        days[3] = `${days[0]}-${days[1]}-${days[2]}`;
        days[4] = Utils.getWhatDay(+days[0], +days[1], +days[2]);
        if (!state.isRange) {
          state.currDate = days[3];
          state.chooseData = [...days];
        } else {
          if (Object.values(state.currDate).length == 2) {
            state.currDate = [days[3]];
          } else {
            if (Utils.compareDate(state.currDate[0], days[3])) {
              Array.isArray(state.currDate) && state.currDate.push(days[3]);
            } else {
              Array.isArray(state.currDate) && state.currDate.unshift(days[3]);
            }
          }
          if (state.chooseData.length == 2 || !state.chooseData.length) {
            state.chooseData = [...days];
          } else {
            if (Utils.compareDate(state.chooseData[3], days[3])) {
              state.chooseData = [[...state.chooseData], [...days]];
            } else {
              state.chooseData = [[...days], [...state.chooseData]];
            }
          }
        }
        if (props.isAutoBackFill && !isFirst) {
          confirm();
        }
      }
    };
    const getCurrData = (type) => {
      const monthData = type == "prev" ? state.monthsData[0] : state.monthsData[state.monthsData.length - 1];
      let year = parseInt(monthData.curData[0]);
      let month = parseInt(monthData.curData[1].toString().replace(/^0/, ""));
      switch (type) {
        case "prev":
          month == 1 && (year -= 1);
          month = month == 1 ? 12 : --month;
          break;
        case "next":
          month == 12 && (year += 1);
          month = month == 12 ? 1 : ++month;
          break;
      }
      return [
        year,
        Utils.getNumTwoBit(month),
        Utils.getMonthDays(String(year), String(month))
      ];
    };
    const getDaysStatus = (days, type) => {
      if (type == "prev" && days >= 7) {
        days -= 7;
      }
      return Array.from(Array(days), (v, k) => {
        return {
          day: k + 1,
          type
        };
      });
    };
    const getMonth = (curData, type) => {
      const preMonthDays = Utils.getMonthPreDay(+curData[0], +curData[1]);
      const currMonthDays = Utils.getMonthDays(curData[0], curData[1]);
      const title = {
        year: curData[0],
        month: curData[1]
      };
      const monthInfo = {
        curData,
        title: `${title.year}\u5E74${title.month}\u6708`,
        monthData: [
          ...getDaysStatus(preMonthDays, "prev"),
          ...getDaysStatus(currMonthDays, "curr")
        ]
      };
      if (type == "next") {
        if (!state.endData || !Utils.compareDate(`${state.endData[0]}-${state.endData[1]}-${Utils.getMonthDays(state.endData[0], state.endData[1])}`, `${curData[0]}-${curData[1]}-${curData[2]}`)) {
          state.monthsData.push(monthInfo);
        }
      } else {
        if (!state.startData || !Utils.compareDate(`${curData[0]}-${curData[1]}-${curData[2]}`, `${state.startData[0]}-${state.startData[1]}-01`)) {
          state.monthsData.unshift(monthInfo);
        } else {
          state.unLoadPrev = true;
        }
      }
    };
    const initData = () => {
      state.startData = props.startDate ? splitDate(props.startDate) : "";
      state.endData = props.endDate ? splitDate(props.endDate) : "";
      if (!props.defaultValue) {
        state.currDate = state.isRange ? [Utils.date2Str(new Date()), Utils.getDay(1)] : Utils.date2Str(new Date());
      } else {
        state.currDate = state.isRange ? [...props.defaultValue] : props.defaultValue;
      }
      if (state.isRange && Array.isArray(state.currDate)) {
        if (props.startDate && Utils.compareDate(state.currDate[0], props.startDate)) {
          state.currDate.splice(0, 1, props.startDate);
        }
        if (props.endDate && Utils.compareDate(props.endDate, state.currDate[1])) {
          state.currDate.splice(1, 1, props.endDate);
        }
        state.defaultData = [
          ...splitDate(state.currDate[0]),
          ...splitDate(state.currDate[1])
        ];
      } else {
        if (props.startDate && Utils.compareDate(state.currDate, props.startDate)) {
          state.currDate = props.startDate;
        } else if (props.endDate && !Utils.compareDate(state.currDate, props.endDate)) {
          state.currDate = props.endDate;
        }
        state.defaultData = [...splitDate(state.currDate)];
      }
      getMonth(state.defaultData, "next");
      state.yearMonthTitle = state.monthsData[0].title;
      let i = 1;
      do {
        getMonth(getCurrData("next"), "next");
      } while (i++ < 4);
      if (state.isRange) {
        chooseDay({ day: state.defaultData[2], type: "curr" }, state.monthsData[0], true);
        chooseDay({ day: state.defaultData[5], type: "curr" }, state.monthsData[0], true, true);
      } else {
        chooseDay({ day: state.defaultData[2], type: "curr" }, state.monthsData[0], true);
      }
    };
    const isActive = (day, month) => {
      return state.isRange && day.type == "curr" && getClass(day, month) == "calendar-month-day-active";
    };
    const isStartTip = (day, month) => {
      if (isActive(day, month)) {
        return isStart(getCurrDate(day, month));
      } else {
        return false;
      }
    };
    const isEndTip = (day, month) => {
      return isActive(day, month);
    };
    const isCurrDay = (month, day) => {
      const date = `${month.curData[0]}-${month.curData[1]}-${day}`;
      return Utils.isEqual(date, Utils.date2Str(new Date()));
    };
    const loadScroll = () => {
      if (!props.poppable) {
        return false;
      }
      requestAniFrame(() => {
        if ((weeksPanel == null ? void 0 : weeksPanel.value) && (monthsPanel == null ? void 0 : monthsPanel.value)) {
          const top = weeksPanel == null ? void 0 : weeksPanel.value.getBoundingClientRect().bottom;
          const monthsDoms = monthsPanel.value.getElementsByClassName("calendar-month");
          for (let i = 0; i < monthsDoms.length; i++) {
            if (monthsDoms[i].getBoundingClientRect().top <= top && monthsDoms[i].getBoundingClientRect().bottom >= top) {
              state.yearMonthTitle = state.monthsData[i].title;
            } else if (state.scrollDistance === 0) {
              state.yearMonthTitle = state.monthsData[0].title;
            }
          }
        }
      });
    };
    const setTransform = (translateY = 0, type, time = 1e3) => {
      if (monthsPanel == null ? void 0 : monthsPanel.value) {
        if (type === "end") {
          monthsPanel.value.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
          clearTimeout(state.timer);
          state.timer = setTimeout(() => {
            loadScroll();
          }, time);
        } else {
          monthsPanel.value.style.webkitTransition = "";
          loadScroll();
        }
        monthsPanel.value.style.webkitTransform = `translateY(${translateY}px)`;
        state.scrollDistance = translateY;
      }
    };
    const setMove = (move, type, time) => {
      var _a, _b;
      let updateMove = move + state.transformY;
      const h = ((_a = months.value) == null ? void 0 : _a.offsetHeight) || 0;
      const offsetHeight = ((_b = monthsPanel.value) == null ? void 0 : _b.offsetHeight) || 0;
      if (type === "end") {
        if (updateMove > 0) {
          updateMove = 0;
        }
        if (updateMove < 0 && updateMove < -offsetHeight + h) {
          updateMove = -offsetHeight + h;
        }
        if (offsetHeight <= h && state.monthsData.length == 1) {
          updateMove = 0;
        }
        setTransform(updateMove, type, time);
      } else {
        if (updateMove > 0 && updateMove > 100) {
          updateMove = 100;
        }
        if (updateMove < -offsetHeight + h - 100 && state.monthsData.length > 1) {
          updateMove = -offsetHeight + h - 100;
        }
        if (updateMove < 0 && updateMove < -100 && state.monthsData.length == 1) {
          updateMove = -100;
        }
        setTransform(updateMove);
      }
    };
    const touchStart = (event) => {
      const changedTouches = event.changedTouches[0];
      state.touchParams.startY = changedTouches.pageY;
      state.touchParams.startTime = event.timeStamp || Date.now();
      state.transformY = state.scrollDistance;
    };
    const touchMove = (event) => {
      const changedTouches = event.changedTouches[0];
      state.touchParams.lastY = changedTouches.pageY;
      state.touchParams.lastTime = event.timeStamp || Date.now();
      const move = state.touchParams.lastY - state.touchParams.startY;
      if (Math.abs(move) < 5) {
        return false;
      }
      setMove(move);
    };
    const touchEnd = (event) => {
      var _a, _b;
      const changedTouches = event.changedTouches[0];
      state.touchParams.lastY = changedTouches.pageY;
      state.touchParams.lastTime = event.timeStamp || Date.now();
      let move = state.touchParams.lastY - state.touchParams.startY;
      if (Math.abs(move) < 5) {
        return false;
      }
      const updateMove = move + state.transformY;
      const h = ((_a = months.value) == null ? void 0 : _a.offsetHeight) || 0;
      const offsetHeight = ((_b = monthsPanel.value) == null ? void 0 : _b.offsetHeight) || 0;
      if (updateMove > 0) {
        getMonth(getCurrData("prev"), "prev");
      } else if (updateMove < 0 && updateMove < -offsetHeight + (Math.abs(move) > h ? Math.abs(move) : h) * 5) {
        getMonth(getCurrData("next"), "next");
        if (Math.abs(move) >= 300) {
          getMonth(getCurrData("next"), "next");
        }
      }
      let moveTime = state.touchParams.lastTime - state.touchParams.startTime;
      if (moveTime <= 300) {
        move = move * 2;
        moveTime = moveTime + 1e3;
        setMove(move, "end", moveTime);
      } else {
        setMove(move, "end");
      }
    };
    const resetRender = () => {
      state.chooseData.splice(0);
      state.monthsData.splice(0);
      state.scrollDistance = 0;
      state.translateY = 0;
      setTransform(state.scrollDistance);
      initData();
    };
    initData();
    watch(() => props.defaultValue, (val) => {
      if (val) {
        resetRender();
      }
    });
    return __spreadValues(__spreadValues({
      weeks,
      touchStart,
      touchMove,
      touchEnd,
      getClass,
      isStartTip,
      isEndTip,
      chooseDay,
      isCurrDay,
      confirm,
      monthsPanel,
      months,
      weeksPanel
    }, toRefs(state)), toRefs(props));
  }
});
const _hoisted_1 = { class: "calendar-title" };
const _hoisted_2 = { class: "calendar-curr-month" };
const _hoisted_3 = {
  class: "calendar-weeks",
  ref: "weeksPanel"
};
const _hoisted_4 = {
  class: "calendar-months-panel",
  ref: "monthsPanel"
};
const _hoisted_5 = { class: "calendar-loading-tip" };
const _hoisted_6 = { class: "calendar-month-title" };
const _hoisted_7 = { class: "calendar-month-con" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { class: "calendar-day" };
const _hoisted_10 = {
  key: 0,
  class: "calendar-curr-tips"
};
const _hoisted_11 = {
  key: 1,
  class: "calendar-day-tip"
};
const _hoisted_12 = {
  key: 2,
  class: "calendar-day-tip"
};
const _hoisted_13 = {
  key: 0,
  class: "nut-calendar-footer"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(["nut-calendar nut-calendar-taro", {
      "nut-calendar-tile": !_ctx.poppable,
      "nut-calendar-nofooter": _ctx.isAutoBackFill
    }])
  }, [
    createElementVNode("view", {
      class: normalizeClass(["nut-calendar-header", { "nut-calendar-header-tile": !_ctx.poppable }])
    }, [
      _ctx.poppable ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createElementVNode("view", _hoisted_1, toDisplayString(_ctx.title), 1),
        createElementVNode("view", _hoisted_2, toDisplayString(_ctx.yearMonthTitle), 1)
      ], 64)) : createCommentVNode("", true),
      createElementVNode("view", _hoisted_3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.weeks, (item, index2) => {
          return openBlock(), createElementBlock("view", {
            class: "calendar-week-item",
            key: index2
          }, toDisplayString(item), 1);
        }), 128))
      ], 512)
    ], 2),
    createElementVNode("view", {
      class: "nut-calendar-content",
      ref: "months",
      onTouchstart: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.touchStart && _ctx.touchStart(...args), ["stop"])),
      onTouchmove: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.touchMove && _ctx.touchMove(...args), ["stop", "prevent"])),
      onTouchend: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.touchEnd && _ctx.touchEnd(...args), ["stop"]))
    }, [
      createElementVNode("view", _hoisted_4, [
        createElementVNode("view", _hoisted_5, toDisplayString(!_ctx.unLoadPrev ? "\u52A0\u8F7D\u4E0A\u4E00\u4E2A\u6708" : "\u6CA1\u6709\u66F4\u65E9\u6708\u4EFD"), 1),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.monthsData, (month, index2) => {
          return openBlock(), createElementBlock("view", {
            class: "calendar-month",
            key: index2
          }, [
            createElementVNode("view", _hoisted_6, toDisplayString(month.title), 1),
            createElementVNode("view", _hoisted_7, [
              createElementVNode("view", {
                class: normalizeClass(["calendar-month-item", _ctx.type === "range" ? "month-item-range" : ""])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(month.monthData, (day, i) => {
                  return openBlock(), createElementBlock("view", {
                    key: i,
                    class: normalizeClass(["calendar-month-day", _ctx.getClass(day, month)]),
                    onClick: ($event) => _ctx.chooseDay(day, month)
                  }, [
                    createElementVNode("view", _hoisted_9, toDisplayString(day.type == "curr" ? day.day : ""), 1),
                    _ctx.isCurrDay(month, day.day) ? (openBlock(), createElementBlock("view", _hoisted_10, "\u4ECA\u5929")) : createCommentVNode("", true),
                    _ctx.isStartTip(day, month) ? (openBlock(), createElementBlock("view", _hoisted_11, toDisplayString("\u5F00\u59CB"))) : _ctx.isEndTip(day, month) ? (openBlock(), createElementBlock("view", _hoisted_12, toDisplayString("\u7ED3\u675F"))) : createCommentVNode("", true)
                  ], 10, _hoisted_8);
                }), 128))
              ], 2)
            ])
          ]);
        }), 128))
      ], 512)
    ], 544),
    _ctx.poppable && !_ctx.isAutoBackFill ? (openBlock(), createElementBlock("view", _hoisted_13, [
      createElementVNode("view", {
        class: "calendar-confirm-btn",
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.confirm && _ctx.confirm(...args))
      }, "\u786E\u5B9A")
    ])) : createCommentVNode("", true)
  ], 2);
}
var CalendarItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const { create } = createComponent("calendar");
const _sfc_main = create({
  components: {
    [CalendarItem.name]: CalendarItem
  },
  props: {
    type: {
      type: String,
      default: "one"
    },
    isAutoBackFill: {
      type: Boolean,
      default: false
    },
    poppable: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "\u65E5\u5386\u9009\u62E9"
    },
    defaultValue: {
      type: String
    },
    startDate: {
      type: String,
      default: Utils.getDay(0)
    },
    endDate: {
      type: String,
      default: Utils.getDay(365)
    }
  },
  emits: ["choose", "close", "update:visible"],
  setup(props, { emit }) {
    const calendarRef = ref(null);
    const update = () => {
      emit("update:visible", false);
    };
    const close = () => {
      emit("close");
      emit("update:visible", false);
    };
    const choose = (param) => {
      close();
      emit("choose", param);
    };
    const closePopup = () => {
      close();
    };
    return {
      closePopup,
      update,
      close,
      choose,
      calendarRef
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_calendar_item = resolveComponent("nut-calendar-item");
  const _component_nut_popup = resolveComponent("nut-popup");
  return _ctx.poppable ? (openBlock(), createBlock(_component_nut_popup, {
    key: 0,
    visible: _ctx.visible,
    position: "bottom",
    round: "",
    closeable: true,
    onClickOverlay: _ctx.closePopup,
    onClickCloseIcon: _ctx.closePopup
  }, {
    default: withCtx(() => [
      createVNode(_component_nut_calendar_item, {
        props: "",
        ref: "calendarRef",
        type: _ctx.type,
        "is-auto-back-fill": _ctx.isAutoBackFill,
        poppable: _ctx.poppable,
        title: _ctx.title,
        "default-value": _ctx.defaultValue,
        "start-date": _ctx.startDate,
        "end-date": _ctx.endDate,
        onUpdate: _ctx.update,
        onClose: _ctx.close,
        onChoose: _ctx.choose
      }, null, 8, ["type", "is-auto-back-fill", "poppable", "title", "default-value", "start-date", "end-date", "onUpdate", "onClose", "onChoose"])
    ]),
    _: 1
  }, 8, ["visible", "onClickOverlay", "onClickCloseIcon"])) : (openBlock(), createBlock(_component_nut_calendar_item, {
    key: 1,
    type: _ctx.type,
    "is-auto-back-fill": _ctx.isAutoBackFill,
    poppable: _ctx.poppable,
    title: _ctx.title,
    "default-value": _ctx.defaultValue,
    "start-date": _ctx.startDate,
    "end-date": _ctx.endDate,
    onClose: _ctx.close,
    onChoose: _ctx.choose
  }, null, 8, ["type", "is-auto-back-fill", "poppable", "title", "default-value", "start-date", "end-date", "onClose", "onChoose"]));
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
