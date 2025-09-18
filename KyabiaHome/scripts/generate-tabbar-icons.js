// 生成简单的 tabbar 图标
// 这个脚本会创建简单的 SVG 图标并转换为 base64

const fs = require('fs');
const path = require('path');

// 简单的 SVG 图标定义
const icons = {
  home: {
    normal: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9L12 2L21 9V20H15V12H9V20H3V9Z" stroke="#7A7E83" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    active: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9L12 2L21 9V20H15V12H9V20H3V9Z" stroke="#3cc51f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  works: {
    normal: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#7A7E83" stroke-width="2"/>
      <line x1="9" y1="9" x2="15" y2="9" stroke="#7A7E83" stroke-width="2"/>
      <line x1="9" y1="13" x2="15" y2="13" stroke="#7A7E83" stroke-width="2"/>
      <line x1="9" y1="17" x2="15" y2="17" stroke="#7A7E83" stroke-width="2"/>
    </svg>`,
    active: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#3cc51f" stroke-width="2"/>
      <line x1="9" y1="9" x2="15" y2="9" stroke="#3cc51f" stroke-width="2"/>
      <line x1="9" y1="13" x2="15" y2="13" stroke="#3cc51f" stroke-width="2"/>
      <line x1="9" y1="17" x2="15" y2="17" stroke="#3cc51f" stroke-width="2"/>
    </svg>`
  },
  about: {
    normal: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#7A7E83" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke="#7A7E83" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    active: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#3cc51f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke="#3cc51f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  contact: {
    normal: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#7A7E83" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="22,6 12,13 2,6" stroke="#7A7E83" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    active: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#3cc51f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="22,6 12,13 2,6" stroke="#3cc51f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }
};

// 创建 tabbar 目录
const tabbarDir = path.join(__dirname, '../static/tabbar');
if (!fs.existsSync(tabbarDir)) {
  fs.mkdirSync(tabbarDir, { recursive: true });
}

// 生成图标文件
Object.keys(icons).forEach(iconName => {
  const icon = icons[iconName];
  
  // 生成普通状态图标
  const normalSvg = icon.normal;
  const normalBase64 = Buffer.from(normalSvg).toString('base64');
  const normalDataUrl = `data:image/svg+xml;base64,${normalBase64}`;
  
  // 生成激活状态图标
  const activeSvg = icon.active;
  const activeBase64 = Buffer.from(activeSvg).toString('base64');
  const activeDataUrl = `data:image/svg+xml;base64,${activeBase64}`;
  
  // 写入文件
  fs.writeFileSync(path.join(tabbarDir, `${iconName}.png`), normalDataUrl);
  fs.writeFileSync(path.join(tabbarDir, `${iconName}-active.png`), activeDataUrl);
  
  console.log(`Generated ${iconName} icons`);
});

console.log('All tabbar icons generated successfully!');
