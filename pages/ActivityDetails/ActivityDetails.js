Page({
  data: {
    '__code__': {
      readme: ''
    },
    num_style:"width: 48rpx; font-size: 28rpx; color: #fff; background: #000; text-align: center; border-radius: 8rpx; padding: 5rpx 0;",
    symbol_style:"font-size: 28rpx;color: #000;padding: 0 12rpx;",
    steps: [
      {
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
    active1: [0],
    title1: '1.阶段一',
    title2: '2.阶段二',
    title3: '3.阶段三',
    title4: '4.阶段四',
    content1: '信息收集',
    content2: '浏览展示',
    content3: '物品收集',
    content4: '线下跳蚤市场',
    countdown: 1000000
  },
  methods: {},
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  },
  onLoad:function(){}
});