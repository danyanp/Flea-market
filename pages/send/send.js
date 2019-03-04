import Toast from '../../style/dist/toast/toast';
var Bmob = require('../../utils/Bmob-1.6.7.min.js')
Page({
  data: {
    files: []
  },
  
  // 选择照片
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
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
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  // 表单提交
  formSubmit(e) {
    // 上传图片
    wx.getStorage({
      key: 'files',
      success(res) {
        console.log(res.data)
        var goodname = e.detail.value.goodname;
        var description = String(e.detail.value.description);
        var goodprice = e.detail.value.goodprice;
        var username = String(e.detail.value.username);
        var phonenum = Number(e.detail.value.phonenum);
        var classnum = e.detail.value.classnum;
        if (!goodname | !goodprice | !username | !phonenum | !classnum) {
          Toast('亲，打*号的为必填项');
          return false;
        }
        const relation = Bmob.Relation('_User')
        const relID = relation.add(['2e4facdd99'])
        const query = Bmob.Query('goods');
        query.set('User_id', relID);
        query.set("goodname", goodname)
        query.set("description", description)
        query.set("goodprice", goodprice)
        query.set("username", username)
        query.set("phonenum", phonenum)
        query.set("classnum", classnum)
        query.set('goodpicture', res.data[0])
        query.save().then(res => {

          Toast.success('发布成功,待审核');
          setTimeout(function() {
            wx.switchTab({
              url: '../index/index'
            })
          }, 2000)

          console.log(res)

        }).catch(err => {
          Toast.fail('发布失败');
          console.log(err)
        })
      }
    })
  },
  // 每一栏提示
  onClickIcon: function(e) {
    console.log(e.target.id)
    switch (e.target.id) {
      case 'name':
        Toast('为你的物品取一个好听的名字吧');
        break;
      case 'price':
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
});