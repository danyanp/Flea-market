Page({
  data: {
    data: []
  },

  onLoad:function(e){
    console.log(e)
    var that = this;
    that.setData({
      data: e.context
    })
  },
  setJump:function(){
    wx.switchTab({
      url: '../index/index'
    })
  }
});