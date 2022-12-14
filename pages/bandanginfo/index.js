import {
  getMusicinfo
} from '../../network/module_music.js'
// pages/bandanginfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bandanginfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getMusicinfo(options.id).then(res => {
      console.log(res);
      this.setData({
        bandanginfo:res.data.playlist
      })
    })
  },
  musicchange(res){
    const app = getApp()
    app.globalData.musicIndex = res.currentTarget.dataset.index
    app.globalData.musicList = this.data.bandanginfo.tracks
    const id = res.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/play_music/index?id='+id,
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})