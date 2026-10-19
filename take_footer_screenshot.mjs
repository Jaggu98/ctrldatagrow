import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/footer-cta.png');

console.log('Capturing footer and final CTA...');
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,10500 --screenshot="${outScreenshot}" http://localhost:3000/`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 20000 });
  if (fs.existsSync(outScreenshot)) {
    console.log('Captured footer and cta, size:', fs.statSync(outScreenshot).size);
  }
} catch (err) {
  console.error('Error:', err);
}
