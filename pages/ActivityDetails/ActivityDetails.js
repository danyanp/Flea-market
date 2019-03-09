var Bmob = require('../../utils/Bmob-1.6.7.min.js')
import Toast from '../../style/dist/toast/toast';
Page({
  data: {
    '__code__': {
      readme: ''
    },
    num_style: "width: 48rpx; font-size: 28rpx; color: #fff; background: #000; text-align: center; border-radius: 8rpx; padding: 5rpx 0;",
    symbol_style: "font-size: 28rpx;color: #000;padding: 0 12rpx;",
    steps: [{
        text: '阶段一',
        desc: '商品信息收集'
      },
      {
        text: '阶段二',
        desc: '商品浏览阶段'
      },
      {
        text: '阶段三',
        desc: '商品收集'
      },
      {
        text: '阶段四',
        desc: '线下购买阶段'
      }
    ],
    active:0,
    active1: [0],
    title1: '1.阶段一',
    title2: '2.阶段二',
    title3: '3.阶段三',
    title4: '4.阶段四',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    countdown: 100
  },
  methods: {},
  onChange(event) {
    const {
      key
    } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  },
  onLoad: function() {
    const query = Bmob.Query("ActivityDetails");
    query.find().then(res => {
      //倒计时
      console.log(res)
      var fronttimestamp = res[0].Start_Time.iso
      var nowtimestamp = (new Date()).valueOf();
      var countdown = Date.parse(fronttimestamp) / 1000 - nowtimestamp / 1000
      var active = res[0].active
      var content1 = res[0].content1
      var content2 = res[0].content2
      var content3 = res[0].content3
      var content4 = res[0].content4
      this.setData({
        active: active,
        countdown: countdown,
        content1: content1,
        content2: content2,
        content3: content3,
        content4: content4
      })

    })

  }
});