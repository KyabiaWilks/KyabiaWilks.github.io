// 图片优化脚本
// 这个脚本会分析项目中的图片并提供优化建议

const fs = require('fs');
const path = require('path');

// 分析图片文件
function analyzeImages() {
  const imageDir = path.join(__dirname, '../static/images');
  const images = [];
  
  if (!fs.existsSync(imageDir)) {
    console.log('图片目录不存在');
    return [];
  }
  
  const files = fs.readdirSync(imageDir);
  
  files.forEach(file => {
    const filePath = path.join(imageDir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
      const sizeKB = Math.round(stat.size / 1024);
      images.push({
        name: file,
        path: filePath,
        size: stat.size,
        sizeKB: sizeKB,
        extension: path.extname(file).toLowerCase()
      });
    }
  });
  
  return images;
}

// 生成图片优化建议
function generateImageOptimizationReport() {
  const images = analyzeImages();
  
  const report = {
    totalImages: images.length,
    totalSize: images.reduce((sum, img) => sum + img.size, 0),
    totalSizeKB: Math.round(images.reduce((sum, img) => sum + img.size, 0) / 1024),
    images: images,
    recommendations: [
      {
        type: '压缩优化',
        description: '使用工具压缩图片，减少文件大小',
        tools: ['imagemin', 'tinypng', 'squoosh'],
        estimatedSavings: '30-50%'
      },
      {
        type: '格式转换',
        description: '将 JPG/PNG 转换为 WebP 格式',
        tools: ['cwebp', 'imagemin-webp'],
        estimatedSavings: '25-35%'
      },
      {
        type: '尺寸优化',
        description: '根据使用场景调整图片尺寸',
        tools: ['sharp', 'imagemin'],
        estimatedSavings: '40-60%'
      },
      {
        type: '响应式图片',
        description: '为不同设备提供不同尺寸的图片',
        tools: ['responsive-loader', 'imagemin'],
        estimatedSavings: '20-30%'
      }
    ],
    specificRecommendations: images.map(img => {
      let recommendation = '';
      let priority = 'low';
      
      if (img.sizeKB > 500) {
        recommendation = '高优先级：文件过大，需要立即优化';
        priority = 'high';
      } else if (img.sizeKB > 200) {
        recommendation = '中优先级：建议压缩优化';
        priority = 'medium';
      } else {
        recommendation = '低优先级：文件大小合理';
        priority = 'low';
      }
      
      return {
        name: img.name,
        sizeKB: img.sizeKB,
        recommendation: recommendation,
        priority: priority,
        suggestedSize: getSuggestedSize(img.name)
      };
    }),
    commands: [
      '# 安装图片优化工具',
      'npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant imagemin-webp',
      '',
      '# 批量压缩图片',
      'imagemin static/images/*.{jpg,png} --out-dir=static/images/optimized --plugin=mozjpeg --plugin=pngquant',
      '',
      '# 转换为 WebP 格式',
      'imagemin static/images/*.{jpg,png} --out-dir=static/images/webp --plugin=webp',
      '',
      '# 调整图片尺寸',
      'imagemin static/images/*.{jpg,png} --out-dir=static/images/resized --plugin=mozjpeg --plugin=pngquant'
    ]
  };
  
  return report;
}

// 根据图片名称建议尺寸
function getSuggestedSize(filename) {
  const name = filename.toLowerCase();
  
  if (name.includes('space') || name.includes('hero')) {
    return '1920x1080 (背景图)';
  } else if (name.includes('profil') || name.includes('avatar')) {
    return '300x300 (头像)';
  } else if (name.includes('work')) {
    return '800x600 (作品展示)';
  } else {
    return '600x400 (通用)';
  }
}

// 生成优化报告
const report = generateImageOptimizationReport();

// 保存报告
const reportPath = path.join(__dirname, '../IMAGE_OPTIMIZATION_REPORT.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('图片优化分析完成！');
console.log(`总图片数量: ${report.totalImages}`);
console.log(`总大小: ${report.totalSizeKB} KB`);
console.log(`报告已保存到: ${reportPath}`);

// 输出图片详情
console.log('\n=== 图片详情 ===');
report.images.forEach(img => {
  console.log(`${img.name}: ${img.sizeKB} KB (${img.extension})`);
});

// 输出优化建议
console.log('\n=== 优化建议 ===');
report.recommendations.forEach((rec, index) => {
  console.log(`\n${index + 1}. ${rec.type}`);
  console.log(`   描述: ${rec.description}`);
  console.log(`   工具: ${rec.tools.join(', ')}`);
  console.log(`   预计节省: ${rec.estimatedSavings}`);
});

// 输出具体建议
console.log('\n=== 具体优化建议 ===');
report.specificRecommendations.forEach(rec => {
  const priority = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
  console.log(`${priority} ${rec.name} (${rec.sizeKB} KB): ${rec.recommendation}`);
  console.log(`   建议尺寸: ${rec.suggestedSize}`);
});

console.log('\n=== 执行命令 ===');
report.commands.forEach(cmd => {
  console.log(cmd);
});
