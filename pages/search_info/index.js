import { searchHots,searchMusic } from '../../network/search'
// pages/search_info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchHot:[],
    songs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    searchHots().then(res => {
      this.setData({
        searchHot: res.data.result.hots
      })
    })
  },
  searchGet(res) {
    if(!res.detail) {
      this.setData({
        songs:[]
      })
      return
    }
    searchMusic(res.detail).then(res => {
      this.setData({
        songs:res.data.result.songs
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