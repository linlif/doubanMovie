const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'top250',
    page: 1,
    count: 10,
    movies: [],
    loading: true,
    subtitle: '',
    hasMore: true,
    title: '',
  },

  loadMore() {
    // loading
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '加载中..'
    });

    if (this.data.hasMore) {
      app.douban.find(this.data.type, this.data.page, this.data.count)
        .then(d => {
          if (d.subjects.length > 0) {
            this.setData({
              page: this.data.page + this.data.count,
              subtitle: d.title,
              movies: this.data.movies.concat(d.subjects),
              loading: false,
              hasMore: true,
            })
            console.log(d)
          } else {
            this.setData({ subtitle: d.title, hasMore: false, loading: false })
          }
          // loading
          wx.hideNavigationBarLoading();
          wx.setNavigationBarTitle({
            title: this.data.title
          });
          // 取消下拉刷新
          wx.stopPullDownRefresh()
        })
        .catch(e => {
          this.setData({ subtitle: '获取数据异常', loading: false })
          console.error(e)
        });
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.setData({
      type: options.type || 'top250',
      title: options.title
    });

    wx.setNavigationBarTitle({
      title: '加载中..'
    })
    wx.showNavigationBarLoading()

    // app.douban.find(this.data.type, this.data.page, this.data.count)
    //   .then(d => {
    //     console.log(d)
    //     _this.setData({
    //       title: d.title,
    //       movies: d.subjects,
    //       loading: false,
    //       hasMore: true,
    //     });
    //     // loading
    //     wx.hideNavigationBarLoading();
    //     wx.setNavigationBarTitle({
    //       title: options.title
    //     });
    //   });
    this.setData({
      page: 1,
      count: 10,
    })
    this.loadMore();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 数据归位
    this.setData({ movies: [], page: 1, hasMore: true })
    this.loadMore()
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function (event) {
    if (this.data.title != '豆瓣电影本周口碑榜' &&
      this.data.title != '豆瓣电影北美票房榜' &&
      this.data.title != '豆瓣电影新片榜') {
      this.loadMore();
    } else {
      this.setData({ hasMore: false })
    }
  },

  // 点击跳转到电影详情页面
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?movieId=' + movieId,
    });
  }
})