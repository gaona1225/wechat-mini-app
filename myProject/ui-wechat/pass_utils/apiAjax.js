"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _pass_config=require("../pass_config"),wxRequestApi=function(e,t,o,a,i){wx.request({url:_pass_config.hostName+e,data:t,method:o?o:"GET",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(e){a(e,i)},fail:function(){},complete:function(){}})},apiAjax=function(e,t,o,a,i){void 0===o&&(o="POST"),_pass_config.DEBUG||wxRequestApi(e,t,o,a,i)};exports.apiAjax=apiAjax;