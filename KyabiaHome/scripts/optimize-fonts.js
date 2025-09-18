// 字体优化脚本
// 这个脚本会分析项目中使用的字符，并生成字体子集

const fs = require('fs');
const path = require('path');

// 分析项目中使用的字符
function analyzeUsedCharacters() {
  const usedChars = new Set();
  
  // 扫描所有 .uvue 文件
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.uvue') || file.endsWith('.vue') || file.endsWith('.js')) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 提取中文字符
        const chineseChars = content.match(/[\u4e00-\u9fff]/g);
        if (chineseChars) {
          chineseChars.forEach(char => usedChars.add(char));
        }
        
        // 提取英文字符
        const englishChars = content.match(/[a-zA-Z]/g);
        if (englishChars) {
          englishChars.forEach(char => usedChars.add(char));
        }
        
        // 提取数字和标点
        const otherChars = content.match(/[0-9\s\.\,\!\?\:\;\-\(\)\[\]\{\}\"\'\/\\]/g);
        if (otherChars) {
          otherChars.forEach(char => usedChars.add(char));
        }
      }
    });
  }
  
  // 扫描项目目录
  const projectRoot = path.join(__dirname, '..');
  scanDirectory(projectRoot);
  
  return Array.from(usedChars).join('');
}

// 生成字体优化建议
function generateFontOptimizationReport() {
  const usedChars = analyzeUsedCharacters();
  
  const report = {
    totalCharacters: usedChars.length,
    usedCharacters: usedChars,
    recommendations: [
      {
        font: 'FontAwesome',
        currentSize: '约 100KB',
        optimization: '提取项目中使用到的图标，预计可减少 80% 大小',
        characters: '只保留项目中实际使用的图标'
      },
      {
        font: 'Octin Sports',
        currentSize: '约 50KB',
        optimization: '提取中文字符子集，预计可减少 60% 大小',
        characters: usedChars
      }
    ],
    tools: [
      'pyftsubset - 字体子集化工具',
      'fonttools - Python 字体处理库',
      'glyphhanger - 字符使用分析工具'
    ],
    commands: [
      '# 安装 fonttools',
      'pip install fonttools[woff]',
      '',
      '# 提取 FontAwesome 子集（只保留使用的图标）',
      'pyftsubset fontawesome-webfont.woff2 --text="home,user,envelope,phone" --output-file=fontawesome-subset.woff2',
      '',
      '# 提取中文字符子集',
      `pyftsubset octin_sports_rg.ttf --text="${usedChars}" --output-file=octin-sports-subset.woff2`,
      '',
      '# 转换为 WOFF2 格式',
      'pyftsubset font.woff --flavor=woff2 --output-file=font.woff2'
    ]
  };
  
  return report;
}

// 生成优化报告
const report = generateFontOptimizationReport();

// 保存报告
const reportPath = path.join(__dirname, '../FONT_OPTIMIZATION_REPORT.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('字体优化分析完成！');
console.log(`项目中使用字符数量: ${report.totalCharacters}`);
console.log(`报告已保存到: ${reportPath}`);

// 输出优化建议
console.log('\n=== 字体优化建议 ===');
report.recommendations.forEach((rec, index) => {
  console.log(`\n${index + 1}. ${rec.font}`);
  console.log(`   当前大小: ${rec.currentSize}`);
  console.log(`   优化方案: ${rec.optimization}`);
});

console.log('\n=== 推荐工具 ===');
report.tools.forEach(tool => {
  console.log(`- ${tool}`);
});

console.log('\n=== 执行命令 ===');
report.commands.forEach(cmd => {
  console.log(cmd);
});
