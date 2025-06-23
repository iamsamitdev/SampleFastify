const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function copyFiles(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyFiles(srcPath, destPath);
    } else if (file.endsWith('.ts')) {
      // Convert .ts to .js for copying
      const jsContent = fs.readFileSync(srcPath, 'utf8')
        .replace(/import\s+(.+)\s+from\s+['"](.+)['"]/g, 'const $1 = require(\'$2\')')
        .replace(/export\s+/g, 'module.exports = ')
        .replace(/: \w+/g, '') // Remove type annotations
        .replace(/\?\:/g, ':') // Remove optional types
        .replace(/<[^>]+>/g, ''); // Remove generics
      
      const jsFile = destPath.replace('.ts', '.js');
      fs.writeFileSync(jsFile, jsContent);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log('🔨 Starting manual TypeScript to JavaScript conversion...');
  
  // Create dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
  }
  
  copyFiles('src', 'dist');
  
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
