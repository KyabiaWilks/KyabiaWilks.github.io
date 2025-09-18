# 🚀 KyabiaHome 快速启动指南

## 立即开始预览

### 方法一：使用启动脚本（最简单）

**macOS/Linux:**
```bash
./start-preview.sh
```

**Windows:**
```cmd
start-preview.bat
```

### 方法二：手动启动

1. **简单预览（推荐新手）**
```bash
http-server -p 8080 -o
```
然后在浏览器中打开 `http://localhost:8080`

2. **打开预览页面**
```bash
open local-preview.html  # macOS
# 或直接双击 local-preview.html 文件
```

### 方法三：使用 HBuilderX（最佳体验）

1. 下载 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 打开 HBuilderX
3. 文件 → 打开目录 → 选择 KyabiaHome 文件夹
4. 点击"运行" → "运行到浏览器" → "Chrome"

## 🎯 预览内容

启动后您将看到：

- **首页**: 全屏背景展示，现代化设计
- **关于我**: 个人介绍、技能展示
- **作品集**: 项目展示、分类浏览
- **作品详情**: 详细项目信息
- **联系我**: 联系表单、社交媒体

## 📱 多端预览

- **H5**: 在浏览器中预览网页版
- **小程序**: 使用微信开发者工具预览
- **App**: 使用模拟器或真机预览

## 🔧 开发模式

如果需要开发模式（支持热重载）：

```bash
# 安装 uni-app CLI
npm install -g @dcloudio/uni-cli

# 启动开发模式
npm run dev:h5
```

## ⚠️ 注意事项

1. **简单预览模式**：只能查看静态文件，无法体验完整的 uni-app 功能
2. **HBuilderX 模式**：功能最完整，推荐用于开发
3. **CLI 模式**：适合命令行用户，需要额外配置

## 🆘 遇到问题？

1. **端口被占用**：尝试使用其他端口 `http-server -p 8081`
2. **权限问题**：确保有文件读写权限
3. **依赖问题**：重新安装依赖 `npm install`

## 📞 获取帮助

- 查看 `GETTING_STARTED.md` 获取详细指南
- 查看 `PROJECT_SUMMARY.md` 了解项目结构
- 查看 `ASSETS_OPTIMIZATION.md` 了解优化建议

---

**开始您的预览之旅吧！** 🎉
