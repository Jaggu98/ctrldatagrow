import { execSync } from 'child_process';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const heroOut = path.resolve('./public/preview-hero-unconstrained.png');

console.log('Capturing Hero section with unconstrained graphic...');
const cmdHero = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,820 --virtual-time-budget=5000 --screenshot="${heroOut}" http://localhost:3000/`;

try {
  execSync(cmdHero, { stdio: 'inherit', timeout: 35000 });
  console.log('Hero captured successfully!');
} catch (err) {
  console.error('Error capturing hero:', err);
}
