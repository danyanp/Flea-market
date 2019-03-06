// pages/account/release/release.js
var Bmob = require('../../../utils/Bmob-1.6.7.min.js')
import Toast from '../../../style/dist/toast/toast';
let App = getApp();
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
  onLoad: function (options) {
    var that = this;
    var obj = App._isLogin().objectId;
    console.log(obj)
    const query = Bmob.Query("goods");
    query.equalTo("User_id", "==", obj);
    query.find().then(res => {
      console.log(res)
      that.setData({
        data:res
      })
    });
  },
    onShow:function(){
      this.onLoad();
    },
    del:function(e){
      console.log(e);
      var objectId = e.target.id;
      const query = Bmob.Query('goods');
      query.destroy(objectId).then(res => {
        console.log(res)
        Toast.success('删除成功');
        this.onShow();
      }).catch(err => {
        Toast.fail('删除失败');
        console.log(err)
      })
    }

})