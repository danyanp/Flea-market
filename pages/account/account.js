let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderCount: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是否登录
    var that = this;
    var obj = App._isLogin();
    console.log(obj)
    that.setData({
      userInfo: obj
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
    onShow: function (options) {
    // 获取当前用户信息
    this.getUserDetail();
  },

  /**
   * 获取当前用户信息
   */
  getUserDetail: function () {

  },


})