// pages/account/release/release.js
var Bmob = require('../../../utils/Bmob-1.6.7.min.js')
import Toast from '../../../style/dist/toast/toast';
let App = getApp();
var obj
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    data: [], //页面数据
    pagination: 0, //页码
    pageSize: 10, //每页数据
    nodata: true, //无数据
    floorstatus: false, // 返回顶部
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    obj = App._isLogin().objectId;
    const query = Bmob.Query("goods");
    query.equalTo("User_id", "==", obj);
    query.find().then(res => {
      that.setData({
        data: res
      })
    });
  },
  onShow: function() {
    this.onLoad();
  },
  del: function(e) {
    // 删除goods表中的商品
    var objectId = e.target.id;
    const query = Bmob.Query('goods');
    query.destroy(objectId).then(res => {

      // 删除WhoWant中
      const query = Bmob.Query('WhoWant');
      query.equalTo("good_id", "==", objectId);
      query.find().then(todos => {
        console.log(todos.length)
        if (todos.length != 0) {
          todos.destroyAll().then(res => {
            // 成功批量修改
            console.log(res, 'ok')
          }).catch(err => {
            console.log(err)
          });
        }
      })
      Toast.success('删除成功');
      this.onShow();
    }).catch(err => {
      Toast.fail('删除失败');
    })
  },

})