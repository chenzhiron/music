import {TopMv} from '../../network/module_video'
// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listMv:[],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    TopMv(0).then(res => {
          this.setData({
            listMv:res.data.data
          })
    }).catch(rej => {
      console.log(rej);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    TopMv(0).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        listMv:res.data.data
      })
      console.log(res.data);
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(!this.data.hasMore) return
    TopMv(this.data.listMv.length).then(res => {
      console.log(res.data);
      this.setData({
        listMv:this.data.listMv.concat(res.data.data),
        hasMore:res.data.hasMore
      })
    })
  },


  clickVideo(options) {
    let id = options.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/video_info/video_info?id='+id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})