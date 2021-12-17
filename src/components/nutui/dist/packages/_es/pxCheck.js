/*!
* @nutui/nutui v3.1.12 Fri Dec 17 2021 00:23:11 GMT+0800 (中国标准时间)
* (c) 2021 @jdf2e.
* Released under the MIT License.
*/
const pxCheck = (value) => {
  return isNaN(Number(value)) ? String(value) : `${value}px`;
};
export { pxCheck as p };
