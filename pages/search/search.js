const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '唐人街',
    selectionStart: -1,
    selectionEnd: -1,
    page: 1,
    count: 10,
    title: '',
    total: 0,
    movies: [],
    hasMore: false,
    summaryHidden: true,
  },
  // 点击键盘上的“完成”按钮
  onTapConfirm: function (event) {
    var value = event.detail.value;
    console.log(value.trim().length);
    if (value.trim().length > 0) {
      // 每次按搜索，重新初始化数据
      this.setData({
        search: value,
        page: 1,
        count: 10,
        movies: [],
        summaryHidden: false,
        hasMore: false
      });
      this.loadMore();
    } else {
      this.setData({
        hasMore: false
      });
      wx.showToast({
        title: '搜索内容不能为空！',
        icon: 'none',
        duration: 2000
      })
    }

  },
  // 点击电影跳转到详情页
  onTapMovie: function (event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '/pages/detail/detail?movieId=' + movieId,
    })
  },

  onInputFocus: function (event) {
    console.log(event)
    var val = event.detail.value;
    this.setData({
      selectionStart: 0,
      selectionEnd: val.toString().length - 1
    });
  },

  // 加载更多数据
  loadMore: function () {
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '加载中..'
    });
    if (!this.data.hasMore) {
      app.douban.search(this.data.search, this.data.page, this.data.count)
        .then(d => {
          if (d.subjects.length > 0) {
            this.setData({
              page: this.data.page + this.data.count,
              title: d.title,
              total: d.subjects.length,
              movies: this.data.movies.concat(d.subjects),
              hasMore: false
            });
          } else {
            this.setData({
              hasMore: true
            });
          }
          console.log(d)
          wx.hideNavigationBarLoading();
          wx.setNavigationBarTitle({
            title: '搜索电影'
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  onInputBlur: function (event) {
    console.log(event)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // this.loadMore();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})