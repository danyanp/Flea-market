# Flea_market青协跳蚤市场 （bomb版）

> 青协跳蚤市场是每一年一次的青协的活动
>> 学长，学姐将用不着的东西定价交给青协，青协将在跳蚤市场上卖掉，多出的差价用于青协公益活动

---
## 1.需要实现功能（流程）
- 1.商品信息收集阶段
   - 用户点开小程序，找到活动入口
   - 进入信息提交
   - 信息提交后审核
   - 商品收集阶段
- 2.商品浏览阶段
   - 浏览分为web端,和小程序端
   - 活动预热
- 3.线下购买阶段
   - 摊位
   - 商品信息更新
---
## 2.需求分析
- 1.展示拍卖品
    - 描述
    - 定价
    - 提供人
    - 想要购买
    - 交易方式

- 2.活动详情
    - 线上查看
    - 青协收集
    - 线下购买

- 3.添加拍卖品
    - ajax提交
         - 描述
         - 定价
         - 提供人
         - 交易方式
    - 审核发布
---
- 需求
> 用户提交信息
- 分析
> 用户信息 商品信息 地址信息

---
- 需求
> 提交信息需要审核
- 分析
> 商品的状态可分为 待审核 审核未通过  有售 售空

---
- 需求
> 商品信息后，需要打印
- 分析
> 转成wor表格

---

- 需求
> 统计有多少用户需要
- 分析
> 在点击购买按钮改成 我需要

---

- 需求
> 商品详情
- 分析
> 商品是由用户提交的

---

- 需求
> 用户修改商品
- 分析
> 通过微信帐号，获取详情
---
## 3.E-R分析
---
## 4.数据库设计
- 网站信息
    - web_id  网站标题
    - web_name  网站内容
    - web_images  网站图片（轮播图）
    - web_status  网站状态
- 管理员
    - id
    - username
    - password
    - login_count
    - create_time
    - update_time
- 拍卖品
    - goods_status
    - goods_id
    - goods_name
    - category_id
    - goods_content
    - goods_price
    - goods_provider
    - goods_transactionmode
- 拍卖品分类
    - 
    -
    -
    -
    -
    -
- 活动详情（网站功能）
    - 活动详情
---
## 5.开发阶段
[开发文档](https://github.com/danyanp/Flea-market/blob/master/Developing.md)
---
## 6.工程目录
---
## 7.Debug
