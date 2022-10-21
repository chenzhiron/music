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
    app: {},
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
    isplay:true,
    mode: ['order','random','repeat'], 
    modeIndex:0, // 0-顺序，1-随机 2-重复
    musicIndex:0,
    musicList:[]
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
    console.log(options);
    const app = getApp()
    const hei = app.globalData.screenHeight - app.globalData.statusBarHeight - DAOHANGTITLE
    this.setData({
      app: app,
      swiperHeight: hei,
      titleHeight:app.globalData.statusBarHeight,
      musicIndex: app.globalData.musicIndex,
      musicList: app.globalData.musicList
    })
   this.geci(options.id)
   this.MusicInfo(options.id)
   this.getMusic(options.id)
  },
  geci(id) {
    getMusicGeci(id).then(res => {
      let str = gecireg(res.data.lrc.lyric)
      this.setData({
        geci: str
      })
    })
  },
  getMusic(id) {
    getMusicUrl(id).then(res => {
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
        currentTop: i * 35 + this.data.titleHeight + DAOHANGTITLE,
        currentIndex: i,
        currentgeci: this.data.geci[i - 1].text,
        currentTime: time,
        currentslider: current
      })
      }
    })
    musicContent.onEnded(() => {
      if(this.data.modeIndex == 2) {
        musicContent.seek(0)
        musicContent.autoplay = true
        musicContent.play()
        setTimeout(() => {
          console.log(musicContent.paused)
        }, 10)
         this.setData({
          currentTime:0,
          currentslider:0,
          currentTop: 0
         })
      }else {
        this.musicChange()
      }

    })
  },
  MusicInfo(id){
    getMusicInfo(id).then(res => {
      this.setData({
        music:res.data.songs[0],
        dt: res.data.songs[0].dt / 1000
      })
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
  modeChange() {
    let i = this.data.modeIndex + 1
    if(i == 3) i = 0
    this.setData({
      modeIndex: i
    })
  },
  musicpause() {
    this.setData({
      isplay: !this.data.isplay
    })
    this.data.isplay ? musicContent.play(): musicContent.pause()
  },
  musicUp() {
    this.musicChange(false)
  },
  musicNext() {
    this.musicChange() 
  },
  musicChange(isNext = true) {
    let i = this.data.musicIndex
    switch(this.data.modeIndex) {
      case 0:
        i = i + (isNext ? 1: -1)
        if(i == this.data.musicList.length) i = 0
        if(i == -1) i = this.data.musicList.length - 1
        break
      case 1:
        i = Math.floor(Math.random() * this.data.musicList.length)
        break
      case 2:
        break
    }
    let id = this.data.musicList[i].id
    this.geci(id)
    this.MusicInfo(id)
    this.getMusic(id)
    this.data.app.globalData.musicIndex = i
    this.setData({
      musicIndex: i
    })
  }
})