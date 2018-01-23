/**
 * 通用文件，应在最开始的地方引入
 */
/* eslint no-extend-native: 0 */

import React from 'react'
import http from './http'
import {
  isArray, isFunction, isNullValue,
  isNumber, isObject, isString,
  computedCls
} from './utils'

/**
 * React组件封装
 */
const Component = React.Component
const overrideRCP = Object.create(Component.prototype)

// React组件添加http方法
overrideRCP.http = http

// React组件添加cls方法
overrideRCP.cls = computedCls

// React组件添加shouldComponentUpdate方法
overrideRCP.shouldComponentUpdate = function (nextProps, nextState) {
  let shouldUpdateProps = this.shouldUpdateProps
  let should = true
  // 如果shouldUpdateProps在组件里定义，且类型为函数
  if (isFunction(shouldUpdateProps)) {
    let ret = shouldUpdateProps.bind(this)(nextProps)
    if (isArray(ret)) {
      should = ret.some(propName => this.props[propName] !== nextProps[propName])
    } else if (isString(ret) && !isNullValue(ret)) {
      should = this.props[ret] !== nextProps[ret]
    } else {
      // 如果返回的值是非数组 或者 非非空字符串，将结果转换成布尔值
      should = !!ret
    }
  }
  return should
}

// 将React组件原型指向覆写的原型
Component.prototype = overrideRCP

/**
 * 格式化日期
 * @param {string} [format='yyyy-MM-dd hh:mm:ss']
 */
Date.prototype.format = function (format = 'yyyy-MM-dd hh:mm:ss') {
  const date = this
  const fmt = {
    yyyy: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    dd: pad(date.getDate()),
    hh: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    yy: date.getFullYear().toString().substr(2),
    M: (date.getMonth() + 1).toString(),
    d: date.getDate().toString(),
    h: date.getHours().toString(),
    m: date.getMinutes().toString(),
    s: date.getSeconds().toString()
  }

  function pad(num) {
    num = num.toString()
    return num.length === 1 ? '0' + num : num
  }

  return format.replace(/(y+|M+|d+|h+|m+|s+)/g, match => fmt[match] || '')
}

/**
 * 对象数组排序，参数如果是一个字符串，则按这个属性升序排序，如果需要安装降序排序，则传一个对象，并设置inverse为true
 * @param {object|string} sortKeys 按照数组对象的元素排序
 * @returns {*}
 * @example
 *  array.sort('a', {
 *   key: 'b',
 *   inverse: true
 *  })
 *  上面的示例表示优先按照 'a' 属性升序排序，如果 'a' 属性值相同，则安装 'b' 属性降序排序
 */
Array.prototype.sortObject = function (...sortKeys) {
  const arr = this
  // 内部优先排序标志，值为一个数字，大的值排前面，非数字值将转换成0
  const SORT_MARK = '$sort'
  // 处理排序属性
  sortKeys = sortKeys.map(key => {
    if (isObject(key)) {
      return key.key
        ? {
          key: key.key,
          inverse: !!key.inverse
        } : null
    } else if (key && isString(key)) {
      return {
        key,
        inverse: false
      }
    }
    return null
  }).filter(item => item !== null)
  return arr.sort(function (a, b) {
    // 元素不是对象的情况
    if (!isObject(a) && !isObject(b)) return 0
    if (!isObject(a)) return 1
    if (!isObject(b)) return -1
    // 内部优先排序
    if (a[SORT_MARK] !== b[SORT_MARK]) {
      let aSortVal = isNumber(a[SORT_MARK]) ? a[SORT_MARK] : 0
      let bSortVal = isNumber(b[SORT_MARK]) ? b[SORT_MARK] : 0
      return bSortVal - aSortVal
    }
    // 比较结果
    let compareRet = 0
    // 按属性优先级排序
    sortKeys.some(item => {
      let inverse = item.inverse
      let aVal = a[item.key]
      let bVal = b[item.key]
      // 属性值为空值
      if (isNullValue(aVal) && isNullValue(bVal)) {
        compareRet = 0
        return true
      }
      if (isNullValue(aVal)) {
        compareRet = 1
        return true
      }
      if (isNullValue(bVal)) {
        compareRet = -1
        return true
      }
      // 如果第一个属性值相同，则按第二个属性值排序，以此类推
      if (aVal !== bVal) {
        // 两个都是数字
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          // 存在NaN时候，排在后面
          if (isNaN(aVal) && isNaN(bVal)) compareRet = 0
          else if (isNaN(aVal)) compareRet = 1
          else if (isNaN(bVal)) compareRet = -1
          else compareRet = inverse ? bVal - aVal : aVal - bVal
        } else {
          // 如果两个值不都为数字，安装字符串排序
          aVal = aVal.toString().toLowerCase()
          bVal = bVal.toString().toLowerCase()
          if (inverse) {
            compareRet = bVal > aVal ? 1 : -1
          } else {
            compareRet = bVal < aVal ? 1 : -1
          }
        }
        return true
      }
      return false
    })
    return compareRet
  })
}
