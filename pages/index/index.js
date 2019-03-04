import Toast from '../../style/dist/toast/toast';
var Bmob = require('../../utils/Bmob-1.6.7.min.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    files: [],
    data:[]
  },
  onLoad: function () {
    var that = this;
    const query = Bmob.Query("goods");
    query.find().then(res => {
      that.setData({
        data: res
      })
    });
  },
  //下拉刷新
  onPullDownRefresh() {
    var that = this;
    console.log("下拉刷新");
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    that.onLoad(); 
    setTimeout(function () {
      console.log("停止刷新");
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      Toast.success('刷新成功');
    }, 1000) 
  },
  onShow:function(){
    this.onLoad();
  },
  // 选择照片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 1.上传图片
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          console.log('itemn', item)
          file = Bmob.File('abc.jpg', item);
        }
        file.save().then(res => {
          // 缓存图片信息
          wx.setStorage({
            key: 'files',
            data: res
          })
          console.log(res.length);
          console.log(res);
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  // 表单提交
  formSubmit(e) {
        var that = this;
        // 上传图片
        try {
          var value = wx.getStorageSync('files')[0]
          if (!value) {
            console.log("未存在缓存");
            Toast('亲，需要上传一张照片');
            return false;
          }
        } catch (e) {
          console.log(e);
          // Do something when catch error
        }
        var goodname = e.detail.value.goodname;
        var description = String(e.detail.value.description);
        var goodprice = e.detail.value.goodprice;
        var username = String(e.detail.value.username);
        var phonenum = Number(e.detail.value.phonenum);
        var classnum = e.detail.value.classnum;
        var pic = value;
  
        if (!pic|!goodname | !goodprice | !username | !phonenum | !classnum)         {
          Toast('亲，打*号的为必填项');
          return false;
        }
        //判断是否登录，并提取objectid
        try {
          const value = wx.getStorageSync('bmob')
          if (value) {
            console.log("登录状态");
            var obj = JSON.parse(value).objectId;
            // Do something with return value
          } else {
            console.log("未登录状态");
            wx.hideNavigationBarLoading();
            App._doLogin();
          }
        } catch (e) {
          console.log(e);
          // Do something when catch error
        }

        const relation = Bmob.Relation('_User') 
        const relID = relation.add(obj)
        const query = Bmob.Query('goods');
        query.set('User_id', relID);
        query.set("goodname", goodname)
        query.set("description", description)
        query.set("goodprice", goodprice)
        query.set("username", username)
        query.set("phonenum", phonenum)
        query.set("classnum", classnum)
        query.set('goodpicture', pic)
        query.save().then(res => {
          // 清除缓存
          wx.removeStorage({
            key: 'files',
            success(res) {
              console.log("清除成功"+res.data)
            }
          })
          var context = "请勿重复发布！！！！";
          // 更新页面
            wx.redirectTo({
              url: "../msg/msg_success?context=" + context
            })

        }).catch(err => {
          Toast.fail('发布失败');
          console.log(err)
        })
  
  },
  // 每一栏提示
  onClickIcon: function (e) {
    console.log(e.target.id)
    switch (e.target.id) {
      case 'goodname':
        Toast('为你的物品取一个好听的名字吧');
        break;
      case 'goodprice':
        Toast('为你的物品，给出一个合理的价格');
        break;
      case 'username':
        Toast('亲，需要知道你的名字哦，绝对保密');
        break;
      case 'phonenum':
        Toast('亲，需要知道你的电话号码，联系你哦，绝对保密');
        break;
      case 'classnum':
        Toast('亲，我们会上门收货的哦');
        break;
      default:
        Toast('我是提示文案，建议不超过十五字~');
    }
  }
})