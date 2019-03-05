# 开发文档
>## 1.技术栈
- ### 数据库 引入[Bmob](http://doc.bmob.cn/data/wechat_app_new/index.html)(文档)
- ### UI 引入[youzan](https://github.com/youzan/vant-weapp)(Github)
- ### UI 引入[WeiUI](https://github.com/Tencent/weui-wxss/)(Github)
>## 2.实现功能
- ### 1.登录功能
   > 用户一键登录
   - 获取用户信息，存入数据库
   - 缓存key='bmob'数据,作为用户是否登录的依据
   - 登录成功，2秒后调回原页面
- ### 2.发布商品
   - 用户绑定
   - 数据检测
   - 发布按钮的样式
   - 发布商品后的更新
      - 跳转到成功页面（解决清除数据问题）

- ### 3.查看商品
   - 下拉刷新
   - 有数据时显示，无数据时显示
   - 显示时间年，月，日
   - 顺序，倒序查看
   - 下拉加载，8个为一组
   - 末尾显示，已经到末尾
   - 一键返回顶端
   - 界面优化

- ### 4.活动详情模块

```
<view wx:if="{{length > 5}}">1</view>
<view wx:elif="{{length > 2}}">2</view>
<view wx:else>3</view>
```
- ### 5.设置底部tabBar
   - 主页 
      - 展示商品列表
      - 添加
   - 活动详情
      - 活动简介
      - 活动倒计时
      - 关于青协
   - 我的
      - 显示用户信息
      - 反馈
      - 小程序信息
- 