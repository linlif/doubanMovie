const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // movieId: 0,
    // imgalist: [],
    // res: {},
    // casts: [],
    // photos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
      mask: true
    });
    this.setData({
      movieId: options.movieId,
    });
    app.douban.findOne(options.movieId).then(res => {
      console.log(res)
      this.setData(res);
      console.log(this.data.casts)
      console.log(this.data.photos)
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: '电影详情' });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // imgPreview: function () {
  //   wx.previewImage({
  //     current: this.data.casts, // 当前显示图片的http链接   
  //     urls: this.data.casts // 需要预览的图片http链接列表   
  //   })
  // },
})