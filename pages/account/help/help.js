let App = getApp();

Page({
  data: {
    active1: [0],
    active2: 0,
    active3: [],
    title1: '关于本小程序（青协跳蚤市场）',
    title2: '联系方式',
    title3: '遇到问题',
    content1: '1.只为更方便，有趣的大学生活2.希望你可以在这里淘到自己喜欢的物品',
    content2: 'QQ：905986631',
    content3: '点击到物品详情页面，点击客服图标，或在用户页面进行反馈'
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  }
});
