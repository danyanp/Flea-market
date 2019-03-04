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
    try {
      const value = wx.getStorageSync('bmob')
      if (value) {
        console.log("登录状态");
        // Do something with return value
      } else {
        console.log("未登录状态");
        wx.hideNavigationBarLoading();
        App._doLogin();
      }
    } catch (e) {
      console.log(e);
      // Do something when catch error
    }

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