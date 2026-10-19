import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/professional-preview.png');

console.log('Capturing refined professional view...');
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,1800 --screenshot="${outScreenshot}" http://localhost:3000/`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 15000 });
  if (fs.existsSync(outScreenshot)) {
    console.log('Refined screenshot captured, size:', fs.statSync(outScreenshot).size);
  }
} catch (err) {
  console.error('Error:', err);
}
