/**
 * HTTP请求
 */
import Axios from 'axios'
import {IDCreator, isString} from './utils'

const axios = Axios.create({
  timeout: 30000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

let CancelToken = Axios.CancelToken
let cancelList = []

// 拦截请求
axios.interceptors.request.use(function (config) {
  let token = ''
  let username = ''
  let url = config.url
  // if ($global.token) {
  //   token = $global.token.aes_token
  //   username = $global.token.aes_username
  // }
  config.headers['token'] = token
  config.headers['username'] = username

  // cancelToken
  if (config.cancel && isString(config.cancel)) {
    const name = config.cancel
    const id = IDCreator()
    config.cancelToken = new CancelToken(cancel => {
      cancelList.push({id, name, cancel})
    })
    config.cancelID = id
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

// 拦截响应
axios.interceptors.response.use(function (res) {
  const config = res.config
  // 如果标记为cancel，从cancel列表中删除
  if (config.cancelID) {
    removeCancelById(config.cancelID)
  }

  const data = res.data || {}
  if (!data.success) {
    return Promise.reject(data)
  }
  return data
}, (err) => {
  return Promise.reject(err)
})

// 添加cancel方法
axios.cancel = function (cancel) {
  cancelList = cancelList.filter(item => {
    if (item.name === cancel) {
      item.cancel()
      return false
    }
    return true
  })
}

/**
 * 移除请求cancel令牌
 * @param id
 * @param abort
 */
function removeCancelById(id, abort = false) {
  cancelList.some((item, i) => {
    if (item.id === id) {
      if (abort) item.cancel()
      cancelList.splice(i, 1)
      return true
    }
    return false
  })
}

export default axios
