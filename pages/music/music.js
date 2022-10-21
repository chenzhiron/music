import { getBanner, tuijianMusic, gedan, getlist } from '../../network/module_music'
import  countImage  from '../../utils/imageheight'
import  fangdou  from '../../utils/fangdou'
import { Login } from '../../network/denglu'
const _imageload = fangdou(countImage)
// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app:{},
    banner:[],
    tuijinaMusic:[],
    swiperheight:0,
    gedanlist: [],
    leixingbang: {name:{},list:[]}
  },
  onclickInput() {
    wx.navigateTo({
      url: '/pages/search_info/index',
    })
  },
  imageloaed() {
    _imageload('#swiperimage').then(res => {
      this.setData({
        swiperheight:res[0].height
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp()
    this.setData({
      app:app
    })
    wx.getSystemInfo({
      success: (result) => {
       app.globalData.screenWidth = result.screenWidth
       app.globalData.screenHeight = result.screenHeight
       app.globalData.statusBarHeight = result.statusBarHeight
      },
    })
    this.sendnetwork()
  },

  sendnetwork() {
    Login().then(res => {
      console.log('登录完成');
    })
    tuijianMusic(7).then(res => {
      this.setData({
        tuijinaMusic:res.data.result.splice(0,6)
      })
    })
    getBanner(2).then(res => {
      this.setData({
        banner: res.data.banners
      })
    })
    gedan().then(res => {
      this.setData({
        gedanlist:res.data.playlists
      })
    })
    getlist().then(res => {
      this.setData({
        ['leixingbang.name'] : res.data.artistToplist,
        ['leixingbang.list'] : res.data.list.splice(0,6)
      })
    })
  },
  navToinfo(data){
    const id = data.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/gedanInfo/index?id='+id,
    })
  },
  bandang(data) {
    const id = data.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/bandanginfo/index?id='+id,
    })
  },
  music_play(item) {
    const app = getApp()
    app.globalData.musicIndex = item.currentTarget.dataset.index
    app.globalData.musicList = this.data.tuijinaMusic
    const id = item.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/play_music/index?id='+id,
    })
  },
  goMusic() {
    wx.navigateTo({
      url: '/pages/play_music/index?id='+this.data.app.globalData.musicList[this.data.app.globalData.musicIndex].id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  onShow() {
    const app = getApp()
    this.setData({
      app
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
})