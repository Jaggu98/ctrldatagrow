import fs from 'fs';

const path = 'C:/Users/Mohithsai Malla/.gemini/antigravity/brain/2ec6628d-20a6-4a7a-b338-7bb889766797/.user_uploaded/media_1792354265964_ae641415.png';
const stats = fs.statSync(path);
console.log('File size:', stats.size);

try {
  const sharp = (await import('sharp')).default;
  const meta = await sharp(path).metadata();
  console.log('Sharp meta:', meta);
} catch (e) {
  console.log('Sharp not installed:', e.message);
}
