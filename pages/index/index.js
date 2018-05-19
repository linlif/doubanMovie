// 获取全局应用程序实例对象
const app = getApp()

/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('../../utils/wechat.js')

/**
 * Douban API 模块
 * @type {Object}
 */
const douban = require('../../utils/douban.js')

/**
 * Baidu API 模块
 * @type {Object}
 */
const baidu = require('../../utils/baidu.js')


Page({
  data: {
    // imgUrls: [
    //   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    // ],
    // indicatorDots: true,
    // autoplay: true,
    // interval: 3000,
    // duration: 500,
    currentCity: '正在上映的电影-北京',
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 6,

    movies: [
      { key: 'in_theaters' },
      { key: 'coming_soon' },
      { key: 'top250' },
      // { key: 'new_movies' },
      // { key: 'weekly' },
      // { key: 'us_box', name: '北美票房榜' }
    ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wechat
      .getLocation()
      .then(res => {
        const { latitude, longitude } = res
        return baidu.getCityName(latitude, longitude)
      })
      .then(name => {
        this.data.currentCity = name.replace('市', '')
        console.log(`currentCity : ${this.data.currentCity}`)
        // 加载数据
        this.loadData();        
      })
      .catch(err => {
        this.data.currentCity = '北京'
        console.error(err)
      })
  },

  /**
   * 加载数据
   */
  loadData: function () {
    // loading
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '加载中..'
    });
    const promises = this.data.movies.map(board => {
      return app.douban.find(board.key, this.data.page, this.data.count, this.data.currentCity)
        .then(d => {
          console.log(d)
          board.movies = d.subjects
          board.title = d.title
          return board
        })
    })
    Promise.all(promises).then(movies => {
      this.setData({ movies: movies, loading: false, hasMore: false })
      // 取消下拉刷新
      wx.stopPullDownRefresh();
      // 取消loading
      wx.hideNavigationBarLoading();
      wx.setNavigationBarTitle({
        title: '榜单'
      });
    });


  },

  // 点击单个电影跳转
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?movieId=' + movieId,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // wx.setNavigationBarTitle({ title: '电影榜单' })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh(event) {
    this.setData({
      movies: [
        { key: 'in_theaters' },
        { key: 'coming_soon' },
        { key: 'top250' },
      ]
    });
    this.loadData();
  },

  /**
   * 触底事件处理函数--监听用户的上拉动作
   */
  onReachBottom() {
    // 判断是否已经加载完毕
    if (this.data.movies.length < 5) {
      this.setData({
        movies: this.data.movies.concat(
          { key: 'new_movies' },
          { key: 'weekly' },
          { key: 'us_box', name: '北美票房榜' })
      });
      this.loadData();
    }
  },
  /*
     * 定义页面分享函数
     */
  onShareAppMessage: function (event) {
    return {
      title: '电影榜单',
      desc: '豆瓣电影榜单速查，掌握最新电影资讯！',
      path: '/pages/index/index'
    }
  }

});