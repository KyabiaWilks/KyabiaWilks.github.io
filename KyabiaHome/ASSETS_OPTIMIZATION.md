# 资源优化建议

## 图片资源优化

### 当前图片资源分析
- **空间背景图** (space.jpg): 用于首页背景，建议压缩至 1920x1080 或更小
- **个人头像** (profil.jpg): 建议压缩至 300x300 或更小
- **作品展示图**: 建议统一压缩至 800x600 或更小
- **香水项目图**: 建议压缩至 600x400 或更小

### 优化建议

#### 1. 图片格式优化
- 使用 WebP 格式替代 JPG/PNG（支持的情况下）
- 对于简单图标，使用 SVG 格式
- 对于复杂图片，使用高质量 JPG 压缩

#### 2. 图片尺寸优化
```bash
# 使用 ImageMagick 或类似工具压缩图片
# 示例命令：
convert space.jpg -resize 1920x1080 -quality 85 space_optimized.jpg
convert profil.jpg -resize 300x300 -quality 90 profil_optimized.jpg
```

#### 3. 响应式图片
- 为不同屏幕尺寸提供不同分辨率的图片
- 使用 `srcset` 属性（在 H5 端）

#### 4. 懒加载
- 对于非首屏图片，实现懒加载
- 使用 uni-app 的 `lazy-load` 属性

## 字体资源优化

### 当前字体分析
- **FontAwesome**: 包含大量图标，但只使用了少数几个
- **Octin Sports**: 自定义字体，文件较大

### 优化建议

#### 1. 字体子集化
```bash
# 使用 fonttools 提取需要的字符
pyftsubset fontawesome-webfont.woff2 --text="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" --output-file=fontawesome-subset.woff2
```

#### 2. 字体格式优化
- 优先使用 WOFF2 格式（压缩率最高）
- 提供 WOFF 作为备选
- 移除不需要的字体变体

#### 3. 字体加载优化
- 使用 `font-display: swap` 提高加载性能
- 预加载关键字体

## 资源存储建议

### 1. CDN 存储
- 将静态资源上传到 CDN
- 使用版本号管理资源更新
- 启用 Gzip 压缩

### 2. 本地存储优化
```
static/
├── images/
│   ├── hero/          # 首页相关图片
│   ├── works/         # 作品相关图片
│   ├── profile/       # 个人资料图片
│   └── icons/         # 图标文件
├── fonts/
│   ├── fontawesome-subset.woff2
│   └── octin-sports-subset.woff2
└── tabbar/            # 底部导航图标
```

### 3. 资源压缩
- 使用工具如 `imagemin` 批量压缩图片
- 使用 `terser` 压缩 JavaScript
- 使用 `clean-css` 压缩 CSS

## 实施步骤

1. **图片优化**
   - 压缩所有图片文件
   - 转换为 WebP 格式
   - 创建不同尺寸版本

2. **字体优化**
   - 提取需要的字符子集
   - 转换为 WOFF2 格式
   - 移除未使用的字体

3. **代码优化**
   - 移除未使用的 CSS
   - 压缩 JavaScript 文件
   - 优化资源引用路径

4. **性能监控**
   - 添加资源加载时间监控
   - 使用 Lighthouse 评估性能
   - 定期检查资源使用情况
