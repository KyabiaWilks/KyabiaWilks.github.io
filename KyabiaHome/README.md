# KyabiaHome - 个人主页

基于 uni-app 的多端个人主页项目，支持 H5、小程序、App 等多平台。

## 项目特性

- 🚀 多端支持：H5、微信小程序、支付宝小程序、App
- 📱 响应式设计：适配各种屏幕尺寸
- 🎨 现代化UI：简洁美观的用户界面
- ⚡ 性能优化：资源压缩、懒加载等优化策略

## 技术栈

- **框架**: uni-app x
- **语言**: TypeScript (UTS)
- **样式**: SCSS
- **构建工具**: HBuilderX / CLI

## 快速开始

### 环境要求

- Node.js 16+
- HBuilderX 或 uni-app CLI

### 安装依赖

```bash
npm install
```

### 运行项目

```bash
# H5 端
npm run dev:h5

# 微信小程序
npm run dev:mp-weixin

# App 端
npm run dev:app
```

### 构建发布

```bash
# H5 端
npm run build:h5

# 微信小程序
npm run build:mp-weixin

# App 端
npm run build:app
```

## 项目结构

```
KyabiaHome/
├── pages/           # 页面目录
├── static/          # 静态资源
├── scripts/         # 工具脚本
├── App.uvue         # 应用入口
├── manifest.json    # 应用配置
└── pages.json       # 页面配置
```

## 页面功能

- **首页**: 全屏背景展示，导航按钮
- **关于我**: 个人介绍、技能展示
- **作品集**: 项目展示、分类浏览
- **作品详情**: 详细项目信息、图片画廊
- **联系我**: 联系表单、社交媒体链接

## 资源优化

项目包含完整的资源优化方案：

- 图片压缩和格式转换
- 字体子集化
- 代码分割和懒加载
- CDN 部署支持

## 部署方案

### H5 部署
- 静态网站托管
- CDN 加速
- Gzip 压缩

### 小程序部署
- 微信开发者工具上传
- 配置小程序后台

### App 部署
- HBuilderX 云打包
- 应用商店发布

## 开发工具

项目包含多个开发工具脚本：

- `optimize-images.js`: 图片优化分析
- `optimize-fonts.js`: 字体优化分析
- `cleanup-old-files.js`: 文件清理

## 许可证

MIT License

## 联系方式

- 作者: Kyabia
- 邮箱: kyabia@example.com
- GitHub: https://github.com/kyabia
