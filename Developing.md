# 开发文档
>## 1.技术栈
- ### 数据库 引入[Bmob](http://doc.bmob.cn/data/wechat_app_new/index.html)(文档)
- ### UI 引入[youzan](https://github.com/youzan/vant-weapp)(Github)
- ### UI 引入[WeiUI](https://github.com/Tencent/weui-wxss/)(Github)
- ### 颜色管理
   - 背景色 灰白色 #f8f8f8 
   - 基础色
      - 灰色 #EFEFEF
      - 白色 #FFFFFF
      - 蓝色 #1296db
        - 蓝色（亮）#1989fa
      - 红色 #E64340
- ### 字体管理
   - 一般字体为36 32 28 24 22 rpx

>## 2.实现功能
- ### 1.登录功能
   > 用户一键登录
   - 获取用户信息，存入数据库
   - 缓存key='bmob'数据,作为用户是否登录的依据
   - 登录成功，2秒后调回原页面
   - 增加判断是否登录方法App._isLogin()
- ### 2.发布商品
   - 用户绑定
   - 数据检测
   - 发布按钮的样式
   - 发布商品后的更新
      - 跳转到成功页面（解决清除数据问题）
   - 添加分类

- ### 3.查看商品
   - 上传图片
   - 下拉刷新
   - 有数据时显示，无数据时显示
   - 显示时间年，月，日
   - 顺序，倒序查看
   - 下拉加载，8个为一组
   - 末尾显示，已经到末尾
   - 一键返回顶端
   - 界面优化

- ### 4.活动详情模块（ActivityDetails ）
   - 活动详情
      - 怎么操作
   - 活动倒计时

- ### 5.设置底部tabBar
   - 主页 
      - 展示商品列表
      - 添加
   - 分类
     - 分类
   - 活动详情
      - 活动简介
      - 活动倒计时
      - 关于青协
   - 我的
      - 显示用户信息
      - 反馈
      - 小程序信息
- ### 6.商品详情页面
   - 点击想要，产生动画效果
   - 显示 图片 名字 价格 发布时间 想要人数 描述
   - 交易方式
   - 客服按钮
- ### 7.个人中心
   - 个人信息（已完成）
      - 更改用户名
   - 我的发布（已完成）
   - 我的喜欢（已完成）
   - 我的帮助
      - 帮助文档
         - 关于本小程序
         - 如何使用
         - 常遇问题
   - 意见反馈（已完成）