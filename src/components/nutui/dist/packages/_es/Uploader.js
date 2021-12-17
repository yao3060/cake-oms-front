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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { reactive, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, renderSlot, Fragment, createCommentVNode, renderList, createElementVNode, toDisplayString, createVNode, createBlock, createTextVNode } from "vue";
import { c as createComponent } from "./component.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
class UploadOptions {
  constructor() {
    __publicField(this, "url", "");
    __publicField(this, "name", "file");
    __publicField(this, "formData");
    __publicField(this, "method", "post");
    __publicField(this, "xhrState", 200);
    __publicField(this, "timeout", 30 * 1e3);
    __publicField(this, "headers", {});
    __publicField(this, "withCredentials", false);
    __publicField(this, "onStart");
    __publicField(this, "taroFilePath");
    __publicField(this, "onProgress");
    __publicField(this, "onSuccess");
    __publicField(this, "onFailure");
  }
}
class Uploader {
  constructor(options) {
    __publicField(this, "options");
    this.options = options;
  }
  upload() {
    var _a;
    const options = this.options;
    const xhr = new XMLHttpRequest();
    xhr.timeout = options.timeout;
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (e) => {
        var _a2;
        (_a2 = options.onProgress) == null ? void 0 : _a2.call(options, e, options);
      }, false);
      xhr.onreadystatechange = () => {
        var _a2, _b;
        if (xhr.readyState === 4) {
          if (xhr.status == options.xhrState) {
            (_a2 = options.onSuccess) == null ? void 0 : _a2.call(options, xhr.responseText, options);
          } else {
            (_b = options.onFailure) == null ? void 0 : _b.call(options, xhr.responseText, options);
          }
        }
      };
      xhr.withCredentials = options.withCredentials;
      xhr.open(options.method, options.url, true);
      for (const [key, value] of Object.entries(options.headers)) {
        xhr.setRequestHeader(key, value);
      }
      (_a = options.onStart) == null ? void 0 : _a.call(options, options);
      xhr.send(options.formData);
    } else {
      console.warn("\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 XMLHttpRequest");
    }
  }
  uploadTaro(uploadFile) {
    var _a;
    const options = this.options;
    const uploadTask = uploadFile({
      url: options.url,
      filePath: options.taroFilePath,
      header: __spreadValues({
        "Content-Type": "multipart/form-data"
      }, options.headers),
      formData: options.formData,
      name: options.name,
      success(response) {
        var _a2, _b;
        if (options.xhrState == response.statusCode) {
          (_a2 = options.onSuccess) == null ? void 0 : _a2.call(options, response, options);
        } else {
          (_b = options.onFailure) == null ? void 0 : _b.call(options, response, options);
        }
      },
      fail(e) {
        var _a2;
        (_a2 = options.onFailure) == null ? void 0 : _a2.call(options, e, options);
      }
    });
    (_a = options.onStart) == null ? void 0 : _a.call(options, options);
    uploadTask.progress((res) => {
      var _a2;
      (_a2 = options.onProgress) == null ? void 0 : _a2.call(options, res, options);
    });
  }
}
const { componentName, create } = createComponent("uploader");
class FileItem {
  constructor() {
    __publicField(this, "status", "ready");
    __publicField(this, "message", "\u51C6\u5907\u5B8C\u6210");
    __publicField(this, "uid", new Date().getTime().toString());
    __publicField(this, "name");
    __publicField(this, "url");
    __publicField(this, "type");
    __publicField(this, "percentage", 0);
    __publicField(this, "formData", new FormData());
  }
}
const _sfc_main = create({
  props: {
    name: { type: String, default: "file" },
    url: { type: String, default: "" },
    timeout: { type: [Number, String], default: 1e3 * 30 },
    fileList: { type: Array, default: () => [] },
    isPreview: { type: Boolean, default: true },
    listType: { type: String, default: "picture" },
    isDeletable: { type: Boolean, default: true },
    method: { type: String, default: "post" },
    capture: { type: Boolean, default: false },
    maximize: { type: [Number, String], default: Number.MAX_VALUE },
    maximum: { type: [Number, String], default: 1 },
    clearInput: { type: Boolean, default: true },
    accept: { type: String, default: "*" },
    headers: { type: Object, default: {} },
    data: { type: Object, default: {} },
    uploadIcon: { type: String, default: "photograph" },
    uploadIconSize: { type: [String, Number], default: "" },
    xhrState: { type: [Number, String], default: 200 },
    withCredentials: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    autoUpload: { type: Boolean, default: true },
    beforeUpload: {
      type: Function,
      default: null
    },
    beforeDelete: {
      type: Function,
      default: (file, files) => {
        return true;
      }
    },
    onChange: { type: Function }
  },
  emits: [
    "start",
    "progress",
    "oversize",
    "success",
    "failure",
    "change",
    "delete",
    "update:fileList",
    "file-item-click"
  ],
  setup(props, { emit }) {
    const fileList = reactive(props.fileList);
    let uploadQueue = [];
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });
    const clearInput = (el) => {
      el.value = "";
    };
    const fileItemClick = (fileItem) => {
      emit("file-item-click", { fileItem });
    };
    const executeUpload = (fileItem, index2) => {
      const uploadOption = new UploadOptions();
      uploadOption.url = props.url;
      uploadOption.formData = fileItem.formData;
      uploadOption.timeout = props.timeout * 1;
      uploadOption.method = props.method;
      uploadOption.xhrState = props.xhrState;
      uploadOption.headers = props.headers;
      uploadOption.withCredentials = props.withCredentials;
      uploadOption.onStart = (option) => {
        fileItem.status = "ready";
        fileItem.message = "\u51C6\u5907\u4E0A\u4F20";
        clearUploadQueue(index2);
        emit("start", option);
      };
      uploadOption.onProgress = (event, option) => {
        fileItem.status = "uploading";
        fileItem.message = "\u4E0A\u4F20\u4E2D";
        fileItem.percentage = (event.loaded / event.total * 100).toFixed(0);
        emit("progress", { event, option, percentage: fileItem.percentage });
      };
      uploadOption.onSuccess = (responseText, option) => {
        fileItem.status = "success";
        fileItem.message = "\u4E0A\u4F20\u6210\u529F";
        emit("success", {
          responseText,
          option,
          fileItem
        });
        emit("update:fileList", fileList);
      };
      uploadOption.onFailure = (responseText, option) => {
        fileItem.status = "error";
        fileItem.message = "\u4E0A\u4F20\u5931\u8D25";
        emit("failure", {
          responseText,
          option,
          fileItem
        });
      };
      let task = new Uploader(uploadOption);
      if (props.autoUpload) {
        task.upload();
      } else {
        uploadQueue.push(new Promise((resolve, reject) => {
          resolve(task);
        }));
      }
    };
    const clearUploadQueue = (index2 = -1) => {
      if (index2 > -1) {
        uploadQueue.splice(index2, 1);
      } else {
        uploadQueue = [];
      }
    };
    const submit = () => {
      Promise.all(uploadQueue).then((res) => {
        res.forEach((i) => i.upload());
      });
    };
    const readFile = (files) => {
      files.forEach((file, index2) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(props.data)) {
          formData.append(key, value);
        }
        formData.append(props.name, file);
        const fileItem = reactive(new FileItem());
        fileItem.name = file.name;
        fileItem.status = "ready";
        fileItem.type = file.type;
        fileItem.formData = formData;
        fileItem.message = "\u7B49\u5F85\u4E0A\u4F20";
        executeUpload(fileItem, index2);
        if (props.isPreview && file.type.includes("image")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            fileItem.url = event.target.result;
            fileList.push(fileItem);
          };
          reader.readAsDataURL(file);
        } else {
          fileList.push(fileItem);
        }
      });
    };
    const filterFiles = (files) => {
      const maximum = props.maximum * 1;
      const maximize = props.maximize * 1;
      const oversizes = new Array();
      files = files.filter((file) => {
        if (file.size > maximize) {
          oversizes.push(file);
          return false;
        } else {
          return true;
        }
      });
      if (oversizes.length) {
        emit("oversize", oversizes);
      }
      if (files.length > maximum) {
        files.splice(maximum - 1, files.length - maximum);
      }
      return files;
    };
    const onDelete = (file, index2) => {
      clearUploadQueue(index2);
      if (props.beforeDelete(file, fileList)) {
        fileList.splice(index2, 1);
        emit("delete", {
          file,
          fileList
        });
      } else {
        console.log("\u7528\u6237\u963B\u6B62\u4E86\u5220\u9664\uFF01");
      }
    };
    const onChange = (event) => {
      if (props.disabled) {
        return;
      }
      const $el = event.target;
      let { files } = $el;
      if (props.beforeUpload) {
        props.beforeUpload(files).then((f) => {
          const _files = filterFiles(new Array().slice.call(f));
          readFile(_files);
        });
      } else {
        const _files = filterFiles(new Array().slice.call(files));
        readFile(_files);
      }
      emit("change", {
        fileList,
        event
      });
      if (props.clearInput) {
        clearInput($el);
      }
    };
    return {
      onChange,
      onDelete,
      fileList,
      classes,
      fileItemClick,
      clearUploadQueue,
      submit
    };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "nut-uploader__slot"
};
const _hoisted_2 = ["accept", "multiple", "name", "disabled"];
const _hoisted_3 = ["accept", "multiple", "name", "disabled"];
const _hoisted_4 = {
  key: 0,
  class: "nut-uploader__preview-img"
};
const _hoisted_5 = {
  key: 0,
  class: "nut-uploader__preview__progress"
};
const _hoisted_6 = { class: "nut-uploader__preview__progress__msg" };
const _hoisted_7 = {
  key: 1,
  class: "nut-uploader__preview__progress"
};
const _hoisted_8 = { class: "nut-uploader__preview__progress__msg" };
const _hoisted_9 = ["onClick", "src"];
const _hoisted_10 = {
  key: 4,
  class: "nut-uploader__preview-img__file"
};
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { class: "tips" };
const _hoisted_13 = {
  key: 1,
  class: "nut-uploader__preview-list"
};
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["accept", "multiple", "name", "disabled"];
const _hoisted_16 = ["accept", "multiple", "name", "disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_icon = resolveComponent("nut-icon");
  const _component_nut_progress = resolveComponent("nut-progress");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(_ctx.classes)
  }, [
    _ctx.$slots.default ? (openBlock(), createElementBlock("view", _hoisted_1, [
      renderSlot(_ctx.$slots, "default"),
      _ctx.maximum - _ctx.fileList.length ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        _ctx.capture ? (openBlock(), createElementBlock("input", {
          key: 0,
          class: "nut-uploader__input",
          type: "file",
          capture: "camera",
          accept: _ctx.accept,
          multiple: _ctx.multiple,
          name: _ctx.name,
          disabled: _ctx.disabled,
          onChange: _cache[0] || (_cache[0] = (...args) => _ctx.onChange && _ctx.onChange(...args))
        }, null, 40, _hoisted_2)) : (openBlock(), createElementBlock("input", {
          key: 1,
          class: "nut-uploader__input",
          type: "file",
          accept: _ctx.accept,
          multiple: _ctx.multiple,
          name: _ctx.name,
          disabled: _ctx.disabled,
          onChange: _cache[1] || (_cache[1] = (...args) => _ctx.onChange && _ctx.onChange(...args))
        }, null, 40, _hoisted_3))
      ], 64)) : createCommentVNode("", true)
    ])) : createCommentVNode("", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.fileList, (item, index2) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["nut-uploader__preview", [_ctx.listType]]),
        key: item.uid
      }, [
        _ctx.listType == "picture" && !_ctx.$slots.default ? (openBlock(), createElementBlock("view", _hoisted_4, [
          item.status == "ready" ? (openBlock(), createElementBlock("view", _hoisted_5, [
            createElementVNode("view", _hoisted_6, toDisplayString(item.message), 1)
          ])) : item.status != "success" ? (openBlock(), createElementBlock("view", _hoisted_7, [
            createVNode(_component_nut_icon, {
              color: "#fff",
              name: item.status == "error" ? "failure" : "loading"
            }, null, 8, ["name"]),
            createElementVNode("view", _hoisted_8, toDisplayString(item.message), 1)
          ])) : createCommentVNode("", true),
          _ctx.isDeletable ? (openBlock(), createBlock(_component_nut_icon, {
            key: 2,
            color: "rgba(0,0,0,0.6)",
            onClick: ($event) => _ctx.onDelete(item, index2),
            class: "close",
            name: "failure"
          }, null, 8, ["onClick"])) : createCommentVNode("", true),
          item.type.includes("image") && item.url ? (openBlock(), createElementBlock("img", {
            key: 3,
            class: "nut-uploader__preview-img__c",
            onClick: ($event) => _ctx.fileItemClick(item),
            src: item.url
          }, null, 8, _hoisted_9)) : (openBlock(), createElementBlock("view", _hoisted_10, [
            createElementVNode("view", {
              onClick: ($event) => _ctx.fileItemClick(item),
              class: "nut-uploader__preview-img__file__name"
            }, [
              createVNode(_component_nut_icon, {
                color: "#808080",
                name: "link"
              }),
              createTextVNode("\xA0" + toDisplayString(item.name), 1)
            ], 8, _hoisted_11)
          ])),
          createElementVNode("view", _hoisted_12, toDisplayString(item.name), 1)
        ])) : _ctx.listType == "list" ? (openBlock(), createElementBlock("view", _hoisted_13, [
          createElementVNode("view", {
            onClick: ($event) => _ctx.fileItemClick(item),
            class: normalizeClass(["nut-uploader__preview-img__file__name", [item.status]])
          }, [
            createVNode(_component_nut_icon, { name: "link" }),
            createTextVNode("\xA0" + toDisplayString(item.name), 1)
          ], 10, _hoisted_14),
          createVNode(_component_nut_icon, {
            class: "nut-uploader__preview-img__file__del",
            onClick: ($event) => _ctx.onDelete(item, index2),
            color: "#808080",
            name: "del"
          }, null, 8, ["onClick"]),
          item.status == "uploading" ? (openBlock(), createBlock(_component_nut_progress, {
            key: 0,
            size: "small",
            percentage: item.percentage,
            "stroke-color": "linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)",
            "show-text": false
          }, null, 8, ["percentage"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 2);
    }), 128)),
    _ctx.listType == "picture" && !_ctx.$slots.default && _ctx.maximum - _ctx.fileList.length ? (openBlock(), createElementBlock("view", {
      key: 1,
      class: normalizeClass(["nut-uploader__upload", [_ctx.listType]])
    }, [
      createVNode(_component_nut_icon, {
        size: _ctx.uploadIconSize,
        color: "#808080",
        name: _ctx.uploadIcon
      }, null, 8, ["size", "name"]),
      _ctx.capture ? (openBlock(), createElementBlock("input", {
        key: 0,
        class: "nut-uploader__input",
        type: "file",
        capture: "camera",
        accept: _ctx.accept,
        multiple: _ctx.multiple,
        name: _ctx.name,
        disabled: _ctx.disabled,
        onChange: _cache[2] || (_cache[2] = (...args) => _ctx.onChange && _ctx.onChange(...args))
      }, null, 40, _hoisted_15)) : (openBlock(), createElementBlock("input", {
        key: 1,
        class: "nut-uploader__input",
        type: "file",
        accept: _ctx.accept,
        multiple: _ctx.multiple,
        name: _ctx.name,
        disabled: _ctx.disabled,
        onChange: _cache[3] || (_cache[3] = (...args) => _ctx.onChange && _ctx.onChange(...args))
      }, null, 40, _hoisted_16))
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { FileItem, index as default };
