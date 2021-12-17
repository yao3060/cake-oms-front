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
import { ref, reactive, computed, watch, toRefs, resolveComponent, openBlock, createBlock, withCtx, createElementVNode, withDirectives, createVNode, vShow, toDisplayString, createCommentVNode, createElementBlock, Fragment, renderList, normalizeClass, normalizeStyle, createTextVNode, nextTick } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const { componentName, create } = createComponent("address");
const _sfc_main = create({
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "custom"
    },
    customAddressTitle: {
      type: String,
      default: "\u8BF7\u9009\u62E9\u6240\u5728\u5730\u533A"
    },
    province: {
      type: Array,
      default: () => []
    },
    city: {
      type: Array,
      default: () => []
    },
    country: {
      type: Array,
      default: () => []
    },
    town: {
      type: Array,
      default: () => []
    },
    isShowCustomAddress: {
      type: Boolean,
      default: true
    },
    existAddress: {
      type: Array,
      default: () => []
    },
    existAddressTitle: {
      type: String,
      default: "\u914D\u9001\u81F3"
    },
    customAndExistTitle: {
      type: String,
      default: "\u9009\u62E9\u5176\u4ED6\u5730\u5740"
    },
    defaultIcon: {
      type: String,
      default: "location2"
    },
    selectedIcon: {
      type: String,
      default: "Check"
    },
    closeBtnIcon: {
      type: String,
      default: "circle-close"
    },
    backBtnIcon: {
      type: String,
      default: "left"
    },
    height: {
      type: [String, Number],
      default: "200px"
    }
  },
  emits: ["update:visible", "type", "change", "selected", "close", "close-mask", "switch-module"],
  setup(props, { emit }) {
    const regionLine = ref(null);
    const tabItemRef = reactive({
      province: ref(null),
      city: ref(null),
      country: ref(null),
      town: ref(null)
    });
    const showPopup = ref(props.visible);
    const privateType = ref(props.type);
    const tabIndex = ref(0);
    const tabName = ref(["province", "city", "country", "town"]);
    const isCustom2 = computed(() => props.type === "custom2");
    const transformData = (data) => {
      if (!Array.isArray(data))
        throw new TypeError("params muse be array.");
      if (!data.length)
        return [];
      data.forEach((item) => {
        if (!item.title) {
          console.error("[NutUI] <Address> \u8BF7\u68C0\u67E5\u6570\u7EC4\u9009\u9879\u7684 title \u503C\u662F\u5426\u6709\u8BBE\u7F6E ,title \u4E3A\u5FC5\u586B\u9879 .");
          return;
        }
      });
      const newData = [];
      data = data.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      data.forEach((item) => {
        const index2 = newData.findIndex((value) => value.title === item.title);
        if (index2 <= -1) {
          newData.push({
            title: item.title,
            list: [].concat(item)
          });
        } else {
          newData[index2] = {
            title: item.title,
            list: newData[index2].list.concat(item)
          };
        }
      });
      return newData;
    };
    const regionList = reactive({
      province: isCustom2.value ? transformData(props.province) : props.province,
      city: isCustom2.value ? transformData(props.city) : props.city,
      country: isCustom2.value ? transformData(props.country) : props.country,
      town: isCustom2.value ? transformData(props.town) : props.town
    });
    const selectedRegion = reactive({
      province: {},
      city: {},
      country: {},
      town: {}
    });
    let selectedExistAddress = reactive({});
    const closeWay = ref("self");
    const lineDistance = ref(20);
    const getTabName = (item, index2) => {
      if (item.name)
        return item.name;
      if (tabIndex.value < index2) {
        return item.name;
      } else {
        return "\u8BF7\u9009\u62E9";
      }
    };
    const handClose = (type = "self") => {
      if (!props.closeBtnIcon)
        return;
      closeWay.value = type == "cross" ? "cross" : "self";
      showPopup.value = false;
    };
    const clickOverlay = () => {
      closeWay.value = "mask";
    };
    const lineAnimation = () => {
      const name = tabItemRef[tabName.value[tabIndex.value]];
      nextTick(() => {
        if (name) {
          const distance = name.offsetLeft;
          lineDistance.value = distance ? distance : 20;
        }
      });
    };
    const nextAreaList = (item) => {
      const calBack = {
        next: "",
        value: "",
        custom: tabName.value[tabIndex.value]
      };
      selectedRegion[tabName.value[tabIndex.value]] = item;
      for (let i = tabIndex.value; i < tabIndex.value - 1; i++) {
        selectedRegion[tabName.value[i + 1]] = {};
      }
      if (tabIndex.value < 3) {
        tabIndex.value = tabIndex.value + 1;
        lineAnimation();
        calBack.next = tabName.value[tabIndex.value];
        calBack.value = item;
        emit("change", calBack);
      } else {
        handClose();
      }
    };
    const changeRegionTab = (item, key, index2) => {
      if (getTabName(item, index2)) {
        tabIndex.value = index2;
        lineAnimation();
      }
    };
    const selectedExist = (item) => {
      const copyExistAdd = props.existAddress;
      let prevExistAdd = {};
      copyExistAdd.forEach((list, index2) => {
        if (list && list.selectedAddress) {
          prevExistAdd = list;
        }
        list.selectedAddress = false;
      });
      item.selectedAddress = true;
      selectedExistAddress = item;
      emit("selected", prevExistAdd, item, copyExistAdd);
      handClose();
    };
    const initAddress = () => {
      for (let i = 0; i < tabName.value.length; i++) {
        selectedRegion[tabName.value[i]] = {};
      }
      tabIndex.value = 0;
      lineAnimation();
    };
    const close = () => {
      const resCopy = Object.assign({
        addressIdStr: "",
        addressStr: ""
      }, selectedRegion);
      const res = {
        data: {},
        type: privateType.value
      };
      if (privateType.value == "custom" || privateType.value == "custom2") {
        const { province, city, country, town } = resCopy;
        resCopy.addressIdStr = [
          province.id || 0,
          city.id || 0,
          country.id || 0,
          town.id || 0
        ].join("_");
        resCopy.addressStr = [
          province.name,
          city.name,
          country.name,
          town.name
        ].join("");
        res.data = resCopy;
      } else {
        res.data = selectedExistAddress;
      }
      initAddress();
      if (closeWay.value == "self") {
        emit("close", res);
      } else {
        emit("close-mask", { closeWay });
      }
      emit("update:visible", false);
    };
    const switchModule = () => {
      if (privateType.value == "exist") {
        privateType.value = "custom";
      } else {
        privateType.value = "exist";
      }
      initAddress();
      emit("switch-module", { type: privateType.value });
    };
    const handleElevatorItem = (key, item) => {
      nextAreaList(item);
    };
    watch(() => props.visible, (value) => {
      showPopup.value = value;
    });
    watch(() => showPopup.value, (value) => {
      if (value == false) {
        close();
      }
    });
    watch(() => props.province, (value) => {
      regionList.province = isCustom2.value ? transformData(value) : value;
    });
    watch(() => props.city, (value) => {
      regionList.city = isCustom2.value ? transformData(value) : value;
    });
    watch(() => props.country, (value) => {
      regionList.country = isCustom2.value ? transformData(value) : value;
    });
    watch(() => props.town, (value) => {
      regionList.town = isCustom2.value ? transformData(value) : value;
    });
    watch(() => props.existAddress, (value) => {
      value.forEach((item, index2) => {
        if (item.selectedAddress) {
          selectedExistAddress = item;
        }
      });
    });
    return __spreadValues(__spreadValues({
      showPopup,
      privateType,
      tabIndex,
      tabName,
      regionList,
      selectedRegion,
      selectedExistAddress,
      switchModule,
      closeWay,
      close,
      getTabName,
      nextAreaList,
      regionLine,
      lineDistance,
      changeRegionTab,
      selectedExist,
      clickOverlay,
      handClose,
      handleElevatorItem
    }, toRefs(props)), toRefs(tabItemRef));
  }
});
const _hoisted_1 = { class: "nut-address" };
const _hoisted_2 = { class: "nut-address__header" };
const _hoisted_3 = { class: "nut-address__header__title" };
const _hoisted_4 = {
  key: 0,
  class: "custom-address"
};
const _hoisted_5 = { class: "region-tab" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { class: "region-con" };
const _hoisted_8 = { class: "region-group" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = {
  key: 1,
  class: "custom-address"
};
const _hoisted_11 = { class: "region-tab" };
const _hoisted_12 = ["onClick"];
const _hoisted_13 = { class: "elevator-group" };
const _hoisted_14 = {
  key: 2,
  class: "exist-address"
};
const _hoisted_15 = { class: "exist-address-group" };
const _hoisted_16 = { class: "exist-ul" };
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "exist-item-info" };
const _hoisted_19 = {
  key: 0,
  class: "exist-item-info-top"
};
const _hoisted_20 = { class: "exist-item-info-name" };
const _hoisted_21 = { class: "exist-item-info-phone" };
const _hoisted_22 = { class: "exist-item-info-bottom" };
const _hoisted_23 = { class: "btn" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  const _component_nut_elevator = resolveComponent("nut-elevator");
  const _component_nut_popup = resolveComponent("nut-popup");
  return openBlock(), createBlock(_component_nut_popup, {
    position: "bottom",
    onClose: _ctx.close,
    onClickOverlay: _ctx.clickOverlay,
    onOpen: _cache[3] || (_cache[3] = ($event) => _ctx.closeWay = "self"),
    visible: _ctx.showPopup,
    "onUpdate:visible": _cache[4] || (_cache[4] = ($event) => _ctx.showPopup = $event)
  }, {
    default: withCtx(() => [
      createElementVNode("view", _hoisted_1, [
        createElementVNode("view", _hoisted_2, [
          createElementVNode("view", {
            class: "arrow-back",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.switchModule && _ctx.switchModule(...args))
          }, [
            withDirectives(createVNode(_component_nut_icon, {
              name: _ctx.backBtnIcon,
              color: "#cccccc"
            }, null, 8, ["name"]), [
              [vShow, _ctx.privateType == "custom" && _ctx.backBtnIcon]
            ])
          ]),
          createElementVNode("view", _hoisted_3, toDisplayString(_ctx.privateType == "custom" ? _ctx.customAddressTitle : _ctx.existAddressTitle), 1),
          createElementVNode("view", {
            class: "arrow-close",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.handClose("cross"))
          }, [
            _ctx.closeBtnIcon ? (openBlock(), createBlock(_component_nut_icon, {
              key: 0,
              name: _ctx.closeBtnIcon,
              color: "#cccccc",
              size: "18px"
            }, null, 8, ["name"])) : createCommentVNode("", true)
          ])
        ]),
        _ctx.privateType == "custom" ? (openBlock(), createElementBlock("view", _hoisted_4, [
          createElementVNode("view", _hoisted_5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.selectedRegion, (item, key, index2) => {
              return openBlock(), createElementBlock("view", {
                class: normalizeClass(["tab-item", [index2 == _ctx.tabIndex ? "active" : ""]]),
                key: index2,
                ref_for: true,
                ref: key,
                onClick: ($event) => _ctx.changeRegionTab(item, key, index2)
              }, [
                createElementVNode("view", null, toDisplayString(_ctx.getTabName(item, index2)), 1)
              ], 10, _hoisted_6);
            }), 128)),
            createElementVNode("view", {
              class: "region-tab-line",
              ref: "regionLine",
              style: normalizeStyle({ left: _ctx.lineDistance + "px" })
            }, null, 4)
          ]),
          createElementVNode("view", _hoisted_7, [
            createElementVNode("ul", _hoisted_8, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.regionList[_ctx.tabName[_ctx.tabIndex]], (item, index2) => {
                return openBlock(), createElementBlock("li", {
                  key: index2,
                  class: normalizeClass(["region-item", [_ctx.selectedRegion[_ctx.tabName[_ctx.tabIndex]].id == item.id ? "active" : ""]]),
                  onClick: ($event) => _ctx.nextAreaList(item)
                }, [
                  _ctx.selectedRegion[_ctx.tabName[_ctx.tabIndex]].id == item.id ? (openBlock(), createBlock(_component_nut_icon, {
                    key: 0,
                    class: "region-item-icon",
                    type: "self",
                    name: _ctx.selectedIcon,
                    color: "#FA2C19",
                    size: "13px"
                  }, null, 8, ["name"])) : createCommentVNode("", true),
                  createTextVNode(toDisplayString(item.name), 1)
                ], 10, _hoisted_9);
              }), 128))
            ])
          ])
        ])) : _ctx.privateType == "custom2" ? (openBlock(), createElementBlock("view", _hoisted_10, [
          createElementVNode("view", _hoisted_11, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.selectedRegion, (item, key, index2) => {
              return openBlock(), createElementBlock("view", {
                class: normalizeClass(["tab-item", [index2 == _ctx.tabIndex ? "active" : ""]]),
                key: index2,
                ref_for: true,
                ref: key,
                onClick: ($event) => _ctx.changeRegionTab(item, key, index2)
              }, [
                createElementVNode("view", null, toDisplayString(_ctx.getTabName(item, index2)), 1)
              ], 10, _hoisted_12);
            }), 128)),
            createElementVNode("view", {
              class: "region-tab-line",
              ref: "regionLine",
              style: normalizeStyle({ left: _ctx.lineDistance + "px" })
            }, null, 4)
          ]),
          createElementVNode("view", _hoisted_13, [
            createVNode(_component_nut_elevator, {
              height: _ctx.height,
              "index-list": _ctx.regionList[_ctx.tabName[_ctx.tabIndex]],
              onClickItem: _ctx.handleElevatorItem
            }, null, 8, ["height", "index-list", "onClickItem"])
          ])
        ])) : _ctx.privateType == "exist" ? (openBlock(), createElementBlock("view", _hoisted_14, [
          createElementVNode("div", _hoisted_15, [
            createElementVNode("ul", _hoisted_16, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.existAddress, (item, index2) => {
                return openBlock(), createElementBlock("li", {
                  class: normalizeClass(["exist-item", [item.selectedAddress ? "active" : ""]]),
                  key: index2,
                  onClick: ($event) => _ctx.selectedExist(item)
                }, [
                  createVNode(_component_nut_icon, {
                    class: "exist-item-icon",
                    type: "self",
                    name: item.selectedAddress ? _ctx.selectedIcon : _ctx.defaultIcon,
                    color: item.selectedAddress ? "#FA2C19" : "",
                    size: "13px"
                  }, null, 8, ["name", "color"]),
                  createElementVNode("div", _hoisted_18, [
                    item.name && item.phone ? (openBlock(), createElementBlock("div", _hoisted_19, [
                      createElementVNode("div", _hoisted_20, toDisplayString(item.name), 1),
                      createElementVNode("div", _hoisted_21, toDisplayString(item.phone), 1)
                    ])) : createCommentVNode("", true),
                    createElementVNode("div", _hoisted_22, [
                      createElementVNode("view", null, toDisplayString(item.provinceName + item.cityName + item.countyName + item.townName + item.addressDetail), 1)
                    ])
                  ])
                ], 10, _hoisted_17);
              }), 128))
            ])
          ]),
          _ctx.isShowCustomAddress ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "choose-other",
            onClick: _cache[2] || (_cache[2] = (...args) => _ctx.switchModule && _ctx.switchModule(...args))
          }, [
            createElementVNode("div", _hoisted_23, toDisplayString(_ctx.customAndExistTitle), 1)
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ])
    ]),
    _: 1
  }, 8, ["onClose", "onClickOverlay", "visible"]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
