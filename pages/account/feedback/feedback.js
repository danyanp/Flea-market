var Bmob = require('../../../utils/Bmob-1.6.7.min.js')
import Toast from '../../../style/dist/toast/toast';
var app = getApp()
Page({
    data: {
        userInfo: {},
    },
    onLoad: function () {
        var that = this
    },
    addFeedback: function (event) {
        var that = this;
        var contact = event.detail.value.contact;
        var content = event.detail.value.content;
    
        if(!contact || !content) {
          Toast('标题内容不能为空');
          return false;
        }

            const query = Bmob.Query('feedback');
            query.set("contact", contact)
            query.set("content", content)
            query.save().then(res => {
              console.log(res)
              Toast.success('反馈成功');
              setTimeout(function () {
                wx.navigateBack();
              }, 2000)
            }).catch(err => {
              Toast.fail('反馈失败');
              console.log(err)
            })
    },

})