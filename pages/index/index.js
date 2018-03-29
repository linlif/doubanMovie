// 获取全局应用程序实例对象
const app = getApp()

var postData = require('../data.js');

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,

    currentCity: '正在上映的电影-北京',

    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 5,

    movies: [
      { key: 'in_theaters' },
      { key: 'coming_soon' },
      { key: 'top250' },
      { key: 'new_movies' },
      { key: 'weekly' },
      { key: 'us_box', name: '北美票房榜' }
    ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadData();
  },

  /**
   * 加载数据
   */
  loadData: function () {
    const promises = this.data.movies.map(board => {
      return app.douban.find(board.key, this.data.page, this.data.count)
        .then(d => {
          console.log(d)
          board.movies = d.subjects
          board.title = d.title
          return board
        })
    })
    Promise.all(promises).then(movies => this.setData({ movies: movies, loading: false }));
    // 取消下拉刷新
    wx.stopPullDownRefresh();
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
    wx.setNavigationBarTitle({ title: '豆瓣电影' })
  },

  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh() {
    // this.setData({ movies: [], page: 1, hasMore: true })
    this.loadData();
  },

  /**
   * 触底事件处理函数--监听用户的上拉动作
   */
  onReachBottom() {
    // this.loadMore()
  },

})