//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    passimg:{
      logo:'../../resources/logo.png'
    },
    urlParam:{
      smsloginPage:'',
      isreg:1,
      mobile:'150***0'
    }
  },
  //事件处理函数
  listenerUsernameInput:function(e){
    this.data.userName = e.detail.value ;
  },
  getphoneStatus:function(e){
    var me = this ;
    if(!me.data.userName || !new RegExp(/^1[34578]\d{9}$/).test(me.data.userName)){
      wx.showToast({
        title:"请输入有效手机",
        icon:"loading",
        duration:2000
      })
    }else{
      wx.showToast({
        title:"发送中...",
        icon:"loading",
        duration:2000
      })
      wx.request({
        url: 'https://wappass.baidu.com/wp/api/security/getphonestatus',
        data: {
          "clientfrom":"wx_wap",
          "action":"login",
          "is_voice_sms":0,
          "username":me.data.userName,
          "tt":new Date().getTime()
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         header: {
           'Content-Type': 'application/json; charset=UTF-8'
         }, // 设置请求的 header
        success: function(res){
          wx.hideToast()
          // success
          if(res.data.errInfo.no && res.data.errInfo.no == 0){
            var data = {
              successFn:function(){
                console.log("successFn");
                wx.navigateTo({
                  url: '../index/index?smsloginPage=smsvcode&mobile='+me.data.userName
                })
              },
              errorFn:function(){
                console.log("errorFn");
              }
            };
            me.sendMobile(data);
          }else if(res.data.errInfo.no && res.data.errInfo.no == 3){
            var data = {
              successFn:function(){
                console.log("successFn");
                wx.navigateTo({
                  url: '../index/index?smsloginPage=smsvcode&isreg=1&mobile='+me.data.userName
                })
              },
              errorFn:function(){
                console.log("errorFn");
              }
            };
            me.sendMobile(data);
          }else{
            wx.showToast({
              title:res.data.errInfo.msg || "",
              icon:"loading",
              duration:2000
            })
          }
          
          
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  },
  sendMobile: function(data) {
    var me = this ;
    wx.showToast({
        title:"发送中...",
        icon:"loading",
        duration:2000
      })
      wx.request({
        url: 'https://wappass.baidu.com/wp/api/login/sms',
        data: {
          "clientfrom":"wx_wap",
          "is_voice_sms":0,
          "username":me.data.userName,
          "tt":new Date().getTime()
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         header: {
           'Content-Type': 'application/json; charset=UTF-8'
         }, // 设置请求的 header
        success: function(res){
          wx.hideToast()
          // success
          if(res.data.errInfo.no && (res.data.errInfo.no == 0 || res.data.errInfo.no == 50020)){
            data.successFn && data.successFn();
          }else{
            wx.showToast({
              title:res.data.errInfo.msg || "",
              icon:"loading",
              duration:2000
            })
          }
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    
  },
  
  submitLogin: function() {
  },
  onLoad: function (option) {
    var that = this;
    if(option.smsloginPage == "smsvcode"){
      wx.setNavigationBarTitle({title:"验证手机号"});
    }else{
      wx.setNavigationBarTitle({title:"短信验证登录"});
    }
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        urlParam:{
          smsloginPage:option.smsloginPage || "",
          isreg:option.isreg || "",
          mobile:option.mobile || ""
        }
      })
    })
  }
})