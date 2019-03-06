// pages/account/info/info.js
var Bmob = require('../../../utils/Bmob-1.6.7.min.js')
import Toast from '../../../style/dist/toast/toast';
let App = getApp();
var obj;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    obj = App._isLogin().objectId;
    const query = Bmob.Query('_User');
    query.get(obj).then(res => {
      console.log(res)
      that.setData({
        info:res
      })
    }).catch(err => {
      console.log(err)
    })
    
  },
  formSubmit:function(e){
    console.log(e)
    var newusername = e.detail.value.username;
    const query = Bmob.Query('_User');
    query.get(obj).then(res => {
      console.log(res)
      res.set('username', newusername)
      res.save()
      Toast.success('更新成功');
    }).catch(err => {
      console.log(err)
    })
   

  }
})