# KyabiaHome - uni-app 个人主页项目

## 项目概述

这是一个基于 uni-app 的多端个人主页项目，将原有的静态 HTML 网站改造为支持多平台（H5、小程序、App）的现代化应用。

## 项目结构

```
KyabiaHome/
├── App.uvue                 # 应用入口文件
├── main.uts                 # 应用主文件
├── manifest.json            # 应用配置
├── pages.json               # 页面配置
├── uni.scss                 # 全局样式
├── pages/                   # 页面目录
│   ├── index/               # 首页
│   │   └── index.uvue
│   ├── about/               # 关于我
│   │   └── about.uvue
│   ├── works/               # 作品集
│   │   └── works.uvue
│   ├── work-detail/         # 作品详情
│   │   └── work-detail.uvue
│   └── contact/             # 联系我
│       └── contact.uvue
├── static/                  # 静态资源
│   ├── images/              # 图片资源
│   ├── fonts/               # 字体资源
│   └── tabbar/              # 底部导航图标
└── scripts/                 # 工具脚本
    ├── optimize-images.js   # 图片优化脚本
    ├── optimize-fonts.js    # 字体优化脚本
    └── cleanup-old-files.js # 清理脚本
```

## 功能特性

### 1. 多端支持
- **H5**: 响应式网页应用
- **小程序**: 微信小程序、支付宝小程序等
- **App**: iOS/Android 原生应用

### 2. 页面功能
- **首页**: 全屏背景展示，导航按钮
- **关于我**: 个人介绍、技能展示
- **作品集**: 项目展示、分类浏览
- **作品详情**: 详细项目信息、图片画廊
- **联系我**: 联系表单、社交媒体链接

### 3. 用户体验
- 现代化 UI 设计
- 流畅的页面切换
- 响应式布局
- 底部导航栏

## 技术栈

- **框架**: uni-app x
- **语言**: TypeScript (UTS)
- **样式**: SCSS
- **构建工具**: HBuilderX / CLI

## 资源优化

### 图片优化
- 总图片数量: 10 张
- 总大小: 896 KB
- 优化建议: 压缩、WebP 转换、尺寸调整

### 字体优化
- 使用字符数量: 359 个
- 优化建议: 字体子集化、格式转换

### 文件清理
- 可删除文件: 旧 HTML、CSS、JS 文件
- 可删除目录: assets/、perfume/
- 预计节省空间: 约 2-3 MB

## 开发指南

### 1. 环境要求
- Node.js 16+
- HBuilderX 或 uni-app CLI
- 各平台开发工具（可选）

### 2. 安装依赖
```bash
# 如果使用 CLI 方式
npm install
```

### 3. 运行项目
```bash
# H5 端
npm run dev:h5

# 小程序端
npm run dev:mp-weixin

# App 端
npm run dev:app
```

### 4. 构建发布
```bash
# H5 端
npm run build:h5

# 小程序端
npm run build:mp-weixin

# App 端
npm run build:app
```

## 优化建议

### 1. 图片优化
```bash
# 安装优化工具
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant imagemin-webp

# 批量压缩图片
imagemin static/images/*.{jpg,png} --out-dir=static/images/optimized --plugin=mozjpeg --plugin=pngquant

# 转换为 WebP 格式
imagemin static/images/*.{jpg,png} --out-dir=static/images/webp --plugin=webp
```

### 2. 字体优化
```bash
# 安装字体工具
pip install fonttools[woff]

# 提取字体子集
pyftsubset fontawesome-webfont.woff2 --text="home,user,envelope,phone" --output-file=fontawesome-subset.woff2
```

### 3. 代码优化
- 移除未使用的 CSS
- 压缩 JavaScript 文件
- 优化资源引用路径

## 部署方案

### 1. H5 部署
- 部署到静态网站托管服务
- 配置 CDN 加速
- 启用 Gzip 压缩

### 2. 小程序部署
- 使用微信开发者工具上传
- 配置小程序后台
- 提交审核发布

### 3. App 部署
- 使用 HBuilderX 云打包
- 配置应用签名
- 上传到应用商店

## 性能监控

### 1. 关键指标
- 首屏加载时间
- 页面切换速度
- 资源加载时间
- 内存使用情况

### 2. 优化工具
- Lighthouse 性能评估
- Chrome DevTools
- uni-app 性能分析

## 维护指南

### 1. 定期优化
- 每月检查资源大小
- 季度性能评估
- 年度技术栈升级

### 2. 内容更新
- 作品集更新
- 个人信息维护
- 联系方式更新

### 3. 安全维护
- 依赖包安全更新
- 代码安全审计
- 数据备份

## 联系信息

- 项目作者: Kyabia
- 邮箱: kyabia@example.com
- GitHub: https://github.com/kyabia

## 许可证

MIT License
