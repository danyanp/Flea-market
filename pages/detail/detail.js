// pages/detail/detail.js
var Bmob = require('../../utils/Bmob-1.6.7.min.js')
import Toast from '../../style/dist/toast/toast';
var objectId;
// 判断第几次点击按钮
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    iwant: "",
    isiwant: 1,
    show: false,
    name: 'fade',
    showCustom: false,
    btniswant:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    objectId = options.goods_id;
    //判断是否登录，并提取objectid
    var obj = App._isLogin().objectId;
    //查询是否想要
    const querywho = Bmob.Query('WhoWant');
    querywho.equalTo("iwant", "==", 1);
    querywho.equalTo("good_id", "==", objectId)
    querywho.equalTo("user_id", "==", obj)
    querywho.find().then(res => {
      if (res.length == 0) {
        console.log("想要")
        that.setData({
          iwant: "想要",
          isiwant: 0
        })
      } else {
        console.log("已经想要")
        that.setData({
          iwant: "已经想要",
          isiwant: 1
        })
      }
    });

    // 获取物品详情
    const query = Bmob.Query('goods');
    query.get(objectId).then(res => {
      console.log(res)
      that.setData({
        detail: res
      })
    }).catch(err => {
      Toast.fail('加载错误！');
      setTimeout(function () {
        wx.reLaunch({
          url: '../../../../index/index',
        })
      }, 1000)
      console.log(err)
    })
  },

  // 点击按钮
  onClickButton: function(e) {
    console.log(e)
    var that = this;
    const query = Bmob.Query('goods')
    query.get(objectId).then(res => {
      res.increment('wantnum')
      res.save()
    }).catch(err => {
      console.log(err)
    })

    if (e.target.id == "activitydetails") {
      wx.switchTab({
        url: '../ActivityDetails/ActivityDetails'
      })
    } else {
      //爱心动画
      that.setData({
        showCustom: true
      });
      setTimeout(() => {
        that.setData({
          showCustom: false
        });
      }, 500);
      //判断是否已经想要
      if (this.data.isiwant != 0) {
        Toast.fail('已经想要了');
        return false;
      }
      //判断是否登录，并提取objectid
      var obj = App._isLogin().objectId;
      const pointer1 = Bmob.Pointer('_User')
      const user_id = pointer1.set(obj)
      const pointer2 = Bmob.Pointer('goods')
      const good_id = pointer2.set(objectId)
      const query = Bmob.Query('WhoWant');
      query.set('user_id', user_id);
      query.set('good_id', good_id);
      query.set('iwant', 1);
      query.save().then(res => {
        console.log(res)
        that.setData({
          btniswant:true,
          iwant: "已经想要"
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
})