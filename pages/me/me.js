//logs.js
const util = require('../../utils/util.js');

Page({
  data: {
    welcome: "",
    qrcodeUrl: '',
  },
  onLoad: function () {
    // var qrcodeUrl = '/images/gift.png';
    var qrcodeUrl = 'https://upload-images.jianshu.io/upload_images/4626959-76c02c2b512a1abc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240';
    this.setData({
      welcome: '欢迎来到个人中心！',
      qrcodeUrl: qrcodeUrl
    })
  },
  // scanQRCode: function () {
  //   wx.scanCode({
  //     success: function (result) {
  //       wx.showModal(
  //         {
  //           content: JSON.stringify(result)
  //         })
  //     },
  //     fail: function (error) {
  //       wx.showModal(
  //         {
  //           content: JSON.stringify(error)
  //         })
  //     }
  //   })
  // },
  previewImage: function (e) {
    console.log(this.data.qrcodeUrl.split(','))
    wx.previewImage({
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
      urls: this.data.qrcodeUrl.split(',')  
    });
    // wx.chooseImage({
    //   success: function (res) {
    //     wx.getImageInfo({
    //       src: res.tempFilePaths[0],
    //       success: function (res) {
    //         console.log(res)
    //         console.log(res.width)
    //         console.log(res.height)
    //       }
    //     })
    //   }
    // })
  },

})
