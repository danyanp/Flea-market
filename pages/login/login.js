var Bmob = require('../../utils/Bmob-1.6.7.min.js')
import Toast from '../../style/dist/toast/toast';
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
  onLoad: function(options) {

  },

  /**
   * 授权登录
   */
  authorLogin: function(e) {
    var that = this;
    Bmob.User.auth().then(res => {
      Toast.success('一键登陆成功');
      setTimeout(function() {
        that.navigateBack();
      }, 2000)
      console.log('一键登陆成功')

    }).catch(err => {
      Toast.fail('重新登录');
      console.log(err)
    });
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
  },

  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function() {
    wx.navigateBack();
  },

})