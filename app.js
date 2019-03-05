//引入Bomb
var Bmob = require('utils/Bmob-1.6.7.min.js')
Bmob.initialize("1bacb4177d73bf9bb5f28c6329d22bd4", "ed4734ed7ea6aa6516ac32028cf15bb4");

//app.js
App({
  onLaunch: function () {
    this._isLogin();
  },
   /**
 * 判断是否登录
 */
  _isLogin:function(){
    // 判断是否登录

    try {
      const value = wx.getStorageSync('bmob')
      if (value) {
        console.log("登录状态");
        var obj = JSON.parse(value)
        var object = obj.objectId;
        const query = Bmob.Query('_User');
        query.get(object).then(res => {
        }).catch(err => {
          this._doLogin();
        })
        return obj;
        // Do something with return value
      } else {
        console.log("未登录状态");
        wx.hideNavigationBarLoading();
        this._doLogin();
      }

    } catch (e) {
      console.log(e);
      // Do something when catch error
    }
  },


  /**
 * 执行用户登录
 */
  _doLogin: function () {
    // 保存当前页面
    let pages = getCurrentPages();
    if (pages.length) {
      let currentPage = pages[pages.length - 1];
      "pages/login/login" != currentPage.route
        && wx.setStorageSync("currentPage", currentPage);
    }
    // 跳转授权页面
    wx.navigateTo({
      url: "/pages/login/login"
    });
  },
  globalData: {
    userInfo: null
  }
})