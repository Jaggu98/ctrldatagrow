import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/hero-after-comment.png');

console.log('Capturing hero section screenshot...');
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,1400 --screenshot="${outScreenshot}" http://localhost:3000/`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 15000 });
  if (fs.existsSync(outScreenshot)) {
    console.log('Hero screenshot captured, size:', fs.statSync(outScreenshot).size);
  }
} catch (err) {
  console.error('Error:', err);
}
