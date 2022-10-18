// const BASE_URL = 'http://123.207.32.32:9001'
const BASE_URL = 'http://localhost:3000'


class GetData {
  getData(url,methods,parms) {
   return new Promise((resolve,reject) => {
      wx.request({
        url: BASE_URL + url,
        method:methods,
        data:parms,
        success:function(res) {
          resolve(res)
        },
        fail:function(err) {
          reject(err)
        }
      })
   })
  }
  GETdata(url,parms) {
    return this.getData(url,'GET',parms)
  }
  POSTdata(url,parms) {
    return this.getData(url,'POST',parms)
  }
}

const Music = new GetData()

module.exports = Music