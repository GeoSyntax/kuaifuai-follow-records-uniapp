# 跟进记录 uni-app 面试作业说明

## 项目概述

本项目是根据面试题要求完成的移动端 H5 页面，使用 `uni-app + Vue3 + Vite` 开发。项目聚焦客户跟进记录场景，只实现题目要求的两个页面，不包含登录、审批等额外流程。

## 已完成内容

- 跟进记录列表页：展示跟进记录、支持下拉刷新、支持滑动到底部自动加载下一页。
- 添加跟进记录页：支持新增跟进记录。
- 必填校验：`主题内容`、`沟通详情` 未填写时会显示错误提示。
- 异常处理：列表加载失败时可重试，保存失败时会提示用户。
- 防误操作：添加页已输入内容后取消，会提示确认是否放弃编辑。
- mock 数据：内置本地 mock 接口，不依赖后端服务。
- 本地存储：新增记录会保存到本地，下次打开仍可看到。
- 响应式适配：按手机 H5 设计，适配常见手机宽度；桌面打开时以手机宽度居中展示。

## 技术选型

- 框架：uni-app
- 前端框架：Vue3
- 构建工具：Vite
- 数据方案：本地 mock API + uni-app storage
- 交付目标：H5，可继续扩展为微信小程序构建

## 页面路径

- 列表页：`src/pages/follow/list.vue`
- 添加页：`src/pages/follow/add.vue`

## 运行方式

首次运行：

```bash
npm install
npm run dev:h5
```

启动后在浏览器打开：

```text
http://localhost:5173/
```

构建 H5 版本：

```bash
npm run build:h5
```

构建完成后，H5 产物位于：

```text
dist/build/h5
```

构建微信小程序版本：

```bash
npm run build:mp-weixin
```

构建完成后，微信小程序产物位于：

```text
dist/build/mp-weixin
```

## 目录说明

```text
docs/screenshots/      运行截图
src/
  api/                 mock 接口与本地存储
  components/          页面组件
  mock/                初始 mock 数据
  pages/follow/        两个业务页面
  utils/               日期处理与表单校验
  App.vue              全局样式
  main.js              uni-app 入口
  manifest.json        应用配置
  pages.json           页面路由配置
```

## 验收要点

1. 打开列表页后默认显示 5 条记录。
2. 在列表页下拉，可触发刷新。
3. 滑动到页面底部，会自动加载下一页记录。
4. 点击右下角 `+`，进入添加跟进记录页。
5. 不填写 `主题内容` 或 `沟通详情` 保存，会出现必填提示。
6. 填写并保存后返回列表，新记录显示在列表顶部。

## 提交说明

压缩包中包含源码、配置文件、依赖锁定文件和已构建的 H5 产物，不包含 `node_modules`。收到后可直接执行 `npm install` 和 `npm run dev:h5` 进行查看。

另附 `SUBMISSION.md`，可作为提交邮件正文参考。

运行截图位于：

```text
docs/screenshots/list-page.png
docs/screenshots/add-validation.png
```
