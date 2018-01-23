/**
 * 常用工具方法
 */

import md5 from './md5'

/**
 * 获取类型名称
 */
export function getTypeName(arr) {
  return Object.prototype.toString.call(arr).slice(8, -1).toLowerCase()
}

/**
 * 判断类型为字符串
 */
export function isString(arr) {
  return typeof arr === 'string'
}

/**
 * 判断类型为数字
 */
export function isNumber(arr) {
  return typeof arr === 'number' && !isNaN(arr)
}

/**
 * 判断类型为布尔值
 */
export function isBoolean(arr) {
  return typeof arr === 'boolean'
}

/**
 * 判断类型为函数
 */
export function isFunction(arr) {
  return typeof arr === 'function'
}

/**
 * 判断类型为数组
 */
export function isArray(arr) {
  return getTypeName(arr) === 'array'
}

/**
 * 判断类型为数组，并且组成的元素为相应的类型
 * @param {any} arr
 * @param {function} Type 类型，为类型构造函数
 * @returns {boolean}
 */
export function isArrayOfType(arr, Type) {
  const typeName = getTypeName(new Type())
  return isArray(arr) &&
    arr.every(item => getTypeName(item) === typeName)
}

/**
 * 判断类型为对象
 */
export function isObject(arr) {
  return getTypeName(arr) === 'object'
}

/**
 * 判断类型为日期对象
 */
export function isDate(arr) {
  return getTypeName(arr) === 'date'
}

/**
 * 判断是否为自然数（非负整数）
 */
export function isNaturalNumber(n) {
  return isNumber(n) &&
    n === parseInt(n) &&
    n >= 0
}

/**
 * 判断是否空值
 */
export function isNullValue(arr) {
  return arr === undefined ||
    arr === null ||
    arr === ''
}

/**
 * 格式化class
 * @param {string|object} cls class类名，可以是字符串，也可以一个对象，对象属性名表示class名，属性值表示是否使用这个class
 */
export function computedCls(...cls) {
  let classNames = {}
  cls.forEach(item => {
    if (item && typeof item === 'string') {
      classNames[item] = true
    } else if (item && typeof item === 'object') {
      classNames = Object.assign(classNames, item)
    }
  })
  return Object.keys(classNames)
    .filter(className => !!classNames[className])
    .join(' ')
    .trim()
    .replace(/[ ]{2,}/, ' ')
}

/**
 * 创建唯一的ID
 * @param {number} [len=10] 截取ID的长度，最长32位
 */
export function IDCreator(len = 10) {
  let r = Date.now().toString() + Math.random().toString()
  return md5(r).substr(0, len)
}
