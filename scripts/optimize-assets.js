const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');
const zlib = require('zlib');

// Configuration
const config = {
  images: {
    formats: ['webp', 'avif'],
    sizes: [640, 828, 1200, 1920],
    quality: 80
  },
  compression: {
    level: zlib.constants.Z_BEST_COMPRESSION
  },
  paths: {
    assets: path.join(__dirname, '../public/assets'),
    build: path.join(__dirname, '../build')
  }
};

// Process images
async function optimizeImages() {
  console.log('🖼️ Optimizing images...');
  
  const images = glob.sync(path.join(config.paths.assets, '**/*.{jpg,jpeg,png}'));
  
  for (const image of images) {
    const filename = path.parse(image).name;
    const outputDir = path.dirname(image);
    
    // Create WebP and AVIF versions
    for (const format of config.images.formats) {
      for (const width of config.images.sizes) {
        const outputPath = path.join(outputDir, `${filename}-${width}.${format}`);
        
        await sharp(image)
          .resize(width)
          [format]({ quality: config.images.quality })
          .toFile(outputPath);
      }
    }
    
    // Create responsive images for original format
    for (const width of config.images.sizes) {
      const ext = path.parse(image).ext;
      const outputPath = path.join(outputDir, `${filename}-${width}${ext}`);
      
      await sharp(image)
        .resize(width)
        .toFile(outputPath);
    }
  }
}

// Compress static assets
function compressAssets() {
  console.log('🗜️ Compressing static assets...');
  
  const assets = glob.sync(path.join(config.paths.build, 'static/**/*.{js,css}'));
  
  for (const asset of assets) {
    const content = fs.readFileSync(asset);
    
    // Create gzip version
    fs.writeFileSync(
      `${asset}.gz`,
      zlib.gzipSync(content, config.compression)
    );
    
    // Create brotli version
    fs.writeFileSync(
      `${asset}.br`,
      zlib.brotliCompressSync(content, config.compression)
    );
  }
}

// Main optimization function
async function optimizeAssets() {
  console.log('🚀 Starting asset optimization...');
  
  try {
    await optimizeImages();
    compressAssets();
    console.log('✅ Asset optimization complete!');
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

// Run optimization
optimizeAssets();