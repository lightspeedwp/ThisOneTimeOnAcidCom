const fs = require('fs');
const files = [
  './components/pages/dev-tools/AccessibilityTesterPage.tsx',
  './components/pages/dev-tools/PerformanceTesterPage.tsx',
  './components/pages/dev-tools/PhosphorIconsPage.tsx',
  './components/pages/dev-tools/ColorPalettesPage.tsx',
  './components/pages/dev-tools/RichTextSpecimensPage.tsx',
  './components/pages/dev-tools/CardInteractionsLabPage.tsx',
  './components/dev-tools/DevToolsSearch.tsx',
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/React\.createElement\(\s*React\.Fragment\s*,\s*null\s*,/g, "React.createElement('div', { style: { display: 'contents' } },");
    content = content.replace(/React\.Fragment/g, "'div'");
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed fragments');
