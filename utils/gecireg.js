function gecireg(str) {
  let geciarr = []
  let reg = /\[(\d{2}):(\d{2}).(\d{2,3})\]/
  str = str.split('\n')
  str.forEach(ele => {
    let info = reg.exec(ele)
    if(info != null) {
      let min = Number(info[1] * 60) + Number(info[2]) + Number(info[3])/(10 ** info[3].length) / 10
      let ci = info.input.substring(info[0].length)
      let obj = {
        time: min,
        text: ci
      }
      geciarr.push(obj)
    }
  });
  return geciarr
}
module.exports = {
  gecireg
}