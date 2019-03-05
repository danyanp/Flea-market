// pages/account/ilike/ilike.js
var Bmob = require('../../../utils/Bmob-1.6.7.min.js')
import Toast from '../../../style/dist/toast/toast';
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
    var that = this;
    var obj = App._isLogin().objectId;
    console.log(obj)
    const query = Bmob.Query("WhoWant");
    query.equalTo("user_id", "==", obj);
    query.equalTo("iwant", "==", 1);
    query.find().then(res => {
      console.log(res)
      that.setData({
        data: res
      })
    });
  }
})