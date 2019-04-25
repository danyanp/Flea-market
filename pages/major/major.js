import Toast from '../../style/dist/toast/toast';
var Bmob = require('../../utils/Bmob-1.6.7.min.js')
// pages/major/major.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    major:[],
    viewdetail:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit:function(e){
    var that = this;
    var majornum = Number(e.detail.value.majornum);
    if (!majornum) {
      Toast('亲，打*号的为必填项');
      return false;
    }
    console.log(parseInt(majornum/100));
    const query = Bmob.Query('major');
    query.equalTo("classnum", "==", parseInt(majornum/100));
    query.find().then(res => {
      that.setData({
        major:res[0],
        viewdetail:true
      })
      console.log(res)
    });
  }
  
})