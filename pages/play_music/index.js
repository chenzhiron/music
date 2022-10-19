import { getMusicUrl, getMusicInfo, getMusicGeci } from '../../network/play_music'
import { DAOHANGTITLE } from '../../const/index'
import { musicContent } from '../../const/music'
import { gecireg } from '../../utils/gecireg'
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
    dt:0,
    currentTime:0,
    currentslider:0,
    isslider:true,
    geci:[],
    currentgeci:'',
    currentIndex:0,
    currentTop:0,
    isplay:true
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
    getMusicGeci(options.id).then(res => {
      console.log(res);
      let str = gecireg(res.data.lrc.lyric)
      this.setData({
        geci: str
      })
    })
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
        music:res.data.songs[0],
        dt: res.data.songs[0].dt / 1000
      })
    })
   
    getMusicUrl(options.id).then(res => {
      this.setData({
        music_info:res.data.data[0]
      })
      musicContent.src = res.data.data[0].url
    })
    musicContent.onCanplay(()=> {
      musicContent.play()
    })
    musicContent.onTimeUpdate(() => {
      if(this.data.isslider) {
        let time = musicContent.currentTime
        let current = musicContent.currentTime / this.data.dt * 100
       
       let i = 0
       for(;i<this.data.geci.length;i++) {
         if(this.data.geci[i].time > time){
           break;
         }
       }
       this.setData({
        currentTop: i * 35,
        currentIndex: i,
        currentgeci: this.data.geci[i-1].text != undefined ? this.data.geci[i-1].text : '',
        currentTime: time,
        currentslider: current
      })
      }
    })
  },
  sliderchangering() {
    if(this.data.isslider) {
      this.setData({
        isslider: false
      })
    }
  },
  sliderchanger(res) {
    musicContent.pause()
    const index = res.detail.value
    const num = this.data.dt * index / 100
    musicContent.seek(num)
    this.setData({
      isslider:true
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

  musicpause() {
    this.setData({
      isplay: !this.data.isplay
    })
    this.data.isplay ? musicContent.play(): musicContent.pause()
  }
})