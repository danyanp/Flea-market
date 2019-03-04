var Bmob = require('../../utils/Bmob-1.6.7.min.js')
let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 授权登录
   */
  authorLogin: function (e) {
    let _this = this;
    console.log(e.detail.rawData);
    var obj1 = JSON.parse(e.detail.rawData); //可用此方法来转换

    var nickName = obj1.nickName
    let params = {
      username: nickName,
      password: '2019123456'
    }
    Bmob.User.register(params).then(res => {
      // 一键登录
      _this.Onelogin(obj1);
      console.log(res)
      _this.navigateBack();
    }).catch(err => {
      if (err=202){
        _this.Onelogin(obj1);
      }
      console.log(err)
    });
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
  },
  Onelogin: function (obj1){
    var _this = this;
    var username = obj1.nickName;
    var password = '2019123456';
    Bmob.User.login(username, password).then(res => {
      wx.showLoading({ title: "登录成功", mask: true });
      setTimeout(function () {
        wx.hideLoading();
      }, 2000)
      _this.navigateBack();
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },



  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function () {
    wx.navigateBack();
  },

})