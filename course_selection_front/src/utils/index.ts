/* export class throttle {
  public use(cb: Function, wait: number) {
    let timer: number,
      stop = false

    return function (this: any, ...p: any[]) {
      clearTimeout(timer)
      if (stop) {
        timer = setTimeout(() => {
          cb.apply(this, p)
        }, wait)
      } else {
        stop = true
        cb.apply(this, p)
        setTimeout(() => {
          stop = false
        }, wait)
      }
    }
  }
}
 */

// 防抖
export function debounce(cb: Function, wait: number) {
  let timer: number
  return function (this: any, ...p: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb.apply(this, p)
    }, wait)
  }
}

// 节流
export function thorttle(cb: Function, wait: number) {
  let preTime: number = 0
  return function (this: any, ...p: any[]) {
    const curTime = Date.now()
    if (curTime - preTime > wait) {
      cb.apply(this, p)
      preTime = curTime
    }
  }
}
