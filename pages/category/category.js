// pages/account/ilike/ilike.js
var Bmob = require('../../utils/Bmob-1.6.7.min.js')
import Toast from '../../style/dist/toast/toast';
Page({
  data: {
    currentTab: null,
    winHeight: 0,
    good: [],
  },

  onLoad: function () {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    });
    wx.getSystemInfo({
      success: res => {
        this.setData({
          winHeight: res.windowHeight
        });
      }
    });

    let typeArray = [];
    const query = Bmob.Query("good_category");
    query.find().then(result => {
      for (let object of result) {
        typeArray.push({
          id: object.category,
          name: object.name
        })
      }
      const good = Bmob.Query("goods");
      good.include("category_id");
      return good.find();
    }).then(result => {
      let res = [];
      for (let type of typeArray) {
        let data = [];
        let canGetType = true
        for (let good of result) {
          if (!good.category_id) {
            canGetType = false
          }
 
          if (canGetType) {
            if (type.id == good.category_id.category) {
              data.push(good);
            }
          }
          canGetType = true
        }
        let goodData = {
          foodType: type.name,
          id: type.id,
          data: data
        };
        res.push(goodData);
        this.setData({
          good: res
        })
      }
      this.setData({
        good: res,
        currentTab: res[0].id,//第一个tab
      })
      console.log(this.data.good);
    });
  },

  chooseType: function (event) {
    let foodType = event.target.dataset.foodtype;
    this.setData({
      currentTab: foodType
    })
  },
})