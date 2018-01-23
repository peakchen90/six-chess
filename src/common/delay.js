/**
 * 延迟执行函数，没有传id直接调用setTimeout
 * @param {string} [id]
 * @param {function} fn 延迟执行回调函数，参数pause(可选)，用于内部停止执行函数
 * @param {number} ms
 *
 */
export default function (id, fn, ms) {
  if (typeof id !== 'string') {
    return setTimeout.apply(null, arguments)
  }
  let varName = '__DELAY__'
  if (!window[varName]) {
    window[varName] = []
  }
  let __delay = window[varName]
  let delay = findDelay(__delay, id)
  let timer = null
  if (!delay) {
    timer = setTimeout(() => {
      fn(pause)
    }, ms)
    __delay.push({id, fn, timer})
  } else {
    pause()
    delay.timer = timer = setTimeout(() => {
      fn(pause)
    }, ms)
  }

  // 在回调里停止执行
  function pause() {
    if (delay && delay.timer) {
      clearTimeout(delay.timer)
    }
  }

  return timer
}

function findDelay(delays, id) {
  for (let i = 0; i < delays.length; i++) {
    let delay = delays[i]
    if (delay.id === id) {
      return delay
    }
  }
}
