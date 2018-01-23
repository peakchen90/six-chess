/**
 * redux日志中间件
 */

import {logger} from 'root/config'

export default store => next => action => {
  next(action)
  if (logger) {
    console.group('STORE')
    console.log('dispatching:', action)
    console.log('next state:', store.getState())
    console.groupEnd('STORE')
  }
}
