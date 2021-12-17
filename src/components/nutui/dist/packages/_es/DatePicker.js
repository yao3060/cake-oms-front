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
import { reactive, computed, onMounted, watch, toRefs, resolveComponent, openBlock, createBlock } from "vue";
import picker from "./Picker.js";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
import "./index2.js";
import "./Popup.js";
import "./OverLay.js";
import "./Icon.js";
import "./pxCheck.js";
const { componentName, create } = createComponent("datepicker");
const currentYear = new Date().getFullYear();
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" && !isNaN(val.getTime());
}
const zhCNType = {
  day: "\u65E5",
  year: "\u5E74",
  month: "\u6708",
  hour: "\u65F6",
  minute: "\u5206",
  seconds: "\u79D2"
};
const _sfc_main = create({
  components: {
    [picker.name]: picker
  },
  props: {
    modelValue: null,
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "date"
    },
    isShowChinese: {
      type: Boolean,
      default: true
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1),
      validator: isDate
    },
    maxDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31),
      validator: isDate
    }
  },
  emits: ["click", "update:visible", "confirm"],
  setup(props, { emit }) {
    const state = reactive({
      show: false,
      currentDate: new Date(),
      title: props.title
    });
    const formatValue = (value) => {
      if (!isDate(value)) {
        value = props.minDate;
      }
      let timestmp = Math.max(value.getTime(), props.minDate.getTime());
      timestmp = Math.min(timestmp, props.maxDate.getTime());
      return new Date(timestmp);
    };
    function getMonthEndDay(year, month) {
      return 32 - new Date(year, month - 1, 32).getDate();
    }
    const getBoundary = (type, value) => {
      const boundary = props[`${type}Date`];
      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;
      if (type === "max") {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }
      const seconds = minute;
      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value.getDate() === date) {
            hour = boundary.getHours();
            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute,
        [`${type}Seconds`]: seconds
      };
    };
    const ranges = computed(() => {
      const { maxYear, maxDate, maxMonth, maxHour, maxMinute, maxSeconds } = getBoundary("max", state.currentDate);
      const { minYear, minDate, minMonth, minHour, minMinute, minSeconds } = getBoundary("min", state.currentDate);
      let result = [
        {
          type: "year",
          range: [minYear, maxYear]
        },
        {
          type: "month",
          range: [minMonth, maxMonth]
        },
        {
          type: "day",
          range: [minDate, maxDate]
        },
        {
          type: "hour",
          range: [minHour, maxHour]
        },
        {
          type: "minute",
          range: [minMinute, maxMinute]
        },
        {
          type: "seconds",
          range: [minSeconds, maxSeconds]
        }
      ];
      switch (props.type) {
        case "date":
          result = result.slice(0, 3);
          break;
        case "datetime":
          result = result.slice(0, 5);
          break;
        case "time":
          result = result.slice(3, 6);
          break;
        case "month-day":
          result = result.slice(1, 3);
          break;
        case "datehour":
          result = result.slice(0, 4);
          break;
      }
      return result;
    });
    const changeHandler = (val) => {
      if (["date", "datetime"].includes(props.type)) {
        let formatDate = [];
        if (props.isShowChinese) {
          formatDate = val.map((res) => {
            return Number(res.slice(0, res.length - 1));
          });
        } else {
          formatDate = val;
        }
        if (props.type === "date") {
          state.currentDate = formatValue(new Date(formatDate[0], formatDate[1] - 1, Math.min(formatDate[2], getMonthEndDay(formatDate[0], formatDate[1]))));
        } else if (props.type === "datetime") {
          state.currentDate = formatValue(new Date(formatDate[0], formatDate[1] - 1, Math.min(formatDate[2], getMonthEndDay(formatDate[0], formatDate[1])), formatDate[3], formatDate[4]));
        }
      }
    };
    const generateValue = (min, max, val, type) => {
      if (!(max > min))
        return;
      const arr = [];
      let index2 = 0;
      while (min <= max) {
        if (props.isShowChinese) {
          arr.push(min + zhCNType[type]);
        } else {
          arr.push(min);
        }
        if (type === "minute") {
          min += props.minuteStep;
        } else {
          min++;
        }
        if (min <= val) {
          index2++;
        }
      }
      return { values: arr, defaultIndex: index2 };
    };
    const getDateIndex = (type) => {
      if (type === "year") {
        return state.currentDate.getFullYear();
      } else if (type === "month") {
        return state.currentDate.getMonth() + 1;
      } else if (type === "day") {
        return state.currentDate.getDate();
      } else if (type === "hour") {
        return state.currentDate.getHours();
      } else if (type === "minute") {
        return state.currentDate.getMinutes();
      } else if (type === "seconds") {
        return state.currentDate.getSeconds();
      }
      return 0;
    };
    const columns = computed(() => {
      const val = ranges.value.map((res) => {
        return generateValue(res.range[0], res.range[1], getDateIndex(res.type), res.type);
      });
      return val;
    });
    const closeHandler = () => {
      emit("update:visible", false);
    };
    const confirm = (val) => {
      emit("update:visible", false);
      emit("confirm", val);
    };
    onMounted(() => {
      state.currentDate = formatValue(props.modelValue);
    });
    watch(() => props.title, (val) => {
      state.title = val;
    });
    watch(() => props.visible, (val) => {
      state.show = val;
    });
    return __spreadProps(__spreadValues({}, toRefs(state)), {
      changeHandler,
      closeHandler,
      confirm,
      columns
    });
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_picker = resolveComponent("nut-picker");
  return openBlock(), createBlock(_component_nut_picker, {
    visible: _ctx.show,
    onClose: _ctx.closeHandler,
    "list-data": _ctx.columns,
    onChange: _ctx.changeHandler,
    title: _ctx.title,
    onConfirm: _ctx.confirm
  }, null, 8, ["visible", "onClose", "list-data", "onChange", "title", "onConfirm"]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
