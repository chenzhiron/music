import { getMusicUrl, getMusicInfo } from '../../network/play_music'
import { DAOHANGTITLE } from '../../const/index'
// pages/play_music/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleHeight:0,
    swiperHeight:0,
    DAOHANGTITLE,
    current:0,
    music:{},
    music_info:{},
    dt:0
  },
  back() {
    wx.navigateBack({
      delta: 1,
    })
  },
  changeSwiper(current, any) {
    this.setData({
      current: current.detail.current
    })
  },
  changeCurrent(index) {
    let i = Number(index.currentTarget.dataset.index)
    if(index === this.data.current) return 
    this.setData({
      current:i
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp()
    this.setData({
      titleHeight:app.globalData.statusBarHeight
    })
    const hei = app.globalData.screenHeight - this.data.titleHeight - DAOHANGTITLE
    this.setData({
      swiperHeight: hei
    })
    getMusicInfo(options.id).then(res => {
      this.setData({
        music:res.data.songs[0]
      })
    })
    getMusicUrl(options.id).then(res => {
      this.setData({
        music_info:res.data.data[0]
      })
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