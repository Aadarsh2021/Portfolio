const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const rootAssets = path.join(__dirname, '../public/assets');

async function processImage(inputPath, outputPath, options = {}) {
  try {
    const pipeline = sharp(inputPath);
    const metadata = await pipeline.metadata();

    let width = options.width || (metadata.width > 900 ? 900 : metadata.width);
    let height = options.height || undefined;

    let transform = pipeline;
    if (width || height) {
      transform = transform.resize(width, height, {
        fit: options.fit || 'inside',
        withoutEnlargement: true
      });
    }

    await transform
      .webp({ quality: options.quality || 80, effort: 6 })
      .toFile(outputPath);

    const oldSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    console.log(`Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}: ${(oldSize/1024).toFixed(1)} KB -> ${(newSize/1024).toFixed(1)} KB (-${Math.round((1 - newSize/oldSize) * 100)}%)`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}

async function run() {
  console.log('--- Starting WebP Generation ---');

  // 1. Root assets
  await processImage(
    path.join(rootAssets, 'banner.png'),
    path.join(rootAssets, 'banner.webp'),
    { width: 1400, quality: 80 }
  );

  await processImage(
    path.join(rootAssets, 'profile.png'),
    path.join(rootAssets, 'profile.webp'),
    { width: 134, height: 134, fit: 'cover', quality: 80 }
  );

  // Also in netflix directory if it exists
  const netflixDir = path.join(rootAssets, 'netflix');
  if (fs.existsSync(netflixDir)) {
    const netflixFiles = fs.readdirSync(netflixDir);
    for (const file of netflixFiles) {
      if (file.endsWith('.jpg') || file.endsWith('.png')) {
        const basename = path.parse(file).name;
        const input = path.join(netflixDir, file);
        const output = path.join(netflixDir, `${basename}.webp`);
        const isProfile = file.includes('profile');
        const isBanner = file.includes('banner');

        await processImage(input, output, {
          width: isProfile ? 134 : (isBanner ? 1400 : 540),
          height: isProfile ? 134 : undefined,
          fit: isProfile ? 'cover' : 'inside',
          quality: isBanner ? 80 : 70
        });
      }
    }
  }

  // 2. Projects directory
  const projectsDir = path.join(rootAssets, 'projects');
  if (fs.existsSync(projectsDir)) {
    const projectFiles = fs.readdirSync(projectsDir);
    for (const file of projectFiles) {
      if (file.endsWith('.jpg') || file.endsWith('.png')) {
        const basename = path.parse(file).name;
        const input = path.join(projectsDir, file);
        const output = path.join(projectsDir, `${basename}.webp`);

        await processImage(input, output, {
          width: 800,
          quality: 80
        });
      }
    }
  }

  console.log('--- WebP Generation Finished! ---');
}

run();

