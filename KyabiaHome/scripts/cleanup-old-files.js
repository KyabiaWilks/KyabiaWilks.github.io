// 清理旧文件脚本
// 这个脚本会分析并清理不需要的旧文件

const fs = require('fs');
const path = require('path');

// 需要保留的文件和目录
const keepFiles = [
  'KyabiaHome/',  // uni-app 项目目录
  'README.md',    // 项目说明文档
  '.git/',        // Git 版本控制
  '.gitignore'    // Git 忽略文件
];

// 可以安全删除的文件和目录
const deleteFiles = [
  'about.html',
  'components.html', 
  'contact.html',
  'index.html',
  'work.html',
  'works.html',
  'main.3f6952e4.css',
  'main.3f6952e4.css.gz',
  'main.70a66962.js',
  'main.70a66962.js.gz',
  'main.70a66962.map',
  'assets/',  // 旧资源目录（已迁移到 KyabiaHome/static/）
  'perfume/'  // 香水项目目录（内容已整合到 uni-app 中）
];

// 分析文件大小
function getFileSize(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return stat.size;
  } catch (error) {
    return 0;
  }
}

// 分析目录大小
function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  try {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stat.size;
      }
    });
  } catch (error) {
    console.log(`无法访问目录: ${dirPath}`);
  }
  
  return totalSize;
}

// 格式化文件大小
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 生成清理报告
function generateCleanupReport() {
  const projectRoot = path.join(__dirname, '..');
  const report = {
    analysis: {
      totalFilesToDelete: 0,
      totalSizeToDelete: 0,
      filesToDelete: [],
      directoriesToDelete: []
    },
    recommendations: [
      {
        action: '删除旧 HTML 文件',
        reason: '已被 uni-app 页面替代',
        files: ['about.html', 'contact.html', 'index.html', 'work.html', 'works.html', 'components.html']
      },
      {
        action: '删除旧 CSS/JS 文件',
        reason: '已被 uni-app 样式和脚本替代',
        files: ['main.3f6952e4.css', 'main.3f6952e4.css.gz', 'main.70a66962.js', 'main.70a66962.js.gz', 'main.70a66962.map']
      },
      {
        action: '删除旧资源目录',
        reason: '资源已迁移到 KyabiaHome/static/ 目录',
        files: ['assets/']
      },
      {
        action: '删除香水项目目录',
        reason: '内容已整合到 uni-app 项目中',
        files: ['perfume/']
      }
    ],
    safetyChecks: [
      '确保 KyabiaHome/ 目录完整',
      '确保 README.md 存在',
      '确保 .git/ 目录完整',
      '备份重要数据'
    ]
  };
  
  // 分析要删除的文件
  deleteFiles.forEach(item => {
    const itemPath = path.join(projectRoot, item);
    
    if (fs.existsSync(itemPath)) {
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        const size = getDirectorySize(itemPath);
        report.analysis.directoriesToDelete.push({
          name: item,
          path: itemPath,
          size: size,
          sizeFormatted: formatSize(size)
        });
        report.analysis.totalSizeToDelete += size;
      } else {
        report.analysis.filesToDelete.push({
          name: item,
          path: itemPath,
          size: stat.size,
          sizeFormatted: formatSize(stat.size)
        });
        report.analysis.totalSizeToDelete += stat.size;
      }
      
      report.analysis.totalFilesToDelete++;
    }
  });
  
  return report;
}

// 执行清理（谨慎模式）
function performCleanup(dryRun = true) {
  const report = generateCleanupReport();
  const projectRoot = path.join(__dirname, '..');
  
  console.log('=== 文件清理分析报告 ===');
  console.log(`总文件/目录数: ${report.analysis.totalFilesToDelete}`);
  console.log(`总大小: ${formatSize(report.analysis.totalSizeToDelete)}`);
  console.log(`模式: ${dryRun ? '预览模式（不会实际删除）' : '执行模式（将实际删除）'}`);
  
  console.log('\n=== 要删除的文件 ===');
  report.analysis.filesToDelete.forEach(file => {
    console.log(`📄 ${file.name} (${file.sizeFormatted})`);
  });
  
  console.log('\n=== 要删除的目录 ===');
  report.analysis.directoriesToDelete.forEach(dir => {
    console.log(`📁 ${dir.name} (${dir.sizeFormatted})`);
  });
  
  console.log('\n=== 清理建议 ===');
  report.recommendations.forEach((rec, index) => {
    console.log(`\n${index + 1}. ${rec.action}`);
    console.log(`   原因: ${rec.reason}`);
    console.log(`   文件: ${rec.files.join(', ')}`);
  });
  
  console.log('\n=== 安全检查 ===');
  report.safetyChecks.forEach(check => {
    console.log(`✓ ${check}`);
  });
  
  if (!dryRun) {
    console.log('\n=== 开始清理 ===');
    
    // 删除文件
    report.analysis.filesToDelete.forEach(file => {
      try {
        fs.unlinkSync(file.path);
        console.log(`✓ 已删除文件: ${file.name}`);
      } catch (error) {
        console.log(`✗ 删除文件失败: ${file.name} - ${error.message}`);
      }
    });
    
    // 删除目录
    report.analysis.directoriesToDelete.forEach(dir => {
      try {
        fs.rmSync(dir.path, { recursive: true, force: true });
        console.log(`✓ 已删除目录: ${dir.name}`);
      } catch (error) {
        console.log(`✗ 删除目录失败: ${dir.name} - ${error.message}`);
      }
    });
    
    console.log('\n=== 清理完成 ===');
  } else {
    console.log('\n=== 预览模式 ===');
    console.log('要执行实际清理，请运行: node scripts/cleanup-old-files.js --execute');
  }
  
  return report;
}

// 保存报告
function saveReport(report) {
  const reportPath = path.join(__dirname, '../CLEANUP_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n报告已保存到: ${reportPath}`);
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const execute = args.includes('--execute');
  
  const report = performCleanup(!execute);
  saveReport(report);
}

// 运行脚本
main();
