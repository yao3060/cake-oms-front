/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
import { c as createComponent } from "./component.js";
import { i as isPromise } from "./util.js";
import { computed, reactive, provide, watch, resolveComponent, openBlock, createElementBlock, createVNode, withCtx, renderSlot } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const component = {
  props: {
    modelValue: {
      type: Object,
      default: {}
    }
  },
  components: {},
  emits: ["validate"],
  setup(props, { emit, slots }) {
    const formErrorTip = computed(() => reactive({}));
    provide("formErrorTip", formErrorTip);
    const init = (value = props.modelValue) => {
      Object.keys(value).forEach((item) => {
        formErrorTip.value[item] = "";
      });
    };
    const reset = () => {
      init();
    };
    watch(() => props.modelValue, (value) => {
      init(value);
    }, { immediate: true });
    const findFormItem = (vnodes) => {
      let task = [];
      vnodes.forEach((vnode, index2) => {
        var _a, _b;
        let type = vnode.type;
        type = type.name || type;
        if (type == "nut-form-item") {
          task.push({
            prop: (_a = vnode.props) == null ? void 0 : _a["prop"],
            rules: ((_b = vnode.props) == null ? void 0 : _b["rules"]) || []
          });
        }
      });
      return task;
    };
    const tipMessage = (errorMsg) => {
      if (errorMsg.message) {
        emit("validate", errorMsg);
      }
      formErrorTip.value[errorMsg.prop] = errorMsg.message;
    };
    const checkRule = (item) => {
      const { rules, prop } = item;
      const _Promise = (errorMsg) => {
        return new Promise((resolve, reject) => {
          tipMessage(errorMsg);
          resolve(errorMsg);
        });
      };
      const value = props.modelValue[prop];
      tipMessage({ prop, message: "" });
      while (rules.length) {
        const { required, validator, regex, message } = rules.shift();
        const errorMsg = { prop, message };
        if (required) {
          if (!value) {
            return _Promise(errorMsg);
          }
        }
        if (regex && !regex.test(String(value))) {
          return _Promise(errorMsg);
        }
        if (validator) {
          const result = validator(value);
          if (isPromise(result)) {
            return new Promise((r, j) => {
              result.then((res) => {
                if (!res) {
                  tipMessage(errorMsg);
                  r(errorMsg);
                } else {
                  r(true);
                }
              });
            });
          } else {
            if (!result) {
              return _Promise(errorMsg);
            }
          }
        }
      }
      return Promise.resolve(true);
    };
    const validate = () => {
      return new Promise((resolve, reject) => {
        let task = findFormItem(slots.default());
        let errors = task.map((item) => {
          return checkRule(item);
        });
        Promise.all(errors).then((errorRes) => {
          errorRes = errorRes.filter((item) => item != true);
          const res = { valid: true, errors: [] };
          if (errorRes.length) {
            res.valid = false;
            res.errors = errorRes;
          }
          resolve(res);
        });
      });
    };
    const onSubmit = () => {
      validate();
      return false;
    };
    return { validate, reset, onSubmit, formErrorTip };
  }
};
const { create } = createComponent("form");
const _sfc_main = create(component);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_nut_cell_group = resolveComponent("nut-cell-group");
  return openBlock(), createElementBlock("form", {
    class: "nut-form",
    onSubmit: _cache[0] || (_cache[0] = (...args) => _ctx.onSubmit && _ctx.onSubmit(...args))
  }, [
    createVNode(_component_nut_cell_group, null, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    })
  ], 32);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index as default };
