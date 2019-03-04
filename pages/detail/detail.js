// pages/detail/detail.js
var Bmob = require('../../utils/Bmob-1.6.7.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    var objectId = options.goods_id;
    const query = Bmob.Query('goods');
    query.get(objectId).then(res => {
      that.setData({
        detail: res
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
})