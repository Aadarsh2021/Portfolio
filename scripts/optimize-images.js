const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/assets');
const OUTPUT_DIR = path.join(__dirname, '../public/assets/optimized');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const optimizeImage = async (inputPath, filename) => {
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);
  
  // Skip already optimized images
  if (basename.includes('-opt')) return;

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Convert to WebP with different sizes
    const sizes = [400, 800, 1200];
    const promises = sizes.map(size => {
      const ratio = size / Math.min(metadata.width, metadata.height);
      const width = Math.round(metadata.width * ratio);
      const height = Math.round(metadata.height * ratio);

      return image
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 80 })
        .toFile(path.join(OUTPUT_DIR, `${basename}-${size}w-opt.webp`));
    });

    // Also create an AVIF version for modern browsers
    promises.push(
      ...sizes.map(size => {
        const ratio = size / Math.min(metadata.width, metadata.height);
        const width = Math.round(metadata.width * ratio);
        const height = Math.round(metadata.height * ratio);

        return image
          .resize(width, height, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .avif({ quality: 65 })
          .toFile(path.join(OUTPUT_DIR, `${basename}-${size}w-opt.avif`));
      })
    );

    await Promise.all(promises);
    console.log(`✅ Optimized ${filename}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error);
  }
};

const processDirectory = async (directory) => {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      await optimizeImage(filePath, file);
    }
  }
};

processDirectory(INPUT_DIR)
  .then(() => console.log('Image optimization complete!'))
  .catch(console.error);