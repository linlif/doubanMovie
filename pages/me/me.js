//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    welcome: ""
  },
  onLoad: function () {
    this.setData({
      welcome: '欢迎来到个人中心！'
    })
  }
})
