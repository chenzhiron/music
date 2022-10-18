export default function fangdou(fn, delay = 500) {
  let time = null
  return function (arg) {
    return new Promise(res => {
      if (time != null) clearTimeout(time)
      time = setTimeout(() => {
        res(fn.call(this, arg))
      }, delay);
    })
  }
}