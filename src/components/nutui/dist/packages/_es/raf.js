/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
const _window = window;
function requestAniFrame() {
  if (typeof _window !== "undefined") {
    return _window.requestAnimationFrame || _window.webkitRequestAnimationFrame || function(callback) {
      _window.setTimeout(callback, 1e3 / 60);
    };
  } else {
    return function(callback) {
      setTimeout(callback, 1e3 / 60);
    };
  }
}
var requestAniFrame$1 = requestAniFrame();
export { requestAniFrame$1 as r };
