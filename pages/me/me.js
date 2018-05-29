//logs.js
const util = require('../../utils/util.js');

Page({
  data: {
    welcome: "",
    qrcodeUrl: '',
    systemInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // var qrcodeUrl = '/images/gift.png';
    var qrcodeUrl = 'https://upload-images.jianshu.io/upload_images/4626959-76c02c2b512a1abc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240';
    this.setData({
      welcome: '欢迎来到个人中心！',
      qrcodeUrl: qrcodeUrl
    })

    // 获取系统信息
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        this.setData({
          systemInfo: res
        })
      },
    })

    // 获取当前网络状态
    wx.getNetworkType({
      success: res => {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        let { systemInfo } = this.data
        systemInfo.networkType = res.networkType
        this.setData({
          systemInfo: systemInfo
        })
      }
    })

    // 截屏监听
    wx.onUserCaptureScreen(function (res) {
      console.log(res)
      wx.showToast({
        title: '用户截屏了',
      })
    })
    // 获取屏幕亮度
    wx.getScreenBrightness({
      success: res => {
        let { systemInfo } = this.data
        console.log(res)
        systemInfo.brightNess = res.value
        this.setData({
          systemInfo: systemInfo
        })
      }
    })

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })

    // wx.downloadFile({
    //   url: avatarUrl,
    //   success(res) {
    //     console.log(res)
    //     const ctx = wx.createCanvasContext('myCanvas')
    //     ctx.setFillStyle('red')

    //     // ctx.fillRect(100, 100, 200, 200)
    //     // ctx.draw()

    //     ctx.drawImage(imgUrls[current], 0, 0, 320, 320)
    //     ctx.drawImage(res.tempFilePath, 0, 0, 100, 100)
    //     ctx.draw()

    //     wx.canvasToTempFilePath({
    //       canvasId: 'myCanvas',
    //       success: function (res) {
    //         wx.saveImageToPhotosAlbum({
    //           filePath: res.tempFilePath,
    //           success(res) {
    //             wx.showToast({
    //               title: '保存成功！',
    //             })
    //           }
    //         })

    //       }
    //     })

    //   }
    // })
  },
  // 预览图片
  previewImage: e => {
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
  // 获取用户信息
  bindGetUserInfo: e => {
    console.log(e.detail.userInfo)
  }
})
