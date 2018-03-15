//test.js
var app = getApp();
Page({
    data:{
        text: "自己的test页面"
    },

    bindInputValue1: function(e){
        var that = this;
        // 获取相应的输入值
        var value1 = e.detail.value;
        console.log(value1);
        that.setData({
            value1: value1
        });
        // 在这里可以获取value2 继续操作
        var value2 = that.data.value2;
        console.log("fff");
        console.log(value2);
        //这里可以继续操作
        //如实现联动更改
        if(value2 == "hello world!"){
            //这里做系列处理
            console.log("hello world!");
        }
    },

    bindInputValue2: function(e){
    // 类似 bindInputValue1
    }
});
