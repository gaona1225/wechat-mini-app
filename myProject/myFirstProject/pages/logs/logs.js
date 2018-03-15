//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },

  //事件处理函数 -- 点击日志页面任何一个地方切换到自己的test页面
  bindViewTap:function(){
    console.log("logs bindViewTap");
    wx.navigateTo({
      url:'../test/test'
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
