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

      console.log('this.data')
      console.log(this.data)

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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.title,
      desc: this.data.summary,
      path: '/pages/detial/detail'
    }
  },

  previewImage(e) {
    let previewPhotos = [];
    // 提取影人照片
    if (e.currentTarget.dataset.type == 'castPhoto') {
      let casts = this.data.casts
      for (let [index, elem] of casts.entries()) {
        previewPhotos.push(elem.avatars.large);
      }
    } 
    // 提取相关剧照
    else if (e.currentTarget.dataset.type == 'stagePhoto') {
      let photos = this.data.photos
      for (let [index, elem] of photos.entries()) {
        previewPhotos.push(elem.image);
      }
    }

    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接   
      urls: previewPhotos // 需要预览的图片http链接列表   
    })

  },
})